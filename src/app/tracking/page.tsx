"use client";
import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type StatusKey = "placed" | "preparing" | "transit" | "outfordelivery" | "delivered";

const STATUS_STEPS: { key: StatusKey; label: string; desc: string }[] = [
  { key: "placed",         label: "Order Placed",      desc: "Your booking has been received and confirmed." },
  { key: "preparing",      label: "Preparing to Ship", desc: "Your package is being carefully prepared for pickup." },
  { key: "transit",        label: "In Transit",        desc: "Your package is on its way to the destination." },
  { key: "outfordelivery", label: "Out for Delivery",  desc: "Your package is with the rider and arriving soon." },
  { key: "delivered",      label: "Delivered",         desc: "Your package has been delivered successfully." },
];

const GREEN = "#22c55e";

const stepIcons = [
  <svg key="placed" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  <svg key="preparing" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>,
  <svg key="transit" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
  <svg key="outfordelivery" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  <svg key="delivered" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
];

interface OrderResult {
  tracking_id: string;
  sender_name: string;
  sender_address: string;
  receiver_name: string;
  receiver_address: string;
  delivery_type: string;
  status: StatusKey;
  created_at: string;
  price: string;
}

export default function TrackingPage() {
  const [trackingId, setTrackingId] = useState("");
  const [result, setResult]         = useState<OrderResult | null>(null);
  const [searchedId, setSearchedId] = useState("");
  const [notFound, setNotFound]     = useState(false);
  const [loading, setLoading]       = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setNotFound(false);
    setResult(null);

    const id = trackingId.toUpperCase().trim();

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("tracking_id", id)
      .single();

    if (error || !data) {
      setNotFound(true);
    } else {
      setResult(data as OrderResult);
      setSearchedId(id);
    }

    setLoading(false);
  };

  const currentStepIndex = result
    ? STATUS_STEPS.findIndex((s) => s.key === result.status)
    : -1;

  const statusLabel =
    result?.status === "delivered"      ? "Delivered" :
    result?.status === "outfordelivery" ? "Out for Delivery" :
    result?.status === "transit"        ? "In Transit" :
    result?.status === "preparing"      ? "Preparing to Ship" :
    "Order Placed";

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col" style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* NAV */}
      <nav className="bg-white border-b border-gray-100 px-8 py-5 flex justify-between items-center shadow-sm sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
          </svg>
          <span className="text-xl font-bold text-gray-900">SwiftMove</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
          <Link href="/booking" className="hover:text-orange-500 transition-colors">Book Delivery</Link>
          <Link href="/tracking" className="text-orange-500 font-semibold">Track Package</Link>
        </div>
      </nav>

      <div className="flex-1 flex flex-col">

        {/* RESULT */}
        {result && (
          <div className="w-full flex-1 px-4 py-12 relative"
            style={{
              backgroundImage: `linear-gradient(rgba(15,15,15,0.72), rgba(15,15,15,0.72)), url('https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1600&q=85')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}>
            <div className="max-w-3xl mx-auto w-full">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

                {/* Header */}
                <div className="px-8 py-6 border-b border-gray-100">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Tracking ID</p>
                      <h2 className="text-2xl font-extrabold text-gray-900 font-mono tracking-wider">{searchedId}</h2>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400 mt-1">
                        <span>Booked: {new Date(result.created_at).toLocaleDateString()}</span>
                        <span>•</span>
                        <span className="capitalize">{result.delivery_type} Delivery</span>
                      </div>
                    </div>
                    <span className="text-sm font-bold px-4 py-2 rounded-full flex items-center gap-2"
                      style={{ background: `${GREEN}18`, color: GREEN }}>
                      <span className="w-2 h-2 rounded-full inline-block" style={{ background: GREEN }} />
                      {statusLabel}
                    </span>
                  </div>
                </div>

                <div className="p-8">

                  {/* FROM / TO */}
                  <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-5 mb-8">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">From</p>
                      <p className="font-bold text-gray-800 truncate">{result.sender_name}</p>
                      <p className="text-gray-500 text-sm truncate">{result.sender_address}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0 text-right">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">To</p>
                      <p className="font-bold text-gray-800 truncate">{result.receiver_name}</p>
                      <p className="text-gray-500 text-sm truncate">{result.receiver_address}</p>
                    </div>
                  </div>

                  {/* HORIZONTAL PROGRESS */}
                  <div className="mb-10">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">Delivery Progress</p>
                    <div className="flex items-center justify-between relative px-2">
                      <div className="absolute top-5 left-7 right-7 h-0.5 bg-gray-200 z-0" />
                      <div className="absolute top-5 left-7 h-0.5 z-0 transition-all duration-700"
                        style={{ background: GREEN, width: currentStepIndex === 0 ? "0%" : `${(currentStepIndex / (STATUS_STEPS.length - 1)) * 100}%` }} />
                      {STATUS_STEPS.map((step, i) => {
                        const isDone    = i < currentStepIndex;
                        const isCurrent = i === currentStepIndex;
                        const isFuture  = i > currentStepIndex;
                        return (
                          <div key={step.key} className="flex flex-col items-center z-10 relative group flex-1">
                            <div className="relative">
                              {isCurrent && (
                                <span className="absolute inset-0 rounded-full animate-ping" style={{ background: `${GREEN}50` }} />
                              )}
                              <div className="relative w-10 h-10 rounded-full flex items-center justify-center transition-all border-2"
                                style={{ background: isFuture ? "white" : GREEN, borderColor: isFuture ? "#e5e7eb" : GREEN, color: isFuture ? "#d1d5db" : "white" }}>
                                {stepIcons[i]}
                              </div>
                            </div>
                            <p className="text-xs font-semibold mt-2 text-center leading-tight hidden sm:block"
                              style={{ color: isFuture ? "#9ca3af" : GREEN }}>
                              {step.label}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* VERTICAL TIMELINE */}
                  <div className="border-t border-gray-100 pt-8">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">Shipment Status</p>
                    <div className="space-y-0">
                      {STATUS_STEPS.slice(0, currentStepIndex + 1).map((step, i) => {
                        const isCurrent = i === currentStepIndex;
                        const isLast    = i === currentStepIndex;
                        return (
                          <div key={step.key} className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div className="relative mt-1 flex-shrink-0">
                                {isCurrent && (
                                  <span className="absolute inset-0 rounded-full animate-ping" style={{ background: `${GREEN}60` }} />
                                )}
                                <div className="relative w-3.5 h-3.5 rounded-full" style={{ background: GREEN }} />
                              </div>
                              {!isLast && <div className="w-0.5 flex-1 my-1 min-h-8" style={{ background: "#dcfce7" }} />}
                            </div>
                            <div className="pb-6">
                              <div className="flex items-center gap-2 mb-0.5">
                                <p className="text-sm font-bold text-gray-900">{step.label}</p>
                                {isCurrent && (
                                  <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                                    style={{ background: `${GREEN}18`, color: GREEN }}>Current</span>
                                )}
                              </div>
                              <p className="text-xs text-gray-400 leading-relaxed">{step.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-gray-100">
                    <Link href="/booking" className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl text-center text-sm transition-colors">
                      Book Another Delivery
                    </Link>
                    <button onClick={() => { setResult(null); setTrackingId(""); setNotFound(false); }}
                      className="flex-1 border border-gray-200 hover:border-orange-300 text-gray-600 font-semibold py-3 rounded-xl text-sm transition-colors">
                      Track Another Package
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        )}

        {/* INITIAL + NOT FOUND STATE */}
        {!result && !loading && (
          <div className="flex-1 flex items-center justify-center py-20 px-4">
            <div className="w-full max-w-lg">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-5">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                  </svg>
                </div>
                <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Track Your Package</h2>
                <p className="text-gray-400 text-sm">Enter your tracking ID below to see your delivery status</p>
              </div>

              <form onSubmit={handleSearch} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Tracking ID</label>
                <div className="flex gap-3">
                  <input required value={trackingId} onChange={(e) => setTrackingId(e.target.value)}
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-mono tracking-widest uppercase focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    maxLength={12} />
                  <button type="submit" disabled={loading}
                    className="bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold px-6 py-3.5 rounded-xl transition-colors text-sm flex items-center gap-2 flex-shrink-0">
                    {loading ? (
                      <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    )}
                    {loading ? "Searching..." : "Track"}
                  </button>
                </div>
                <p className="text-gray-400 text-xs mt-3">
                  Your tracking ID looks like: <span className="font-mono font-bold text-gray-600">SWM-XXXXXXXX</span>
                </p>
              </form>

              {notFound && (
                <div className="mt-4 bg-red-50 border border-red-100 rounded-xl p-4 text-center">
                  <p className="font-bold text-red-500 text-sm mb-0.5">Tracking ID Not Found</p>
                  <p className="text-gray-400 text-xs">Please check your ID and try again.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="flex-1 flex items-center justify-center py-20">
            <div className="text-center">
              <svg className="animate-spin mx-auto mb-4" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
              <p className="text-gray-400 text-sm">Searching for your package...</p>
            </div>
          </div>
        )}

      </div>

      <footer className="bg-gray-900 text-white text-center py-8">
        <p className="text-gray-500 text-sm">© 2025 SwiftMove. All rights reserved.</p>
      </footer>

    </main>
  );
}