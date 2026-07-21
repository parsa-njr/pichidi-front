// "use client";

// import { useState, useMemo, useCallback, useEffect } from "react";
// import {
//   Search, FileText, CheckCircle2, XCircle, Clock, User, Loader2,
// } from "lucide-react";

// import { BottomSheet, ConfirmDialog } from "@/components/ui/AppModal";
// import { useInfiniteCustomerRequests, useUpdateRequestStatus } from "@/api/customer/request/queries";
// import { IRequest } from "@/api/customer/request/api";
// import { useInfiniteScrollTrigger } from "@/hooks/useInfiniteScrollTrigger";

// // ─── Labels ──────────────────────────────────────────────────────────────────
// const TYPE_LABELS: Record<string, string> = {
//   leave: "مرخصی",
//   overtime: "اضافه‌کاری",
// };

// const STATUS_MAP = {
//   accepted: { label: "پذیرفته شده", color: "text-emerald-600", bg: "bg-emerald-100", Icon: CheckCircle2 },
//   rejected: { label: "رد شده", color: "text-red-600", bg: "bg-red-100", Icon: XCircle },
//   pending: { label: "در حال بررسی", color: "text-amber-600", bg: "bg-amber-100", Icon: Clock },
// };

// const FILTERS = [
//   { key: "all", label: "همه" },
//   { key: "pending", label: "در انتظار" },
//   { key: "accepted", label: "پذیرفته" },
//   { key: "rejected", label: "رد شده" },
// ] as const;

// function toJalali(iso: string) {
//   if (!iso) return "—";
//   try {
//     return new Intl.DateTimeFormat("fa-IR", {
//       year: "numeric", month: "2-digit", day: "2-digit", calendar: "persian",
//     }).format(new Date(iso));
//   } catch { return iso.slice(0, 10); }
// }

// // ─── Detail / Action Sheet ─────────────────────────────────────────────────────
// function RequestDetailSheet({ req, onAccept, onReject, acting }: {
//   req: IRequest;
//   onAccept: () => void;
//   onReject: (note: string) => void;
//   acting: boolean;
// }) {
//   const s = STATUS_MAP[req.status] ?? STATUS_MAP.pending;
//   const [rejectNote, setRejectNote] = useState("");
//   const [showRejectForm, setShowRejectForm] = useState(false);

//   return (
//     <div dir="rtl">
//       {/* Employee */}
//       <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-4 mb-4 border border-gray-100">
//         <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
//           <User className="w-5 h-5 text-primary" />
//         </div>
//         <div className="text-right flex-1">
//           <p className="text-sm font-semibold text-gray-800">{req.user?.name ?? "—"}</p>
//           <p className="text-xs text-gray-400 mt-0.5">{req.user?.phone ?? "—"}</p>
//         </div>
//       </div>

//       {/* Info */}
//       <div className="bg-gray-50 rounded-2xl p-4 mb-4 border border-gray-100">
//         <div className="flex justify-between items-center py-2 border-b border-gray-100">
//           <span className="text-sm font-semibold text-gray-800">{TYPE_LABELS[req.requestType] ?? req.requestType}</span>
//           <span className="text-xs text-gray-400">نوع درخواست</span>
//         </div>
//         <div className="flex justify-between items-center py-2 border-b border-gray-100">
//           <span className="text-sm font-semibold text-gray-800">{toJalali(req.createdAt)}</span>
//           <span className="text-xs text-gray-400">تاریخ ثبت</span>
//         </div>
//         <div className="flex justify-between items-center py-2 border-b border-gray-100">
//           <span className="text-sm font-semibold text-gray-800">{toJalali(req.startDate)}</span>
//           <span className="text-xs text-gray-400">تاریخ شروع</span>
//         </div>
//         <div className="flex justify-between items-center py-2">
//           <span className="text-sm font-semibold text-gray-800">{toJalali(req.endDate)}</span>
//           <span className="text-xs text-gray-400">تاریخ پایان</span>
//         </div>
//       </div>

//       {req.userNote && (
//         <div className="bg-blue-50 border border-blue-100 rounded-2xl px-4 py-3 mb-4">
//           <p className="text-xs text-blue-600 font-semibold mb-1">توضیحات کارمند</p>
//           <p className="text-sm text-gray-700">{req.userNote}</p>
//         </div>
//       )}

