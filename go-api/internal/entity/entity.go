package entity

import "github.com/google/uuid"

// estrutura para represdentar os dados das categorias de produtos
type Category struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

// criar uma nova categoria e retorna-la
func NewCategory(name string) *Category {
	return &Category{
		ID:   uuid.New().String(),
		Name: name,
	}
}

// criar um novo produto e retorna-lo
type Product struct {
	ID          string  `json:"id"`
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Price       float64 `json:"price"`
	CategoryID  string  `json:"category_id"`
	ImageURL    string  `json:"image_url"`
}

func NewProduct(name, description, categoryID, imageURL string, price float64) *Product {
	return &Product{
		ID:          uuid.New().String(),
		Name:        name,
		Description: description,
		Price:       price,
		CategoryID:  categoryID,
		ImageURL:    imageURL,
	}
}
