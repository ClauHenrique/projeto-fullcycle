package database

import (
	"database/sql"

	"github.com/ClauHenrique/projeto-fullcycle/go-api/internal/entity"
)

// conexao com o banco
type CategoryDB struct {
	db *sql.DB
}

func NewCategoryDB(db *sql.DB) *CategoryDB {
	return &CategoryDB{db: db}
}

// funcoes realizadas sobre a estrutura CategoryDB

func (categoryDB *CategoryDB) CreateCategory(category *entity.Category) (string, error) {
	_, err := categoryDB.db.
		Exec("INSERT INTO categories (id, name) VALUES (?, ?)", category.ID, category.Name)

	if err != nil {
		return "", err
	}

	return category.ID, nil
}

func (categoryDB *CategoryDB) GetCategory(id string) (*entity.Category, error) {
	var category entity.Category
	err := categoryDB.db.QueryRow("SELECT id, name FROM categories WHERE id = ?", id).
		Scan(&category.ID, &category.Name)

	if err != nil {
		return nil, err
	}

	return &category, nil
}

func (categoryDB *CategoryDB) GetCategories() ([]*entity.Category, error) {
	rows, err := categoryDB.db.Query("SELECT id, name FROM categories")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var categories []*entity.Category

	for rows.Next() {
		var category entity.Category
		err := rows.Scan(&category.ID, &category.Name)

		if err != nil {
			return nil, err
		}

		categories = append(categories, &category)
	}

	return categories, nil
}
