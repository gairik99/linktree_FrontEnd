import axios from "axios";

const API_URL = "https://linktree-backend-w35d.onrender.com/api/v1";

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

export const updateUserProfile = async (userData, token) => {
  const response = await axios.patch(`${API_URL}/user/updateuser`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
