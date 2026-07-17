import axios from "axios";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // backend uses httpOnly cookies, not Bearer tokens
  headers: { "Content-Type": "application/json" },
});

let isRefreshing = false;
let queue: Array<() => void> = [];

apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    const status = error?.response?.status;
    const isAuthRoute = original?.url?.includes("/auth/");

    if (status === 401 && original && !original._retry && !isAuthRoute) {
      original._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          await apiClient.post("/api/v1/auth/refresh");
          queue.forEach((cb) => cb());
          queue = [];
          return apiClient(original);
        } catch (err) {
          queue = [];
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise((resolve) => {
        queue.push(() => resolve(apiClient(original)));
      });
    }

    return Promise.reject(error);
  }
);