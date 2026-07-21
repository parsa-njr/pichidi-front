interface FieldCardProps {
    label: string;
    icon: React.ElementType;
    children: React.ReactNode;
}

export default function FieldCard({ label, icon: Icon, children }: FieldCardProps) {
    return (
        <div dir="rtl" className="bg-white rounded-2xl p-5 mb-3 shadow-sm border border-gray-100">
            <div className="flex items-center justify-start gap-2 mb-3">
                <p className="text-sm text-gray-500 font-medium">{label}</p>
                <Icon className="w-4 h-4 text-gray-400" />
            </div>
            {children}
        </div>
    );
}