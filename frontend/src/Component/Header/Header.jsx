import React from 'react'
import { useNavigate } from 'react-router-dom'
import { User, LogOut } from 'lucide-react'
import './header.css'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from "../../Context/AuthProvider";

export default function Header() {
    const navigate = useNavigate()
    const [authUser, setAuthUser, role, token] = useAuth();
    const handleSignOut = async () => {
      try {
        const response = await axios.get('/api/v1/user/logout');
        setAuthUser("")
        localStorage.removeItem('MockApp')
        toast.success(response.data.message || 'User logged out successfully!');
        navigate('/'); 
      } catch (error) {
        console.error('Logout error:', error);
        toast.error(error.response?.data?.message || 'An error occurred during logout.');
      }
    };

    return (
        <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
py-4 flex justify-between items-center">
                {/* Logo and Heading beside each other */}
                <div className="flex items-center space-x-2">
                    <img src="path_to_your_logo.png" alt="Logo"
className="h-8 w-auto" />
                    <h1 className="text-2xl font-bold
text-gray-900">Dashboard</h1>
                </div>

                {/* Buttons on the right side */}
                <div className="flex items-center space-x-4">
                    <button className="profile-button">
                        <User className="w-5 h-5 mr-1" />
                        Profile
                    </button>
                    <button onClick={handleSignOut} className="signout-button">
                        <LogOut className="w-5 h-5 mr-1" />
                        Sign Out
                    </button>
                </div>
            </div>
        </header>
    )
}
