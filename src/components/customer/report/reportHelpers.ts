// src/components/customer/report/reportHelpers.ts
export function toJalali(iso: string) {
    if (!iso) return "—";
    try {
        return new Intl.DateTimeFormat("fa-IR", {
            year: "numeric", month: "2-digit", day: "2-digit", calendar: "persian",
        }).format(new Date(iso));
    } catch { return iso.slice(0, 10); }
}

// ترجمه‌ی فارسیِ وضعیت‌های حضور و غیاب (مطابق چیزی که در calculateDetailedAttendanceReport ساخته می‌شود)
export const STATUS_LABEL: Record<string, { label: string; color: string; bg: string }> = {
    fullPresent: { label: "حاضر", color: "text-emerald-600", bg: "bg-emerald-50" },
    delay: { label: "با تاخیر", color: "text-amber-600", bg: "bg-amber-50" },
    deficit: { label: "کسری", color: "text-orange-600", bg: "bg-orange-50" },
    absent: { label: "غایب", color: "text-red-600", bg: "bg-red-50" },
    leave: { label: "مرخصی", color: "text-blue-600", bg: "bg-blue-50" },
    incompleteEntryExit: { label: "ورود/خروج ناقص", color: "text-purple-600", bg: "bg-purple-50" },
    shiftOffDay: { label: "تعطیل", color: "text-gray-500", bg: "bg-gray-100" },
    invalidShiftDay: { label: "بدون شیفت", color: "text-gray-400", bg: "bg-gray-50" },
};

export interface IDayReport {
    date: string;
    users: IUserDayReport[];
}

export interface IUserDayReport {
    // ⚠️ این فیلد از بک‌اند به اسم "userId" می‌آید نه "id"
    userId: string;
    name: string;
    status?: string;
    report: {
        status: string;
        actualCheckIn?: string;
        actualCheckOut?: string;
        actualMinutes?: string;
        leaveMinutes?: string;
        extraTimeRequestMinutes?: string;
        overtimeMinutes?: string;
        delayMinutes?: string;
        deficitMinutes?: string;
    };
}

export interface IUserListItem {
    _id: string;
    name: string;
    phone: string;
}

export interface IUserReport {
    totalReport: {
        totalActualTime: string;
        totalDelay: string;
        totalLeaveTime: string;
        totalOvertime?: string;
        totalDeficit?: string;
    };
    finalReport: {
        date: string;
        shamsiDate?: string;
        actualCheckIn?: string;
        actualCheckOut?: string;
        actualMinutes?: string;
        delayMinutes?: string;
        leaveMinutes?: string;
        overtimeMinutes?: string;
        deficitMinutes?: string;
        status: string;
    }[];
}