
// "use client";

// import { useState, useMemo, useCallback, useEffect } from "react";
// import {
//   Search, MoreVertical, Pencil, Trash2, Clock, Plus as PlusIcon, Loader2,
// } from "lucide-react";
// import DatePicker from "react-multi-date-picker";
// import TimePicker from "react-multi-date-picker/plugins/time_picker";
// import persian from "react-date-object/calendars/persian";
// import persian_fa from "react-date-object/locales/persian_fa";

// import { BottomSheet, ConfirmDialog } from "@/components/ui/AppModal";
// import FloatingAddButton from "@/components/ui/FloatingAddButton";
// import {
//   useInfiniteShifts, useCreateShift, useUpdateShift, useDeleteShift,
// } from "@/api/customer/shift/queries";
// import { ShiftDay, ExceptionDay, ShiftPayload } from "@/api/customer/shift/api";
// import { useInfiniteScrollTrigger } from "@/hooks/useInfiniteScrollTrigger";
// import DateObject from "react-date-object";

// // ─── Types ───────────────────────────────────────────────────────────────────
// interface IShift extends ShiftPayload {
//   _id: string;
// }

// // ─── Helpers ─────────────────────────────────────────────────────────────────
// function toJalali(iso?: string) {
//   if (!iso) return "—";
//   try {
//     return new Intl.DateTimeFormat("fa-IR", {
//       year: "numeric", month: "2-digit", day: "2-digit", calendar: "persian",
//     }).format(new Date(iso));
//   } catch { return iso.slice(0, 10); }
// }

// // ─── Shared inputs ────────────────────────────────────────────────────────────
// function TextField({ label, value, onChange, placeholder, type = "text" }: {
//   label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string;
// }) {
//   return (
//     <div className="mb-4">
//       {label && <label className="block text-xs text-gray-500 text-right mb-1.5">{label}</label>}
//       <input
//         type={type} value={value} onChange={(e) => onChange(e.target.value)}
//         placeholder={placeholder} dir="rtl"
//         className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-right text-sm text-gray-800 focus:outline-none focus:border-primary"
//       />
//     </div>
//   );
// }

// // function DateField({ label, value, onChange }: {
// //   label: string; value: string; onChange: (v: string) => void;
// // }) {
// //   return (
// //     <div className="flex-1">
// //       <label className="block text-xs text-gray-500 text-right mb-1.5">{label}</label>
// //       <DatePicker
// //         calendar={persian}
// //         locale={persian_fa}
// //         value={value ? new Date(value) : undefined}
// //         onChange={(d: any) => onChange(d ? d.toDate().toISOString() : "")}
// //         inputClass="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-sm text-right focus:outline-none focus:border-primary"
// //         containerClassName="w-full"
// //       />
// //     </div>
// //   );
// // }

// function DateField({ label, value, onChange }: {
//   label: string; value: string; onChange: (v: string) => void;
// }) {
//   return (
//     <div className="flex-1" dir="rtl">
//       <label className="block text-xs text-gray-500 text-right mb-1.5">{label}</label>
//       <DatePicker
//         calendar={persian}
//         locale={persian_fa}
//         value={value ? new Date(value) : undefined}
//         onChange={(d: DateObject | null) => onChange(d ? d.toDate().toISOString() : "")}
//         inputClass="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-sm text-right focus:outline-none focus:border-primary"
//         containerClassName="w-full"
//         calendarPosition="bottom-right"
//         fixMainPosition
//       />
//     </div>
//   );
// }

// // function TimeField({ label, value, onChange }: {
// //   label: string; value: string; onChange: (v: string) => void;
// // }) {
// //   return (
// //     <div className="flex-1">
// //       <label className="block text-xs text-gray-400 text-right mb-1">{label}</label>
// //       <DatePicker
// //         calendar={persian}
// //         locale={persian_fa}
// //         disableDayPicker
// //         format="HH:mm"
// //         plugins={[<TimePicker key="time" hideSeconds />]}
// //         value={value || undefined}
// //         onChange={(d: any) => onChange(d ? d.format("HH:mm") : "")}
// //         inputClass="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-center focus:outline-none focus:border-primary"
// //         containerClassName="w-full"
// //       />
// //     </div>
// //   );
// // }


// function TimeField({ label, value, onChange }: {
//   label: string; value: string; onChange: (v: string) => void;
// }) {
//   const dateValue = value
//     ? new DateObject({ hour: Number(value.split(":")[0]), minute: Number(value.split(":")[1]) })
//     : undefined;

