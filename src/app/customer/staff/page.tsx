// "use client";

// import { useState, useEffect, useCallback } from "react";
// import {
//   Search,
//   Plus,
//   MoreVertical,
//   Pencil,
//   Trash2,
//   User,
//   X,
//   AlertTriangle,
//   Loader2,
//   ChevronDown,
//   Users,
// } from "lucide-react";
// import { apiClient } from "@/api/axiosClient";

// // ─── Types ───────────────────────────────────────────────────────────────────
// interface IUser {
//   _id: string;
//   name: string;
//   phone: string;
//   profileImage?: string;
//   location: { _id: string; name: string };
//   shift: { _id: string; shiftName: string };
// }
// interface ILocation { _id: string; name: string }
// interface IShift { _id: string; shiftName: string }

// // ─── Helpers ─────────────────────────────────────────────────────────────────
// function Avatar({ name, image }: { name: string; image?: string }) {
//   if (image)
//     return (
//       <img
//         src={image}
//         alt={name}
//         className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
//       />
//     );
//   return (
//     <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
//       <User className="w-5 h-5 text-primary" />
//     </div>
//   );
// }

// // ─── Select Input ─────────────────────────────────────────────────────────────
// function SelectField({
//   label,
//   value,
//   onChange,
//   options,
//   placeholder,
// }: {
//   label: string;
//   value: string;
//   onChange: (v: string) => void;
//   options: { value: string; label: string }[];
//   placeholder: string;
// }) {
//   return (
//     <div className="mb-4">
//       <label className="block text-xs text-gray-500 text-right mb-1.5">{label}</label>
//       <div className="relative">
//         <select
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//           className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-right text-sm text-gray-800 appearance-none focus:outline-none focus:border-primary"
//           dir="rtl"
//         >
//           <option value="" disabled>{placeholder}</option>
//           {options.map((o) => (
//             <option key={o.value} value={o.value}>{o.label}</option>
//           ))}
//         </select>
//         <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
//       </div>
//     </div>
//   );
// }

// // ─── Text Field ───────────────────────────────────────────────────────────────
// function TextField({
//   label,
//   value,
//   onChange,
//   placeholder,
//   type = "text",
// }: {
//   label: string;
//   value: string;
//   onChange: (v: string) => void;
//   placeholder: string;
//   type?: string;
// }) {
//   return (
//     <div className="mb-4">
//       <label className="block text-xs text-gray-500 text-right mb-1.5">{label}</label>
//       <input
//         type={type}
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         placeholder={placeholder}
//         dir="rtl"
//         className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-right text-sm text-gray-800 focus:outline-none focus:border-primary"
//       />
//     </div>
//   );
// }

// // ─── Bottom Sheet Modal ───────────────────────────────────────────────────────
// function Modal({
//   title,
//   open,
//   onClose,
//   children,
// }: {
//   title: string;
//   open: boolean;
//   onClose: () => void;
//   children: React.ReactNode;
// }) {
//   if (!open) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex flex-col justify-end">
//       <div className="absolute inset-0 bg-black/40" onClick={onClose} />
//       <div className="relative bg-white rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto">
//         <div className="flex items-center justify-between mb-5 border-b border-gray-100 pb-4">
//           <button onClick={onClose}>
//             <X className="w-5 h-5 text-gray-400" />
//           </button>
//           <p className="text-base font-semibold text-gray-700">{title}</p>
//           <div className="w-5" />
//         </div>
//         {children}
//       </div>
//     </div>
//   );
// }

// // ─── Confirm Dialog ───────────────────────────────────────────────────────────
// function ConfirmDialog({
//   open,
//   onClose,
//   onConfirm,
//   loading,
// }: {
//   open: boolean;
//   onClose: () => void;
//   onConfirm: () => void;
//   loading: boolean;
// }) {
//   if (!open) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
//       <div className="absolute inset-0 bg-black/40" onClick={onClose} />
//       <div className="relative bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
//         <div className="flex justify-center mb-4">
//           <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
//             <AlertTriangle className="w-7 h-7 text-red-500" />
//           </div>
//         </div>
//         <p className="text-center text-base font-semibold text-gray-800 mb-6">
//           می‌خواهید این کاربر را حذف کنید؟
//         </p>
//         <div className="flex gap-3">
//           <button
//             onClick={onClose}
//             className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-600"
//           >
//             خیر
//           </button>
//           <button
//             onClick={onConfirm}
//             disabled={loading}
//             className="flex-1 py-3 rounded-xl bg-red-500 text-white text-sm font-medium flex items-center justify-center gap-2"
//           >
//             {loading && <Loader2 className="w-4 h-4 animate-spin" />}
//             بله، حذف کن
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── User Form ────────────────────────────────────────────────────────────────
// function UserForm({
//   initial,
//   locations,
//   shifts,
//   onSubmit,
//   submitLabel,
// }: {
//   initial: { name: string; phone: string; password: string; location: string; shift: string };
//   locations: ILocation[];
//   shifts: IShift[];
//   onSubmit: (v: typeof initial) => Promise<void>;
//   submitLabel: string;
// }) {
//   const [form, setForm] = useState(initial);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const set = (key: keyof typeof form) => (v: string) =>
//     setForm((f) => ({ ...f, [key]: v }));

