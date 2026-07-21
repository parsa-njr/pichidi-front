import { CheckCircle2, XCircle, Clock, LucideIcon } from "lucide-react";

export const REQUEST_TYPE_LABELS: Record<string, string> = {
    leave: "مرخصی",
    overtime: "اضافه‌کاری",
};

export interface RequestStatusMeta {
    label: string;
    color: string;
    bg: string;
    Icon: LucideIcon;
}

export const REQUEST_STATUS_MAP: Record<string, RequestStatusMeta> = {
    accepted: { label: "پذیرفته شده", color: "text-emerald-600", bg: "bg-emerald-100", Icon: CheckCircle2 },
    rejected: { label: "رد شده", color: "text-red-600", bg: "bg-red-100", Icon: XCircle },
    pending: { label: "در حال بررسی", color: "text-amber-600", bg: "bg-amber-100", Icon: Clock },
};