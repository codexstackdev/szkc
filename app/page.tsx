"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Check,
  CheckCircle2Icon,
  Eye,
  EyeOff,
  KeyRound,
  Layers3,
  LockKeyhole,
  Package,
  ShieldCheck,
  Truck,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { register } from "@/hooks/actions";

const page = () => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepassword, setShowRespassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [credData, setCredData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    ext: "",
    email: "",
    password: "",
    rePassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredData((prev) => ({ ...prev, [name]: value }));
  };

  const isRegistering = mode === "register";

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!isRegistering) {
      toast.info("Sign-in will be connected after registration.");
      return;
    }
    try {
      setLoading(true);
      if (credData.password.length < 8) {
        toast.error("Password is too short");
        return;
      }
      if (credData.rePassword !== credData.password) {
        toast.error("Password doesn't match");
        return;
      }
      const data = await register(
        credData.firstName,
        credData.middleName,
        credData.lastName,
        credData.ext,
        credData.email,
        credData.password,
      );
      if (data.success) {
        toast.success(data.message);
        setSubmitted(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Registration failed.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-svh bg-background text-foreground">
      <div className="mx-auto grid min-h-svh max-w-[1600px] grid-cols-1 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="relative hidden overflow-hidden bg-foreground p-8 text-background lg:flex lg:flex-col lg:justify-between xl:p-12">
          <div className="absolute -right-32 -top-32 size-96 rounded-full border border-background/10" />
          <div className="absolute -bottom-44 -left-40 size-120 rounded-full border border-background/10" />
          <div className="absolute left-1/2 top-1/2 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />

          <div className="relative z-10 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
              <Layers3 className="size-5" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-semibold uppercase tracking-tight">
              szkc
            </span>
          </div>

          <div className="relative z-10 max-w-xl">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-background/15 bg-background/10 px-3 py-1.5 text-xs font-medium text-background/75 backdrop-blur-sm">
              <ShieldCheck className="size-3.5 text-primary" />
              Internal operations portal
            </div>
            <h1 className="max-w-xl text-5xl font-semibold leading-[1.02] tracking-[-0.055em] xl:text-6xl">
              One command center for every business unit.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-background/65">
              Sign in to oversee products, inventory, customers, and
              transactions across the organizations that keep SZKC moving.
            </p>

            <div className="mt-10 grid max-w-lg grid-cols-3 gap-3">
              <div className="rounded-2xl border border-background/10 bg-background/5 p-4 backdrop-blur-sm">
                <Truck className="mb-8 size-5 text-primary" />
                <p className="text-sm font-medium text-background">Vehicles</p>
                <p className="mt-1 text-xs text-background/50">Operations</p>
              </div>
              <div className="rounded-2xl border border-background/10 bg-background/5 p-4 backdrop-blur-sm">
                <Wrench className="mb-8 size-5 text-primary" />
                <p className="text-sm font-medium text-background">
                  Instruments
                </p>
                <p className="mt-1 text-xs text-background/50">
                  Product control
                </p>
              </div>
              <div className="rounded-2xl border border-background/10 bg-background/5 p-4 backdrop-blur-sm">
                <Package className="mb-8 size-5 text-primary" />
                <p className="text-sm font-medium text-background">
                  Appliances
                </p>
                <p className="mt-1 text-xs text-background/50">Inventory</p>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between border-t border-background/10 pt-5 text-xs text-background/45">
            <span>© 2025 - {new Date().getFullYear()} SZKC</span>
            <span className="flex items-center gap-2">
              <LockKeyhole className="size-3.5" />
              Secure access
            </span>
          </div>
        </section>

        <section className="flex min-h-svh items-start justify-center px-4 py-5 sm:px-8 sm:py-10 lg:items-center lg:px-12 xl:px-20">
          <div className="w-full max-w-xl">
            <div className="mb-8 flex items-center justify-between lg:hidden">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
                  <Layers3 className="size-5" strokeWidth={2.5} />
                </div>
                <div>
                  <span className="block text-lg font-semibold uppercase leading-none tracking-tight">
                    szkc
                  </span>
                  <span className="mt-1 block text-xs text-muted-foreground">
                    Operations portal
                  </span>
                </div>
              </div>
              <div className="flex size-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground">
                <ShieldCheck className="size-4" />
              </div>
            </div>

            <div className="mb-7 sm:mb-8">
              <p className="mb-3 text-sm font-medium text-primary">
                {isRegistering ? "Set up internal access" : "Welcome back"}
              </p>
              <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                {isRegistering
                  ? "Create your admin profile."
                  : "Sign in to your workspace."}
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
                {isRegistering
                  ? "Create your account to work with products, inventory, and transactions across SZKC organizations."
                  : "Use your credentials to manage your assigned organizations and operations."}
              </p>
            </div>

            <div className="mb-6 grid min-h-12 grid-cols-2 rounded-xl border border-border bg-muted p-1">
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setSubmitted(false);
                }}
                className={`min-h-10 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 ${!isRegistering ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                Sign in
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("register");
                  setSubmitted(false);
                }}
                className={`min-h-10 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 ${isRegistering ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                Register
              </button>
            </div>

            <Card className="border-border bg-card shadow-xl shadow-foreground/5">
              <CardContent className="p-5 sm:p-7">
                <form className="space-y-5" onSubmit={handleSubmit}>
                  {isRegistering && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                        <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                          1
                        </span>
                        Personal details
                      </div>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        <div className="col-span-2 space-y-2 sm:col-span-1">
                          <Label htmlFor="firstName">First name</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={credData.firstName}
                            onChange={handleChange}
                            placeholder="Jane"
                            autoComplete="given-name"
                            required
                            className="h-12 bg-background"
                          />
                        </div>
                        <div className="col-span-2 space-y-2 sm:col-span-1">
                          <Label htmlFor="middleName">Middle name</Label>
                          <Input
                            id="middleName"
                            name="middleName"
                            value={credData.middleName}
                            onChange={handleChange}
                            placeholder="Marie"
                            autoComplete="additional-name"
                            required
                            className="h-12 bg-background"
                          />
                        </div>
                        <div className="col-span-2 space-y-2 sm:col-span-1">
                          <Label htmlFor="lastName">Last name</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            placeholder="Doe"
                            value={credData.lastName}
                            onChange={handleChange}
                            autoComplete="family-name"
                            required
                            className="h-12 bg-background"
                          />
                        </div>
                        <div className="col-span-2 space-y-2 sm:col-span-1">
                          <Label htmlFor="ext">
                            Ext.{" "}
                            <span className="font-normal text-muted-foreground">
                              (optional)
                            </span>
                          </Label>
                          <Input
                            id="ext"
                            name="ext"
                            value={credData.ext}
                            onChange={handleChange}
                            placeholder="Jr"
                            autoComplete="honorific-suffix"
                            className="h-12 bg-background"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {isRegistering && <div className="h-px bg-border" />}

                  <div className="space-y-2">
                    {isRegistering && (
                      <div className="mb-1 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                        <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                          2
                        </span>
                        Account credentials
                      </div>
                    )}
                    <Label htmlFor="email">Email address</Label>
                    <Input
                      id="email"
                      name="email"
                      value={credData.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="you@szkc.com"
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
                          className="min-h-11 px-1 text-xs font-medium text-primary transition-colors hover:text-primary/80"
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
                        className="h-12 bg-background pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((value) => !value)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        className="absolute right-1 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </button>
                    </div>
                    {isRegistering && (
                      <div className="flex items-center gap-2">
                        {" "}
                        {credData.password.length >= 8 && (
                          <CheckCircle2Icon
                            className="text-green-500"
                            size={10}
                          />
                        )}{" "}
                        <p className="text-xs text-muted-foreground">
                          Use at least 8 characters.{" "}
                        </p>
                      </div>
                    )}
                  </div>

                  {isRegistering && (
                    <div className="space-y-2">
                      <Label htmlFor="rePassword">Confirm password</Label>
                      <div className="relative">
                        <Input
                          id="rePassword"
                          name="rePassword"
                          value={credData.rePassword}
                          onChange={handleChange}
                          type={showRepassword ? "text" : "password"}
                          placeholder="Re-enter your password"
                          required
                          className="h-12 bg-background pr-12"
                        />
                        <button
                          type="button"
                          onClick={() => setShowRespassword((value) => !value)}
                          aria-label={
                            showRepassword
                              ? "Hide confirmation password"
                              : "Show confirmation password"
                          }
                          className="absolute right-1 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                          {showRepassword ? (
                            <EyeOff className="size-4" />
                          ) : (
                            <Eye className="size-4" />
                          )}
                        </button>
                      </div>
                      {credData.rePassword.length >= 1 &&
                        credData.rePassword !== credData.password && (
                          <p className="text-sm text-destructive">
                            Password does not match.
                          </p>
                        )}
                    </div>
                  )}

                  {isRegistering && (
                    <label className="flex min-h-11 items-start gap-3 text-xs leading-5 text-muted-foreground">
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
                    disabled={loading || submitted}
                    type="submit"
                    className="group min-h-12 w-full rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 active:translate-y-0"
                  >
                    {submitted
                      ? "You're all set"
                      : loading
                        ? "Creating your account"
                        : isRegistering
                          ? "Create account"
                          : "Sign In"}

                    {submitted ? (
                      <Check className="ml-2 size-4" />
                    ) : (
                      <ArrowRight className="ml-2 size-4 transition-transform duration-200 group-hover:translate-x-1" />
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground sm:mt-7">
              <KeyRound className="size-3.5 shrink-0" />
              Your information is protected with secure encryption.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default page;
