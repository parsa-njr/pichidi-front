import { IRequest } from "@/api/user/request/api";
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
            <div className="flex-1 min-w-0 text-right">
                <p className="text-sm font-semibold text-gray-800">
                    {REQUEST_TYPE_LABELS[req.requestType] ?? req.requestType}
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