package webserver

import (
	"encoding/json"
	"net/http"

	"github.com/ClauHenrique/projeto-fullcycle/go-api/internal/entity"
	"github.com/ClauHenrique/projeto-fullcycle/go-api/internal/service"
	"github.com/go-chi/chi/v5"
)

type WebProductHandler struct {
	ProductService *service.ProductService
}

func NewWebProductHandler(productService *service.ProductService) *WebProductHandler {
	return &WebProductHandler{ProductService: productService}
}

func (webProdHandler *WebProductHandler) GetProducts(w http.ResponseWriter, r *http.Request) {
	products, err := webProdHandler.ProductService.GetProducts()

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(products)
}

func (webProdHandler *WebProductHandler) GetProduct(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")

	if id == "" {
		http.Error(w, "id is required", http.StatusBadRequest)
		return
	}

	product, err := webProdHandler.ProductService.GetProduct(id)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(product)
}

func (webProdHandler *WebProductHandler) GetProductByCategoryID(w http.ResponseWriter, r *http.Request) {

	categoryID := chi.URLParam(r, "categoryID")

	if categoryID == "" {
		http.Error(w, "id is required", http.StatusBadRequest)
		return
	}

	products, err := webProdHandler.ProductService.GetProductbyCategoryID(categoryID)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(products)
}

func (webProdHandler *WebProductHandler) CreateProduct(w http.ResponseWriter, r *http.Request) {

	var product entity.Product
	err := json.NewDecoder(r.Body).Decode(&product)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	result, err := webProdHandler.ProductService.CreateProduct(product.Name, product.Description, product.CategoryID, product.ImageURL, product.Price)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(result)
}
