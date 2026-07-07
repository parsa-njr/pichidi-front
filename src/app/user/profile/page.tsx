"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  User, Phone, Lock, LogOut, Camera,
  Loader2, AlertTriangle, CheckCircle2, X,
} from "lucide-react";
import { apiClient } from "@/api/axiosClient";

// ─── Types ───────────────────────────────────────────────────────────────────
interface IProfile { name: string; phone: string; profileImage?: string }

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ msg, type, onClose }: {
  msg: string; type: "success" | "error"; onClose: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-white text-sm font-medium
      ${type === "success" ? "bg-emerald-500" : "bg-red-500"}`}>
      {type === "success"
        ? <CheckCircle2 className="w-4 h-4" />
        : <X className="w-4 h-4" />}
      {msg}
    </div>
  );
}

// ─── Confirm Dialog ───────────────────────────────────────────────────────────
function ConfirmDialog({ open, title, onClose, onConfirm, loading }: {
  open: boolean; title: string; onClose: () => void; onConfirm: () => void; loading: boolean;
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
            className="flex-1 py-3 rounded-xl bg-red-500 text-white text-sm font-medium flex items-center justify-center gap-2">
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            بله، تأیید
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Field Card ───────────────────────────────────────────────────────────────
function FieldCard({ label, icon: Icon, children }: {
  label: string; icon: React.ElementType; children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 mb-3 shadow-sm border border-gray-100">
      <div className="flex items-center justify-end gap-2 mb-3">
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <Icon className="w-4 h-4 text-gray-400" />
      </div>
      {children}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function EmployeeProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<IProfile>({ name: "", phone: "" });
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [showSave, setShowSave] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const showToast = (msg: string, type: "success" | "error") => setToast({ msg, type });

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/api/v1/user/profile");
      const d = res.data?.user;
      setProfile({
        name: d?.name ?? "",
        phone: d?.phone ?? "",
        profileImage: d?.profileImage,
      });
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchProfile(); }, [fetchProfile]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("name", profile.name);
      formData.append("phone", profile.phone);
      if (password) formData.append("password", password);
      await apiClient.put("/api/v1/user/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPassword("");
      showToast("پروفایل با موفقیت ویرایش شد", "success");
    } catch (e: any) {
      showToast(e?.response?.data?.errorDetails ?? "خطایی رخ داد", "error");
    } finally { setSaving(false); setShowSave(false); }
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await apiClient.get("/api/v1/auth/logout");
    } finally {
      setLoggingOut(false);
      setShowLogout(false);
      router.push("/auth/login");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-full">
        <Loader2 className="w-6 h-6 text-primary animate-spin" />
      </div>
    );
  }

  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

  return (
    <div className="flex flex-col min-h-full bg-gray-50">
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className="bg-white px-5 pt-6 pb-4 shadow-sm">
        <p className="text-base font-bold text-gray-800 text-right">پروفایل</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5 pb-24">
        {/* Avatar */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-primary/10 border-4 border-primary/20 overflow-hidden flex items-center justify-center">
              {profile.profileImage ? (
                <img
                  src={profile.profileImage.startsWith("http")
                    ? profile.profileImage
                    : `${baseURL}${profile.profileImage}`}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-10 h-10 text-primary" />
              )}
            </div>
            <label className="absolute bottom-0 left-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center border-2 border-white shadow cursor-pointer">
              <Camera className="w-3.5 h-3.5 text-white" />
              <input type="file" accept="image/*" className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const url = URL.createObjectURL(file);
                  setProfile((p) => ({ ...p, profileImage: url }));
                }}
              />
            </label>
          </div>
          <p className="text-sm font-semibold text-gray-700 mt-3">{profile.name}</p>
          <p className="text-xs text-gray-400 mt-1">روی عکس کلیک کنید تا تغییر دهید</p>
        </div>

        {/* Fields */}
        <FieldCard label="نام" icon={User}>
          <input
            value={profile.name}
            onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
            placeholder="نام خود را وارد کنید"
            dir="rtl"
            className="w-full border-b border-gray-200 pb-2 text-sm text-gray-800 text-right bg-transparent focus:outline-none focus:border-primary transition-colors"
          />
        </FieldCard>

        <FieldCard label="شماره تماس" icon={Phone}>
          <input
            value={profile.phone}
            onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
            placeholder="شماره تماس خود را وارد کنید"
            dir="rtl"
            type="tel"
            className="w-full border-b border-gray-200 pb-2 text-sm text-gray-800 text-right bg-transparent focus:outline-none focus:border-primary transition-colors"
          />
        </FieldCard>

        <FieldCard label="رمز عبور" icon={Lock}>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value.slice(0, 10))}
            placeholder="رمز عبور جدید (اختیاری)"
            dir="rtl"
            type="password"
            maxLength={10}
            className="w-full border-b border-gray-200 pb-2 text-sm text-gray-800 text-right bg-transparent focus:outline-none focus:border-primary transition-colors"
          />
        </FieldCard>

        {/* Save */}
        <button
          onClick={() => setShowSave(true)}
          className="w-full bg-primary text-white py-3.5 rounded-xl font-medium text-sm mb-3 flex items-center justify-center gap-2"
        >
          ذخیره تغییرات
        </button>

        {/* Logout */}
        <button
          onClick={() => setShowLogout(true)}
          className="w-full bg-red-50 text-red-600 py-3.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 border border-red-100"
        >
          <LogOut className="w-4 h-4" />
          خروج از حساب کاربری
        </button>
      </div>

      {/* Save Confirm */}
      <ConfirmDialog
        open={showSave}
        title="آیا مطمئن هستید که می‌خواهید اطلاعات را ذخیره کنید؟"
        onClose={() => setShowSave(false)}
        onConfirm={handleSave}
        loading={saving}
      />

      {/* Logout Confirm */}
      <ConfirmDialog
        open={showLogout}
        title="می‌خواهید از حساب کاربری خارج شوید؟"
        onClose={() => setShowLogout(false)}
        onConfirm={handleLogout}
        loading={loggingOut}
      />
    </div>
  );
}