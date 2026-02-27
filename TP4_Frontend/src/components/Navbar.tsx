import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import "../styles/Navbar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!searchTerm.trim()) return;
  
    navigate(`/search?ingredient=${searchTerm.trim()}`);
    setSearchTerm("");
  };
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/history">History</Link>
      </div>
        <form onSubmit={handleSearch} className="search-form">
        <input
            type="text"
            placeholder="Search ingredient..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
        />

        <button type="submit" className="search-button">
          Search
        </button>
        </form>
      <div className="nav-right">
        {user ? (
          <>
            <button onClick={handleLogout} className="nav-button">
            Logout
            </button>          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>

  );
}