//   const handleSubmit = async () => {
//     if (!form.name || !form.phone || !form.location || !form.shift) {
//       setError("همه فیلدهای ضروری را پر کنید");
//       return;
//     }
//     setError("");
//     setLoading(true);
//     try {
//       await onSubmit(form);
//     } catch (e: any) {
//       setError(e?.response?.data?.errorDetails ?? "خطایی رخ داده است");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div dir="rtl">
//       <TextField label="نام" value={form.name} onChange={set("name")} placeholder="نام کارمند" />
//       <TextField label="شماره تماس" value={form.phone} onChange={set("phone")} placeholder="09xxxxxxxxx" type="tel" />
//       <TextField label="رمز عبور" value={form.password} onChange={set("password")} placeholder={submitLabel === "ویرایش" ? "اگر خالی باشد تغییر نمی‌کند" : "رمز عبور"} type="password" />
//       <SelectField
//         label="موقعیت"
//         value={form.location}
//         onChange={set("location")}
//         options={locations.map((l) => ({ value: l._id, label: l.name }))}
//         placeholder="انتخاب موقعیت"
//       />
//       <SelectField
//         label="شیفت"
//         value={form.shift}
//         onChange={set("shift")}
//         options={shifts.map((s) => ({ value: s._id, label: s.shiftName }))}
//         placeholder="انتخاب شیفت"
//       />
//       {error && <p className="text-red-500 text-xs text-right mb-3">{error}</p>}
//       <button
//         onClick={handleSubmit}
//         disabled={loading}
//         className="w-full bg-primary text-white py-3.5 rounded-xl font-medium flex items-center justify-center gap-2"
//       >
//         {loading && <Loader2 className="w-4 h-4 animate-spin" />}
//         {submitLabel}
//       </button>
//     </div>
//   );
// }

// // ─── Page ─────────────────────────────────────────────────────────────────────
// export default function StaffPage() {
//   const [users, setUsers] = useState<IUser[]>([]);
//   const [locations, setLocations] = useState<ILocation[]>([]);
//   const [shifts, setShifts] = useState<IShift[]>([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [menuOpen, setMenuOpen] = useState<string | null>(null);
//   const [addOpen, setAddOpen] = useState(false);
//   const [editTarget, setEditTarget] = useState<IUser | null>(null);
//   const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
//   const [deleting, setDeleting] = useState(false);

//   const fetchAll = useCallback(async () => {
//     setLoading(true);
//     try {
//       const [u, l, s] = await Promise.all([
//         apiClient.get("/api/v1/customer/users"),
//         apiClient.get("/api/v1/customer/locations"),
//         apiClient.get("/api/v1/customer/shifts"),
//       ]);
//       setUsers(u.data?.data?.data ?? u.data?.data ?? []);
//       setLocations(l.data?.data?.data ?? l.data?.data ?? []);
//       setShifts(s.data?.data?.data ?? s.data?.data ?? []);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => { fetchAll(); }, [fetchAll]);

//   const filtered = users.filter(
//     (u) =>
//       u.name.toLowerCase().includes(search.toLowerCase()) ||
//       u.phone.includes(search)
//   );

//   const handleDelete = async () => {
//     if (!deleteTarget) return;
//     setDeleting(true);
//     try {
//       await apiClient.delete(`/api/v1/customer/users/${deleteTarget}`);
//       setUsers((prev) => prev.filter((u) => u._id !== deleteTarget));
//       setDeleteTarget(null);
//     } finally {
//       setDeleting(false);
//     }
//   };

//   const handleAdd = async (form: {
//     name: string; phone: string; password: string; location: string; shift: string;
//   }) => {
//     await apiClient.post("/api/v1/customer/users", form);
//     setAddOpen(false);
//     fetchAll();
//   };

