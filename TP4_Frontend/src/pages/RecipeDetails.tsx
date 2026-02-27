import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeDetails } from "../api/recipes";
import { addFavorite, removeFavorite, getFavorites } from "../api/favorites";
import { useAuthStore } from "../store/authStore";

export default function RecipeDetails() {
  const { id } = useParams();
  const token = useAuthStore((s) => s.token);

  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRecipeDetails(id!);
        setRecipe(data);

        if (token) {
          const favs = await getFavorites();
          const found = favs.some((f: any) => f.recipe_id === Number(id));
          setIsFavorite(found);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, token]);

  const toggleFavorite = async () => {
    if (!token) {
      alert("Login required");
      return;
    }

    if (isFavorite) {
      await removeFavorite(Number(id));
      setIsFavorite(false);
    } else {
      await addFavorite(recipe);
      setIsFavorite(true);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!recipe) return <p>Recipe not found</p>;

  return (
    <div>
      <h1>{recipe.title}</h1>

      <img
        src={recipe.image}
        alt={recipe.title}
        style={{ width: "400px" }}
      />

      <button onClick={toggleFavorite}>
        {isFavorite ? "❤️ Remove Favorite" : "🤍 Add Favorite"}
      </button>

      <h2>Ingredients</h2>
      <ul>
        {recipe.extendedIngredients.map((ing: any) => (
          <li key={ing.id}>
            {ing.original}
          </li>
        ))}
      </ul>

      <h2>Instructions</h2>
      <div
        dangerouslySetInnerHTML={{ __html: recipe.instructions }}
      />
    </div>
  );
}