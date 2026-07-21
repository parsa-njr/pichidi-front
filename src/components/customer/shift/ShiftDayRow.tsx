import TimeField from "@/components/shared/fields/TimeField";
import { ShiftDay } from "@/api/customer/shift/api";

interface ShiftDayRowProps {
    day: ShiftDay;
    onChange: (d: ShiftDay) => void;
    onCopyPrev: () => void;
    showCopy: boolean;
}

export default function ShiftDayRow({ day, onChange, onCopyPrev, showCopy }: ShiftDayRowProps) {
    return (
        <div className="bg-gray-50 rounded-xl p-4 mb-3 border border-gray-100" dir="rtl">
            <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-gray-700 text-right">روز {day.day}</p>

                <label className="flex items-center gap-2 text-xs text-gray-500">
                    <input
                        type="checkbox" checked={day.isOffDay}
                        onChange={(e) => onChange({ ...day, isOffDay: e.target.checked })}
                        className="accent-primary"
                    />
                    روز تعطیل
                </label>
            </div>
            {!day.isOffDay && (
                <div className="flex gap-3">
                    <TimeField
                        label="ورود" value={day.time[0]?.startTime ?? ""}
                        onChange={(v) => onChange({ ...day, time: [{ ...day.time[0], startTime: v }] })}
                    />
                    <TimeField
                        label="خروج" value={day.time[0]?.endTime ?? ""}
                        onChange={(v) => onChange({ ...day, time: [{ ...day.time[0], endTime: v }] })}
                    />

                </div>
            )}
            {showCopy && !day.isOffDay && (
                <button onClick={onCopyPrev} className="mt-2 text-xs text-primary font-medium">
                    کپی از روز قبل
                </button>
            )}
        </div>
    );
}