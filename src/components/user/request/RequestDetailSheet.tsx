import DetailRow from "@/components/shared/feedback/DetailRow";
import { IRequest } from "@/api/user/request/api";
import { REQUEST_TYPE_LABELS, REQUEST_STATUS_MAP } from "@/components/shared/request/RequestLabel";
import { toJalali } from "@/utils/toJalali";
// import { toJalali } from "@/components/shared/utils/toJalali";

interface RequestDetailSheetProps {
    req: IRequest;
}

export default function RequestDetailSheet({ req }: RequestDetailSheetProps) {
    const s = REQUEST_STATUS_MAP[req.status] ?? REQUEST_STATUS_MAP.pending;

    return (
        <div dir="rtl">
            <div className="bg-gray-50 rounded-2xl p-4 mb-4 border border-gray-100">
                <DetailRow label="نوع درخواست" value={REQUEST_TYPE_LABELS[req.requestType] ?? req.requestType} />
                <DetailRow label="تاریخ ثبت" value={toJalali(req.createdAt)} />
                <DetailRow label="تاریخ شروع" value={toJalali(req.startDate)} />
                <DetailRow label="تاریخ پایان" value={toJalali(req.endDate)} />
            </div>

            <div className={`flex items-center justify-between p-4 rounded-2xl border mb-4 ${s.bg}`}>
                <div className="text-right">
                    <p className="text-xs text-gray-400 mb-0.5">وضعیت درخواست</p>
                    <p className={`text-base font-semibold ${s.color}`}>{s.label}</p>
                </div>
                <s.Icon className={`w-8 h-8 ${s.color}`} />
            </div>

            {req.status === "rejected" && req.customerNote && (
                <div className="bg-white rounded-2xl border-r-4 border-red-500 px-4 py-4">
                    <p className="text-xs text-red-600 font-semibold mb-1">دلیل رد درخواست</p>
                    <p className="text-sm text-gray-700">{req.customerNote}</p>
                </div>
            )}
        </div>
    );
}