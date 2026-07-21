interface DetailRowProps {
    label: string;
    value?: string;
}

export default function DetailRow({ label, value }: DetailRowProps) {
    return (
        <div className="flex items-center justify-between border-b border-gray-100 py-2 last:border-0">
            <span className="text-sm text-gray-400">{label}:</span>
            <span className="text-sm text-gray-700 font-medium">{value ?? "—"}</span>
        </div>
    );
}