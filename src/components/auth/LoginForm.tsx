"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/api/auth/queries";

type LoginFormValues = { phone: string; password: string };

const inputBase =
    "h-12 rounded-2xl bg-white/5 border border-white/10 text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary pr-10 text-right";

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const form = useForm<LoginFormValues>({ defaultValues: { phone: "", password: "" } });
    const login = useLogin();

    const onSubmit = (data: LoginFormValues) => login.mutate(data);

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="شماره موبایل" {...form.register("phone", { required: true })} className={inputBase} />
            </div>
            <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="رمز عبور"
                    {...form.register("password", { required: true })}
                    className={`${inputBase} pl-10`}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
            </div>
            <Button disabled={login.isPending} className="w-full h-12 rounded-2xl bg-primary text-primary-foreground font-semibold">
                {login.isPending ? <Loader2 className="animate-spin w-5 h-5" /> : "ورود"}
            </Button>
        </form>
    );
}