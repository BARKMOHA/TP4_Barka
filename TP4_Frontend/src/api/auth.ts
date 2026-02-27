import api from "./axios";

export const registerUser = async (data: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}) => {
  const res = await api.post("/register", data);
  return res.data;
};