# BookStore Web Application

## Introduction

The BookStore web application is a comprehensive platform designed to meet the needs of modern online bookstores. It encompasses a range of features catering to both customers and administrators. This README provides an overview of the project, including its features, prerequisites, installation instructions, and usage guidelines.

## Structure

- ***frontend**
Contains the frontend code for the BookStore web application. Built using React.js, the frontend is responsible for the user interface and client-side logic.

- ***backend** 
Contains the Golang backend code for the BookStore web application. Built using Node.js and Express.js, the backend is responsible for the server-side logic and database management.


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


## Contact

For any further inquiries or assistance, please reach out to Mohammad Shaad at [callshaad@gmail.com].

Thank you for considering our BookStore web application. We hope you find it a valuable addition to your book-selling platform.