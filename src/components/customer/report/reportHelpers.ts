export function toJalali(iso: string) {
    if (!iso) return "—";
    try {
        return new Intl.DateTimeFormat("fa-IR", {
            year: "numeric", month: "2-digit", day: "2-digit", calendar: "persian",
        }).format(new Date(iso));
    } catch { return iso.slice(0, 10); }
}

export interface IDayReport {
    date: string;
    users: IUserDayReport[];
}

export interface IUserDayReport {
    id: string;
    name: string;
    status: string;
    report: {
        status: string;
        actualCheckIn?: string;
        actualCheckOut?: string;
        actualMinutes?: string;
        leaveMinutes?: string;
    };
}

export interface IUserListItem {
    _id: string;
    name: string;
    phone: string;
}

export interface IUserReport {
    totalReport: { totalActualTime: string; totalDelay: string; totalLeaveTime: string };
    finalReport: {
        date: string;
        shamsiDate?: string;
        actualCheckIn?: string;
        actualCheckOut?: string;
        actualMinutes?: string;
        delayMinutes?: string;
        leaveMinutes?: string;
        status: string;
    }[];
}