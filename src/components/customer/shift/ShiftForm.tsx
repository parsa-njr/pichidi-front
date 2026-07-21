"use client";

import { useState } from "react";
import { Plus as PlusIcon } from "lucide-react";
import TextField from "@/components/shared/fields/TextField";
import DateField from "@/components/ui/DateField";
import ShiftDayRow from "./ShiftDayRow";
import ExceptionDayRow from "./ExceptionDayRow";
import { ShiftDay, ExceptionDay, ShiftPayload } from "@/api/customer/shift/api";

interface IShift extends ShiftPayload {
    _id: string;
}

interface ShiftFormProps {
    initial: Partial<IShift>;
    onSubmit: (v: ShiftPayload) => void;
    submitting: boolean;
    submitLabel: string;
}

export default function ShiftForm({ initial, onSubmit, submitting, submitLabel }: ShiftFormProps) {
    const [name, setName] = useState(initial.shiftName ?? "");
    const [period, setPeriod] = useState(String(initial.shiftDays?.length ?? 0));
    const [startDate, setStartDate] = useState(initial.startDate ?? "");
    const [endDate, setEndDate] = useState(initial.endDate ?? "");
    const [formalHolidays, setFormalHolidays] = useState(initial.formalHolidays ?? false);
    const [shiftDays, setShiftDays] = useState<ShiftDay[]>(initial.shiftDays ?? []);
    const [exceptionDays, setExceptionDays] = useState<ExceptionDay[]>(initial.exceptionDays ?? []);
    const [error, setError] = useState("");

    const generateDays = () => {
        const n = parseInt(period);
        if (!n || n <= 0) return;
        setShiftDays(
            Array.from({ length: n }, (_, i) => ({
                day: i + 1,
                isOffDay: false,
                time: [{ startTime: "08:00", endTime: "17:00" }],
            }))
        );
    };

    const handleSubmit = () => {
        if (!name || !startDate || !endDate) { setError("نام، تاریخ شروع و پایان الزامی است"); return; }
        setError("");
        onSubmit({ shiftName: name, startDate, endDate, formalHolidays, shiftDays, exceptionDays });
    };

    return (
        <div dir="rtl">
            <TextField label="عنوان شیفت" value={name} onChange={setName} placeholder="مثلاً: شیفت صبح" />
            <TextField label="تعداد روز شیفت" value={period} onChange={setPeriod} placeholder="مثلاً: 7" type="number" />

            <div className="flex gap-3 mb-4">
                <DateField label="تاریخ شروع" value={startDate} onChange={setStartDate} />
                <DateField label="تاریخ پایان" value={endDate} onChange={setEndDate} />
            </div>

            <label className="flex items-center gap-2 mb-5 text-sm text-gray-600">
                <input
                    type="checkbox" checked={formalHolidays}
                    onChange={(e) => setFormalHolidays(e.target.checked)} className="accent-primary"
                />
                تبعیت از تعطیلات رسمی
            </label>

            <button
                onClick={generateDays}
                className="w-full border-2 border-dashed border-primary/40 text-primary text-sm font-medium py-3 rounded-xl mb-5"
            >
                ساخت روزهای شیفت
            </button>

            {shiftDays.length > 0 && (
                <>
                    <div className="flex items-center gap-2 mb-3">
                        <div className="flex-1 h-px bg-gray-200" />
                        <span className="text-xs text-gray-400">روزهای شیفت</span>
                        <div className="flex-1 h-px bg-gray-200" />
                    </div>
                    {shiftDays.map((day, i) => (
                        <ShiftDayRow
                            key={i} day={day}
                            onChange={(d) => setShiftDays((prev) => prev.map((x, j) => (j === i ? d : x)))}
                            onCopyPrev={() => {
                                if (i === 0) return;
                                setShiftDays((prev) =>
                                    prev.map((x, j) => (j === i ? { ...x, time: [...prev[i - 1].time] } : x))
                                );
                            }}
                            showCopy={i > 0}
                        />
                    ))}
                </>
            )}

            {shiftDays.length > 0 && (
                <>
                    <div className="flex items-center gap-2 my-3">
                        <div className="flex-1 h-px bg-gray-200" />
                        <span className="text-xs text-gray-400">روزهای استثنا</span>
                        <div className="flex-1 h-px bg-gray-200" />
                    </div>
                    {exceptionDays.map((ex, i) => (
                        <ExceptionDayRow
                            key={i} ex={ex} index={i}
                            onChange={(d) => setExceptionDays((prev) => prev.map((x, j) => (j === i ? d : x)))}
                            onRemove={() => setExceptionDays((prev) => prev.filter((_, j) => j !== i))}
                        />
                    ))}
                    <button
                        onClick={() =>
                            setExceptionDays((prev) => [...prev, { date: "", time: [{ startTime: "08:00", endTime: "17:00" }] }])
                        }
                        className="flex items-center gap-2 text-sm text-emerald-600 font-medium mb-5"
                    >
                        <PlusIcon className="w-4 h-4" /> افزودن روز استثنا
                    </button>
                </>
            )}

            {error && <p className="text-red-500 text-xs text-right mb-3">{error}</p>}

            {shiftDays.length > 0 && (
                <button
                    onClick={handleSubmit} disabled={submitting}
                    className="w-full bg-primary text-white py-3.5 rounded-xl font-medium flex items-center justify-center gap-2"
                >
                    {submitLabel}
                </button>
            )}
        </div>
    );
}