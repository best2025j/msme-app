// composables/useAxios.ts
import axios from "axios";

export const api = axios.create({
  baseURL: "https://msme-api.example.com", // ← replace with actual base URL
  headers: {
    "Content-Type": "application/json",
  },
});
