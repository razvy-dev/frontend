import axios from "axios";

export const serverClient = axios.create({
  baseURL: process.env.BACKEND_URL || "http://localhost:8000",
  timeout: 10000, // Disconnect automatically if Python takes over 10 seconds
  headers: {
    "Content-Type": "application/json",
    "X-Internal-Secret": process.env.NEXT_INTERNAL_SECRET || "",
  }
});