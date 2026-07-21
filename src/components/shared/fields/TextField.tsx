interface TextFieldProps {
    label: string;
    value: string;
    onChange: (v: string) => void;
    placeholder: string;
    type?: string;
}

export default function TextField({ label, value, onChange, placeholder, type = "text" }: TextFieldProps) {
    return (
        <div className="mb-4" dir="rtl">
            <label className="block text-xs text-gray-500 text-right mb-1.5">{label}</label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                dir="rtl"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-right text-sm text-gray-800 focus:outline-none focus:border-primary"
            />
        </div>
    );
}