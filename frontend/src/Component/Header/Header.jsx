"use client"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { User, LogOut, Menu } from "lucide-react"
import "./Header.css"
import toast, { Toaster } from "react-hot-toast"
import axios from "axios"
import { useAuth } from "../../Context/AuthProvider"
import logo from "../../assets/gif.gif"

export default function Header() {
  const navigate = useNavigate()
  const [authUser, setAuthUser, role, token] = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleprofileclick = () => {
    navigate("/userprofile")
  }
  const handleSignOut = async () => {
    try {
      const response = await axios.get("/api/v1/user/logout")
      setAuthUser("")
      localStorage.removeItem("MockApp")
      toast.success(response.data.message || "User logged out successfully!")
      navigate("/")
    } catch (error) {
      console.error("Logout error:", error)
      toast.error(error.response?.data?.message || "An error occurred during logout.")
    }
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <header className="enhanced-page-header">
      <div className="enhanced-page-header-content">
        <div className="enhanced-page-logo">
          <img src={logo || "/placeholder.svg"} alt="Logo" className="enhanced-page-logo-image" />
        </div>

        <div className="hamburger-menu-icon" onClick={toggleMenu}>
          <Menu />
        </div>

        <div className={`enhanced-page-header-buttons ${menuOpen ? "show-buttons" : ""}`}>
          <button onClick={handleprofileclick} className="enhanced-page-profile-button">
            <User className="enhanced-page-icon" />
            <span className="button-text">Profile</span>
          </button>
          <button onClick={handleSignOut} className="enhanced-page-signout-button">
            <LogOut className="enhanced-page-icon" />
            <span className="button-text">Sign Out</span>
          </button>
        </div>
      </div>
      <Toaster position="top-right" />
    </header>
  )
}
