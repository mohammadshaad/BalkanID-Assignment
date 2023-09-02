import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Components
import DashboardHome from './DashboardHome';
import UsersPage from './UsersPage';
import ProductsPage from './ProductsPage';

const AdminDashboard = () => {
    return (
        <Router>
            <div className="admin-dashboard">
                {/* Sidebar Navigation */}
                <div className="sidebar">
                    <h2>Admin Dashboard</h2>
                    <ul>
                        <li>
                            <Link to="/admin">Dashboard Home</Link>
                        </li>
                        <li>
                            <Link to="/admin/users">Users</Link>
                        </li>
                        <li>
                            <Link to="/admin/products">Products</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </Router>
    );
};

export default AdminDashboard;
