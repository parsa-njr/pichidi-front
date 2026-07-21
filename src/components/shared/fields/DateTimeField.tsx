"use client";

import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

interface DateTimeFieldProps {
    label: string;
    value: string;
    onChange: (v: string) => void;
}

export default function DateTimeField({ label, value, onChange }: DateTimeFieldProps) {
    return (
        <div className="flex-1" dir="rtl">
            <label className="block text-xs text-gray-500 text-right mb-1.5">{label}</label>
            <DatePicker
                calendar={persian}
                locale={persian_fa}
                value={value ? new Date(value) : undefined}
                onChange={(d: DateObject | null) => onChange(d ? d.toDate().toISOString() : "")}
                plugins={[<TimePicker key="time" hideSeconds />]}
                format="YYYY/MM/DD HH:mm"
                inputClass="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-sm text-right focus:outline-none focus:border-primary"
                containerClassName="w-full"
                calendarPosition="bottom-right"
                fixRelativePosition
            />
        </div>
    );
}