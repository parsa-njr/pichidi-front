"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, CheckCircle2, XCircle, FileText } from "lucide-react";
import { useMe } from "@/api/auth/queries";
import {
    useCustomerNotifications,
    useMarkCustomerNotificationRead,
    useMarkAllCustomerNotificationsRead,
} from "@/api/customer/notification/queries";
import {
    useUserNotifications,
    useMarkUserNotificationRead,
    useMarkAllUserNotificationsRead,
} from "@/api/user/notification/queries";

function toJalali(iso: string) {
    try {
        return new Intl.DateTimeFormat("fa-IR", {
            month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit",
            calendar: "persian",
        }).format(new Date(iso));
    } catch { return ""; }
}

const ICONS: Record<string, { Icon: any; color: string }> = {
    request_created: { Icon: FileText, color: "text-blue-500" },
    request_accepted: { Icon: CheckCircle2, color: "text-emerald-500" },
    request_rejected: { Icon: XCircle, color: "text-red-500" },
};

export default function NotificationBell() {
    const { data: me } = useMe();
    const isCustomer = me?.role === "customer";

    // const customerQuery = useCustomerNotifications();
    // const userQuery = useUserNotifications();
    const customerQuery = useCustomerNotifications(!!me && isCustomer);
    const userQuery = useUserNotifications(!!me && !isCustomer);
    const { items = [], unreadCount = 0 } = isCustomer ? customerQuery.data ?? {} : userQuery.data ?? {};

    const markCustomerRead = useMarkCustomerNotificationRead();
    const markUserRead = useMarkUserNotificationRead();
    const markAllCustomerRead = useMarkAllCustomerNotificationsRead();
    const markAllUserRead = useMarkAllUserNotificationsRead();

    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", onClick);
        return () => document.removeEventListener("mousedown", onClick);
    }, []);

    const handleItemClick = (id: string) => {
        if (isCustomer) markCustomerRead.mutate(id);
        else markUserRead.mutate(id);
    };

    const handleMarkAll = () => {
        if (isCustomer) markAllCustomerRead.mutate();
        else markAllUserRead.mutate();
    };

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen((v) => !v)}
                className="relative w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20"
            >
                <Bell className="w-4 h-4 text-primary-foreground" />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">
                        {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                )}
            </button>

            <div
                dir="rtl"
                className={`absolute left-0 top-[calc(100%+10px)] w-72 bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden origin-top-left transition-all duration-150 z-50 ${open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
                    }`}
            >
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50">
                    <p className="text-sm font-semibold text-gray-800">اعلان‌ها</p>
                    {/* <button onClick={handleMarkAll} className="text-xs text-primary font-medium">
                        علامت‌گذاری همه به‌عنوان خوانده‌شده
                    </button> */}
                </div>

                <div className="max-h-80 overflow-y-auto">
                    {items.length === 0 ? (
                        <p className="text-center text-xs text-gray-400 py-8">اعلانی وجود ندارد</p>
                    ) : (
                        items.map((n: any) => {
                            const cfg = ICONS[n.type] ?? ICONS.request_created;
                            return (
                                <button
                                    key={n._id}
                                    onClick={() => handleItemClick(n._id)}
                                    className={`w-full flex items-start gap-2.5 px-4 py-3 text-right border-b border-gray-50 last:border-0 hover:bg-gray-50 ${!n.isRead ? "bg-primary/5" : ""
                                        }`}
                                >
                                    <cfg.Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${cfg.color}`} />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-semibold text-gray-800">{n.title}</p>
                                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{n.message}</p>
                                        <p className="text-[10px] text-gray-400 mt-1">{toJalali(n.createdAt)}</p>
                                    </div>
                                    {!n.isRead && <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1" />}
                                </button>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}