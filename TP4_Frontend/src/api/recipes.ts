import axios from "axios";

const API_KEY = "16007e6241114939a959d0c28d5a51b3";

const recipeApi = axios.create({
  baseURL: "https://api.spoonacular.com"
});

export const getRandomRecipes = async () => {
  const res = await recipeApi.get(
    `/recipes/random?number=10&apiKey=${API_KEY}`
  );
  
  return res.data.recipes;
};
export const getRecipeDetails = async (id: string) => {
  const res = await recipeApi.get(
    `/recipes/${id}/information?apiKey=${API_KEY}`
  );
  return res.data;
};
export const searchByIngredient = async (ingredient: string) => {
  const res = await recipeApi.get(
    `/recipes/findByIngredients?ingredients=${ingredient}&number=10&apiKey=${API_KEY}`
  );
  return res.data;
};