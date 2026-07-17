import { apiClient } from "@/api/axiosClient";
import { AuthResponse } from "@/types/auth";

export const authApi = {
    signUp: (payload: { name: string; phone: string; password: string }) =>
        apiClient.post<AuthResponse>("/api/v1/auth/sign-up", payload).then((r) => r.data),

    login: (payload: { phone: string; password: string }) =>
        apiClient.post<AuthResponse>("/api/v1/auth/login", payload).then((r) => r.data),

    sendOtp: (payload: { phone: string }) =>
        apiClient
            .post<{ success: boolean; message: string; otp?: string }>("/api/v1/auth/send-otp", payload)
            .then((r) => r.data),

    verifyOtp: (payload: { phone: string; code: string }) =>
        apiClient.post<AuthResponse>("/api/v1/auth/verify-otp", payload).then((r) => r.data),

    logout: () => apiClient.post("/api/v1/auth/logout").then((r) => r.data),

    getMe: () => apiClient.get<AuthResponse>("/api/v1/auth/me").then((r) => r.data),
};