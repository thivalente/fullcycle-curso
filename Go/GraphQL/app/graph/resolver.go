package graph

import "github.com/thivalente/fullcycle-curso/Go/GraphQL/internal/database"

type Resolver struct {
	CategoryDB *database.Category
	CourseDB *database.Course
}