//   const handleEdit = async (form: {
//     name: string; phone: string; password: string; location: string; shift: string;
//   }) => {
//     if (!editTarget) return;
//     const payload: Record<string, string> = {
//       name: form.name, phone: form.phone, location: form.location, shift: form.shift,
//     };
//     if (form.password) payload.password = form.password;
//     await apiClient.post(`/api/v1/customer/users/${editTarget._id}`, payload);
//     setEditTarget(null);
//     fetchAll();
//   };

//   return (
//     <div className="flex flex-col min-h-full bg-gray-50">
//       {/* ── Header ── */}
//       <div className="bg-white px-5 pt-6 pb-4 shadow-sm sticky top-0 z-10">
//         <p className="text-base font-bold text-gray-800 text-right mb-4">کارمندان</p>
//         <div className="relative">
//           <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//           <input
//             dir="rtl"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="جستجو…"
//             className="w-full bg-gray-100 rounded-full pr-10 pl-4 py-2.5 text-sm focus:outline-none"
//           />
//         </div>
//       </div>

//       {/* ── List ── */}
//       <div className="flex-1 overflow-y-auto px-4 py-3 pb-24">
//         {loading ? (
//           <div className="flex justify-center pt-16">
//             <Loader2 className="w-6 h-6 text-primary animate-spin" />
//           </div>
//         ) : filtered.length === 0 ? (
//           <div className="flex flex-col items-center pt-20 gap-3">
//             <Users className="w-12 h-12 text-gray-200" />
//             <p className="text-gray-400 text-sm">کاربری یافت نشد</p>
//           </div>
//         ) : (
//           filtered.map((user) => (
//             <div
//               key={user._id}
//               className="bg-white rounded-2xl px-4 py-4 mb-3 shadow-sm border border-gray-100 flex items-center gap-3"
//             >
//               <div className="relative">
//                 <button
//                   onClick={() =>
//                     setMenuOpen(menuOpen === user._id ? null : user._id)
//                   }
//                   className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100"
//                 >
//                   <MoreVertical className="w-4 h-4 text-gray-400" />
//                 </button>
//                 {menuOpen === user._id && (
//                   <div className="absolute left-0 top-9 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-20 min-w-[130px]">
//                     <button
//                       onClick={() => {
//                         setEditTarget(user);
//                         setMenuOpen(null);
//                       }}
//                       className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 w-full"
//                     >
//                       <Pencil className="w-3.5 h-3.5" />
//                       ویرایش
//                     </button>
//                     <button
//                       onClick={() => {
//                         setDeleteTarget(user._id);
//                         setMenuOpen(null);
//                       }}
//                       className="flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-50 w-full"
//                     >
//                       <Trash2 className="w-3.5 h-3.5" />
//                       حذف
//                     </button>
//                   </div>
//                 )}
//               </div>

//               <div className="flex-1 text-right">
//                 <p className="text-sm font-semibold text-gray-800">{user.name}</p>
//                 <p className="text-xs text-gray-400 mt-0.5">{user.phone}</p>
//                 <div className="flex items-center justify-end gap-2 mt-1.5">
//                   <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
//                     {user.shift?.shiftName ?? "—"}
//                   </span>
//                   <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full">
//                     {user.location?.name ?? "—"}
//                   </span>
//                 </div>
//               </div>

//               <Avatar name={user.name} image={user.profileImage} />
//             </div>
//           ))
//         )}
//       </div>

//       {/* ── FAB ── */}
//       <button
//         onClick={() => setAddOpen(true)}
//         className="fixed bottom-24 left-5 w-14 h-14 bg-primary rounded-full shadow-lg flex items-center justify-center z-30"
//       >
//         <Plus className="w-6 h-6 text-white" />
//       </button>

//       {/* ── Add Modal ── */}
//       <Modal title="افزودن کارمند جدید" open={addOpen} onClose={() => setAddOpen(false)}>
//         <UserForm
//           initial={{ name: "", phone: "", password: "", location: "", shift: "" }}
//           locations={locations}
//           shifts={shifts}
//           onSubmit={handleAdd}
//           submitLabel="افزودن"
//         />
//       </Modal>

//       {/* ── Edit Modal ── */}
//       <Modal title="ویرایش کارمند" open={!!editTarget} onClose={() => setEditTarget(null)}>
//         {editTarget && (
//           <UserForm
//             initial={{
//               name: editTarget.name,
//               phone: editTarget.phone,
//               password: "",
//               location: editTarget.location?._id ?? "",
//               shift: editTarget.shift?._id ?? "",
//             }}
//             locations={locations}
//             shifts={shifts}
//             onSubmit={handleEdit}
//             submitLabel="ویرایش"
//           />
//         )}
//       </Modal>

