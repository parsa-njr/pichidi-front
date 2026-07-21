"use client";

import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DateObject from "react-date-object";

interface TimeFieldProps {
    label: string;
    value: string;
    onChange: (v: string) => void;
}

export default function TimeField({ label, value, onChange }: TimeFieldProps) {
    const dateValue = value
        ? new DateObject({ hour: Number(value.split(":")[0]), minute: Number(value.split(":")[1]) })
        : undefined;

    return (
        <div className="flex-1" dir="rtl">
            <label className="block text-xs text-gray-400 text-right mb-1">{label}</label>
            <DatePicker
                disableDayPicker
                format="HH:mm"
                plugins={[<TimePicker key="time" hideSeconds />]}
                value={dateValue}
                onChange={(d: DateObject | null) =>
                    onChange(d ? `${String(d.hour).padStart(2, "0")}:${String(d.minute).padStart(2, "0")}` : "")
                }
                inputClass="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-center focus:outline-none focus:border-primary"
                containerClassName="w-full"
                calendarPosition="bottom-right"
                fixMainPosition
            />
        </div>
    );
}