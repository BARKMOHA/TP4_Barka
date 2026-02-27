import {  Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Favorites from "../pages/Favorites";
import Search from "../pages/Search";
import ProtectedRoute from "./ProtectedRoute";
import RecipeDetails from "../pages/RecipeDetails";
import History from "../pages/History";
export default function AppRouter() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
        <Route path="/search" element={<Search />} />
        <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>}/>
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
  );
}
