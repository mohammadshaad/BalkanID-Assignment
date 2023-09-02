package database

import (
	"gorm.io/gorm"
)

// UserRole represents the role of a user
type UserRole string

const (
	UserRoleAdmin    UserRole = "admin"
	UserRoleStandard UserRole = "user"
)

type User struct {
	gorm.Model
	UserID    uint     `json:"id"`
	FirstName string   `json:"firstname"`
	LastName  string   `json:"lastname"`
	Email     string   `json:"email"`
	Password  []byte   `json:"-"`
	Role      UserRole `json:"role"`
}

type Book struct {
	ID            uint    `json:"id"`
	Title         string  `json:"title"`
	Author        string  `json:"author"`
	ISBN          string  `json:"isbn"`
	Genre         string  `json:"genre"`
	Price         float64 `json:"price"`
	Quantity      int     `json:"quantity"`
	Description   string  `json:"description"`
	Image         string  `json:"image"`
	Path          string  `json:"path"`
	AverageRating float64 `json:"average_rating"`
}

// Define a struct to represent a cart item
type CartItem struct {
    gorm.Model
    UserID   uint    `json:"user_id"`
    BookID   uint    `json:"book_id"`
    Subtotal float64 `json:"subtotal"` // Change the data type to float64
    Quantity uint    `json:"quantity"`
}

type Review struct {
	gorm.Model
	BookID    uint   `json:"book_id"`
	UserID    uint   `json:"user_id"`
	Rating    int    `json:"rating"`
	Comment   string `json:"comment"`
}
