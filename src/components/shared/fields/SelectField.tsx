import { ChevronDown } from "lucide-react";

interface Option {
    value: string;
    label: string;
}

interface SelectFieldProps {
    label: string;
    value: string;
    onChange: (v: string) => void;
    options: Option[];
    placeholder: string;
}

export default function SelectField({ label, value, onChange, options, placeholder }: SelectFieldProps) {
    return (
        <div className="mb-4" dir="rtl">
            <label className="block text-xs text-gray-500 text-right mb-1.5">{label}</label>
            <div className="relative">
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-right text-sm text-gray-800 appearance-none focus:outline-none focus:border-primary"
                    dir="rtl"
                >
                    <option value="" disabled>{placeholder}</option>
                    {options.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                </select>
                <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
        </div>
    );
}