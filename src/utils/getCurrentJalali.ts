export function getCurrentJalali() {
    const parts = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "numeric",
        calendar: "persian",
    }).formatToParts(new Date());

    const year = parts.find((p) => p.type === "year")?.value ?? "";
    const month = (parts.find((p) => p.type === "month")?.value ?? "").padStart(2, "0");

    return { year, month };
}