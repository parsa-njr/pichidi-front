import { apiClient } from "@/api/axiosClient";

export interface UpdateCustomerProfilePayload {
    name: string;
    phone: string;
    password?: string;
    profileImage?: File | null;
}

export const customerProfileApi = {
    getProfile: () => apiClient.get("/api/v1/customer/profile").then((r) => r.data),

    updateProfile: (payload: UpdateCustomerProfilePayload) => {
        const formData = new FormData();
        formData.append("name", payload.name);
        formData.append("phone", payload.phone);
        if (payload.password) formData.append("password", payload.password);
        if (payload.profileImage) formData.append("profileImage", payload.profileImage);

        return apiClient
            .put("/api/v1/customer/profile", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((r) => r.data);
    },
};