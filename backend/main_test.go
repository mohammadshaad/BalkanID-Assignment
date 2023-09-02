// main_test.go
package main

import (
	"errors"
	"testing"
)

// User represents a user in the system.
type User struct {
	Username string
	Password string
}

// AuthenticateUser authenticates a user based on their username and password.
func AuthenticateUser(username, password string) (*User, error) {
	// In a real application, you would query a database here.
	// For this example, we'll just hardcode a user.
	if username == "user1" && password == "password1" {
		return &User{Username: username, Password: password}, nil
	}
	return nil, errors.New("authentication failed")
}

func TestAuthenticateUser_Success(t *testing.T) {
	username := "user1"
	password := "password1"

	user, err := AuthenticateUser(username, password)

	if err != nil {
		t.Errorf("Expected no error, but got: %v", err)
	}

	if user == nil {
		t.Error("Expected a user object, but got nil")
	}

	if user.Username != username {
		t.Errorf("Expected user's username to be %s, but got %s", username, user.Username)
	}

	if user.Password != password {
		t.Errorf("Expected user's password to be %s, but got %s", password, user.Password)
	}
}

func TestAuthenticateUser_Failure(t *testing.T) {
	username := "user2"
	password := "invalidpassword"

	user, err := AuthenticateUser(username, password)

	if err == nil {
		t.Error("Expected an error, but got nil")
	}

	if user != nil {
		t.Errorf("Expected no user object, but got %+v", user)
	}
}