//       {/* ── Delete Confirm ── */}
//       <ConfirmDialog
//         open={!!deleteTarget}
//         onClose={() => setDeleteTarget(null)}
//         onConfirm={handleDelete}
//         loading={deleting}
//       />
//     </div>
//   );
// }


"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import {
  Search, MoreVertical, Pencil, Trash2,
  User, Users, Loader2,
  ChevronDown,
} from "lucide-react";
import { BottomSheet, ConfirmDialog } from "@/components/ui/AppModal";
import FloatingAddButton from "@/components/ui/FloatingAddButton";
import { useLocations } from "@/api/customer/location/queries";
import { useShifts } from "@/api/customer/shift/queries";
import {
  useInfiniteStaff, useCreateStaff, useUpdateStaff, useDeleteStaff,
} from "@/api/customer/staff/queries";
import { useInfiniteScrollTrigger } from "@/hooks/useInfiniteScrollTrigger";
import { resolveImageUrl } from "@/utils/resolveImageUrl";
interface IUser {
  _id: string;
  name: string;
  phone: string;
  profileImage?: string;
  location: { _id: string; name: string };
  shift: { _id: string; shiftName: string };
}

function Avatar({ name, image }: { name: string; image?: string }) {
  if (image)
    return <img src={image} alt={name} className="w-12 h-12 rounded-full object-cover border-2 border-primary/20" />;
  return (
    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
      <User className="w-5 h-5 text-primary" />
    </div>
  );
}

function SelectField({ label, value, onChange, options, placeholder }: {
  label: string; value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[]; placeholder: string;
}) {
  return (
    <div className="mb-4">
      <label className="block text-xs text-gray-500 text-right mb-1.5">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-right text-sm text-gray-800 appearance-none focus:outline-none focus:border-primary"
          dir="rtl"
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
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

function UserForm({ initial, locations, shifts, onSubmit, submitting, submitLabel }: {
  initial: { name: string; phone: string; password: string; location: string; shift: string };
  locations: { _id: string; name: string }[];
  shifts: { _id: string; shiftName: string }[];
  onSubmit: (v: typeof initial) => void;
  submitting: boolean;
  submitLabel: string;
}) {
  const [form, setForm] = useState(initial);
  const [error, setError] = useState("");
  const set = (key: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [key]: v }));

  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.location || !form.shift) {
      setError("همه فیلدهای ضروری را پر کنید");
      return;
    }
    setError("");
    onSubmit(form);
  };

  return (
    <div dir="rtl">
      <TextField label="نام" value={form.name} onChange={set("name")} placeholder="نام کارمند" />
      <TextField label="شماره تماس" value={form.phone} onChange={set("phone")} placeholder="09xxxxxxxxx" type="tel" />
      <TextField
        label="رمز عبور" value={form.password} onChange={set("password")}
        placeholder={submitLabel === "ویرایش" ? "اگر خالی باشد تغییر نمی‌کند" : "رمز عبور"} type="password"
      />
      <SelectField
        label="موقعیت" value={form.location} onChange={set("location")}
        options={locations.map((l) => ({ value: l._id, label: l.name }))} placeholder="انتخاب موقعیت"
      />
      <SelectField
        label="شیفت" value={form.shift} onChange={set("shift")}
        options={shifts.map((s) => ({ value: s._id, label: s.shiftName }))} placeholder="انتخاب شیفت"
      />
      {error && <p className="text-red-500 text-xs text-right mb-3">{error}</p>}
      <button
        onClick={handleSubmit} disabled={submitting}
        className="w-full bg-primary text-white py-3.5 rounded-xl font-medium flex items-center justify-center gap-2"
      >
        {submitLabel}
      </button>
    </div>
  );
}

