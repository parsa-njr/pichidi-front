"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, RefreshCw } from "lucide-react";

interface RequestItem {
    _id: string;
    requestType: "overtime" | "leave" | string;
    status: "pending" | "accepted" | "rejected";
    createdAt: string;
    user?: { name: string };
}

function RequestRow({ req }: { req: RequestItem }) {
    const typeLabel = req.requestType === "overtime" ? "اضافه‌کاری" : req.requestType === "leave" ? "مرخصی" : req.requestType;
    return (
        <div className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0">
            <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0">
                در انتظار
            </span>
            <div className="flex-1 text-right min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                    {req.user?.name ?? "—"}{" "}
                    <span className="text-gray-400 font-normal">· {typeLabel}</span>
                </p>
            </div>
        </div>
    );
}

interface PendingRequestsCardProps {
    requests: RequestItem[];
    loading: boolean;
}

export default function PendingRequestsCard({ requests, loading }: PendingRequestsCardProps) {
    const router = useRouter();

    return (
        <div
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-in fade-in-0 slide-in-from-bottom-2 duration-500"
            style={{ animationDelay: "400ms", animationFillMode: "backwards" }}
        >
            <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-gray-50">
                <p className="text-sm font-bold text-gray-700">آخرین درخواست‌ها</p>
                <button
                    onClick={() => router.push("/customer/request")}
                    className="flex items-center gap-1 text-xs text-primary font-medium"
                >
                    همه
                    <ChevronLeft className="w-3.5 h-3.5" />
                </button>
            </div>

            <div className="px-5">
                {loading ? (
                    <div className="py-8 flex justify-center">
                        <RefreshCw className="w-5 h-5 text-gray-300 animate-spin" />
                    </div>
                ) : requests.length === 0 ? (
                    <p className="text-center text-sm text-gray-400 py-8">درخواست در انتظاری وجود ندارد</p>
                ) : (
                    requests.slice(0, 4).map((req) => <RequestRow key={req._id} req={req} />)
                )}
            </div>

            <div className="px-5 pb-4 pt-2">
                <button
                    onClick={() => router.push("/customer/request")}
                    className="w-full bg-primary text-white text-sm font-medium py-3 rounded-xl active:scale-[0.98] transition-transform"
                >
                    مشاهده همه درخواست‌ها
                </button>
            </div>
        </div>
    );
}