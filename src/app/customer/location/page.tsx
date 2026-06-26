"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Search, Plus, MoreVertical, Pencil, Trash2,
  MapPin, X, AlertTriangle, Loader2, ChevronDown,
} from "lucide-react";
import { apiClient } from "@/api/axiosClient";

interface ILocation {
  _id: string;
  name: string;
  latitude: number;
  longitude: number;
  range: number;
}

function Modal({ title, open, onClose, children }: {
  title: string; open: boolean; onClose: () => void; children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto">
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

function ConfirmDialog({ open, onClose, onConfirm, loading }: {
  open: boolean; onClose: () => void; onConfirm: () => void; loading: boolean;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
            <AlertTriangle className="w-7 h-7 text-red-500" />
          </div>
        </div>
        <p className="text-center text-base font-semibold text-gray-800 mb-6">
          می‌خواهید این موقعیت را حذف کنید؟
        </p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-600">خیر</button>
          <button onClick={onConfirm} disabled={loading} className="flex-1 py-3 rounded-xl bg-red-500 text-white text-sm font-medium flex items-center justify-center gap-2">
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            حذف کن
          </button>
        </div>
      </div>
    </div>
  );
}

function TextField({ label, value, onChange, placeholder, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string;
}) {
  return (
    <div className="mb-4">
      <label className="block text-xs text-gray-500 text-right mb-1.5">{label}</label>
      <input
        type={type} value={value} onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder} dir="rtl"
        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-right text-sm text-gray-800 focus:outline-none focus:border-primary"
      />
    </div>
  );
}

// Simple map placeholder using static tiles (no API key needed)
function MapPicker({ lat, lng, onPick }: {
  lat: number; lng: number; onPick: (lat: number, lng: number) => void;
}) {
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.01},${lat - 0.01},${lng + 0.01},${lat + 0.01}&layer=mapnik&marker=${lat},${lng}`;
  return (
    <div className="mb-4">
      <label className="block text-xs text-gray-500 text-right mb-1.5">موقعیت روی نقشه</label>
      <div className="w-full h-48 rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          title="map"
        />
      </div>
      <div className="flex gap-2 mt-2">
        <TextField label="" value={String(lng)} onChange={(v) => onPick(lat, parseFloat(v) || 0)} placeholder="طول جغرافیایی" />
        <TextField label="" value={String(lat)} onChange={(v) => onPick(parseFloat(v) || 0, lng)} placeholder="عرض جغرافیایی" />
      </div>
      <p className="text-xs text-gray-400 text-right mt-1">مختصات را دستی وارد کنید</p>
    </div>
  );
}

function LocationForm({ initial, onSubmit, submitLabel }: {
  initial: { name: string; range: string; latitude: number; longitude: number };
  onSubmit: (v: typeof initial) => Promise<void>;
  submitLabel: string;
}) {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const set = (key: keyof typeof form) => (v: string | number) =>
    setForm((f) => ({ ...f, [key]: v }));

  const handleSubmit = async () => {
    if (!form.name || !form.range || !form.latitude || !form.longitude) {
      setError("همه فیلدها الزامی هستند"); return;
    }
    setError(""); setLoading(true);
    try { await onSubmit(form); }
    catch (e: any) { setError(e?.response?.data?.errorDetails ?? "خطایی رخ داده است"); }
    finally { setLoading(false); }
  };

  return (
    <div dir="rtl">
      <TextField label="نام مکان" value={form.name} onChange={set("name") as (v: string) => void} placeholder="مثلاً: کارگاه شمالی" />
      <TextField label="شعاع (متر)" value={form.range} onChange={set("range") as (v: string) => void} placeholder="مثلاً: 200" type="number" />
      <MapPicker
        lat={form.latitude || 35.6892}
        lng={form.longitude || 51.389}
        onPick={(lat, lng) => setForm((f) => ({ ...f, latitude: lat, longitude: lng }))}
      />
      {error && <p className="text-red-500 text-xs text-right mb-3">{error}</p>}
      <button
        onClick={handleSubmit} disabled={loading}
        className="w-full bg-primary text-white py-3.5 rounded-xl font-medium flex items-center justify-center gap-2"
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {submitLabel}
      </button>
    </div>
  );
}

export default function LocationPage() {
  const [locations, setLocations] = useState<ILocation[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<ILocation | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchLocations = useCallback(async (q = "") => {
    setLoading(true);
    try {
      const res = await apiClient.get(`/api/v1/customer/locations${q ? `?search=${q}` : ""}`);
      setLocations(res.data?.data?.data ?? res.data?.data ?? []);
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchLocations(); }, [fetchLocations]);

  useEffect(() => {
    const t = setTimeout(() => fetchLocations(search), 400);
    return () => clearTimeout(t);
  }, [search, fetchLocations]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await apiClient.delete(`/api/v1/customer/locations/${deleteTarget}`);
      setLocations((p) => p.filter((l) => l._id !== deleteTarget));
      setDeleteTarget(null);
    } finally { setDeleting(false); }
  };

  const handleAdd = async (form: { name: string; range: string; latitude: number; longitude: number }) => {
    await apiClient.post("/api/v1/customer/locations", {
      name: form.name, range: Number(form.range),
      latitude: form.latitude, longitude: form.longitude,
    });
    setAddOpen(false); fetchLocations();
  };

  const handleEdit = async (form: { name: string; range: string; latitude: number; longitude: number }) => {
    if (!editTarget) return;
    await apiClient.put(`/api/v1/customer/locations/${editTarget._id}`, {
      name: form.name, range: Number(form.range),
      latitude: form.latitude, longitude: form.longitude,
    });
    setEditTarget(null); fetchLocations();
  };

  return (
    <div className="flex flex-col min-h-full bg-gray-50">
      <div className="bg-white px-5 pt-6 pb-4 shadow-sm sticky top-0 z-10">
        <p className="text-base font-bold text-gray-800 text-right mb-4">موقعیت‌ها</p>
        <div className="relative">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input dir="rtl" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجو…"
            className="w-full bg-gray-100 rounded-full pr-10 pl-4 py-2.5 text-sm focus:outline-none" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 pb-24">
        {loading ? (
          <div className="flex justify-center pt-16"><Loader2 className="w-6 h-6 text-primary animate-spin" /></div>
        ) : locations.length === 0 ? (
          <div className="flex flex-col items-center pt-20 gap-3">
            <MapPin className="w-12 h-12 text-gray-200" />
            <p className="text-gray-400 text-sm">موقعیتی یافت نشد</p>
          </div>
        ) : (
          locations.map((loc) => (
            <div key={loc._id} className="bg-white rounded-2xl px-4 py-4 mb-3 shadow-sm border border-gray-100 flex items-center gap-3">
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(menuOpen === loc._id ? null : loc._id)}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100"
                >
                  <MoreVertical className="w-4 h-4 text-gray-400" />
                </button>
                {menuOpen === loc._id && (
                  <div className="absolute left-0 top-9 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-20 min-w-[130px]">
                    <button onClick={() => { setEditTarget(loc); setMenuOpen(null); }}
                      className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 w-full">
                      <Pencil className="w-3.5 h-3.5" /> ویرایش
                    </button>
                    <button onClick={() => { setDeleteTarget(loc._id); setMenuOpen(null); }}
                      className="flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-50 w-full">
                      <Trash2 className="w-3.5 h-3.5" /> حذف
                    </button>
                  </div>
                )}
              </div>

              <div className="flex-1 text-right">
                <p className="text-sm font-semibold text-gray-800">{loc.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {loc.latitude.toFixed(4)} / {loc.longitude.toFixed(4)}
                </p>
                <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full mt-1.5 inline-block">
                  شعاع: {loc.range} متر
                </span>
              </div>

              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
            </div>
          ))
        )}
      </div>

      <button onClick={() => setAddOpen(true)}
        className="fixed bottom-24 left-5 w-14 h-14 bg-primary rounded-full shadow-lg flex items-center justify-center z-30">
        <Plus className="w-6 h-6 text-white" />
      </button>

      <Modal title="افزودن موقعیت جدید" open={addOpen} onClose={() => setAddOpen(false)}>
        <LocationForm initial={{ name: "", range: "", latitude: 35.6892, longitude: 51.389 }} onSubmit={handleAdd} submitLabel="افزودن" />
      </Modal>

      <Modal title="ویرایش موقعیت" open={!!editTarget} onClose={() => setEditTarget(null)}>
        {editTarget && (
          <LocationForm
            initial={{ name: editTarget.name, range: String(editTarget.range), latitude: editTarget.latitude, longitude: editTarget.longitude }}
            onSubmit={handleEdit} submitLabel="ویرایش"
          />
        )}
      </Modal>

      <ConfirmDialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} loading={deleting} />
    </div>
  );
}