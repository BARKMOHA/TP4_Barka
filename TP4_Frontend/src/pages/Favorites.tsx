import { useEffect, useState } from "react";
import { getFavorites, removeFavorite } from "../api/favorites";
import { Link } from "react-router-dom";
import "../styles/Favorites.css";

export default function Favorites() {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await getFavorites();
        setFavorites(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemove = async (recipeId: number) => {
    await removeFavorite(recipeId);
    setFavorites(favorites.filter((f) => f.recipe_id !== recipeId));
  };

  if (loading) return <p>Loading favorites...</p>;

  if (favorites.length === 0)
    return <p>No favorites yet.</p>;

  return (
    <div className="favorites-container">
      <h1>Your Favorites</h1>

      <div className="favorites-grid">
        {favorites.map((fav) => (
          <div key={fav.id} className="favorite-card">
            <Link to={`/recipe/${fav.recipe_id}`}>
              <img
                src={fav.image}
                alt={fav.title}
                className="favorite-img"
              />
            </Link>

            <h3>{fav.title}</h3>

            <button onClick={() => handleRemove(fav.recipe_id)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}