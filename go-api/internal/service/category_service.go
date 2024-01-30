package service

import (
	"github.com/ClauHenrique/projeto-fullcycle/go-api/internal/database"
	"github.com/ClauHenrique/projeto-fullcycle/go-api/internal/entity"
)

type CategoryService struct {
	CategoryDB database.CategoryDB
}

func NewCategoryService(categoryDB database.CategoryDB) *CategoryService {
	return &CategoryService{CategoryDB: categoryDB}
}

func (categoryService *CategoryService) GetCategory(id string) (*entity.Category, error) {
	category, err := categoryService.CategoryDB.GetCategory(id)

	if err != nil {
		return nil, err
	}

	return category, nil
}

func (categoryService *CategoryService) CreateCategory(name string) (*entity.Category, error) {
	category := entity.NewCategory(name)
	_, err := categoryService.CategoryDB.CreateCategory(category)

	if err != nil {
		return nil, err
	}

	return category, nil
}

func (categoryService *CategoryService) GetCategories() ([]*entity.Category, error) {
	categories, err := categoryService.CategoryDB.GetCategories()

	if err != nil {
		return nil, err
	}

	return categories, nil
}
