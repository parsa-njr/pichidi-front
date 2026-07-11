export type UserRole = "user" | "customer";

export interface AuthUser {
    id: string;
    name: string;
    phone: string;
}

export interface AuthResponse {
    success: boolean;
    role: UserRole;
    user: AuthUser;
}