"use client";
import { useState } from "react";
import Link from "next/link";

const faqs = [
  { q: "How do I book a delivery?", a: "Click 'Book a Delivery', fill in your pickup and delivery details, and we will assign a rider immediately." },
  { q: "How long does delivery take?", a: "Local deliveries take 2–4 hours. Nationwide takes 1–2 days. International takes 3–7 business days." },
  { q: "Can I track my package?", a: "Yes! Every booking gets a unique tracking ID so you can follow your package in real time." },
  { q: "What items can I send?", a: "We deliver documents, clothes, food, electronics, and more. Contact us for fragile or special items." },
  { q: "What if my package is lost or damaged?", a: "All packages are insured. We will replace or refund you fully if anything goes wrong." },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white" style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* NAVIGATION */}
      <nav className="bg-white border-b border-gray-100 px-6 md:px-12 py-5 flex justify-between items-center sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
          </svg>
          <span className="text-xl font-extrabold text-gray-900 tracking-tight">SwiftMove</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link href="/" className="text-orange-500 font-bold transition-colors">Home</Link>
          <Link href="/services" className="hover:text-orange-500 transition-colors">Services</Link>
          <Link href="/tracking" className="hover:text-orange-500 transition-colors">Track Package</Link>
          <Link href="/booking" className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg font-semibold transition-colors text-sm">Book Now</Link>
        </div>

        {/* Mobile Hamburger */}
        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}/>
          <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}/>
          <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}/>
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-6 py-4 flex flex-col gap-4 shadow-lg z-40">
          <Link href="/" className="text-orange-500 font-bold py-2 border-b border-gray-50" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/services" className="text-gray-700 font-medium hover:text-orange-500 transition-colors py-2 border-b border-gray-50" onClick={() => setMenuOpen(false)}>Services</Link>
          <Link href="/tracking" className="text-gray-700 font-medium hover:text-orange-500 transition-colors py-2 border-b border-gray-50" onClick={() => setMenuOpen(false)}>Track Package</Link>
          <Link href="/booking" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-3 rounded-lg text-center transition-colors" onClick={() => setMenuOpen(false)}>Book Now</Link>
        </div>
      )}

      {/* HERO */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1600&q=85" alt="Delivery" className="w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/60 to-transparent"/>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24 w-full">
          <div className="max-w-2xl">
            <span className="inline-block bg-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6">Local · Nationwide · International</span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
              Delivering Your<br/>World, <span className="text-orange-400">One Package</span><br/>at a Time.
            </h1>
            <p className="text-gray-300 text-lg mb-10 leading-relaxed max-w-lg">SwiftMove gets your packages anywhere — fast, safe, and affordable. Book online in under 2 minutes!</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/booking" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all hover:scale-105 text-base">Book a Delivery</Link>
              <Link href="/tracking" className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 text-base backdrop-blur-sm">Track My Package</Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-orange-500 py-12 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {[
            { number: "10,000+", label: "Deliveries Completed", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg> },
            { number: "98%",     label: "On-Time Delivery",    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
            { number: "50+",     label: "Cities Covered",      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> },
            { number: "24/7",    label: "Customer Support",    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1 19.79 19.79 0 0 1 1.61 4.49 2 2 0 0 1 3.58 2.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l1.02-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 17z"/></svg> },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-1">{s.icon}</div>
              <div className="text-4xl font-extrabold">{s.number}</div>
              <div className="text-orange-100 text-sm font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-2">What We Offer</p>
            <h2 className="text-4xl font-extrabold text-gray-900">Our Delivery Services</h2>
            <p className="text-gray-400 mt-3 max-w-xl mx-auto">From same-day local deliveries to international shipments, we handle it all with care and precision.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Local Delivery", time: "2–4 hours", desc: "Same-day delivery within your city. Perfect for urgent packages, documents, and everyday needs.", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: "Nationwide Delivery", time: "1–2 days", desc: "We cover every city and state. Your package reaches any corner of the country safely and on time.", img: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=600&q=80", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
              { title: "International Delivery", time: "3–7 days", desc: "Sending abroad? We handle customs, packaging, and international shipping end to end.", img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg> },
            ].map((s) => (
              <div key={s.title} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="h-52 overflow-hidden relative">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"/>
                  <span className="absolute bottom-3 right-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">⏱ {s.time}</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">{s.icon}</div>
                    <h3 className="text-lg font-bold text-gray-900">{s.title}</h3>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR PROCESS */}
      <section className="py-24 px-6 md:px-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-2">Simple Process</p>
            <h2 className="text-4xl font-extrabold text-gray-900">How It Works</h2>
            <p className="text-gray-400 mt-3">Get your package delivered in 3 simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { step: "01", title: "Book Online", desc: "Fill in your pickup and delivery details in under 2 minutes from any device, anywhere in the world.", img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80" },
              { step: "02", title: "We Pick It Up", desc: "A verified SwiftMove rider arrives at your door promptly to collect your package with care.", img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80" },
              { step: "03", title: "Delivered Safely", desc: "Your package arrives on time, every time. Track its exact location every step of the way.", img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80" },
            ].map((item, i) => (
              <div key={item.step} className="group relative">
                <div className="relative h-64 rounded-2xl overflow-hidden mb-6 shadow-lg">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/>
                  <div className="absolute top-4 left-4 bg-orange-500 text-white text-2xl font-extrabold w-12 h-12 rounded-xl flex items-center justify-center">{item.step}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                {i < 2 && <div className="hidden md:block absolute top-28 -right-5 z-10"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></div>}
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/booking" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-10 py-4 rounded-xl transition-all hover:scale-105 inline-block shadow-lg">Book Your Delivery Now</Link>
          </div>
        </div>
      </section>

      {/* OUR FLEET */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-2">Our Fleet</p>
            <h2 className="text-4xl font-extrabold text-gray-900">Built for Every Delivery</h2>
            <p className="text-gray-400 mt-3 max-w-xl mx-auto">From motorbikes for city runs to cargo trucks and aircraft for long-distance — we have the right vehicle for every job.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Motorbikes",   use: "City & Local",   desc: "Fast and agile for navigating busy city streets. Perfect for same-day urgent deliveries.", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",        badge: "Same Day" },
              { name: "Cargo Trucks", use: "Nationwide",     desc: "Heavy-duty trucks for large packages and bulk shipments across states and borders.",       img: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=600&q=80",    badge: "1–2 Days" },
              { name: "Air Freight",  use: "International",  desc: "Air cargo partnerships for fast, secure international deliveries across the globe.",        img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80",   badge: "3–7 Days" },
            ].map((v) => (
              <div key={v.name} className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-80">
                <img src={v.img} alt={v.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"/>
                <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">{v.badge}</div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-orange-400 text-xs font-bold uppercase tracking-wide mb-1">{v.use}</p>
                  <h3 className="text-xl font-extrabold text-white mb-1">{v.name}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 px-6 md:px-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3">Our Promise</p>
              <h2 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">Why Thousands Trust SwiftMove</h2>
              <p className="text-gray-500 mb-10 leading-relaxed">We are not just a courier service. We are your delivery partner — reliable, transparent, and always on time.</p>
              <div className="space-y-4">
                {[
                  { title: "Real-Time Tracking",  desc: "Every package gets a unique ID. Track every step of the journey live.", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> },
                  { title: "Fully Insured",        desc: "Every item we carry is fully insured. We take full responsibility.", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
                  { title: "Transparent Pricing", desc: "No hidden fees. You see the full price before confirming your booking.", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
                  { title: "24/7 Support",         desc: "Our support team is always available. Call, email, or chat anytime.", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1 19.79 19.79 0 0 1 1.61 4.49 2 2 0 0 1 3.58 2.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l1.02-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 17z"/></svg> },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all duration-300">
                    <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">{item.icon}</div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-0.5">{item.title}</h3>
                      <p className="text-gray-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl h-[500px]">
                <img src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&q=85" alt="Delivery service" className="w-full h-full object-cover"/>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  </div>
                  <div>
                    <p className="font-extrabold text-gray-900 text-lg">98%</p>
                    <p className="text-gray-400 text-xs">On-Time Delivery Rate</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-orange-500 rounded-2xl shadow-xl p-5 text-white">
                <p className="font-extrabold text-2xl">10K+</p>
                <p className="text-orange-100 text-xs">Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUSTED PARTNERS */}
      <section className="py-16 px-6 md:px-12 bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-gray-400 text-sm font-semibold uppercase tracking-widest mb-10">Trusted By Leading Companies Worldwide</p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6 items-center">
            {[
              { name: "DHL",     bg: "#FFCC00", color: "#CC0000" },
              { name: "FedEx",   bg: "#4D148C", color: "#FF6600" },
              { name: "UPS",     bg: "#351C15", color: "#FFB500" },
              { name: "Amazon",  bg: "#232F3E", color: "#FF9900" },
              { name: "Shopify", bg: "#96BF48", color: "#FFFFFF" },
              { name: "Stripe",  bg: "#635BFF", color: "#FFFFFF" },
            ].map((p) => (
              <div key={p.name} className="h-14 rounded-xl flex items-center justify-center font-extrabold text-sm hover:scale-110 transition-transform duration-300 cursor-default shadow-sm"
                style={{ background: p.bg, color: p.color }}>
                {p.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 md:px-12 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-2">FAQ</p>
            <h2 className="text-4xl font-extrabold text-gray-900">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-orange-200 transition-colors">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-5 font-semibold text-gray-800 flex justify-between items-center hover:bg-orange-50 transition-colors">
                  <span>{faq.q}</span>
                  <span className="text-orange-500 text-xl ml-4 flex-shrink-0">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-4">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-2">Get In Touch</p>
            <h2 className="text-4xl font-extrabold text-gray-900">Contact Us</h2>
            <p className="text-gray-400 mt-3">We are always here to help you</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {[
              { title: "Email Us",   detail: "support@swiftmovearena.com", sub: "We reply within 1 hour", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
              { title: "Our Office", detail: "Middletown, Delaware",        sub: "United States",          icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> },
            ].map((c) => (
              <div key={c.title} className="group bg-white rounded-2xl border border-gray-100 p-8 text-center hover:shadow-xl hover:-translate-y-2 hover:border-orange-200 transition-all duration-300">
                <div className="w-14 h-14 bg-orange-50 group-hover:bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-colors duration-300">
                  <div className="group-hover:[&_svg]:stroke-white">{c.icon}</div>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{c.title}</h3>
                <p className="text-orange-500 font-semibold text-sm">{c.detail}</p>
                <p className="text-gray-400 text-xs mt-1">{c.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 py-20 px-6 md:px-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&q=60" alt="" className="w-full h-full object-cover"/>
        </div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Ready to Ship?</h2>
          <p className="text-gray-400 mb-10 text-lg">Join thousands of happy customers. Book your delivery in 2 minutes!</p>
          <Link href="/booking" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-12 py-5 rounded-xl transition-all hover:scale-105 text-lg inline-block shadow-2xl">
            Book a Delivery Now
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-950 text-white py-12 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
            </svg>
            <span className="font-extrabold text-lg">SwiftMove</span>
          </div>
          <div className="flex gap-8 text-sm text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <Link href="/booking" className="hover:text-white transition-colors">Book Delivery</Link>
            <Link href="/tracking" className="hover:text-white transition-colors">Track Package</Link>
          </div>
          <p className="text-gray-600 text-sm">© 2025 SwiftMove. All rights reserved.</p>
        </div>
      </footer>

    </main>
  );
}