"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Plus, X, Loader2, FileText,
  CheckCircle2, XCircle, Clock, ChevronDown,
} from "lucide-react";
import { apiClient } from "@/api/axiosClient";

// ─── Types ───────────────────────────────────────────────────────────────────
type ReqStatus = "pending" | "accepted" | "rejected";
type ReqType = "leave" | "overtime" | "remote" | "mission" | string;

interface IRequest {
  _id: string;
  requestType: ReqType;
  status: ReqStatus;
  startDate: string;
  endDate: string;
  userNote?: string;
  customer_note?: string;
  createdAt: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
const TYPE_LABELS: Record<string, string> = {
  leave: "مرخصی", overtime: "اضافه‌کاری",
  remote: "دورکاری", mission: "ماموریت",
};

const STATUS_MAP = {
  accepted: { label: "پذیرفته شده", color: "text-emerald-600", bg: "bg-emerald-100", Icon: CheckCircle2 },
  rejected: { label: "رد شده", color: "text-red-600", bg: "bg-red-100", Icon: XCircle },
  pending: { label: "در حال بررسی", color: "text-amber-600", bg: "bg-amber-100", Icon: Clock },
};

function toJalali(iso: string) {
  if (!iso) return "—";
  try {
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric", month: "2-digit", day: "2-digit", calendar: "persian",
    }).format(new Date(iso));
  } catch { return iso.slice(0, 10); }
}

function jalaliToISO(jalali: string, time = "00:00"): string {
  // Simple conversion: we use the date input value directly (Gregorian from <input type="date">)
  if (!jalali) return "";
  return `${jalali}T${time}:00Z`;
}

// ─── Shared Modal ─────────────────────────────────────────────────────────────
function Modal({ open, onClose, children, title }: {
  open: boolean; onClose: () => void; children: React.ReactNode; title: string;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-t-3xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5 border-b border-gray-100 pb-4">
          <button onClick={onClose}><X className="w-5 h-5 text-gray-400" /></button>
          <p className="text-base font-semibold text-gray-700">{title}</p>
          <div className="w-5" />
        </div>
        {children}
      </div>
    </div>
  );
}

