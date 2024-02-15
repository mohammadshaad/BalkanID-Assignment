package main

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"

	"github.com/mohammadshaad/golang-book-store-backend/database"
	"github.com/mohammadshaad/golang-book-store-backend/routes"
)

func main() {
	fmt.Println("Welcome to the book store")

	if err := godotenv.Load(); err != nil {
		panic("Error loading .env file")
	}

	database.InitDatabase()

	db := database.GetDB()
	defer database.CloseDB()

	database.AutoMigrateModels(db)

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost",                      
		AllowHeaders: "Origin, Content-Type, Accept, Authorization", 
	}))

	routes.DefineRoutes(app)

	port := 8080 
	routes.StartApp(app, port)
}