//   return (
//     <div className="flex-1" dir="rtl">
//       <label className="block text-xs text-gray-400 text-right mb-1">{label}</label>
//       <DatePicker
//         disableDayPicker
//         format="HH:mm"
//         plugins={[<TimePicker key="time" hideSeconds />]}
//         value={dateValue}
//         onChange={(d: DateObject | null) =>
//           onChange(d ? `${String(d.hour).padStart(2, "0")}:${String(d.minute).padStart(2, "0")}` : "")
//         }
//         inputClass="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-center focus:outline-none focus:border-primary"
//         containerClassName="w-full"
//         calendarPosition="bottom-right"
//         fixMainPosition
//       />
//     </div>
//   );
// }

// // ─── Shift Day Row ────────────────────────────────────────────────────────────
// function ShiftDayRow({ day, onChange, onCopyPrev, showCopy }: {
//   day: ShiftDay; onChange: (d: ShiftDay) => void; onCopyPrev: () => void; showCopy: boolean;
// }) {
//   return (
//     <div className="bg-gray-50 rounded-xl p-4 mb-3 border border-gray-100" dir="rtl">
//       <div className="flex items-center justify-between mb-3">
//         <label className="flex items-center gap-2 text-xs text-gray-500">
//           <input
//             type="checkbox" checked={day.isOffDay}
//             onChange={(e) => onChange({ ...day, isOffDay: e.target.checked })}
//             className="accent-primary"
//           />
//           روز تعطیل
//         </label>
//         <p className="text-sm font-semibold text-gray-700 text-right">روز {day.day}</p>
//       </div>
//       {!day.isOffDay && (
//         <div className="flex gap-3">
//           <TimeField
//             label="خروج" value={day.time[0]?.endTime ?? ""}
//             onChange={(v) => onChange({ ...day, time: [{ ...day.time[0], endTime: v }] })}
//           />
//           <TimeField
//             label="ورود" value={day.time[0]?.startTime ?? ""}
//             onChange={(v) => onChange({ ...day, time: [{ ...day.time[0], startTime: v }] })}
//           />
//         </div>
//       )}
//       {showCopy && !day.isOffDay && (
//         <button onClick={onCopyPrev} className="mt-2 text-xs text-primary font-medium">
//           کپی از روز قبل
//         </button>
//       )}
//     </div>
//   );
// }

// // ─── Exception Day Row ────────────────────────────────────────────────────────
// function ExceptionDayRow({ ex, index, onChange, onRemove }: {
//   ex: ExceptionDay; index: number; onChange: (d: ExceptionDay) => void; onRemove: () => void;
// }) {
//   return (
//     <div className="bg-amber-50 rounded-xl p-4 mb-3 border border-amber-100" dir="rtl">
//       <div className="flex items-center justify-between mb-3">
//         <button onClick={onRemove} className="text-red-400 text-xs">حذف</button>
//         <p className="text-sm font-semibold text-gray-700">روز استثنا {index + 1}</p>
//       </div>
//       <div className="mb-3">
//         <DateField label="تاریخ" value={ex.date} onChange={(v) => onChange({ ...ex, date: v })} />
//       </div>
//       <div className="flex gap-3">
//         <TimeField
//           label="خروج" value={ex.time[0]?.endTime ?? ""}
//           onChange={(v) => onChange({ ...ex, time: [{ ...ex.time[0], endTime: v }] })}
//         />
//         <TimeField
//           label="ورود" value={ex.time[0]?.startTime ?? ""}
//           onChange={(v) => onChange({ ...ex, time: [{ ...ex.time[0], startTime: v }] })}
//         />
//       </div>
//     </div>
//   );
// }

// // ─── Shift Form ───────────────────────────────────────────────────────────────
// function ShiftForm({ initial, onSubmit, submitting, submitLabel }: {
//   initial: Partial<IShift>;
//   onSubmit: (v: ShiftPayload) => void;
//   submitting: boolean;
//   submitLabel: string;
// }) {
//   const [name, setName] = useState(initial.shiftName ?? "");
//   const [period, setPeriod] = useState(String(initial.shiftDays?.length ?? 0));
//   const [startDate, setStartDate] = useState(initial.startDate ?? "");
//   const [endDate, setEndDate] = useState(initial.endDate ?? "");
//   const [formalHolidays, setFormalHolidays] = useState(initial.formalHolidays ?? false);
//   const [shiftDays, setShiftDays] = useState<ShiftDay[]>(initial.shiftDays ?? []);
//   const [exceptionDays, setExceptionDays] = useState<ExceptionDay[]>(initial.exceptionDays ?? []);
//   const [error, setError] = useState("");

//   const generateDays = () => {
//     const n = parseInt(period);
//     if (!n || n <= 0) return;
//     setShiftDays(
//       Array.from({ length: n }, (_, i) => ({
//         day: i + 1,
//         isOffDay: false,
//         time: [{ startTime: "08:00", endTime: "17:00" }],
//       }))
//     );
//   };

