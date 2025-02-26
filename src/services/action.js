import axios from "axios";

// const API_URL = "https://linktree-backend-w35d.onrender.com/api/v1";
const API_URL = import.meta.env.VITE_URL;

// console.log(URL);
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

export const createLink = async (linkData, token) => {
  const response = await axios.post(`${API_URL}/link/createlink`, linkData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
export const getLink = async (token) => {
  const response = await axios.get(`${API_URL}/link/getlinks`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const updateLink = async (token, linkId, updateData) => {
  const response = await axios.patch(
    `${API_URL}/link/updatelink/${linkId}`,
    updateData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
export const deleteLink = async (token, linkId) => {
  const response = await axios.delete(`${API_URL}/link/deletelink/${linkId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
