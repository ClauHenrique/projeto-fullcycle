package webserver

import (
	"encoding/json"
	"net/http"

	"github.com/ClauHenrique/projeto-fullcycle/go-api/internal/entity"
	"github.com/ClauHenrique/projeto-fullcycle/go-api/internal/service"
	"github.com/go-chi/chi/v5"
)

type WebCategoryHandler struct {
	CategoryService *service.CategoryService
}

func NewWebCategoryHandler(categoryService *service.CategoryService) *WebCategoryHandler {
	return &WebCategoryHandler{CategoryService: categoryService}
}

func (webCatHandler *WebCategoryHandler) GetCategories(w http.ResponseWriter, r *http.Request) {
	categories, err := webCatHandler.CategoryService.GetCategories()

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(categories)
}

func (webCatHandler *WebCategoryHandler) GetCategory(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")

	if id == "" {
		http.Error(w, "id is required", http.StatusBadRequest)
		return
	}

	category, err := webCatHandler.CategoryService.GetCategory(id)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(category)
}

func (webCatHandler *WebCategoryHandler) CreateCategory(w http.ResponseWriter, r *http.Request) {

	var category entity.Category
	err := json.NewDecoder(r.Body).Decode(&category)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	result, err := webCatHandler.CategoryService.CreateCategory(category.Name)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(result)
}
