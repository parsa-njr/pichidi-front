"use client";

import { useState } from "react";
import { User, Loader2 } from "lucide-react";
import DetailRow from "@/components/shared/feedback/DetailRow";
import { IRequest } from "@/api/customer/request/api";
import { REQUEST_TYPE_LABELS, REQUEST_STATUS_MAP } from "@/components/shared/request/RequestLabel";
import { toJalali } from "@/utils/toJalali";
// import { toJalali } from "@/components/shared/utils/toJalali";

interface RequestDetailSheetProps {
    req: IRequest;
    onAccept: () => void;
    onReject: (note: string) => void;
    acting: boolean;
}

export default function RequestDetailSheet({ req, onAccept, onReject, acting }: RequestDetailSheetProps) {
    const s = REQUEST_STATUS_MAP[req.status] ?? REQUEST_STATUS_MAP.pending;
    const [rejectNote, setRejectNote] = useState("");
    const [showRejectForm, setShowRejectForm] = useState(false);

    return (
        <div dir="rtl">
            <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-4 mb-4 border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-primary" />
                </div>
                <div className="text-right flex-1">
                    <p className="text-sm font-semibold text-gray-800">{req.user?.name ?? "—"}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{req.user?.phone ?? "—"}</p>
                </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4 mb-4 border border-gray-100">
                <DetailRow label="نوع درخواست" value={REQUEST_TYPE_LABELS[req.requestType] ?? req.requestType} />
                <DetailRow label="تاریخ ثبت" value={toJalali(req.createdAt)} />
                <DetailRow label="تاریخ شروع" value={toJalali(req.startDate)} />
                <DetailRow label="تاریخ پایان" value={toJalali(req.endDate)} />
            </div>

            {req.userNote && (
                <div className="bg-blue-50 border border-blue-100 rounded-2xl px-4 py-3 mb-4">
                    <p className="text-xs text-blue-600 font-semibold mb-1">توضیحات کارمند</p>
                    <p className="text-sm text-gray-700">{req.userNote}</p>
                </div>
            )}

            <div className={`flex items-center justify-between p-4 rounded-2xl border mb-4 ${s.bg}`}>
                <div className="text-right">
                    <p className="text-xs text-gray-400 mb-0.5">وضعیت درخواست</p>
                    <p className={`text-base font-semibold ${s.color}`}>{s.label}</p>
                </div>
                <s.Icon className={`w-8 h-8 ${s.color}`} />
            </div>

            {req.status === "rejected" && req.customerNote && (
                <div className="bg-white rounded-2xl border-r-4 border-red-500 px-4 py-4 mb-4">
                    <p className="text-xs text-red-600 font-semibold mb-1">دلیل رد درخواست</p>
                    <p className="text-sm text-gray-700">{req.customerNote}</p>
                </div>
            )}

            {req.status === "pending" && (
                <>
                    {!showRejectForm ? (
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowRejectForm(true)}
                                disabled={acting}
                                className="flex-1 py-3.5 rounded-xl border border-red-200 text-red-500 text-sm font-medium"
                            >
                                رد درخواست
                            </button>
                            <button
                                onClick={onAccept}
                                disabled={acting}
                                className="flex-1 py-3.5 rounded-xl bg-primary text-white text-sm font-medium flex items-center justify-center gap-2"
                            >
                                {acting && <Loader2 className="w-4 h-4 animate-spin" />}
                                پذیرفتن
                            </button>
                        </div>
                    ) : (
                        <div dir="rtl">
                            <label className="block text-xs text-gray-500 text-right mb-1.5">دلیل رد درخواست</label>
                            <textarea
                                value={rejectNote}
                                onChange={(e) => setRejectNote(e.target.value)}
                                placeholder="توضیح دهید چرا این درخواست رد می‌شود"
                                rows={3}
                                dir="rtl"
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-right resize-none focus:outline-none focus:border-primary mb-4"
                            />
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowRejectForm(false)}
                                    disabled={acting}
                                    className="flex-1 py-3.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium"
                                >
                                    انصراف
                                </button>
                                <button
                                    onClick={() => onReject(rejectNote)}
                                    disabled={acting}
                                    className="flex-1 py-3.5 rounded-xl bg-red-500 text-white text-sm font-medium flex items-center justify-center gap-2"
                                >
                                    {acting && <Loader2 className="w-4 h-4 animate-spin" />}
                                    تایید رد درخواست
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}