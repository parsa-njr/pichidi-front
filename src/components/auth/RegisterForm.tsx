"use client";

import { useForm } from "react-hook-form";
import { Loader2, User, Phone, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignUp } from "@/api/auth/queries";

type RegisterFormValues = { name: string; phone: string; password: string };

const inputBase =
    "h-12 rounded-2xl bg-white/5 border border-white/10 text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary pr-10 text-right";

export default function RegisterForm() {
    const form = useForm<RegisterFormValues>({ defaultValues: { name: "", phone: "", password: "" } });
    const signUp = useSignUp();

    const onSubmit = (data: RegisterFormValues) => signUp.mutate(data);

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div className="relative">
                <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="نام و نام خانوادگی" {...form.register("name", { required: true })} className={inputBase} />
            </div>
            <div className="relative">
                <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="شماره موبایل" {...form.register("phone", { required: true })} className={inputBase} />
            </div>
            <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input type="password" placeholder="رمز عبور" {...form.register("password", { required: true })} className={inputBase} />
            </div>
            <Button disabled={signUp.isPending} className="w-full h-12 rounded-2xl bg-primary text-primary-foreground font-semibold mt-1">
                {signUp.isPending ? <Loader2 className="animate-spin w-5 h-5" /> : "ثبت‌نام"}
            </Button>
        </form>
    );
}