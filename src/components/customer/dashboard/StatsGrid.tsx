import { UserCheck, UserX, Clock, UserPlus } from "lucide-react";
import StatTile from "./StatTile";

interface StatsGridProps {
    present: number;
    absent: number;
    delayed: number;
    stillWorking: number;
    attendanceRate: number;
    totalStaff: number;
}

export default function StatsGrid({ present, absent, delayed, stillWorking, attendanceRate, totalStaff }: StatsGridProps) {
    return (
        <>
            <div className="grid grid-cols-2 gap-3">
                <StatTile label="کارمندان حاضر" value={present} icon={UserCheck} tone="emerald" delay={0} />
                <StatTile label="کارمندان غایب" value={absent} icon={UserX} tone="red" delay={60} />
                <StatTile label="ورود با تاخیر" value={delayed} icon={Clock} tone="amber" delay={120} />
                <StatTile label="در حال کار (بدون خروج)" value={stillWorking} icon={UserPlus} tone="blue" delay={180} />
            </div>

            <div
                className="flex items-center justify-between bg-white rounded-2xl px-4 py-3 border border-gray-100 animate-in fade-in-0 slide-in-from-bottom-2 duration-500"
                style={{ animationDelay: "200ms", animationFillMode: "backwards" }}
            >
                <p className="text-xs text-gray-400">نرخ حضور از مجموع {totalStaff} کارمند</p>
                <p className="text-sm font-bold text-gray-700">{attendanceRate}٪</p>
            </div>
        </>
    );
}