import { User } from "lucide-react";
import { IRequest } from "@/api/customer/request/api";
// import { REQUEST_TYPE_LABELS, REQUEST_STATUS_MAP } from "@/components/shared/request/requestLabels";
// import { toJalali } from "@/components/shared/utils/toJalali";
import { REQUEST_TYPE_LABELS, REQUEST_STATUS_MAP } from "@/components/shared/request/RequestLabel";
import { toJalali } from "@/utils/toJalali";

interface RequestCardProps {
    req: IRequest;
    onClick: () => void;
}

export default function RequestCard({ req, onClick }: RequestCardProps) {
    const s = REQUEST_STATUS_MAP[req.status] ?? REQUEST_STATUS_MAP.pending;

    return (
        <button
            dir="rtl"
            onClick={onClick}
            className="w-full bg-white rounded-2xl px-4 py-4 mb-3 shadow-sm border border-gray-100 flex items-center gap-3 text-right"
        >

            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0 text-right">
                <p className="text-sm font-semibold text-gray-800">
                    {req.user?.name ?? "—"}{" "}
                    <span className="text-gray-500 font-normal">
                        · {REQUEST_TYPE_LABELS[req.requestType] ?? req.requestType}
                    </span>
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                    تاریخ درخواست: {toJalali(req.createdAt)}
                </p>
            </div>
            <div className={`px-3 py-1 rounded-full ${s.bg} flex-shrink-0`}>
                <span className={`text-xs font-medium ${s.color}`}>{s.label}</span>
            </div>
        </button>
    );
}