export default function StaffPage() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState(""); // debounced value actually sent to the API
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<IUser | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  // Debounce search input → backend query (400ms)
  useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput), 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  const {
    data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage,
  } = useInfiniteStaff(search);
  const { data: locations = [] } = useLocations();
  const { data: shifts = [] } = useShifts();

  const createStaff = useCreateStaff();
  const updateStaff = useUpdateStaff();
  const deleteStaff = useDeleteStaff();

  const users: IUser[] = useMemo(() => data?.items ?? [], [data]);

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const sentinelRef = useInfiniteScrollTrigger(loadMore, hasNextPage ?? false);

  const handleAdd = (form: { name: string; phone: string; password: string; location: string; shift: string }) => {
    createStaff.mutate(form, { onSuccess: () => setAddOpen(false) });
  };

  const handleEdit = (form: { name: string; phone: string; password: string; location: string; shift: string }) => {
    if (!editTarget) return;
    const payload: Record<string, string> = { name: form.name, phone: form.phone, location: form.location, shift: form.shift };
    if (form.password) payload.password = form.password;
    updateStaff.mutate({ id: editTarget._id, payload }, { onSuccess: () => setEditTarget(null) });
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteStaff.mutate(deleteTarget, { onSuccess: () => setDeleteTarget(null) });
  };

  return (
    <div dir="rtl" className="flex flex-col min-h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white px-5 pt-6 pb-4 shadow-sm sticky top-0 z-10">
        <p className="text-base font-bold text-gray-800 text-right mb-4">کارمندان</p>
        <div className="relative">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            dir="rtl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجو…"
            className="w-full bg-gray-100 rounded-full pr-10 pl-4 py-2.5 text-sm focus:outline-none"
          />
        </div>
      </div>

      {/* List */}
   
      <div className="flex-1 overflow-y-auto px-4 py-3 pb-24">
        {isLoading ? (
          <div className="flex justify-center pt-16">
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
          </div>
        ) : users.length === 0 ? (
          <div className="flex flex-col items-center pt-20 gap-3">
            <Users className="w-12 h-12 text-gray-200" />
            <p className="text-gray-400 text-sm">کاربری یافت نشد</p>
          </div>
        ) : (
          users.map((user) => (
            <div key={user._id} dir="rtl" className="bg-white rounded-2xl px-4 py-4 mb-3 shadow-sm border border-gray-100 flex items-center gap-3">
                            <div className="relative">
                <button
                  onClick={() => setMenuOpen(menuOpen === user._id ? null : user._id)}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100"
                >
                  <MoreVertical className="w-4 h-4 text-gray-400" />
                </button>
                {menuOpen === user._id && (
                  <div className="absolute right-0 top-9 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-40 min-w-[130px]">
                                        <button
                      onClick={() => { setEditTarget(user); setMenuOpen(null); }}
                      className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 w-full"
                    >
                      <Pencil className="w-3.5 h-3.5" /> ویرایش
                    </button>
                    <button
                      onClick={() => { setDeleteTarget(user._id); setMenuOpen(null); }}
                      className="flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-50 w-full"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> حذف
                    </button>
                  </div>
                )}
              </div>

              <div className="flex-1 text-right">
                <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{user.phone}</p>
                <div className="flex items-center justify-end gap-2 mt-1.5">
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                    {user.shift?.shiftName ?? "—"}
                  </span>
                  <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    {user.location?.name ?? "—"}
                  </span>
                </div>
              </div>

              <Avatar name={user.name} image={user.profileImage} />
            </div>
          ))
        )}

        {/* Infinite scroll sentinel + loading indicator */}
        {!isLoading && users.length > 0 && (
          <div ref={sentinelRef} className="flex justify-center py-4">
            {isFetchingNextPage && <Loader2 className="w-5 h-5 text-primary animate-spin" />}
          </div>
        )}
      </div>

      {/* FAB */}
   
      <FloatingAddButton onClick={() => setAddOpen(true)} />

      {/* Add */}
      <BottomSheet title="افزودن کارمند جدید" open={addOpen} onClose={() => setAddOpen(false)}>
        <UserForm
          initial={{ name: "", phone: "", password: "", location: "", shift: "" }}
          locations={locations}
          shifts={shifts}
          onSubmit={handleAdd}
          submitting={createStaff.isPending}
          submitLabel="افزودن"
        />
      </BottomSheet>

      {/* Edit */}
      <BottomSheet title="ویرایش کارمند" open={!!editTarget} onClose={() => setEditTarget(null)}>
        {editTarget && (
          <UserForm
            initial={{
              name: editTarget.name,
              phone: editTarget.phone,
              password: "",
              location: editTarget.location?._id ?? "",
              shift: editTarget.shift?._id ?? "",
            }}
            locations={locations}
            shifts={shifts}
            onSubmit={handleEdit}
            submitting={updateStaff.isPending}
            submitLabel="ویرایش"
          />
        )}
      </BottomSheet>

      {/* Delete */}
      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleteStaff.isPending}
        title="می‌خواهید این کاربر را حذف کنید؟"
        variant="danger"
      />
    </div>
  );
}