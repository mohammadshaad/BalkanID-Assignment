# Balkan ID Internship Project Documentation

## Video Demo (Click on the image below to watch the video)
[![Watch the video](https://pbs.twimg.com/media/F5ByhUsWEAAlf17?format=jpg&name=4096x4096)](https://drive.google.com/file/d/1TgnFMK-t4rgOHxZ_IyHYaY7Q8FiAZG12/view?usp=sharing)

## Introduction
Welcome to the documentation for the Bookstore Application, submitted as part of my application for the Balkan ID internship. This document provides a comprehensive overview of the application, its features, and how to set it up and use it.


- **frontend**

Contains the frontend code for the BookStore web application. Built using React.js, the frontend is responsible for the user interface and client-side logic.

- **backend** 

Contains the Golang backend code for the BookStore web application. Built using Node.js and Express.js, the backend is responsible for the server-side logic and database management.


## Setup

```bash
git clone <repo_url>
cd <folder_name>
docker-compose up
```


## Backend Documentation

## Table of Contents
- [Project Overview](#project-overview)
- [Security Considerations](#security-considerations)
- [APIs Used](#apis-used)
- [Getting Started](#getting-started)
- [Application Structure](#application-structure)
- [Configuration](#configuration)
- [Features](#features)
- [Testing](#testing)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Conclusion](#conclusion)

### Project Overview
The Bookstore Application is a web-based platform that allows users to browse, purchase, and manage books. It offers user registration and authentication, book management, and shopping cart functionality.

### Technologies Used
- Go (Golang)
- Fiber (Web framework)
- PostgreSQL (Database)
- GORM (Object-Relational Mapping)
- JSON Web Tokens (JWT) for authentication
- React.js (Frontend)

## Security Considerations

### Environment Variables
- **Securing Sensitive Information**: I highly recommend using environment variables for safeguarding sensitive data like database credentials and JWT secrets. However, it's essential to ensure that my application gracefully handles cases where these variables are missing or contain incorrect values. I've also implemented error handling for `os.Getenv` calls to enhance robustness.

### Validation
- **Enhancing User Experience**: I've adopted the validator library to validate input data, which is a commendable practice for maintaining data integrity. To enhance the user experience, I'm considering providing more specific error messages to clients, pinpointing which field failed validation. This will assist users in correcting their inputs more easily.

### Password Hashing
- **Prioritizing Security**: The security of user passwords is of paramount importance. I've implemented the correct practice of hashing passwords using bcrypt before storing them in the database, which is a robust security measure.

### JWT (JSON Web Tokens)
- **Ensuring Secure Authentication**: I've employed JWT-based user authentication, a widely accepted and secure approach. I take measures to keep my JWT secret confidential and consider token refresh mechanisms for longer user sessions.

### Database Operations
- **Well-implemented Database Operations**: My database operations, such as creating, updating, and deleting records, are well-implemented and robust.

### Error Handling
- **User-Friendly Errors**: I take pride in my error-handling approach within my application's handlers. I ensure that appropriate HTTP status codes and meaningful error messages are returned to clients. This practice significantly enhances the user experience and aids developers in efficiently debugging issues.

### Middleware
- **Enhancing Security**: I use middleware to check JWT validity and user roles, adding an extra layer of security and authorization to my application.

### User ID Generation
- **Considering Alternatives**: While I currently generate random user IDs, I'm open to exploring more reliable methods such as auto-incremented database IDs or UUIDs to ensure uniqueness and scalability.

### Logging
- **Improving Debugging and Monitoring**: I'm considering implementing structured logging within my application. Structured logs are invaluable for debugging and monitoring, as they make it easier to trace and diagnose issues.

### Testing
- **Comprehensive Testing**: I'm committed to thorough testing of my application, covering not only standard use cases but also error scenarios, edge cases, and security aspects. Automated testing plays a pivotal role in achieving this.

### Comments and Documentation
- **Enhancing Code Clarity**: While my code structure is sound, I acknowledge the value of adding comments or documentation to clarify the purpose of each function and route. This practice is especially valuable for the benefit of future developers who may work on my code.

### JWT Expiration
- **Customization to Your Needs**: My JWT expiration is currently set to 24 hours. Depending on your specific use case, you may want to adjust this value to align with your application's requirements.

### File Uploads
- **Secure Handling**: If fields like "Image" and "Path" in the Book struct represent uploaded files, I understand the importance of implementing secure file upload handling in my application. This encompasses secure management of file storage and serving, ensuring the safety of user-uploaded content.

# APIs Used
## User Registration

- **Endpoint:** `/register`
- **Method:** `POST`
- **Description:** Allows a user to register by providing their first name, last name, email, password, and role.

## User Login

- **Endpoint:** `/login`
- **Method:** `POST`
- **Description:** Allows a user to log in by providing their email and password.

## User Profile

- **Endpoint:** `/user/profile/:id`
- **Method:** `GET`
- **Description:** Retrieves the user's profile information by their ID.

## Update User Profile

- **Endpoint:** `/user/profile/:id`
- **Method:** `PUT`
- **Description:** Allows the user to update their profile information.

## Deactivate User Account

- **Endpoint:** `/user/deactivate/:id`
- **Method:** `PUT`
- **Description:** Deactivates the user's account.

## Activate User Account

- **Endpoint:** `/user/activate/:id`
- **Method:** `PUT`
- **Description:** Activates the user's account.

## Delete User Account

- **Endpoint:** `/user/delete/:id`
- **Method:** `DELETE`
- **Description:** Deletes the user's account.

## Logout

- **Endpoint:** `/user/logout`
- **Method:** `POST`
- **Description:** Logs the user out of their account.

## Get All Books

- **Endpoint:** `/user/books`
- **Method:** `GET`
- **Description:** Retrieves a list of all available books.

## Get Book by ID

- **Endpoint:** `/user/book/:id`
- **Method:** `GET`
- **Description:** Retrieves a specific book by its ID.

## Add to Cart

- **Endpoint:** `/user/cart`
- **Method:** `POST`
- **Description:** Adds a book to the user's cart.

## Get Cart

- **Endpoint:** `/user/cart`
- **Method:** `GET`
- **Description:** Retrieves the user's cart.

## Remove from Cart

- **Endpoint:** `/user/cart/:book_id`
- **Method:** `DELETE`
- **Description:** Removes a book from the user's cart by book ID.

## Update Cart Item Quantity

- **Endpoint:** `/user/cart/:book_id`
- **Method:** `PUT`
- **Description:** Updates the quantity of a book in the user's cart.

## Add Review for a Book

- **Endpoint:** `/user/book/:book_id/reviews`
- **Method:** `POST`
- **Description:** Allows the user to add a review for a specific book.

## Get Reviews for a Book

- **Endpoint:** `/user/book/:book_id/reviews`
- **Method:** `GET`
- **Description:** Retrieves all reviews for a specific book.

## Download Book

- **Endpoint:** `/user/book/:id/download`
- **Method:** `GET`
- **Description:** Allows the user to download a specific book.

## Get User Role

- **Endpoint:** `/user/role/:id`
- **Method:** `GET`
- **Description:** Retrieves the role of a specific user.

## Admin Home

- **Endpoint:** `/admin`
- **Method:** `GET`
- **Description:** Welcome message for admin.

## Get All Books (Admin)

- **Endpoint:** `/admin/books`
- **Method:** `GET`
- **Description:** Retrieves a list of all available books from the admin perspective.

## Get Book by ID (Admin)

- **Endpoint:** `/admin/book/:id`
- **Method:** `GET`
- **Description:** Retrieves a specific book by its ID from the admin perspective.

## Create Book

- **Endpoint:** `/admin/book`
- **Method:** `POST`
- **Description:** Allows an admin to create a new book.

## Update Book

- **Endpoint:** `/admin/book/:id`
- **Method:** `PUT`
- **Description:** Allows an admin to update the details of a book.

## Delete Book

- **Endpoint:** `/admin/book/:id`
- **Method:** `DELETE`
- **Description:** Allows an admin to delete a book by its ID.

## Get All Users (Admin)

- **Endpoint:** `/admin/users`
- **Method:** `GET`
- **Description:** Retrieves a list of all registered users from the admin perspective.

## Get User by ID (Admin)

- **Endpoint:** `/admin/user/:id`
- **Method:** `GET`
- **Description:** Retrieves a specific user's information by their ID from the admin perspective.

## Get Reviews for a Book (Admin)

- **Endpoint:** `/admin/book/:book_id/reviews`
- **Method:** `GET`
- **Description:** Retrieves all reviews for a specific book from the admin perspective.

## Get All Cart Items (Admin)

- **Endpoint:** `/admin/cart`
- **Method:** `GET`
- **Description:** Retrieves all cart items for all users from the admin perspective.

## Get User's Cart (Admin)

- **Endpoint:** `/admin/cart/:user_id`
- **Method:** `GET`
- **Description:** Retrieves a specific user's cart items by their user ID from the admin perspective.

## Delete Cart Item (Admin)

- **Endpoint:** `/admin/cart/:user_id/:book_id`
- **Method:** `DELETE`
- **Description:** Allows an admin to delete a cart item for a specific user by user ID and book ID.

## Logout (Admin)

- **Endpoint:** `/admin/logout`
- **Method:** `POST`
- **Description:** Logs the admin out.

## Get User Role (Admin)

- **Endpoint:** `/admin/role/:id`
- **Method:** `GET`
- **Description:** Retrieves the role of a specific user from the admin perspective.


## Getting Started
To run and test the application, please follow these steps:

### Prerequisites
Before you begin, ensure you have the following installed:

- Go programming language
- PostgreSQL database
- Required Go packages (dependencies managed via Go modules)

### Installation
1. Clone the repository: `git clone https://github.com/mohammadshaad/golang-book-store-backend.git`
2. Navigate to the project directory: `cd bookstore`
3. Create a `.env` file and configure the necessary environment variables (see [Configuration](#configuration) section).
4. Run database migrations: `go run main.go migrate`
5. Start the application: `go run main.go`

## Application Structure
The project is organized as follows:

```bash
my-golang-book-store/
│
├── database/
│   ├── database.go
│   └── models.go
│
├── middleware/
│   ├── middleware.go
│
├── routes/
│   ├── routes.go
│   └── handlers.go
│
├── main.go
├── go.mod
├── go.sum
├── README.md
├── .env.example
└── main_test.go
```

## Configuration
The application reads configuration settings from environment variables. Here are the key variables to configure:

- `DB_HOST`: PostgreSQL database host address.
- `DB_PORT`: PostgreSQL database port.
- `DB_NAME`: PostgreSQL database name.
- `DB_USER`: PostgreSQL database username.
- `DB_PASSWORD`: PostgreSQL database password.
- `JWT_SECRET`: Secret key for JWT token generation.

Example `.env` file:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=book-store
DB_USER=postgres
DB_PASSWORD=<your_database_password>
JWT_SECRET=secret
```

## Features

### User Authentication
- **User Registration:** Users can create new accounts by providing their email and password.
- **User Login:** Registered users can log in to access their account.

### Book Management
- **Book Listing:** Users can view a list of available books.
- **Book Details:** Users can view detailed information about a specific book.
- **Book Search:** Users can search for books by title or author.
- **Book Addition:** Admin users can add new books to the catalog.
- **Book Modification:** Admin users can update book details.
- **Book Deletion:** Admin users can remove books from the catalog.

### Shopping Cart
- **Cart Management:** Users can add books to their shopping cart, view the cart, remove items, and update quantities.
- **Checkout:** Users can proceed to checkout, where they can review their order and complete the purchase.

### Admin Features
- **Admin Access:** Certain routes and features are accessible only to admin users.
- **User Management:** Admin users can manage user accounts, including user activation, deactivation, and deletion.
- **Book Management:** Admin users can manage the catalog of books, including adding, modifying, and deleting entries.

## Testing
To run tests, use the following command:

```shell
go test ./...
```

## Deployment
For production deployment, follow these steps:

1. Set up a production-ready PostgreSQL database.
2. Configure the environment variables for the production environment.
3. Build the application: `go build -o bookstore-app main.go`
4. Deploy the binary to your production server.
5. Set up a reverse proxy (e.g., Nginx) to serve the application.

## Troubleshooting
If you encounter any issues or have questions, please contact Mohammad Shaad at callshaad@gmail.com.


## Frontend Documentation

## Features

- **User Authentication:** A robust authentication system allows users to register and securely log in.
- **User Profiles:** Each user has a personalized profile for managing personal information.
- **Shopping Cart:** Users can add, view, and manage books in their shopping cart.
- **Admin Dashboard:** Administrators have access to a dedicated dashboard for book management.
- **Role-Based Access Control:** The application incorporates role-based access control, differentiating between users and administrators.
- **Responsive Design:** The user interface is responsive, ensuring a seamless experience on both desktop and mobile devices.

## Installation

To get started, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/bookstore-web-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd <folder_name>
   ```

3. Install the necessary dependencies:

   ```bash
   npm install
   ```

## Usage

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Open your web browser and visit [http://localhost:5173](http://localhost:5173) to access the BookStore web application also start the backend server:

   ```bash
   go run main.go
   ```

   which will run on [http://localhost:8080](http://localhost:8080)

3. Register or log in to your account.

4. Explore the application, add books to your cart, and manage your profile.

5. If you have administrator privileges, you can access the admin dashboard to manage books.


## Conclusion
Thank you for considering my application. I hope you find this Bookstore Application and its documentation useful. Please feel free to reach out if you have any further questions or require additional information.

Sincerely,

Mohammad Shaad
