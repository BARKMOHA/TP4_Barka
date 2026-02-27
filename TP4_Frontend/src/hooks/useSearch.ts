import { useEffect, useState } from "react";
import { searchByIngredient } from "../api/recipes";
import { useAuthStore } from "../store/authStore";
import { saveSearch } from "../api/history";


export const useSearch = (ingredient: string | null) => {
  const token = useAuthStore((s) => s.token);

  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!ingredient) return;

    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await searchByIngredient(ingredient);
        setRecipes(data);

        if (token) {
          await saveSearch(ingredient, data.length);
        }
      } catch (err) {
        setError("Failed to fetch recipes");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [ingredient, token]);

  return { recipes, loading, error };
};

//https://www.bezkoder.com/react-custom-hook/