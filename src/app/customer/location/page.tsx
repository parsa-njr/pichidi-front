
// "use client";

// import { useState, useMemo, useCallback, useEffect } from "react";
// import dynamic from "next/dynamic";
// import {
//   Search, MoreVertical, Pencil, Trash2, MapPin, Loader2,
// } from "lucide-react";

// import { BottomSheet, ConfirmDialog } from "@/components/ui/AppModal";
// import FloatingAddButton from "@/components/ui/FloatingAddButton";
// import {
//   useInfiniteLocations, useCreateLocation, useUpdateLocation, useDeleteLocation,
// } from "@/api/customer/location/queries";
// import { LocationPayload } from "@/api/customer/location/api";
// import { useInfiniteScrollTrigger } from "@/hooks/useInfiniteScrollTrigger";
// // Leaflet touches window/document — must be client-only, no SSR
// const LeafletMapPicker = dynamic(() => import("@/components/ui/LeafletMapPicker"), {
//   ssr: false,
//   loading: () => (
//     <div className="w-full h-52 rounded-xl bg-gray-100 flex items-center justify-center text-xs text-gray-400">
//       در حال بارگذاری نقشه...
//     </div>
//   ),
// });

// interface ILocation extends LocationPayload {
//   _id: string;
// }

// // ─── Shared inputs ────────────────────────────────────────────────────────────
// function TextField({ label, value, onChange, placeholder, type = "text" }: {
//   label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string;
// }) {
//   return (
//     <div className="mb-4" dir="rtl">
//       <label className="block text-xs text-gray-500 text-right mb-1.5">{label}</label>
//       <input
//         type={type} value={value} onChange={(e) => onChange(e.target.value)}
//         placeholder={placeholder} dir="rtl"
//         className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-right text-sm text-gray-800 focus:outline-none focus:border-primary"
//       />
//     </div>
//   );
// }

// // ─── Location Form ────────────────────────────────────────────────────────────
// function LocationForm({ initial, onSubmit, submitting, submitLabel }: {
//   initial: { name: string; range: string; latitude: number; longitude: number };
//   onSubmit: (v: LocationPayload) => void;
//   submitting: boolean;
//   submitLabel: string;
// }) {
//   const [form, setForm] = useState(initial);
//   const [error, setError] = useState("");
//   const set = (key: keyof typeof form) => (v: string | number) =>
//     setForm((f) => ({ ...f, [key]: v }));

//   const handleSubmit = () => {
//     if (!form.name || !form.range || !form.latitude || !form.longitude) {
//       setError("همه فیلدها الزامی هستند");
//       return;
//     }
//     setError("");
//     onSubmit({
//       name: form.name,
//       range: Number(form.range),
//       latitude: form.latitude,
//       longitude: form.longitude,
//     });
//   };

//   return (
//     <div dir="rtl">
//       <TextField label="نام مکان" value={form.name} onChange={set("name") as (v: string) => void} placeholder="مثلاً: کارگاه شمالی" />
//       <TextField label="شعاع (متر)" value={form.range} onChange={set("range") as (v: string) => void} placeholder="مثلاً: 200" type="number" />

//       <div className="mb-4">
//         <label className="block text-xs text-gray-500 text-right mb-1.5">موقعیت روی نقشه</label>
//         <LeafletMapPicker
//           lat={form.latitude || 35.6892}
//           lng={form.longitude || 51.389}
//           range={Number(form.range) || undefined}
//           onPick={(lat, lng) => setForm((f) => ({ ...f, latitude: lat, longitude: lng }))}
//           showLocateButton
//         />
//         <p className="text-xs text-gray-400 text-right mt-2">
//           روی نقشه کلیک کنید یا نشانگر را جابجا کنید
//         </p>
//       </div>

//       <div className="flex items-center gap-2 mb-4">
//         <div className="flex-1 h-px bg-gray-200" />
//         <span className="text-xs text-gray-400">یا مختصات را دستی وارد کنید</span>
//         <div className="flex-1 h-px bg-gray-200" />
//       </div>

//       <div className="flex gap-3 mb-4">
//         <TextField
//           label="عرض جغرافیایی (Latitude)"
//           value={form.latitude ? String(form.latitude) : ""}
//           onChange={(v) => set("latitude")(v === "" ? "" : Number(v))}
//           placeholder="مثلاً: 35.6892"
//           type="number"
//         />
//         <TextField
//           label="طول جغرافیایی (Longitude)"
//           value={form.longitude ? String(form.longitude) : ""}
//           onChange={(v) => set("longitude")(v === "" ? "" : Number(v))}
//           placeholder="مثلاً: 51.3890"
//           type="number"
//         />
//       </div>

//       {error && <p className="text-red-500 text-xs text-right mb-3">{error}</p>}
//       <button
//         onClick={handleSubmit} disabled={submitting}
//         className="w-full bg-primary text-white py-3.5 rounded-xl font-medium flex items-center justify-center gap-2"
//       >
//         {submitLabel}
//       </button>
//     </div>
//   );
// }

// // ─── Page ─────────────────────────────────────────────────────────────────────
// export default function LocationPage() {
//   const [searchInput, setSearchInput] = useState("");
//   const [search, setSearch] = useState("");
//   const [menuOpen, setMenuOpen] = useState<string | null>(null);
//   const [addOpen, setAddOpen] = useState(false);
//   const [editTarget, setEditTarget] = useState<ILocation | null>(null);
//   const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

//   useEffect(() => {
//     const t = setTimeout(() => setSearch(searchInput), 400);
//     return () => clearTimeout(t);
//   }, [searchInput]);

