"use client";
import { useState } from "react";
import Link from "next/link";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { supabase } from "@/lib/supabase";

type DeliveryType = "standard" | "express" | "scheduled";
type PaymentMethod = "cash" | "online";

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    senderName: "", senderPhone: "", senderAddress: "",
    receiverName: "", receiverPhone: "", receiverAddress: "",
    packageDesc: "", weight: "",
    deliveryType: "standard" as DeliveryType,
    deliveryDate: "", deliveryTime: "",
    paymentMethod: "cash" as PaymentMethod,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateTrackingId = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let id = "SWM-";
    for (let i = 0; i < 8; i++) id += chars.charAt(Math.floor(Math.random() * chars.length));
    return id;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const newTrackingId = generateTrackingId();

    const { error: dbError } = await supabase.from("orders").insert([{
      tracking_id:      newTrackingId,
      sender_name:      form.senderName,
      sender_phone:     form.senderPhone,
      sender_email:     "",
      sender_address:   form.senderAddress,
      receiver_name:    form.receiverName,
      receiver_phone:   form.receiverPhone,
      receiver_email:   "",
      receiver_address: form.receiverAddress,
      package_desc:     form.packageDesc,
      weight:           form.weight,
      delivery_type:    form.deliveryType,
      payment_method:   form.paymentMethod,
      price:            "",
      status:           "placed",
    }]);

    if (dbError) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    setTrackingId(newTrackingId);
    setLoading(false);
    setSubmitted(true);
  };

  const steps = ["Sender", "Receiver", "Package", "Confirm"];

  return (
    <main className="min-h-screen bg-gray-50" style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* NAV */}
      <nav className="bg-white border-b border-gray-100 px-8 py-5 flex justify-between items-center shadow-sm">
        <Link href="/" className="flex items-center gap-2">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
          </svg>
          <span className="text-xl font-bold text-gray-900">SwiftMove</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
          <Link href="/tracking" className="hover:text-orange-500 transition-colors">Track Package</Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto py-12 px-4">

        {submitted ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Booking Confirmed!</h2>
            <p className="text-gray-500 mb-6">Your delivery has been booked. Save your tracking ID below.</p>
            <div className="bg-orange-50 border border-orange-100 rounded-xl px-6 py-5 mb-8">
              <p className="text-xs font-semibold text-orange-400 uppercase tracking-widest mb-1">Your Tracking ID</p>
              <p className="text-3xl font-extrabold text-orange-500 tracking-widest">{trackingId}</p>
              <p className="text-xs text-gray-400 mt-2">Use this ID to track your package at any time</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 text-left mb-8 space-y-2 text-sm">
              {[
                { label: "From",          value: form.senderName },
                { label: "To",            value: form.receiverName },
                { label: "Delivery Type", value: form.deliveryType },
                { label: "Payment",       value: form.paymentMethod === "cash" ? "Cash on Delivery" : "Online Payment" },
              ].map((row) => (
                <div key={row.label} className="flex justify-between">
                  <span className="text-gray-400">{row.label}</span>
                  <span className="font-semibold text-gray-700 capitalize">{row.value}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/tracking" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-lg transition-colors text-sm">
                Track My Package
              </Link>
              <button onClick={() => { setSubmitted(false); setStep(1); setForm({ senderName: "", senderPhone: "", senderAddress: "", receiverName: "", receiverPhone: "", receiverAddress: "", packageDesc: "", weight: "", deliveryType: "standard", deliveryDate: "", deliveryTime: "", paymentMethod: "cash" }); }}
                className="border border-gray-200 hover:border-orange-300 text-gray-600 font-semibold px-6 py-3 rounded-lg transition-colors text-sm">
                Book Another Delivery
              </button>
            </div>
          </div>

        ) : (
          <>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-extrabold text-gray-900">Book a Delivery</h1>
              <p className="text-gray-500 mt-2 text-sm">Fill in the details below — it takes less than 2 minutes</p>
            </div>

            {/* PROGRESS BAR */}
            <div className="flex items-center justify-between mb-8">
              {steps.map((label, i) => {
                const num = i + 1;
                const isActive = step === num;
                const isDone = step > num;
                return (
                  <div key={label} className="flex-1 flex flex-col items-center relative">
                    {i < steps.length - 1 && (
                      <div className={`absolute top-4 left-1/2 w-full h-0.5 ${isDone ? "bg-orange-500" : "bg-gray-200"}`} />
                    )}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold z-10 transition-colors
                      ${isDone ? "bg-orange-500 text-white" : isActive ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-400"}`}>
                      {isDone ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> : num}
                    </div>
                    <span className={`text-xs mt-1 font-medium ${isActive ? "text-orange-500" : isDone ? "text-orange-400" : "text-gray-400"}`}>{label}</span>
                  </div>
                );
              })}
            </div>

            {error && (
              <div className="mb-4 bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-red-500 text-sm text-center">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">

              {/* STEP 1 — SENDER */}
              {step === 1 && (
                <div className="space-y-5">
                  <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    Sender Details
                  </h2>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Full Name</label>
                    <input required name="senderName" value={form.senderName} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"/>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Phone Number</label>
                    <PhoneInput country={"ng"} enableSearch value={form.senderPhone} onChange={(phone) => setForm({...form, senderPhone: phone})}
                      inputStyle={{ width: "100%", height: "46px", borderRadius: "12px", border: "1px solid #e5e7eb", fontSize: "14px" }}
                      buttonStyle={{ borderRadius: "12px 0 0 12px", border: "1px solid #e5e7eb", background: "white" }}
                      containerStyle={{ width: "100%" }}/>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Pickup Address</label>
                    <input required name="senderAddress" value={form.senderAddress} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"/>
                  </div>
                  <button type="button" onClick={() => setStep(2)} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl transition-colors mt-2">Continue →</button>
                </div>
              )}

              {/* STEP 2 — RECEIVER */}
              {step === 2 && (
                <div className="space-y-5">
                  <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    Receiver Details
                  </h2>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Receiver Full Name</label>
                    <input required name="receiverName" value={form.receiverName} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"/>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Receiver Phone Number</label>
                    <PhoneInput country={"ng"} enableSearch value={form.receiverPhone} onChange={(phone) => setForm({...form, receiverPhone: phone})}
                      inputStyle={{ width: "100%", height: "46px", borderRadius: "12px", border: "1px solid #e5e7eb", fontSize: "14px" }}
                      buttonStyle={{ borderRadius: "12px 0 0 12px", border: "1px solid #e5e7eb", background: "white" }}
                      containerStyle={{ width: "100%" }}/>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Delivery Address</label>
                    <input required name="receiverAddress" value={form.receiverAddress} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"/>
                  </div>
                  <div className="flex gap-3 mt-2">
                    <button type="button" onClick={() => setStep(1)} className="flex-1 border border-gray-200 hover:border-orange-300 text-gray-600 font-semibold py-3.5 rounded-xl transition-colors">← Back</button>
                    <button type="button" onClick={() => setStep(3)} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl transition-colors">Continue →</button>
                  </div>
                </div>
              )}

              {/* STEP 3 — PACKAGE */}
              {step === 3 && (
                <div className="space-y-5">
                  <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                    Package Details
                  </h2>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Package Description</label>
                    <textarea required name="packageDesc" value={form.packageDesc} onChange={handleChange} rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none"/>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Approximate Weight</label>
                    <input name="weight" value={form.weight} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"/>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Delivery Type</label>
                    <div className="grid grid-cols-3 gap-3">
                      {(["standard","express","scheduled"] as DeliveryType[]).map((type) => (
                        <button key={type} type="button" onClick={() => setForm({...form, deliveryType: type})}
                          className={`border-2 rounded-xl p-3 text-center transition-all ${form.deliveryType === type ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:border-orange-200"}`}>
                          <p className="font-bold text-gray-800 text-xs capitalize">{type}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Preferred Date</label>
                      <input required type="date" name="deliveryDate" value={form.deliveryDate} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"/>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Preferred Time</label>
                      <input required type="time" name="deliveryTime" value={form.deliveryTime} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"/>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-2">
                    <button type="button" onClick={() => setStep(2)} className="flex-1 border border-gray-200 hover:border-orange-300 text-gray-600 font-semibold py-3.5 rounded-xl transition-colors">← Back</button>
                    <button type="button" onClick={() => setStep(4)} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl transition-colors">Continue →</button>
                  </div>
                </div>
              )}

              {/* STEP 4 — CONFIRM */}
              {step === 4 && (
                <div className="space-y-5">
                  <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    Review & Confirm
                  </h2>
                  <div className="bg-gray-50 rounded-xl p-5 space-y-3 text-sm">
                    {[
                      { label: "Sender",        value: `${form.senderName} · ${form.senderPhone}` },
                      { label: "Pickup",         value: form.senderAddress },
                      { label: "Receiver",       value: `${form.receiverName} · ${form.receiverPhone}` },
                      { label: "Delivery To",    value: form.receiverAddress },
                      { label: "Package",        value: form.packageDesc },
                      { label: "Weight",         value: form.weight || "Not specified" },
                      { label: "Delivery Type",  value: form.deliveryType },
                      { label: "Date & Time",    value: `${form.deliveryDate} at ${form.deliveryTime}` },
                    ].map((row) => (
                      <div key={row.label} className="flex justify-between gap-4">
                        <span className="text-gray-400 flex-shrink-0">{row.label}</span>
                        <span className="font-semibold text-gray-700 text-right capitalize">{row.value}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Payment Method</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: "cash",   label: "Cash on Delivery", sub: "Pay the rider in cash" },
                        { value: "online", label: "Online Payment",   sub: "Pay securely online" },
                      ].map((opt) => (
                        <button key={opt.value} type="button" onClick={() => setForm({...form, paymentMethod: opt.value as PaymentMethod})}
                          className={`border-2 rounded-xl p-4 text-left transition-all ${form.paymentMethod === opt.value ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:border-orange-200"}`}>
                          <p className="font-bold text-gray-800 text-sm">{opt.label}</p>
                          <p className="text-gray-400 text-xs mt-0.5">{opt.sub}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 mt-2">
                    <button type="button" onClick={() => setStep(3)} className="flex-1 border border-gray-200 hover:border-orange-300 text-gray-600 font-semibold py-3.5 rounded-xl transition-colors">← Back</button>
                    <button type="submit" disabled={loading} className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-colors">
                      {loading ? "Booking..." : "Confirm Booking"}
                    </button>
                  </div>
                </div>
              )}

            </form>
          </>
        )}
      </div>

      <footer className="bg-gray-900 text-white text-center py-8 mt-12">
        <p className="text-gray-500 text-sm">© 2025 SwiftMove. All rights reserved.</p>
      </footer>

    </main>
  );
}