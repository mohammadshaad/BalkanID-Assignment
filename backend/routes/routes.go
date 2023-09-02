package routes

import (
	"fmt"
	"os"

	"github.com/gofiber/fiber/v2"

	jwtware "github.com/gofiber/jwt/v3"
	"github.com/mohammadshaad/golang-book-store-backend/middleware"
)

func DefineRoutes(app *fiber.App) {
	// Define public routes
	definePublicRoutes(app)

	// Define user-specific routes
	defineUserRoutes(app)

	// Define admin-specific routes
	defineAdminRoutes(app)
}

func StartApp(app *fiber.App, port int) {
	fmt.Printf("Server is listening on port %d...\n", port)
	app.Listen(fmt.Sprintf(":%d", port))
}

func definePublicRoutes(app *fiber.App) {
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Welcome to the book store!")
	})

	app.Post("/register", RegisterHandler)
	app.Post("/login", LoginHandler)
}

func defineUserRoutes(app *fiber.App) {
	// Define a middleware to protect routes that require a valid JWT
	user := app.Group("/user")
	user.Use(jwtware.New(jwtware.Config{
		SigningKey: []byte(os.Getenv("JWT_SECRET")),
	}))

	// Modify the middleware to check for JWT validity
	user.Use(middleware.CheckJWTValidity)

	user.Get("/", UserHomePageHandler)
	user.Get("/profile/:id", Profile)
	user.Get("/name/:id", GetUserNameHandler)
	user.Put("/profile/:id", UpdateProfile)
	user.Put("/deactivate/:id", DeactivateAccountHandler)
	user.Put("/activate/:id", ActivateAccountHandler)
	user.Delete("/delete/:id", DeleteAccountHandler)
	user.Post("/logout", LogoutHandler)

	user.Get("/books", GetAllBooksHandler)
	user.Get("/book/:id", GetBookByIDHandler)
	user.Post("/cart", AddToCartHandler)
	user.Get("/cart", GetCartHandler)
	user.Delete("/cart/:book_id", RemoveFromCartHandler)
	user.Put("/cart/:book_id", UpdateCartItemQuantityHandler)
	user.Post("/book/:book_id/reviews", AddReviewHandler)
	user.Get("/book/:book_id/reviews", GetBookReviewsHandler)
	user.Get("/book/:id/download", DownloadBookHandler)
	// getting the role of the user
	user.Get("/role/:id", GetUserRoleHandler)

}

func defineAdminRoutes(app *fiber.App) {
	// Define a middleware to protect routes that require a valid JWT
	admin := app.Group("/admin")
	admin.Use(jwtware.New(jwtware.Config{
		SigningKey: []byte(os.Getenv("JWT_SECRET")),
	}))

	// Add a custom middleware to check for the "admin" role
	admin.Use(middleware.CheckAdminRole)

	// Define a route for the admin section
	admin.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Welcome admin!")
	})

	admin.Get("/books", GetAllBooksHandler)
	admin.Get("/book/:id", GetBookByIDHandler)
	admin.Post("/book", CreateBookHandler)
	admin.Put("/book/:id", UpdateBookHandler)
	admin.Delete("/book/:id", DeleteBookHandler)
	admin.Get("/users", GetAllUsersHandler)
	admin.Get("/user/:id", GetUserByIDHandler)
	admin.Get("/book/:id/download", DownloadBookHandler)
	admin.Get("/book/:book_id/reviews", GetBookReviewsHandler)
	admin.Get("/cart", GetAllCartItemsHandler)
	admin.Get("/cart/:user_id", GetUserCartHandler)
	admin.Delete("/cart/:user_id/:book_id", DeleteCartItemHandler)
	admin.Post("/logout", LogoutHandler)
	admin.Get("/role/:id", GetUserRoleHandler)
}