//   const handleSubmit = () => {
//     if (!name || !startDate || !endDate) { setError("نام، تاریخ شروع و پایان الزامی است"); return; }
//     setError("");
//     onSubmit({ shiftName: name, startDate, endDate, formalHolidays, shiftDays, exceptionDays });
//   };

//   return (
//     <div dir="rtl">
//       <TextField label="عنوان شیفت" value={name} onChange={setName} placeholder="مثلاً: شیفت صبح" />
//       <TextField label="تعداد روز شیفت" value={period} onChange={setPeriod} placeholder="مثلاً: 7" type="number" />

//       <div className="flex gap-3 mb-4">
//         <DateField label="تاریخ پایان" value={endDate} onChange={setEndDate} />
//         <DateField label="تاریخ شروع" value={startDate} onChange={setStartDate} />
//       </div>

//       <label className="flex items-center gap-2 mb-5 text-sm text-gray-600">
//         <input
//           type="checkbox" checked={formalHolidays}
//           onChange={(e) => setFormalHolidays(e.target.checked)} className="accent-primary"
//         />
//         تبعیت از تعطیلات رسمی
//       </label>

//       <button
//         onClick={generateDays}
//         className="w-full border-2 border-dashed border-primary/40 text-primary text-sm font-medium py-3 rounded-xl mb-5"
//       >
//         ساخت روزهای شیفت
//       </button>

//       {shiftDays.length > 0 && (
//         <>
//           <div className="flex items-center gap-2 mb-3">
//             <div className="flex-1 h-px bg-gray-200" />
//             <span className="text-xs text-gray-400">روزهای شیفت</span>
//             <div className="flex-1 h-px bg-gray-200" />
//           </div>
//           {shiftDays.map((day, i) => (
//             <ShiftDayRow
//               key={i} day={day}
//               onChange={(d) => setShiftDays((prev) => prev.map((x, j) => (j === i ? d : x)))}
//               onCopyPrev={() => {
//                 if (i === 0) return;
//                 setShiftDays((prev) =>
//                   prev.map((x, j) => (j === i ? { ...x, time: [...prev[i - 1].time] } : x))
//                 );
//               }}
//               showCopy={i > 0}
//             />
//           ))}
//         </>
//       )}

//       {shiftDays.length > 0 && (
//         <>
//           <div className="flex items-center gap-2 my-3">
//             <div className="flex-1 h-px bg-gray-200" />
//             <span className="text-xs text-gray-400">روزهای استثنا</span>
//             <div className="flex-1 h-px bg-gray-200" />
//           </div>
//           {exceptionDays.map((ex, i) => (
//             <ExceptionDayRow
//               key={i} ex={ex} index={i}
//               onChange={(d) => setExceptionDays((prev) => prev.map((x, j) => (j === i ? d : x)))}
//               onRemove={() => setExceptionDays((prev) => prev.filter((_, j) => j !== i))}
//             />
//           ))}
//           <button
//             onClick={() =>
//               setExceptionDays((prev) => [...prev, { date: "", time: [{ startTime: "08:00", endTime: "17:00" }] }])
//             }
//             className="flex items-center gap-2 text-sm text-emerald-600 font-medium mb-5"
//           >
//             <PlusIcon className="w-4 h-4" /> افزودن روز استثنا
//           </button>
//         </>
//       )}

//       {error && <p className="text-red-500 text-xs text-right mb-3">{error}</p>}

//       {shiftDays.length > 0 && (
//         <button
//           onClick={handleSubmit} disabled={submitting}
//           className="w-full bg-primary text-white py-3.5 rounded-xl font-medium flex items-center justify-center gap-2"
//         >
//           {submitLabel}
//         </button>
//       )}
//     </div>
//   );
// }

// // ─── Page ─────────────────────────────────────────────────────────────────────
// export default function ShiftPage() {
//   const [searchInput, setSearchInput] = useState("");
//   const [search, setSearch] = useState("");
//   const [menuOpen, setMenuOpen] = useState<string | null>(null);
//   const [addOpen, setAddOpen] = useState(false);
//   const [editTarget, setEditTarget] = useState<IShift | null>(null);
//   const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

//   useEffect(() => {
//     const t = setTimeout(() => setSearch(searchInput), 400);
//     return () => clearTimeout(t);
//   }, [searchInput]);

//   const {
//     data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage,
//   } = useInfiniteShifts(search);
//   const createShift = useCreateShift();
//   const updateShift = useUpdateShift();
//   const deleteShift = useDeleteShift();

//   const shifts: IShift[] = useMemo(() => data?.items ?? [], [data]);

//   const loadMore = useCallback(() => {
//     if (hasNextPage && !isFetchingNextPage) fetchNextPage();
//   }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

