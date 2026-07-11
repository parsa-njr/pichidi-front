import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface BackendErrorBody {
    success?: false;
    error?: { name: string; message: string; statusCode: number };
    message?: string;
}

export function getApiErrorMessage(error: unknown): string {
    const err = error as AxiosError<BackendErrorBody>;
    const data = err?.response?.data;
    if (data?.error?.message) return data.error.message;
    if (data?.message) return data.message;
    if (err?.message) return err.message;
    return "خطای غیرمنتظره‌ای رخ داد";
}

export function handleApiError(error: unknown) {
    const message = getApiErrorMessage(error);
    toast.error(message);
    return message;
}