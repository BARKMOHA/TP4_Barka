import { useLocation, Link } from "react-router-dom";
import { useSearch } from "../hooks/useSearch";

export default function Search() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const ingredient = params.get("ingredient");

  const { recipes, loading, error } = useSearch(ingredient);

  return (
    <div>
      <h2>Results for: {ingredient}</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {recipes.length === 0 && !loading && <p>No results found.</p>}

      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <Link to={`/recipe/${recipe.id}`}>
              <h3>{recipe.title}</h3>
            </Link>
            <img
              src={recipe.image}
              alt={recipe.title}
              className="recipe-img"
            />
          </div>
        ))}
      </div>
    </div>
  );
}