// ─── Add Request Form ─────────────────────────────────────────────────────────
function AddRequestForm({ onSuccess, onClose }: {
  onSuccess: () => void; onClose: () => void;
}) {
  const [form, setForm] = useState({
    requestType: "", startDate: "", startTime: "08:00",
    endDate: "", endTime: "17:00", note: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    if (!form.requestType || !form.startDate || !form.endDate) {
      setError("نوع درخواست، تاریخ شروع و پایان الزامی است"); return;
    }
    setError(""); setLoading(true);
    try {
      await apiClient.post("/api/v1/user/requests", {
        requestType: form.requestType,
        startDate: jalaliToISO(form.startDate, form.startTime),
        endDate: jalaliToISO(form.endDate, form.endTime),
        userNote: form.note,
      });
      onSuccess();
      onClose();
    } catch (e: any) {
      setError(e?.response?.data?.errorDetails ?? "خطایی رخ داده است");
    } finally { setLoading(false); }
  };

  return (
    <div dir="rtl">
      {/* Request Type */}
      <div className="mb-4">
        <label className="block text-xs text-gray-500 mb-1.5">نوع درخواست</label>
        <div className="relative">
          <select
            value={form.requestType}
            onChange={(e) => set("requestType")(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-right appearance-none focus:outline-none focus:border-primary"
          >
            <option value="" disabled>انتخاب نوع</option>
            {Object.entries(TYPE_LABELS).map(([v, l]) => (
              <option key={v} value={v}>{l}</option>
            ))}
          </select>
          <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Start */}
      <div className="flex gap-3 mb-4">
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1.5">ساعت شروع</label>
          <input type="time" value={form.startTime} onChange={(e) => set("startTime")(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-primary" />
        </div>
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1.5">تاریخ شروع</label>
          <input type="date" value={form.startDate} onChange={(e) => set("startDate")(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-primary" />
        </div>
      </div>

      {/* End */}
      <div className="flex gap-3 mb-4">
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1.5">ساعت پایان</label>
          <input type="time" value={form.endTime} onChange={(e) => set("endTime")(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-primary" />
        </div>
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1.5">تاریخ پایان</label>
          <input type="date" value={form.endDate} onChange={(e) => set("endDate")(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-primary" />
        </div>
      </div>

      {/* Note */}
      <div className="mb-5">
        <label className="block text-xs text-gray-500 mb-1.5">توضیحات (اختیاری)</label>
        <textarea
          value={form.note} onChange={(e) => set("note")(e.target.value)}
          placeholder="توضیحات خود را وارد کنید"
          rows={3}
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-right resize-none focus:outline-none focus:border-primary"
        />
      </div>

      {error && <p className="text-red-500 text-xs text-right mb-3">{error}</p>}

      <button
        onClick={handleSubmit} disabled={loading}
        className="w-full bg-primary text-white py-3.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2"
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        ثبت درخواست
      </button>
    </div>
  );
}

// ─── Detail Sheet ─────────────────────────────────────────────────────────────
function DetailSheet({ req, onClose }: { req: IRequest; onClose: () => void }) {
  const s = STATUS_MAP[req.status] ?? STATUS_MAP.pending;
  return (
    <>
      <div className="flex items-center justify-between mb-5 border-b border-gray-100 pb-4">
        <button onClick={onClose}><X className="w-5 h-5 text-gray-400" /></button>
        <p className="text-base font-semibold text-gray-700">جزئیات درخواست</p>
        <div className="w-5" />
      </div>

      {/* Info */}
      <div className="bg-gray-50 rounded-2xl p-4 mb-4 border border-gray-100" dir="rtl">
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-sm font-semibold text-gray-800">{TYPE_LABELS[req.requestType] ?? req.requestType}</span>
          <span className="text-xs text-gray-400">نوع درخواست</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-sm font-semibold text-gray-800">{toJalali(req.createdAt)}</span>
          <span className="text-xs text-gray-400">تاریخ ثبت</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-sm font-semibold text-gray-800">{toJalali(req.startDate)}</span>
          <span className="text-xs text-gray-400">تاریخ شروع</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-sm font-semibold text-gray-800">{toJalali(req.endDate)}</span>
          <span className="text-xs text-gray-400">تاریخ پایان</span>
        </div>
      </div>

      {/* Status */}
      <div className={`flex items-center justify-between p-4 rounded-2xl border mb-4 ${s.bg}`}>
        <s.Icon className={`w-8 h-8 ${s.color}`} />
        <div className="text-right">
          <p className="text-xs text-gray-400 mb-0.5">وضعیت درخواست</p>
          <p className={`text-base font-semibold ${s.color}`}>{s.label}</p>
        </div>
      </div>

      {/* Rejection note */}
      {req.status === "rejected" && req.customer_note && (
        <div className="bg-white rounded-2xl border-r-4 border-red-500 px-4 py-4" dir="rtl">
          <p className="text-xs text-red-600 font-semibold mb-1">دلیل رد درخواست</p>
          <p className="text-sm text-gray-700">{req.customer_note}</p>
        </div>
      )}
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function EmployeeRequestPage() {
  const [requests, setRequests] = useState<IRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [selected, setSelected] = useState<IRequest | null>(null);

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/api/v1/user/requests");
      setRequests(res.data?.data?.data ?? res.data?.data ?? []);
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchRequests(); }, [fetchRequests]);

  return (
    <div className="flex flex-col min-h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white px-5 pt-6 pb-4 shadow-sm sticky top-0 z-10">
        <p className="text-base font-bold text-gray-800 text-right">درخواست‌های من</p>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-4 py-3 pb-24">
        {loading ? (
          <div className="flex justify-center pt-16">
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
          </div>
        ) : requests.length === 0 ? (
          <div className="flex flex-col items-center pt-20 gap-3">
            <FileText className="w-12 h-12 text-gray-200" />
            <p className="text-gray-400 text-sm">هیچ درخواستی ثبت نشده</p>
          </div>
        ) : (
          requests.map((req) => {
            const s = STATUS_MAP[req.status] ?? STATUS_MAP.pending;
            return (
              <button
                key={req._id}
                onClick={() => setSelected(req)}
                className="w-full bg-white rounded-2xl px-4 py-4 mb-3 shadow-sm border border-gray-100 flex items-center gap-3 text-right"
              >
                <div className={`px-3 py-1 rounded-full ${s.bg} flex-shrink-0`}>
                  <span className={`text-xs font-medium ${s.color}`}>{s.label}</span>
                </div>
                <div className="flex-1 min-w-0 text-right">
                  <p className="text-sm font-semibold text-gray-800">
                    {TYPE_LABELS[req.requestType] ?? req.requestType}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    تاریخ درخواست: {toJalali(req.createdAt)}
                  </p>
                </div>
              </button>
            );
          })
        )}
      </div>

      {/* FAB */}
      <button
        onClick={() => setAddOpen(true)}
        className="fixed bottom-24 left-5 w-14 h-14 bg-primary rounded-full shadow-lg flex items-center justify-center z-30"
      >
        <Plus className="w-6 h-6 text-white" />
      </button>

      {/* Add Modal */}
      <Modal title="درخواست جدید" open={addOpen} onClose={() => setAddOpen(false)}>
        <AddRequestForm onSuccess={fetchRequests} onClose={() => setAddOpen(false)} />
      </Modal>

      {/* Detail Modal */}
      <Modal title="جزئیات" open={!!selected} onClose={() => setSelected(null)}>
        {selected && <DetailSheet req={selected} onClose={() => setSelected(null)} />}
      </Modal>
    </div>
  );
}