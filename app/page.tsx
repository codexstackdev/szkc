"use client";
import React, { FormEvent, useState } from "react";
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const page = () => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepassword, setShowRespassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [credData, setCredData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    ext: "",
    email: "",
    password: "",
    rePassword: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredData((prev) => ({ ...prev, [name]: value }));
  };

  const isRegistering = mode === "register";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isRegistering) {
      toast.info("Sign-in will be connected after registration.");
      return;
    }
    try {
      const response = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credData),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      toast.success(result.message);
      setSubmitted(true);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Registration failed.");
    }
  };

  return (
    <main className="min-h-svh bg-background text-foreground">
      <div className="mx-auto grid min-h-svh max-w-360 grid-cols-1 lg:grid-cols-[0.92fr_1.08fr]">
        <section className="relative hidden overflow-hidden bg-foreground p-8 text-background lg:flex lg:flex-col lg:justify-between xl:p-12">
          <div className="absolute -right-28 -top-28 size-80 rounded-full border border-background/10" />
          <div className="absolute -bottom-40 -left-32 size-112 rounded-full border border-background/10" />
          <div className="absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />

          <div className="relative z-10 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
              <Smartphone className="size-5" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-semibold uppercase tracking-tight">
              szkc
            </span>
          </div>

          <div className="relative z-10 max-w-lg">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-background/15 bg-background/10 px-3 py-1.5 text-xs font-medium text-background/80 backdrop-blur-sm">
              <Sparkles className="size-3.5 text-primary" />
              Built for your next move
            </div>
            <h1 className="max-w-xl text-5xl font-semibold leading-[1.02] tracking-[-0.055em] xl:text-6xl">
              Your mobile world, in one place.
            </h1>
            <p className="mt-6 max-w-md text-base leading-7 text-background/65">
              Sign in to manage your devices, track orders, and keep your
              everyday tech moving with confidence.
            </p>

            <div className="mt-10 space-y-4">
              {[
                "Simple device management",
                "Fast, secure checkout",
                "Support that keeps up",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm text-background/80"
                >
                  <span className="flex size-5 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between border-t border-background/10 pt-5 text-xs text-background/45">
            <span>© 1992 - {new Date().getFullYear()} SZKC</span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="size-3.5" /> Secure access
            </span>
          </div>
        </section>

        <section className="flex min-h-svh items-center justify-center px-5 py-8 sm:px-8 lg:px-12 xl:px-20">
          <div className="w-full max-w-md">
            <div className="mb-10 flex items-center gap-3 lg:hidden">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
                <Smartphone className="size-5" strokeWidth={2.5} />
              </div>
              <span className="text-lg uppercase font-semibold tracking-tight">
                szkc
              </span>
            </div>

            <div className="mb-8">
              <p className="mb-3 text-sm font-medium text-primary">
                {isRegistering ? "Create your account" : "Welcome back"}
              </p>
              <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                {isRegistering
                  ? "Start your SZKC journey."
                  : "Good to see you again."}
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {isRegistering
                  ? "Join the easier way to shop, manage, and stay connected."
                  : "Enter your details to continue to your account."}
              </p>
            </div>

            <div className="mb-7 grid grid-cols-2 rounded-xl bg-muted p-1">
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setSubmitted(false);
                }}
                className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 ${!isRegistering ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                Sign in
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("register");
                  setSubmitted(false);
                }}
                className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 ${isRegistering ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                Register
              </button>
            </div>

            <Card className="border-border/70 bg-card shadow-xl shadow-foreground/5">
              <CardContent className="p-5 sm:p-7">
                <form className="space-y-5" onSubmit={handleSubmit}>
                  {isRegistering && (
                    <div className="space-y-2">
                      <Label htmlFor="name">First name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={credData.firstName}
                        onChange={handleChange}
                        placeholder="Jane"
                        autoComplete="name"
                        required
                        className="h-12 bg-background"
                      />
                      <Label htmlFor="name">Middle name</Label>
                      <Input
                        id="middleName"
                        name="middleName"
                        value={credData.middleName}
                        onChange={handleChange}
                        placeholder="Doe"
                        autoComplete="name"
                        required
                        className="h-12 bg-background"
                      />
                      <Label htmlFor="name">Last name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Does"
                        value={credData.lastName}
                        onChange={handleChange}
                        autoComplete="name"
                        required
                        className="h-12 bg-background"
                      />
                      <Label htmlFor="ext">Ext. (optional)</Label>
                      <Input
                        id="ext"
                        name="ext"
                        value={credData.ext}
                        onChange={handleChange}
                        placeholder="Jr"
                        autoComplete="name"
                        className="h-12 bg-background"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input
                      id="email"
                      name="email"
                      value={credData.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                      className="h-12 bg-background"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      {!isRegistering && (
                        <button
                          type="button"
                          className="text-xs font-medium text-primary transition-colors hover:text-primary/80"
                        >
                          Forgot password?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        value={credData.password}
                        onChange={handleChange}
                        type={showPassword ? "text" : "password"}
                        placeholder={
                          isRegistering
                            ? "Create a strong password"
                            : "Enter your password"
                        }
                        autoComplete={
                          isRegistering ? "new-password" : "current-password"
                        }
                        minLength={8}
                        required
                        className="h-12 bg-background pr-11"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((value) => !value)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </button>
                    </div>
                    {isRegistering && (
                      <p className="text-xs text-muted-foreground">
                        Use at least 8 characters.
                      </p>
                    )}
                  </div>

                  {isRegistering && (
                     <div className="relative">
                      <Label htmlFor="password">Confirm Password</Label>
                      <Input
                        id="rePassword"
                        name="rePassword"
                        value={credData.rePassword}
                        onChange={handleChange}
                        type={showRepassword ? "text" : "password"}
                        placeholder="*****"
                        required
                        className="h-12 bg-background pr-11 mt-2"
                      />
                      <button
                        type="button"
                        onClick={() => setShowRespassword((value) => !value)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        className="absolute right-3 top-9 text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {showRepassword ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </button>
                      {credData.rePassword.length > 1 && credData.rePassword !== credData.password && <Label className="mt-2 text-red-500" htmlFor="password">Password does not match</Label>}
                    </div>
                  )}

                  {isRegistering && (
                    <label className="flex items-start gap-3 text-xs leading-5 text-muted-foreground">
                      <input
                        type="checkbox"
                        required
                        className="mt-1 size-4 rounded border-input accent-primary"
                      />
                      <span>
                        I agree to the{" "}
                        <button
                          type="button"
                          className="font-medium text-foreground underline underline-offset-2"
                        >
                          Terms
                        </button>{" "}
                        and{" "}
                        <button
                          type="button"
                          className="font-medium text-foreground underline underline-offset-2"
                        >
                          Privacy Policy
                        </button>
                        .
                      </span>
                    </label>
                  )}

                  <Button
                    type="submit"
                    className="group h-12 w-full rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 active:translate-y-0"
                  >
                    {submitted
                      ? "You're all set"
                      : isRegistering
                        ? "Create account"
                        : "Sign in"}
                    {submitted ? (
                      <Check className="ml-2 size-4" />
                    ) : (
                      <ArrowRight className="ml-2 size-4 transition-transform duration-200 group-hover:translate-x-1" />
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="mt-7 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <LockKeyhole className="size-3.5" />
              Your information is protected with secure encryption.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default page;
