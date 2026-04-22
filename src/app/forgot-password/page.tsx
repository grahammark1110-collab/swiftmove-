"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://swiftmove-bice.vercel.app/admin/reset-password",
    });

    if (error) {
      setError("Something went wrong. Please try again.");
    } else {
      setSent(true);
    }
    setLoading(false);
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: "#0f172a", fontFamily: "'Segoe UI', system-ui, sans-serif" }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-sm relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="3" width="15" height="13" rx="2"/>
                <path d="M16 8h4l3 5v3h-7V8z"/>
                <circle cx="5.5" cy="18.5" r="2.5"/>
                <circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-extrabold text-white mb-1">Reset Password</h1>
          <p className="text-gray-500 text-sm">Enter your admin email to receive a reset link</p>
        </div>

        {/* Card */}
        <div className="bg-gray-800/80 backdrop-blur rounded-2xl border border-gray-700/50 p-8 shadow-2xl">
          {sent ? (
            // ── SUCCESS STATE ──
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h2 className="text-white font-bold text-lg">Check your email!</h2>
              <p className="text-gray-400 text-sm">
                We sent a password reset link to <span className="text-orange-400 font-semibold">{email}</span>. Check your inbox and click the link to reset your password.
              </p>
              <Link href="/admin"
                className="block w-full text-center bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-xl text-sm transition-colors mt-4">
                Back to Login
              </Link>
            </div>
          ) : (
            // ── FORM STATE ──
            <form onSubmit={handleReset} className="space-y-5">
              <div>
                <label className="block text-xs text-gray-400 mb-1.5 font-medium">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@swiftmove.com"
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-600"
                />
                {error && (
                  <div className="mt-2 flex items-center gap-2 text-red-400 text-xs">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    {error}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-orange-500/30 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                    </svg>
                    Sending...
                  </>
                ) : "Send Reset Link"}
              </button>

              <Link href="/admin"
                className="block text-center text-gray-500 hover:text-gray-300 text-sm transition-colors">
                ← Back to Login
              </Link>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}