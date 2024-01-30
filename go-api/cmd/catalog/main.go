package main

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/ClauHenrique/projeto-fullcycle/go-api/internal/database"
	"github.com/ClauHenrique/projeto-fullcycle/go-api/internal/service"
	"github.com/ClauHenrique/projeto-fullcycle/go-api/internal/webserver"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	_ "github.com/go-sql-driver/mysql"
)

func main() {
	db, err := sql.Open("mysql", "root:root@tcp(localhost:3305)/catalog_product")

	if err != nil {
		panic(err.Error())
	}

	defer db.Close()

	// passar o objeto de conexao para as entidades
	categoryDB := database.NewCategoryDB(db)
	categoryService := service.NewCategoryService(*categoryDB)

	productDB := database.NewProductDB(db)
	productService := service.NewProductService(*productDB)

	// criar instancias dos services
	webCategoryHandler := webserver.NewWebCategoryHandler(categoryService)
	webProductHandler := webserver.NewWebProductHandler(productService)

	// criar rotas
	routers := chi.NewRouter()

	routers.Use(middleware.Logger)
	routers.Use(middleware.Recoverer)

	routers.Get("/category/{id}", webCategoryHandler.GetCategory)
	routers.Get("/category", webCategoryHandler.GetCategories)
	routers.Post("/category", webCategoryHandler.CreateCategory)

	routers.Get("/product/{id}", webProductHandler.GetProduct)
	routers.Get("/product", webProductHandler.GetProducts)
	routers.Get("/product/category/{categoryID}", webProductHandler.GetProductByCategoryID)
	routers.Post("/product", webProductHandler.CreateProduct)

	fmt.Println("server is running on port 3333")
	http.ListenAndServe(":3333", routers)
}
