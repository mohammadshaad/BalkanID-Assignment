package middleware

import (
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"github.com/mohammadshaad/golang-book-store-backend/database"
)

// checkJWTValidity middleware checks if the JWT is valid
func CheckJWTValidity(c *fiber.Ctx) error {
	token := c.Locals("user").(*jwt.Token)
	if token == nil || !token.Valid {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Login first",
		})
	}
	return c.Next()
}

// checkAdminRole middleware checks if the user has the "admin" role
func CheckAdminRole(c *fiber.Ctx) error {
	// Get the user ID from the JWT payload
	userID := c.Locals("user").(*jwt.Token).Claims.(jwt.MapClaims)["user_id"].(float64)

	// Find the user in the database
	var user database.User
	if err := database.GetDB().First(&user, uint(userID)).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "User not found",
		})
	}

	// Check if the user is an admin
	if user.Role != database.UserRoleAdmin {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Unauthorized",
		})
	}

	return c.Next()
}
