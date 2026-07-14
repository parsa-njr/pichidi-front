export type UserRole = "user" | "customer";

export interface AuthUser {
    id: string;
    name: string;
    phone: string;
    profileImage?: string | null;
}

export interface AuthResponse {
    success: boolean;
    role: UserRole;
    user: AuthUser;
}