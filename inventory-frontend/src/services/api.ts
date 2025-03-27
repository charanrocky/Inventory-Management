import axios from "axios";

const API_URL = "http://localhost:5000"; // Change to your backend URL

// Set Auth Token

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No auth token found");
  return { headers: { Authorization: `Bearer ${token}` } };
};

// Register User
export const registerUser = (userData: {
  name: string;
  email: string;
  password: string;
}) => axios.post(`${API_URL}/auth/register`, userData);

// Login User
export const loginUser = (credentials: { email: string; password: string }) =>
  axios.post(`${API_URL}/auth/login`, credentials);

// Add Inventory Item
export const getInventory = async () => {
  try {
    return await axios.get(`${API_URL}/inventory`, getAuthHeaders());
  } catch (error) {
    console.error("Error fetching inventory:", error);
    throw error;
  }
};

export const addInventory = async (item: {
  name: string;
  quantity: number;
  category: string;
  price: number;
}) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found in localStorage");
    throw new Error("Unauthorized: No token found");
  }

  try {
    const response = await axios.post(`${API_URL}/inventory`, item, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data; // Return only necessary data
  } catch (error: any) {
    console.error(
      "Error adding inventory item:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to add inventory item"
    );
  }
};

// Update Inventory Item
export const updateInventory = async (
  id: string,
  updatedItem: {
    name: string;
    quantity: number;
    category: string;
    price: number;
  }
) => {
  try {
    return await axios.put(
      `${API_URL}/inventory/${id}`,
      updatedItem,
      getAuthHeaders()
    );
  } catch (error) {
    console.error("Error updating inventory item:", error);
    throw error;
  }
};

// Delete Inventory Item
export const deleteInventory = async (id: string) => {
  try {
    return await axios.delete(`${API_URL}/inventory/${id}`, getAuthHeaders());
  } catch (error) {
    console.error("Error deleting inventory item:", error);
    throw error;
  }
};
