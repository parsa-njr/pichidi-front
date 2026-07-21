import { Loader2 } from "lucide-react";
import MonthStatCard from "./MonthStatCard";

interface MonthStatsProps {
    loading: boolean;
    presentDays: number;
    absentDays: number;
    lateDays: number;
    totalHours: string;
}

export default function MonthStats({ loading, presentDays, absentDays, lateDays, totalHours }: MonthStatsProps) {
    return (
        <div>
            <p className="text-sm font-semibold text-gray-700 text-right mb-3">خلاصه ماه جاری</p>
            {loading ? (
                <div className="flex justify-center py-6"><Loader2 className="w-5 h-5 text-primary animate-spin" /></div>
            ) : (
                <>
                    <div className="flex gap-3 mb-3">
                        <MonthStatCard value={presentDays} label="روزهای حاضر" color="text-emerald-500" delay={0} />
                        <MonthStatCard value={absentDays} label="روزهای غایب" color="text-red-500" delay={80} />
                        <MonthStatCard value={lateDays} label="روزهای با تاخیر" color="text-amber-500" delay={160} />
                    </div>
                    <div
                        className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between animate-in fade-in-0 slide-in-from-bottom-2"
                        style={{ animationDelay: "240ms", animationFillMode: "backwards" }}
                    >
                        <p className="text-sm text-gray-500">مجموع ساعات کاری این ماه</p>
                        <p className="text-lg font-bold text-primary">{totalHours}</p>
                    </div>
                </>
            )}
        </div>
    );
}