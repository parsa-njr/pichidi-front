"use client";

const FILTERS = [
    { key: "all", label: "همه" },
    { key: "pending", label: "در انتظار" },
    { key: "accepted", label: "پذیرفته" },
    { key: "rejected", label: "رد شده" },
] as const;

export type RequestFilterKey = (typeof FILTERS)[number]["key"];

interface RequestFilterChipsProps {
    active: RequestFilterKey;
    onChange: (key: RequestFilterKey) => void;
}

export default function RequestFilterChips({ active, onChange }: RequestFilterChipsProps) {
    return (
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            {FILTERS.map((f) => (
                <button
                    key={f.key}
                    onClick={() => onChange(f.key)}
                    className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${active === f.key ? "bg-primary text-white" : "bg-gray-100 text-gray-600"
                        }`}
                >
                    {f.label}
                </button>
            ))}
        </div>
    );
}