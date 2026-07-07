"use client";

import { useEffect, useState } from "react";
import { X, AlertTriangle, Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import AppPortal from "./AppPortal";

// ─────────────────────────────────────────────────────────────────────────────
// BottomSheet
// ─────────────────────────────────────────────────────────────────────────────
interface BottomSheetProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    maxHeight?: string; // default "85%"
}

export function BottomSheet({
    open,
    onClose,
    title,
    children,
    maxHeight = "85%",
}: BottomSheetProps) {
    const [visible, setVisible] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (open) {
            setVisible(true);
            // یه frame صبر می‌کنیم تا DOM mount بشه بعد انیمیشن شروع بشه
            requestAnimationFrame(() => requestAnimationFrame(() => setShow(true)));
        } else {
            setShow(false);
            const t = setTimeout(() => setVisible(false), 300);
            return () => clearTimeout(t);
        }
    }, [open]);

    if (!visible) return null;

    return (
        <AppPortal>
            {/* Overlay — absolute نه fixed */}
            <div
                className={cn(
                    "absolute inset-0 z-40 transition-opacity duration-300",
                    show ? "opacity-100 bg-black/40" : "opacity-0 bg-black/0"
                )}
                onClick={onClose}
            />

            {/* Sheet — absolute bottom نه fixed */}
            <div
                className={cn(
                    "absolute bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl",
                    "transition-transform duration-300 ease-out",
                    "flex flex-col",
                    show ? "translate-y-0" : "translate-y-full"
                )}
                style={{ maxHeight }}
            >
                {/* Drag handle */}
                <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
                    <div className="w-10 h-1 bg-gray-200 rounded-full" />
                </div>

                {/* Header */}
                {title && (
                    <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 flex-shrink-0">
                        <button
                            onClick={onClose}
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                        >
                            <X className="w-4 h-4 text-gray-400" />
                        </button>
                        <p className="text-base font-semibold text-gray-700">{title}</p>
                        <div className="w-8" />
                    </div>
                )}

                {/* Scrollable content */}
                <div className="overflow-y-auto flex-1 px-5 py-4 pb-6">
                    {children}
                </div>
            </div>
        </AppPortal>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// CenterModal (برای dialog های وسط صفحه)
// ─────────────────────────────────────────────────────────────────────────────
interface CenterModalProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export function CenterModal({ open, onClose, children }: CenterModalProps) {
    const [visible, setVisible] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (open) {
            setVisible(true);
            requestAnimationFrame(() => requestAnimationFrame(() => setShow(true)));
        } else {
            setShow(false);
            const t = setTimeout(() => setVisible(false), 200);
            return () => clearTimeout(t);
        }
    }, [open]);

    if (!visible) return null;

    return (
        <AppPortal>
            {/* Overlay */}
            <div
                className={cn(
                    "absolute inset-0 z-40 transition-opacity duration-200",
                    show ? "opacity-100 bg-black/40" : "opacity-0 bg-black/0"
                )}
                onClick={onClose}
            />

            {/* Dialog box — pointer-events-none روی wrapper تا کلیک به overlay برسه */}
            <div className="absolute inset-0 z-50 flex items-center justify-center px-6 pointer-events-none">
                <div
                    className={cn(
                        "bg-white rounded-2xl p-6 w-full shadow-xl pointer-events-auto",
                        "transition-all duration-200",
                        show ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    )}
                >
                    {children}
                </div>
            </div>
        </AppPortal>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// ConfirmDialog
// ─────────────────────────────────────────────────────────────────────────────
interface ConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading?: boolean;
    title: string;
    confirmText?: string;
    cancelText?: string;
    variant?: "danger" | "warning" | "primary";
}

export function ConfirmDialog({
    open,
    onClose,
    onConfirm,
    loading = false,
    title,
    confirmText = "بله",
    cancelText = "خیر",
    variant = "warning",
}: ConfirmDialogProps) {
    const colors = {
        danger: { icon: "text-red-500", bg: "bg-red-50", btn: "bg-red-500" },
        warning: { icon: "text-amber-500", bg: "bg-amber-50", btn: "bg-amber-500" },
        primary: { icon: "text-primary", bg: "bg-primary/10", btn: "bg-primary" },
    }[variant];

    return (
        <CenterModal open={open} onClose={onClose}>
            <div className="flex justify-center mb-4">
                <div className={cn("w-14 h-14 rounded-full flex items-center justify-center", colors.bg)}>
                    <AlertTriangle className={cn("w-7 h-7", colors.icon)} />
                </div>
            </div>

            <p className="text-center text-base font-semibold text-gray-800 mb-6 leading-7">
                {title}
            </p>

            <div className="flex gap-3">
                <button
                    onClick={onClose}
                    className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 active:bg-gray-50"
                >
                    {cancelText}
                </button>
                <button
                    onClick={onConfirm}
                    disabled={loading}
                    className={cn(
                        "flex-1 py-3 rounded-xl text-white text-sm font-medium",
                        "flex items-center justify-center gap-2 active:opacity-80",
                        colors.btn
                    )}
                >
                    {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                    {confirmText}
                </button>
            </div>
        </CenterModal>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Toast
// ─────────────────────────────────────────────────────────────────────────────
interface ToastProps {
    msg: string;
    type: "success" | "error";
    onClose: () => void;
}

export function Toast({ msg, type, onClose }: ToastProps) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        requestAnimationFrame(() => requestAnimationFrame(() => setShow(true)));
        const t = setTimeout(() => {
            setShow(false);
            setTimeout(onClose, 300);
        }, 3000);
        return () => clearTimeout(t);
    }, [onClose]);

    return (
        <AppPortal>
            <div className="absolute top-0 left-0 right-0 z-[60] flex justify-center px-4 pt-4 pointer-events-none">
                <div
                    className={cn(
                        "flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-white text-sm font-medium",
                        "transition-all duration-300 pointer-events-auto w-full max-w-sm",
                        type === "success" ? "bg-emerald-500" : "bg-red-500",
                        show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                    )}
                >
                    {type === "success"
                        ? <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                        : <X className="w-4 h-4 flex-shrink-0" />
                    }
                    <span className="flex-1 text-right">{msg}</span>
                </div>
            </div>
        </AppPortal>
    );
}