//       {/* Status */}
//       <div className={`flex items-center justify-between p-4 rounded-2xl border mb-4 ${s.bg}`}>
//         <s.Icon className={`w-8 h-8 ${s.color}`} />
//         <div className="text-right">
//           <p className="text-xs text-gray-400 mb-0.5">وضعیت درخواست</p>
//           <p className={`text-base font-semibold ${s.color}`}>{s.label}</p>
//         </div>
//       </div>

//       {req.status === "rejected" && req.customerNote && (
//         <div className="bg-white rounded-2xl border-r-4 border-red-500 px-4 py-4 mb-4">
//           <p className="text-xs text-red-600 font-semibold mb-1">دلیل رد درخواست</p>
//           <p className="text-sm text-gray-700">{req.customerNote}</p>
//         </div>
//       )}

//       {/* Actions — only for pending requests */}
//       {req.status === "pending" && (
//         <>
//           {!showRejectForm ? (
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setShowRejectForm(true)}
//                 disabled={acting}
//                 className="flex-1 py-3.5 rounded-xl border border-red-200 text-red-500 text-sm font-medium"
//               >
//                 رد درخواست
//               </button>
//               <button
//                 onClick={onAccept}
//                 disabled={acting}
//                 className="flex-1 py-3.5 rounded-xl bg-primary text-white text-sm font-medium flex items-center justify-center gap-2"
//               >
//                 {acting && <Loader2 className="w-4 h-4 animate-spin" />}
//                 پذیرفتن
//               </button>
//             </div>
//           ) : (
//             <div dir="rtl">
//               <label className="block text-xs text-gray-500 text-right mb-1.5">دلیل رد درخواست</label>
//               <textarea
//                 value={rejectNote}
//                 onChange={(e) => setRejectNote(e.target.value)}
//                 placeholder="توضیح دهید چرا این درخواست رد می‌شود"
//                 rows={3}
//                 dir="rtl"
//                 className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-right resize-none focus:outline-none focus:border-primary mb-4"
//               />
//               <div className="flex gap-3">
//                 <button
//                   onClick={() => setShowRejectForm(false)}
//                   disabled={acting}
//                   className="flex-1 py-3.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium"
//                 >
//                   انصراف
//                 </button>
//                 <button
//                   onClick={() => onReject(rejectNote)}
//                   disabled={acting}
//                   className="flex-1 py-3.5 rounded-xl bg-red-500 text-white text-sm font-medium flex items-center justify-center gap-2"
//                 >
//                   {acting && <Loader2 className="w-4 h-4 animate-spin" />}
//                   تایید رد درخواست
//                 </button>
//               </div>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// }

// // ─── Page ─────────────────────────────────────────────────────────────────────
// export default function CustomerRequestPage() {
//   const [searchInput, setSearchInput] = useState("");
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState<(typeof FILTERS)[number]["key"]>("all");
//   const [selected, setSelected] = useState<IRequest | null>(null);
//   const [confirmAccept, setConfirmAccept] = useState(false);

//   useEffect(() => {
//     const t = setTimeout(() => setSearch(searchInput), 400);
//     return () => clearTimeout(t);
//   }, [searchInput]);

//   const {
//     data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage,
//   } = useInfiniteCustomerRequests(search);
//   const updateStatus = useUpdateRequestStatus();

//   const requests: IRequest[] = useMemo(() => data?.items ?? [], [data]);

//   // status filter stays client-side since backend searchFilter only covers `status` as free text,
//   // not as an exact-match chip filter — this keeps the chip UX instant without extra requests
//   const filtered = requests.filter((r) => statusFilter === "all" || r.status === statusFilter);

//   const loadMore = useCallback(() => {
//     if (hasNextPage && !isFetchingNextPage) fetchNextPage();
//   }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

//   const sentinelRef = useInfiniteScrollTrigger(loadMore, hasNextPage ?? false);
//   const handleAccept = () => {
//     if (!selected) return;
//     updateStatus.mutate(
//       { id: selected._id, payload: { status: "accepted" } },
//       { onSuccess: () => { setConfirmAccept(false); setSelected(null); } }
//     );
//   };

