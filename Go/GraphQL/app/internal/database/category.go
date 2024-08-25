package database

import (
	"database/sql"
	"github.com/google/uuid"
)

type Category struct {
	db *sql.DB
	ID string
	Name string
	Description string
}

func NewCategory (db *sql.DB) *Category {
	return &Category{db:db}
}

func (c *Category) Create(name string, description string) (Category, error) {
	id := uuid.New().String()
	_, err := c.db.Exec("INSERT INTO categories (id, name, description) VALUES ($1, $2, $3)", id, name, description)

	if (err != nil) {
		return Category{}, err
	}

	return Category{ID: id, Name: name, Description: description}, nil
}

func (c *Category) FindAll() ([]Category, error) {
	rows, err := c.db.Query("SELECT id, name, description FROM categories")

	if (err != nil) {
		return nil, err
	}

	defer rows.Close()

	categories := []Category{}

	for rows.Next() {
		var id, name, description string

		if err := rows.Scan(&id, &name, &description); err != nil {
			return nil, err
		}

		categories = append(categories, Category{ID: id, Name: name, Description: description})
	}

	return categories, nil
}

func (c *Category) FindById(id string) (*Category, error) {
	row := c.db.QueryRow("SELECT id, name, description FROM categories WHERE id = ?", id)

	var categoryID, name, description string

	if err := row.Scan(&categoryID, &name, &description); err != nil {
        if err == sql.ErrNoRows {
            return nil, nil
        }

        return nil, err
    }

	return &Category{ID: categoryID, Name: name, Description: description}, nil
}

func (c *Category) FindByCourseId(courseID string) (*Category, error) {
	row := c.db.QueryRow("SELECT cat.id, cat.name, cat.description FROM courses cou JOIN categories cat ON cou.categoryID = cat.id WHERE cou.id = ?", courseID)

	var categoryID, name, description string

	if err := row.Scan(&categoryID, &name, &description); err != nil {
        if err == sql.ErrNoRows {
            return nil, nil
        }

        return nil, err
    }

	return &Category{ID: categoryID, Name: name, Description: description}, nil
}