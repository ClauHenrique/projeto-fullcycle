package database

import (
	"database/sql"

	"github.com/ClauHenrique/projeto-fullcycle/go-api/internal/entity"
)

// conexao com o banco
type ProductDB struct {
	db *sql.DB
}

func NewProductDB(db *sql.DB) *ProductDB {
	return &ProductDB{db: db}
}

func (productDB *ProductDB) CreateProduct(product *entity.Product) (*entity.Product, error) {

	_, err := productDB.db.
		Exec("INSERT INTO products (id, name, description, price, category_id, image_url) VALUES (?, ?, ?, ?, ?, ?)",
			product.ID, product.Name, product.Description, product.Price, product.CategoryID, product.ImageURL)

	if err != nil {
		return nil, err
	}

	return product, nil

}

func (productDB *ProductDB) GetProduct(id string) (*entity.Product, error) {

	var product entity.Product
	err := productDB.db.QueryRow("SELECT id, name, description, price, category_id, image_url FROM products WHERE id = ?", id).
		Scan(&product.ID, &product.Name, &product.Description, &product.Price, &product.CategoryID, &product.ImageURL)

	if err != nil {
		return nil, err
	}

	return &product, nil
}

func (productDB *ProductDB) GetProducts() ([]*entity.Product, error) {

	rows, err := productDB.db.
		Query("SELECT id, name, description, price, category_id, image_url FROM products")

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var products []*entity.Product

	for rows.Next() {

		var product entity.Product
		err := rows.
			Scan(&product.ID, &product.Name, &product.Description, &product.Price, &product.CategoryID, &product.ImageURL)

		if err != nil {
			return nil, err
		}

		products = append(products, &product)
	}

	return products, nil
}

func (productDB *ProductDB) GetProductByCategoryID(categoryID string) ([]*entity.Product, error) {

	rows, err := productDB.db.
		Query("SELECT id, name, description, price, category_id, image_url FROM products WHERE category_id = ?", categoryID)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var products []*entity.Product

	for rows.Next() {

		var product entity.Product
		err := rows.
			Scan(&product.ID, &product.Name, &product.Description, &product.Price, &product.CategoryID, &product.ImageURL)

		if err != nil {
			return nil, err
		}

		products = append(products, &product)
	}

	return products, nil

}
