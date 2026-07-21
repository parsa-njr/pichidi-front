"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, UserCheck, AlertCircle } from "lucide-react";

interface NotCheckedInCardProps {
    count: number;
    names: string;
}

export default function NotCheckedInCard({ count, names }: NotCheckedInCardProps) {
    const router = useRouter();

    return (
        <div className="px-4 -mt-10 relative z-10 animate-in fade-in-0 slide-in-from-bottom-3 duration-500" style={{ animationDelay: "80ms", animationFillMode: "backwards" }}>
            <button
                onClick={() => router.push("/customer/staff")}
                className="w-full bg-white rounded-3xl p-5 shadow-lg shadow-black/5 border border-gray-100 flex items-center justify-between text-right active:scale-[0.98] transition-transform"
            >
                

                {count === 0 ? (
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                            <UserCheck className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-bold text-gray-800">همه حاضرند ✅</p>
                            <p className="text-xs text-gray-400 mt-0.5">هیچ کارمندی غایب نیست</p>
                        </div>
                      
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <p className="text-sm font-bold text-gray-800">{count} نفر هنوز ورود نزده‌اند</p>
                            <p className="text-xs text-gray-400 mt-0.5 truncate max-w-[180px]">{names || "—"}</p>
                        </div>
                        <div className="w-11 h-11 rounded-2xl bg-red-50 flex items-center justify-center flex-shrink-0">
                            <AlertCircle className="w-5 h-5 text-red-500" />
                        </div>
                    </div>
                )}
                <ChevronLeft className="w-4 h-4 text-gray-300 flex-shrink-0" />
            </button>
        </div>
    );
}