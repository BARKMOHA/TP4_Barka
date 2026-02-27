import { useEffect, useState } from "react";
import { getRandomRecipes } from "../api/recipes";
import { getFavorites, addFavorite, removeFavorite } from "../api/favorites";
import { useAuthStore } from "../store/authStore";
import "../styles/Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = useAuthStore((s) => s.token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recipesData = await getRandomRecipes();
        setRecipes(recipesData);

        if (token) {
          const favs = await getFavorites();
          setFavorites(favs.map((f: any) => f.recipe_id));
        }
      } catch (err) {
        setError("Failed to load recipes");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const toggleFavorite = async (recipe: any) => {
    if (!token) {
      alert("Please login to add favorites");
      return;
    }

    try {
      if (favorites.includes(recipe.id)) {
        await removeFavorite(recipe.id);
        setFavorites(favorites.filter((id) => id !== recipe.id));
      } else {
        await addFavorite(recipe);
        setFavorites([...favorites, recipe.id]);
      }
    } catch (err) {
      alert("Error updating favorites");
    }
  };

  if (loading) return <p>Loading recipes...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="home-container">
    <h1>Random Recipes</h1>

    <div className="recipe-grid">
        {recipes.map((recipe) => (
        <div key={recipe.id} className="recipe-card">
            <Link to={`/recipe/${recipe.id}`}>
            <h3>{recipe.title}</h3>
            </Link>

            <Link to={`/recipe/${recipe.id}`}>
            <img
                src={recipe.image}
                alt={recipe.title}
                className="recipe-img"
            />
            </Link>

            <button
            className="favorite-btn"
            onClick={() => toggleFavorite(recipe)}
            >
            {favorites.includes(recipe.id)
                ? "❤️ Remove"
                : "🤍 Add Favorite"}
            </button>
        </div>
        ))}
    </div>
    </div>
  );
}