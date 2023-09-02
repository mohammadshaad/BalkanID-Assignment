package database

import (
	"fmt"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var db *gorm.DB

func InitDatabase() (*gorm.DB, error) {
	// Define the database connection string using environment variables
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")

	// Define the database connection string
	ConnStr := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=disable TimeZone=Asia/Shanghai",
		dbHost, dbPort, dbUser, dbPassword, dbName,
	)

	// Open the database connection
	var err error
	db, err = gorm.Open(postgres.Open(ConnStr), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	return db, nil
}

func GetDB() *gorm.DB {
	return db
}

func CloseDB() {
	db, _ := db.DB()
	db.Close()
}

func AutoMigrateModels(db *gorm.DB) {

	db.AutoMigrate(&User{})
	db.AutoMigrate(&Book{})
	db.AutoMigrate(&CartItem{})
	db.AutoMigrate(&Review{})
}
