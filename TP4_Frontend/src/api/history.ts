import api from "./axios";

export const saveSearch = async (ingredient: string, resultsCount: number) => {
  return api.post("/history", {
    ingredient,
    results_count: resultsCount
  });
};

export const getHistory = async () => {
  const res = await api.get("/history");
  return res.data;
};