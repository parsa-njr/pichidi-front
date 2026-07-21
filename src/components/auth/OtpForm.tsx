"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2, Phone, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSendOtp, useVerifyOtp } from "@/api/auth/queries";

type OtpFormValues = { phone: string; code: string };

const inputBase =
    "h-12 rounded-2xl bg-white/5 border border-white/10 text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary pr-10 text-right";

export default function OtpForm() {
    const [otpSent, setOtpSent] = useState(false);
    const [otpTimer, setOtpTimer] = useState(0);

    const form = useForm<OtpFormValues>({ defaultValues: { phone: "", code: "" } });
    const sendOtp = useSendOtp();
    const verifyOtp = useVerifyOtp();

    const handleSendOtp = () => {
        const phone = form.getValues("phone");
        if (!phone) {
            form.setError("phone", { message: "شماره موبایل را وارد کنید" });
            return;
        }
        sendOtp.mutate(
            { phone },
            {
                onSuccess: () => {
                    setOtpSent(true);
                    let t = 120;
                    setOtpTimer(t);
                    const iv = setInterval(() => {
                        t -= 1;
                        setOtpTimer(t);
                        if (t <= 0) clearInterval(iv);
                    }, 1000);
                },
            }
        );
    };

    const onVerify = (data: OtpFormValues) => verifyOtp.mutate(data);

    return (
        <form onSubmit={form.handleSubmit(onVerify)} className="space-y-3">
            <div className="relative">
                <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="شماره موبایل" {...form.register("phone", { required: true })} className={inputBase} />
            </div>

            {otpSent && (
                <div className="relative">
                    <KeyRound className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="کد تایید" maxLength={6} {...form.register("code", { required: true })} className={inputBase} />
                </div>
            )}

            {!otpSent ? (
                <Button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={sendOtp.isPending}
                    className="w-full h-12 rounded-2xl bg-secondary text-secondary-foreground border border-border"
                >
                    {sendOtp.isPending ? <Loader2 className="animate-spin w-5 h-5" /> : "ارسال کد تایید"}
                </Button>
            ) : (
                <>
                    <Button disabled={verifyOtp.isPending} className="w-full h-12 rounded-2xl bg-primary text-primary-foreground font-semibold">
                        {verifyOtp.isPending ? <Loader2 className="animate-spin w-5 h-5" /> : "تایید کد"}
                    </Button>
                    {otpTimer > 0 ? (
                        <p className="text-center text-xs text-muted-foreground">
                            ارسال مجدد تا <span className="text-primary">{otpTimer}</span> ثانیه دیگر
                        </p>
                    ) : (
                        <button type="button" onClick={handleSendOtp} className="text-primary text-xs w-full text-center">
                            ارسال مجدد کد
                        </button>
                    )}
                </>
            )}
        </form>
    );
}