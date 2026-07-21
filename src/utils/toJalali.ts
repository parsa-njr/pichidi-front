export function toJalali(iso: string) {
    if (!iso) return "—";
    try {
        return new Intl.DateTimeFormat("fa-IR", {
            year: "numeric", month: "2-digit", day: "2-digit", calendar: "persian",
        }).format(new Date(iso));
    } catch { return iso.slice(0, 10); }
}