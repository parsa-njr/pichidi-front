"use client";

import { useRouter } from "next/navigation";
import { MapPin, Clock, ClipboardList } from "lucide-react";

interface QuickLinkProps {
    icon: React.ElementType;
    label: string;
    value: number;
    onClick: () => void;
}

function QuickLink({ icon: Icon, label, value, onClick }: QuickLinkProps) {
    return (
        <button
            onClick={onClick}
            className="flex-1 bg-white rounded-2xl p-3.5 border border-gray-100 flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
        >
            <Icon className="w-4.5 h-4.5 text-primary" />
            <p className="text-base font-bold text-gray-800">{value}</p>
            <p className="text-[10px] text-gray-400 text-center leading-tight">{label}</p>
        </button>
    );
}

interface QuickLinksProps {
    locationsCount: number;
    shiftsCount: number;
    pendingRequests: number;
}

export default function QuickLinks({ locationsCount, shiftsCount, pendingRequests }: QuickLinksProps) {
    const router = useRouter();

    return (
        <div
            className="flex gap-3 animate-in fade-in-0 slide-in-from-bottom-2 duration-500"
            style={{ animationDelay: "280ms", animationFillMode: "backwards" }}
        >
            <QuickLink icon={MapPin} label="موقعیت‌ها" value={locationsCount} onClick={() => router.push("/customer/location")} />
            <QuickLink icon={Clock} label="شیفت‌ها" value={shiftsCount} onClick={() => router.push("/customer/shift")} />
            <QuickLink icon={ClipboardList} label="درخواست‌ها" value={pendingRequests} onClick={() => router.push("/customer/request")} />
        </div>
    );
}