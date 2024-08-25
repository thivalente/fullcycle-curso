package database

import (
	"database/sql"
	"github.com/google/uuid"
)

type Course struct {
	db *sql.DB
	ID string
	Name string
	Description string
	CategoryID string
}

func NewCourse (db *sql.DB) *Course {
	return &Course{db:db}
}

func (c *Course) Create(name string, description string, categoryID string) (Course, error) {
	id := uuid.New().String()
	_, err := c.db.Exec("INSERT INTO courses (id, name, description, categoryId) VALUES ($1, $2, $3, $4)", id, name, description, categoryID)

	if (err != nil) {
		return Course{}, err
	}

	return Course{ID: id, Name: name, Description: description, CategoryID: categoryID}, nil
}

func (c *Course) FindAll() ([]Course, error) {
	rows, err := c.db.Query("SELECT id, name, description, categoryID FROM courses")

	if (err != nil) {
		return nil, err
	}

	defer rows.Close()

	courses := []Course{}

	for rows.Next() {
		var id, name, description, categoryID string

		if err := rows.Scan(&id, &name, &description, &categoryID); err != nil {
			return nil, err
		}

		courses = append(courses, Course{ID: id, Name: name, Description: description, CategoryID: categoryID})
	}

	return courses, nil
}

func (c *Course) FindByCategoryId(categoryID string) ([]Course, error) {
	rows, err := c.db.Query("SELECT id, name, description, categoryID FROM courses WHERE categoryID = ?", categoryID)

	if (err != nil) {
		return nil, err
	}

	defer rows.Close()

	courses := []Course{}

	for rows.Next() {
		var id, name, description, catID string

		if err := rows.Scan(&id, &name, &description, &catID); err != nil {
			return nil, err
		}

		courses = append(courses, Course{ID: id, Name: name, Description: description, CategoryID: catID})
	}

	return courses, nil
}

func (c *Course) FindById(id string) (*Course, error) {
	row := c.db.QueryRow("SELECT id, name, description, categoryID FROM courses WHERE id = ?", id)

	var courseID, name, description, categoryID string

	if err := row.Scan(&courseID, &name, &description, &categoryID); err != nil {
        if err == sql.ErrNoRows {
            return nil, nil
        }

        return nil, err
    }

	return &Course{ID: courseID, Name: name, Description: description, CategoryID: categoryID}, nil
}