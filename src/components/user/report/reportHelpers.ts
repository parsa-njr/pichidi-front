import { getCurrentJalali } from "@/utils/getCurrentJalali";

export interface IDayReport {
    date: string;
    shamsiDate?: string;
    actualCheckIn?: string;
    actualCheckOut?: string;
    actualMinutes?: string;
    leaveMinutes?: string;
    overtimeMinutes?: string;
    delayMinutes?: string;
    deficitMinutes?: string;
    status: string;
}

export interface ITotalReport {
    totalActualTime: string;
    totalLeaveTime: string;
    totalOvertime: string;
    totalDelay: string;
    totalDeficit: string;
    statusCount: Record<string, number>;
}

export const STATUS_LABEL: Record<string, { label: string; color: string; bg: string }> = {
    fullPresent: { label: "حاضر", color: "text-emerald-600", bg: "bg-emerald-50" },
    delay: { label: "با تاخیر", color: "text-amber-600", bg: "bg-amber-50" },
    deficit: { label: "کسری", color: "text-orange-600", bg: "bg-orange-50" },
    absent: { label: "غایب", color: "text-red-600", bg: "bg-red-50" },
    leave: { label: "مرخصی", color: "text-blue-600", bg: "bg-blue-50" },
    shiftOffDay: { label: "تعطیل", color: "text-gray-500", bg: "bg-gray-100" },
    invalidShiftDay: { label: "بدون شیفت", color: "text-gray-400", bg: "bg-gray-50" },
};

export function toJalali(iso: string) {
    if (!iso) return "—";
    try {
        return new Intl.DateTimeFormat("fa-IR", {
            year: "numeric", month: "2-digit", day: "2-digit", calendar: "persian",
        }).format(new Date(iso));
    } catch { return iso.slice(0, 10); }
}

export const MONTHS = [
    { label: "فروردین", value: "01" }, { label: "اردیبهشت", value: "02" },
    { label: "خرداد", value: "03" }, { label: "تیر", value: "04" },
    { label: "مرداد", value: "05" }, { label: "شهریور", value: "06" },
    { label: "مهر", value: "07" }, { label: "آبان", value: "08" },
    { label: "آذر", value: "09" }, { label: "دی", value: "10" },
    { label: "بهمن", value: "11" }, { label: "اسفند", value: "12" },
];

const CURRENT_JALALI = getCurrentJalali();
export const YEARS = Array.from({ length: 5 }, (_, i) => {
    const y = parseInt(CURRENT_JALALI.year || "1403") - i;
    return { label: String(y), value: String(y) };
});

export const DEFAULT_YEAR = YEARS[0]?.value ?? "";