//   const handleReject = (note: string) => {
//     if (!selected) return;
//     updateStatus.mutate(
//       { id: selected._id, payload: { status: "rejected", customerNote: note } },
//       { onSuccess: () => setSelected(null) }
//     );
//   };

//   return (
//     <div dir="rtl" className="flex flex-col min-h-full bg-gray-50">
//       {/* Header */}
//       <div className="bg-white px-5 pt-6 pb-4 shadow-sm sticky top-0 z-10">
//         <p className="text-base font-bold text-gray-800 text-right mb-4">درخواست‌ها</p>
//         {/* <div className="relative mb-3">
//           <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//           <input
//             dir="rtl"
//             value={searchInput}
//             onChange={(e) => setSearchInput(e.target.value)}
//             placeholder="جستجو…"
//             className="w-full bg-gray-100 rounded-full pr-10 pl-4 py-2.5 text-sm focus:outline-none"
//           />
//         </div> */}

//         {/* Status filter chips */}
//         <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
//           {FILTERS.map((f) => (
//             <button
//               key={f.key}
//               onClick={() => setStatusFilter(f.key)}
//               className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${statusFilter === f.key ? "bg-primary text-white" : "bg-gray-100 text-gray-600"
//                 }`}
//             >
//               {f.label}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* List */}
//       <div className="flex-1 overflow-y-auto px-4 py-3 pb-24">
//         {isLoading ? (
//           <div className="flex justify-center pt-16 text-sm text-gray-400">در حال بارگذاری...</div>
//         ) : filtered.length === 0 ? (
//           <div className="flex flex-col items-center pt-20 gap-3">
//             <FileText className="w-12 h-12 text-gray-200" />
//             <p className="text-gray-400 text-sm">درخواستی یافت نشد</p>
//           </div>
//         ) : (
//           filtered.map((req) => {
//             const s = STATUS_MAP[req.status] ?? STATUS_MAP.pending;
//             return (
//               <button
//                 key={req._id}
//                 dir="rtl"
//                 onClick={() => setSelected(req)}
//                 className="w-full bg-white rounded-2xl px-4 py-4 mb-3 shadow-sm border border-gray-100 flex items-center gap-3 text-right"
//               >
//                 <div className={`px-3 py-1 rounded-full ${s.bg} flex-shrink-0`}>
//                   <span className={`text-xs font-medium ${s.color}`}>{s.label}</span>
//                 </div>
//                 <div className="flex-1 min-w-0 text-right">
//                   <p className="text-sm font-semibold text-gray-800">
//                     {req.user?.name ?? "—"}{" "}
//                     <span className="text-gray-500 font-normal">
//                       · {TYPE_LABELS[req.requestType] ?? req.requestType}
//                     </span>
//                   </p>
//                   <p className="text-xs text-gray-400 mt-0.5">
//                     تاریخ درخواست: {toJalali(req.createdAt)}
//                   </p>
//                 </div>
//                 <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
//                   <User className="w-4 h-4 text-primary" />
//                 </div>
//               </button>
//             );
//           })
//         )}

//         {!isLoading && filtered.length > 0 && (
//           <div ref={sentinelRef} className="flex justify-center py-4">
//             {isFetchingNextPage && <Loader2 className="w-5 h-5 text-primary animate-spin" />}
//           </div>
//         )}
//       </div>

//       {/* Detail sheet */}
//       <BottomSheet title="جزئیات درخواست" open={!!selected} onClose={() => setSelected(null)}>
//         {selected && (
//           <RequestDetailSheet
//             req={selected}
//             acting={updateStatus.isPending}
//             onAccept={() => setConfirmAccept(true)}
//             onReject={handleReject}
//           />
//         )}
//       </BottomSheet>

//       {/* Accept confirmation */}
//       <ConfirmDialog
//         open={confirmAccept}
//         onClose={() => setConfirmAccept(false)}
//         onConfirm={handleAccept}
//         loading={updateStatus.isPending}
//         title="این درخواست پذیرفته شود؟"
//         confirmText="بله، پذیرفتن"
//         variant="primary"
//       />
//     </div>
//   );
// }

import RequestContainer from "@/components/customer/request/RequestContainer";

export default function CustomerRequestPage() {
  return <RequestContainer />;
}