//   const sentinelRef = useInfiniteScrollTrigger(loadMore, hasNextPage ?? false);

//   const handleAdd = (payload: ShiftPayload) => {
//     createShift.mutate(payload, { onSuccess: () => setAddOpen(false) });
//   };

//   const handleEdit = (payload: ShiftPayload) => {
//     if (!editTarget) return;
//     updateShift.mutate({ id: editTarget._id, payload }, { onSuccess: () => setEditTarget(null) });
//   };

//   const handleDelete = () => {
//     if (!deleteTarget) return;
//     deleteShift.mutate(deleteTarget, { onSuccess: () => setDeleteTarget(null) });
//   };

//   return (
//     <div dir="rtl" className="flex flex-col min-h-full bg-gray-50">
//       <div className="bg-white px-5 pt-6 pb-4 shadow-sm sticky top-0 z-10">
//         <p className="text-base font-bold text-gray-800 text-right mb-4">شیفت‌ها</p>
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
//         ) : shifts.length === 0 ? (
//           <div className="flex flex-col items-center pt-20 gap-3">
//             <Clock className="w-12 h-12 text-gray-200" />
//             <p className="text-gray-400 text-sm">شیفتی یافت نشد</p>
//           </div>
//         ) : (
//           shifts.map((shift) => (
//             <div key={shift._id} dir="rtl" className="bg-white rounded-2xl px-4 py-4 mb-3 shadow-sm border border-gray-100">
//                             <div className="flex items-start gap-2">
//                 <div className="relative">
//                   <button
//                     onClick={() => setMenuOpen(menuOpen === shift._id ? null : shift._id)}
//                     className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100"
//                   >
//                     <MoreVertical className="w-4 h-4 text-gray-400" />
//                   </button>
//                   {menuOpen === shift._id && (
//                     <div className="absolute right-0 top-9 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-40 min-w-[130px]">     
//                                      <button
//                         onClick={() => { setEditTarget(shift); setMenuOpen(null); }}
//                         className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 w-full"
//                       >
//                         <Pencil className="w-3.5 h-3.5" /> ویرایش
//                       </button>
//                       <button
//                         onClick={() => { setDeleteTarget(shift._id); setMenuOpen(null); }}
//                         className="flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-50 w-full"
//                       >
//                         <Trash2 className="w-3.5 h-3.5" /> حذف
//                       </button>
//                     </div>
//                   )}
//                 </div>

//                 <div className="flex-1 text-right">
//                   <p className="text-sm font-bold text-gray-800 mb-3">{shift.shiftName}</p>
//                   <div className="h-px bg-gray-100 mb-3" />
//                   <div className="flex justify-between">
//                     <div className="text-right">
//                       <p className="text-xs text-gray-400 mb-0.5">تا تاریخ</p>
//                       <p className="text-sm text-gray-600 font-medium">{toJalali(shift.endDate)}</p>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-xs text-gray-400 mb-0.5">از تاریخ</p>
//                       <p className="text-sm text-gray-600 font-medium">{toJalali(shift.startDate)}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center justify-end gap-2 mt-2">
//                     <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
//                       {shift.shiftDays.length} روز
//                     </span>
//                     {shift.formalHolidays && (
//                       <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
//                         تعطیلات رسمی
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}

//         {!isLoading && shifts.length > 0 && (
//           <div ref={sentinelRef} className="flex justify-center py-4">
//             {isFetchingNextPage && <Loader2 className="w-5 h-5 text-primary animate-spin" />}
//           </div>
//         )}
//       </div>

//       <FloatingAddButton onClick={() => setAddOpen(true)} />

//       <BottomSheet title="تعریف شیفت جدید" open={addOpen} onClose={() => setAddOpen(false)}>
//         <ShiftForm initial={{}} onSubmit={handleAdd} submitting={createShift.isPending} submitLabel="ثبت شیفت" />
//       </BottomSheet>

//       <BottomSheet title="ویرایش شیفت" open={!!editTarget} onClose={() => setEditTarget(null)}>
//         {editTarget && (
//           <ShiftForm
//             initial={editTarget} onSubmit={handleEdit}
//             submitting={updateShift.isPending} submitLabel="ویرایش شیفت"
//           />
//         )}
//       </BottomSheet>

//       <ConfirmDialog
//         open={!!deleteTarget}
//         onClose={() => setDeleteTarget(null)}
//         onConfirm={handleDelete}
//         loading={deleteShift.isPending}
//         title="آیا از حذف این شیفت اطمینان دارید؟"
//         variant="danger"
//       />
//     </div>
//   );
// }

import ShiftContainer from "@/components/customer/shift/ShiftContainer";

export default function ShiftPage() {
  return <ShiftContainer />;
}