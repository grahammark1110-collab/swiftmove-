"use client";
import Link from "next/link";
import { useState } from "react";

export default function Services() {
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
          <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
          <Link href="/services" className="text-orange-500 font-bold transition-colors">Services</Link>
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
          <Link href="/" className="text-gray-700 font-medium hover:text-orange-500 transition-colors py-2 border-b border-gray-50" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/services" className="text-orange-500 font-bold py-2 border-b border-gray-50" onClick={() => setMenuOpen(false)}>Services</Link>
          <Link href="/tracking" className="text-gray-700 font-medium hover:text-orange-500 transition-colors py-2 border-b border-gray-50" onClick={() => setMenuOpen(false)}>Track Package</Link>
          <Link href="/booking" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-3 rounded-lg text-center transition-colors" onClick={() => setMenuOpen(false)}>Book Now</Link>
        </div>
      )}

      {/* HERO */}
      <section className="relative h-80 flex items-center">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1600&q=85" alt="Services" className="w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-gray-900/75"/>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <p className="text-orange-400 text-xs font-bold uppercase tracking-widest mb-3">What We Offer</p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">Our Services</h1>
          <p className="text-gray-300 text-lg max-w-xl">Fast, reliable, and affordable delivery solutions for every need — local, nationwide, and international.</p>
        </div>
      </section>

      {/* SERVICES DETAIL */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto space-y-16">

          {/* Local Delivery */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden h-80 shadow-xl">
              <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" alt="Local Delivery" className="w-full h-full object-cover"/>
            </div>
            <div>
              <span className="inline-block bg-orange-100 text-orange-500 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">⏱ 2–4 Hours</span>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Local Delivery</h2>
              <p className="text-gray-500 leading-relaxed mb-6">Same-day delivery within your city. Whether it's an urgent document, a birthday gift, or everyday essentials — our riders are always on standby to pick up and deliver fast.</p>
              <ul className="space-y-3 mb-8">
                {["Same-day pickup & delivery", "Real-time tracking on every order", "Available 7 days a week", "Perfect for documents, food & parcels"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-600 text-sm">
                    <span className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/booking" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3.5 rounded-xl transition-all hover:scale-105 inline-block">Book Local Delivery</Link>
            </div>
          </div>

          <div className="border-t border-gray-100"/>

          {/* Nationwide Delivery */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <span className="inline-block bg-orange-100 text-orange-500 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">⏱ 1–2 Days</span>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Nationwide Delivery</h2>
              <p className="text-gray-500 leading-relaxed mb-6">We cover every city and state across the country. No matter where your package needs to go, our fleet of cargo trucks ensures it arrives safely and on schedule.</p>
              <ul className="space-y-3 mb-8">
                {["Covers all states & cities nationwide", "Heavy & bulky item support", "Insured shipments on every order", "Door-to-door pickup & delivery"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-600 text-sm">
                    <span className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/booking" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3.5 rounded-xl transition-all hover:scale-105 inline-block">Book Nationwide Delivery</Link>
            </div>
            <div className="order-1 lg:order-2 rounded-2xl overflow-hidden h-80 shadow-xl">
              <img src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&q=80" alt="Nationwide Delivery" className="w-full h-full object-cover"/>
            </div>
          </div>

          <div className="border-t border-gray-100"/>

          {/* International Delivery */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden h-80 shadow-xl">
              <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80" alt="International Delivery" className="w-full h-full object-cover"/>
            </div>
            <div>
              <span className="inline-block bg-orange-100 text-orange-500 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">⏱ 3–7 Days</span>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">International Delivery</h2>
              <p className="text-gray-500 leading-relaxed mb-6">Sending packages abroad? We handle everything — customs clearance, proper packaging, and international air freight — so your package arrives safely anywhere in the world.</p>
              <ul className="space-y-3 mb-8">
                {["Worldwide shipping to 100+ countries", "Full customs clearance support", "Air freight partnerships for speed", "End-to-end package tracking"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-600 text-sm">
                    <span className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/booking" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3.5 rounded-xl transition-all hover:scale-105 inline-block">Book International Delivery</Link>
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-orange-500 py-16 px-6 md:px-12 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Ready to Send a Package?</h2>
          <p className="text-orange-100 mb-8 text-lg">Book your delivery in under 2 minutes. Fast, safe, and affordable.</p>
          <Link href="/booking" className="bg-white text-orange-500 hover:bg-orange-50 font-bold px-12 py-4 rounded-xl transition-all hover:scale-105 text-lg inline-block shadow-xl">
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
            <Link href="/booking" className="hover:text-white transition-colors">Book Delivery</Link>
            <Link href="/tracking" className="hover:text-white transition-colors">Track Package</Link>
          </div>
          <p className="text-gray-600 text-sm">© 2025 SwiftMove. All rights reserved.</p>
        </div>
      </footer>

    </main>
  );
}