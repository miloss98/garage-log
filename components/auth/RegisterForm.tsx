"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  registerSchema,
  type RegisterFormData,
} from "@/lib/validations/auth.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Logo from "@/components/ui/Logo";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RegisterMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = RegisterMetadata;

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { full_name: "", email: "", password: "" },
  });

  async function onSubmit(data: RegisterFormData) {
    setLoading(true);
    setError(null);
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: { data: { full_name: data.full_name } },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a]  flex flex-col">
      {/* Header */}
      <div className="relative z-10 p-6">
        <Logo href="/" dark />
      </div>

      {/* Form */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-5 pb-16">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h1
              className="text-3xl font-bold text-[#f0f0f0] mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Create an account
            </h1>
            <p className="text-[#9a9a9a] text-sm">
              Start tracking your car maintenance today
            </p>
          </div>

          <div className="bg-[#242424] border border-[#333333] rounded-2xl p-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="full_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#c0c0c0]">
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          className="bg-[#2e2e2e] border-[#3d3d3d] text-[#f0f0f0] placeholder:text-[#707070] focus:border-amber-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#c0c0c0]">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          className="bg-[#2e2e2e] border-[#3d3d3d] text-[#f0f0f0] placeholder:text-[#707070] focus:border-amber-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#c0c0c0]">Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          className="bg-[#2e2e2e] border-[#3d3d3d] text-[#f0f0f0] placeholder:text-[#707070] focus:border-amber-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {error && (
                  <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg">
                    {error}
                  </p>
                )}
                <Button
                  type="submit"
                  className="w-full  h-10 flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={loading}
                >
                  {loading ? (
                    "Creating account..."
                  ) : (
                    <>
                      <span>Create account</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>

          <p className="text-center text-sm text-[#707070] mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-amber-400 hover:text-amber-300 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
