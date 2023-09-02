// Routes.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import UserHome from './components/UserHome';
import LandingPage from './components/LandingPage';
import Book from './components/Book';
import ProfileInfo from './components/Profile';
import Cart from './components/Cart';
import DashboardHome from './components/DashboardHome';
import UsersPage from './components/UsersPage';
import ProductsPage from './components/ProductsPage';
import BooksPage from './components/BooksPage';

function OurRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<UserHome />} />
      <Route path="/book/:id" element={<Book />} />
      <Route path="/profile/:id" element={<ProfileInfo />} />
      <Route path="/admin" exact element={<DashboardHome />} />
      <Route path="/admin/users" element={<UsersPage />} />
      <Route path="/admin/books" element={<BooksPage />} />
      <Route path="/admin/products" element={<ProductsPage />} />

      <Route path="/cart" element={<Cart />} />
      <Route path="*" element={<h1 className='h-screen text-3xl w-full text-center font-bold text-primary '>Not Found</h1>} />

    </Routes>
  );
}

export default OurRoutes;
