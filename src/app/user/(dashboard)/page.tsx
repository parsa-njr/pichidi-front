"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  CheckCircle2, Clock, LogIn, LogOut, Loader2,
  AlertTriangle, X, MapPin, TrendingUp,
} from "lucide-react";
import { apiClient } from "@/api/axiosClient";

// ─── Confirm Dialog ───────────────────────────────────────────────────────────
function ConfirmDialog({ open, title, confirmText, onClose, onConfirm, loading }: {
  open: boolean; title: string; confirmText: string;
  onClose: () => void; onConfirm: () => void; loading: boolean;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center">
            <AlertTriangle className="w-7 h-7 text-amber-500" />
          </div>
        </div>
        <p className="text-center text-base font-semibold text-gray-800 mb-6">{title}</p>
        <div className="flex gap-3">
          <button onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-600">
            خیر
          </button>
          <button onClick={onConfirm} disabled={loading}
            className="flex-1 py-3 rounded-xl bg-primary text-white text-sm font-medium flex items-center justify-center gap-2">
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ msg, type, onClose }: {
  msg: string; type: "success" | "error"; onClose: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-white text-sm font-medium transition-all
      ${type === "success" ? "bg-emerald-500" : "bg-red-500"}`}>
      {type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <X className="w-4 h-4" />}
      {msg}
    </div>
  );
}

// ─── Pulse Ring ───────────────────────────────────────────────────────────────
function PulseRing({ color }: { color: string }) {
  return (
    <span className={`absolute inset-0 rounded-full animate-ping opacity-20 ${color}`} />
  );
}

// ─── Check Button ─────────────────────────────────────────────────────────────
function CheckButton({
  isCheckedIn, loading, onClick,
}: {
  isCheckedIn: boolean; loading: boolean; onClick: () => void;
}) {
  return (
    <div className="relative w-44 h-44 flex items-center justify-center">
      {/* Outer pulse */}
      {isCheckedIn && (
        <span className="absolute inset-0 rounded-full animate-ping opacity-10 bg-emerald-500" />
      )}
      {/* Ring */}
      <div className={`absolute inset-0 rounded-full border-4 ${isCheckedIn ? "border-emerald-400" : "border-primary/30"
        }`} />
      {/* Button */}
      <button
        onClick={onClick}
        disabled={loading}
        className={`relative w-36 h-36 rounded-full flex flex-col items-center justify-center gap-2 shadow-lg transition-all active:scale-95
          ${isCheckedIn
            ? "bg-gradient-to-br from-red-400 to-red-500 shadow-red-200"
            : "bg-gradient-to-br from-emerald-400 to-emerald-500 shadow-emerald-200"
          }`}
      >
        {loading ? (
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        ) : isCheckedIn ? (
          <>
            <LogOut className="w-7 h-7 text-white" />
            <span className="text-white text-sm font-bold">خروج</span>
          </>
        ) : (
          <>
            <LogIn className="w-7 h-7 text-white" />
            <span className="text-white text-sm font-bold">ورود</span>
          </>
        )}
      </button>
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <div className="flex-1 bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col items-center">
      <p className={`text-2xl font-bold mb-1 ${color}`}>{value}</p>
      <p className="text-xs text-gray-400 text-center">{label}</p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function EmployeeDashboardPage() {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationError, setLocationError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showCheckOut, setShowCheckOut] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const showToast = (msg: string, type: "success" | "error") => setToast({ msg, type });

  // Get location on mount
  useEffect(() => {
    if (!navigator.geolocation) { setLocationError(true); return; }
    navigator.geolocation.getCurrentPosition(
      (pos) => setLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
      () => setLocationError(true)
    );
  }, []);

  // Today's date
  const today = new Intl.DateTimeFormat("fa-IR", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  }).format(new Date());

  const handleCheckIn = async () => {
    if (!location) { showToast("موقعیت مکانی در دسترس نیست", "error"); return; }
    setLoading(true);
    try {
      const res = await apiClient.post("/api/v1/user/checkIn", {
        lat: location.latitude, lng: location.longitude,
      });
      setIsCheckedIn(true);
      setCheckInTime(new Date().toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" }));
      showToast(res.data?.message ?? "ورود ثبت شد", "success");
    } catch (e: any) {
      showToast(e?.response?.data?.errorDetails ?? "خطا در ثبت ورود", "error");
    } finally { setLoading(false); setShowCheckIn(false); }
  };

  const handleCheckOut = async () => {
    if (!location) { showToast("موقعیت مکانی در دسترس نیست", "error"); return; }
    setLoading(true);
    try {
      const res = await apiClient.post("/api/v1/user/checkOut", {
        lat: location.latitude, lng: location.longitude,
      });
      setIsCheckedIn(false);
      setCheckInTime(null);
      showToast(res.data?.message ?? "خروج ثبت شد", "success");
    } catch (e: any) {
      showToast(e?.response?.data?.errorDetails ?? "خطا در ثبت خروج", "error");
    } finally { setLoading(false); setShowCheckOut(false); }
  };

  return (
    <div className="flex flex-col min-h-full bg-gray-50">
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className="bg-white px-5 pt-6 pb-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-bold text-sm">ک</span>
          </div>
          <div className="text-right">
            <p className="text-base font-bold text-gray-800">صبح بخیر 👋</p>
            <p className="text-xs text-gray-400 mt-0.5">{today}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5 pb-24 space-y-4">
        {/* Status + Button Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center">
          {/* Status Badge */}
          <div className={`w-full flex items-center justify-end gap-2 p-3 rounded-xl mb-6 ${isCheckedIn ? "bg-emerald-50" : "bg-amber-50"
            }`}>
            {isCheckedIn ? (
              <>
                <span className="text-emerald-700 text-sm font-medium">حضور شما ثبت شده است</span>
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </>
            ) : (
              <>
                <span className="text-amber-700 text-sm font-medium">در انتظار ثبت حضور</span>
                <Clock className="w-5 h-5 text-amber-500" />
              </>
            )}
          </div>

          {/* Big Button */}
          <CheckButton
            isCheckedIn={isCheckedIn}
            loading={loading}
            onClick={() => isCheckedIn ? setShowCheckOut(true) : setShowCheckIn(true)}
          />

          {/* Check-in time */}
          {isCheckedIn && checkInTime && (
            <div className="mt-5 w-full bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 flex items-center justify-end gap-2">
              <span className="text-blue-800 text-sm">
                زمان ورود: <span className="font-bold">{checkInTime}</span>
              </span>
              <Clock className="w-4 h-4 text-blue-600" />
            </div>
          )}

          {/* Location warning */}
          {locationError && (
            <div className="mt-3 w-full bg-red-50 border border-red-100 rounded-xl px-4 py-3 flex items-center justify-end gap-2">
              <span className="text-red-700 text-xs">دسترسی به موقعیت مکانی امکان‌پذیر نیست</span>
              <MapPin className="w-4 h-4 text-red-500" />
            </div>
          )}
        </div>

        {/* Quote Card */}
        <div className="bg-gradient-to-l from-primary to-primary/80 rounded-2xl p-5 text-white">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 opacity-70 flex-shrink-0 mt-0.5" />
            <div className="text-right">
              <p className="text-sm font-bold mb-1">انگیزه روزانه 💬</p>
              <p className="text-xs opacity-90 leading-6">
                موفقیت مجموع تلاش‌های کوچک است که هر روز تکرار می‌شود.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div>
          <p className="text-sm font-semibold text-gray-700 text-right mb-3">خلاصه ماه جاری</p>
          <div className="flex gap-3">
            <StatCard value={20} label="روزهای حاضر" color="text-emerald-500" />
            <StatCard value={2} label="روزهای غایب" color="text-red-500" />
            <StatCard value={1} label="روزهای با تاخیر" color="text-amber-500" />
          </div>
        </div>
      </div>

      {/* Confirm Dialogs */}
      <ConfirmDialog
        open={showCheckIn}
        title="می‌خواهید ورود خود را ثبت کنید؟"
        confirmText="بله، ثبت کن"
        onClose={() => setShowCheckIn(false)}
        onConfirm={handleCheckIn}
        loading={loading}
      />
      <ConfirmDialog
        open={showCheckOut}
        title="می‌خواهید خروج خود را ثبت کنید؟"
        confirmText="بله، ثبت کن"
        onClose={() => setShowCheckOut(false)}
        onConfirm={handleCheckOut}
        loading={loading}
      />
    </div>
  );
}