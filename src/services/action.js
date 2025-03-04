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

export const getUserWithLinks = async (userId) => {
  const response = await axios.get(`${API_URL}/user/userwithlinks/${userId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const createClick = async (linkData, linkId) => {
  const data = {
    user: linkData.id,
    domain: linkData.domain,
    category: linkData.category,
  };

  const url = linkId
    ? `${API_URL}/click/createclick/${linkId}`
    : `${API_URL}/click/createclick`;

  const response = await axios.post(url, data);
  return response.data;
};
export const getLinkWithClicks = async (token) => {
  const response = await axios.get(`${API_URL}/link/getlinkwithclicks`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const getClickByCategory = async (token) => {
  const response = await axios.get(`${API_URL}/click/getclickbycategory`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const getClickByMonth = async (token) => {
  const response = await axios.get(`${API_URL}/click/getclickbymonth`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const getClickByOs = async (token) => {
  const response = await axios.get(`${API_URL}/click/getclickbyos`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const getClickByDomain = async (token) => {
  const response = await axios.get(`${API_URL}/click/getclickbydomain`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
export const getTopLink = async (token) => {
  const response = await axios.get(`${API_URL}/link//gettoplink`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const sendVerificationCode = async (email) => {
  const response = await axios.post(`${API_URL}/forgotpassword`, { email });
  return response.data;
};

// Submit code and reset password
export const resetPassword = async (email, code, newPassword) => {
  const response = await axios.post(`${API_URL}/resetpassword`, {
    email,
    code,
    newPassword,
  });
  return response.data;
};
