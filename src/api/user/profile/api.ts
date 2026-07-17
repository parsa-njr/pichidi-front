import { apiClient } from "@/api/axiosClient";

export interface UpdateUserProfilePayload {
    name: string;
    phone: string;
    password?: string;
    profileImage?: File | null;
}

export const userProfileApi = {
    getProfile: () => apiClient.get("/api/v1/user/profile").then((r) => r.data),

    updateProfile: (payload: UpdateUserProfilePayload) => {
        const formData = new FormData();
        formData.append("name", payload.name);
        formData.append("phone", payload.phone);
        if (payload.password) formData.append("password", payload.password);
        if (payload.profileImage) formData.append("profileImage", payload.profileImage);

        return apiClient
            .put("/api/v1/user/profile", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((r) => r.data);
    },
};