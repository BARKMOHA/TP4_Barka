import api from "./axios";

export const getFavorites = async () => {
  const res = await api.get("/favorites");
  return res.data;
};

export const addFavorite = async (recipe: any) => {
  return api.post("/favorites", {
    recipe_id: recipe.id,
    title: recipe.title,
    image: recipe.image
  });
};

export const removeFavorite = async (recipeId: number) => {
  return api.delete(`/favorites/${recipeId}`);
};