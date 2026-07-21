import DateField from "@/components/ui/DateField";
import TimeField from "@/components/shared/fields/TimeField";
import { ExceptionDay } from "@/api/customer/shift/api";

interface ExceptionDayRowProps {
    ex: ExceptionDay;
    index: number;
    onChange: (d: ExceptionDay) => void;
    onRemove: () => void;
}

export default function ExceptionDayRow({ ex, index, onChange, onRemove }: ExceptionDayRowProps) {
    return (
        <div className="bg-amber-50 rounded-xl p-4 mb-3 border border-amber-100" dir="rtl">
            <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-gray-700">روز استثنا {index + 1}</p>
                <button onClick={onRemove} className="text-red-400 text-xs">حذف</button>
            </div>
            <div className="mb-3">
                <DateField label="تاریخ" value={ex.date} onChange={(v) => onChange({ ...ex, date: v })} />
            </div>
            <div className="flex gap-3">
                <TimeField
                    label="ورود" value={ex.time[0]?.startTime ?? ""}
                    onChange={(v) => onChange({ ...ex, time: [{ ...ex.time[0], startTime: v }] })}
                />
                <TimeField
                    label="خروج" value={ex.time[0]?.endTime ?? ""}
                    onChange={(v) => onChange({ ...ex, time: [{ ...ex.time[0], endTime: v }] })}
                />
               
            </div>
        </div>
    );
}