//   const {
//     data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage,
//   } = useInfiniteLocations(search);
//   const createLocation = useCreateLocation();
//   const updateLocation = useUpdateLocation();
//   const deleteLocation = useDeleteLocation();

//   const locations: ILocation[] = useMemo(() => data?.items ?? [], [data]);

//   const loadMore = useCallback(() => {
//     if (hasNextPage && !isFetchingNextPage) fetchNextPage();
//   }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

//   const sentinelRef = useInfiniteScrollTrigger(loadMore, hasNextPage ?? false);
//   const handleAdd = (payload: LocationPayload) => {
//     createLocation.mutate(payload, { onSuccess: () => setAddOpen(false) });
//   };

//   const handleEdit = (payload: LocationPayload) => {
//     if (!editTarget) return;
//     updateLocation.mutate({ id: editTarget._id, payload }, { onSuccess: () => setEditTarget(null) });
//   };

//   const handleDelete = () => {
//     if (!deleteTarget) return;
//     deleteLocation.mutate(deleteTarget, { onSuccess: () => setDeleteTarget(null) });
//   };

//   return (
//     <div dir="rtl" className="flex flex-col min-h-full bg-gray-50">
//       <div className="bg-white px-5 pt-6 pb-4 shadow-sm sticky top-0 z-10">
//         <p className="text-base font-bold text-gray-800 text-right mb-4">موقعیت‌ها</p>
//         <div className="relative">
//           <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//           <input
//             dir="rtl" value={searchInput} onChange={(e) => setSearchInput(e.target.value)}
//             placeholder="جستجو…"
//             className="w-full bg-gray-100 rounded-full pr-10 pl-4 py-2.5 text-sm focus:outline-none"
//           />
//         </div>
//       </div>

//       <div className="flex-1 overflow-y-auto px-4 py-3 pb-24">
//         {isLoading ? (
//           <div className="flex justify-center pt-16 text-sm text-gray-400">در حال بارگذاری...</div>
//         ) : locations.length === 0 ? (
//           <div className="flex flex-col items-center pt-20 gap-3">
//             <MapPin className="w-12 h-12 text-gray-200" />
//             <p className="text-gray-400 text-sm">موقعیتی یافت نشد</p>
//           </div>
//         ) : (
//           locations.map((loc) => (
//             <div key={loc._id} dir="rtl" className="bg-white rounded-2xl px-4 py-4 mb-3 shadow-sm border border-gray-100 flex items-center gap-3">
//               <div className="relative">
//                 <button
//                   onClick={() => setMenuOpen(menuOpen === loc._id ? null : loc._id)}
//                   className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100"
//                 >
//                   <MoreVertical className="w-4 h-4 text-gray-400" />
//                 </button>
//                 {menuOpen === loc._id && (
//                   <div className="absolute right-0 top-9 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-40 min-w-[130px]">
//                     <button
//                       onClick={() => { setEditTarget(loc); setMenuOpen(null); }}
//                       className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 w-full"
//                     >
//                       <Pencil className="w-3.5 h-3.5" /> ویرایش
//                     </button>
//                     <button
//                       onClick={() => { setDeleteTarget(loc._id); setMenuOpen(null); }}
//                       className="flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-50 w-full"
//                     >
//                       <Trash2 className="w-3.5 h-3.5" /> حذف
//                     </button>
//                   </div>
//                 )}
//               </div>

//               <div className="flex-1 text-right">
//                 <p className="text-sm font-semibold text-gray-800">{loc.name}</p>
//                 <p className="text-xs text-gray-400 mt-0.5">
//                   {loc.latitude.toFixed(4)} / {loc.longitude.toFixed(4)}
//                 </p>
//                 <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full mt-1.5 inline-block">
//                   شعاع: {loc.range} متر
//                 </span>
//               </div>

//               <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
//                 <MapPin className="w-5 h-5 text-primary" />
//               </div>
//             </div>
//           ))
//         )}

//         {!isLoading && locations.length > 0 && (
//           <div ref={sentinelRef} className="flex justify-center py-4">
//             {isFetchingNextPage && <Loader2 className="w-5 h-5 text-primary animate-spin" />}
//           </div>
//         )}
//       </div>

//       <FloatingAddButton onClick={() => setAddOpen(true)} />

//       <BottomSheet title="افزودن موقعیت جدید" open={addOpen} onClose={() => setAddOpen(false)}>
//         <LocationForm
//           initial={{ name: "", range: "", latitude: 35.6892, longitude: 51.389 }}
//           onSubmit={handleAdd}
//           submitting={createLocation.isPending}
//           submitLabel="افزودن"
//         />
//       </BottomSheet>

//       <BottomSheet title="ویرایش موقعیت" open={!!editTarget} onClose={() => setEditTarget(null)}>
//         {editTarget && (
//           <LocationForm
//             initial={{
//               name: editTarget.name,
//               range: String(editTarget.range),
//               latitude: editTarget.latitude,
//               longitude: editTarget.longitude,
//             }}
//             onSubmit={handleEdit}
//             submitting={updateLocation.isPending}
//             submitLabel="ویرایش"
//           />
//         )}
//       </BottomSheet>

//       <ConfirmDialog
//         open={!!deleteTarget}
//         onClose={() => setDeleteTarget(null)}
//         onConfirm={handleDelete}
//         loading={deleteLocation.isPending}
//         title="می‌خواهید این موقعیت را حذف کنید؟"
//         variant="danger"
//       />
//     </div>
//   );
// }

import LocationContainer from "@/components/customer/location/LocationContainer";

export default function LocationPage() {
  return <LocationContainer />;
}