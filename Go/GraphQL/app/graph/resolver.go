package graph

import "github.com/thivalente/fullcycle-curso/Go/GraphQL/app/internal/database"

type Resolver struct {
	CategoryDB *database.Category
}
