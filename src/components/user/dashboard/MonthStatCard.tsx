interface MonthStatCardProps {
    value: number | string;
    label: string;
    color: string;
    delay: number;
}

export default function MonthStatCard({ value, label, color, delay }: MonthStatCardProps) {
    return (
        <div
            className="flex-1 bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col items-center animate-in fade-in-0 slide-in-from-bottom-2"
            style={{ animationDelay: `${delay}ms`, animationFillMode: "backwards" }}
        >
            <p className={`text-2xl font-bold mb-1 ${color}`}>{value}</p>
            <p className="text-xs text-gray-400 text-center">{label}</p>
        </div>
    );
}