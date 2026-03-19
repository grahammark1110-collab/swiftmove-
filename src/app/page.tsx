"use client";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white" style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* NAVIGATION */}
      <nav className="bg-white border-b border-gray-100 px-8 py-5 flex justify-between items-center sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
          </svg>
          <span className="text-xl font-bold text-gray-900 tracking-tight">SwiftMove</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
          <Link href="/booking" className="hover:text-orange-500 transition-colors">Services</Link>
          <Link href="/tracking" className="hover:text-orange-500 transition-colors">Track Package</Link>
          <Link href="/booking" className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg font-semibold transition-colors text-sm">
            Book Now
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center">
        {/* Background Photo */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1600&q=85"
            alt="Delivery courier on motorcycle"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/85 via-gray-900/60 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-8 py-24 w-full">
          <div className="max-w-xl">
            <span className="inline-block bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest mb-6">
              Fast · Reliable · Affordable
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
              Deliver Anything,<br />
              <span className="text-orange-400">Anywhere.</span>
            </h1>
            <p className="text-gray-300 text-lg mb-10 leading-relaxed">
              SwiftMove handles local, nationwide, and international deliveries.
              Book in minutes and track every step of the way.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/booking"
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-lg transition-colors text-base shadow-lg">
                Book a Delivery
              </Link>
              <Link href="/tracking"
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-4 rounded-lg transition-colors text-base backdrop-blur-sm">
                Track My Package
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-orange-500 py-10 px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {[
            { number: "10,000+", label: "Deliveries Completed" },
            { number: "98%", label: "On-Time Delivery" },
            { number: "50+", label: "Cities Covered" },
            { number: "24/7", label: "Customer Support" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-extrabold">{s.number}</div>
              <div className="text-orange-100 text-sm mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-2">Simple Process</p>
            <h2 className="text-4xl font-extrabold text-gray-900">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                num: "01",
                title: "Book Online",
                desc: "Fill in your pickup and delivery details in under 2 minutes from any device.",
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                  </svg>
                )
              },
              {
                num: "02",
                title: "We Pick It Up",
                desc: "A verified SwiftMove rider arrives at your door promptly to collect your item.",
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                )
              },
              {
                num: "03",
                title: "Delivered Safely",
                desc: "Your package arrives on time. Track its exact location every step of the way.",
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                )
              },
            ].map((item) => (
              <div key={item.num} className="relative">
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center">
                      {item.icon}
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-orange-400 tracking-widest">{item.num}</span>
                    <h3 className="text-lg font-bold text-gray-900 mt-1 mb-2">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-2">What We Offer</p>
            <h2 className="text-4xl font-extrabold text-gray-900">Our Delivery Services</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Local Delivery",
                time: "2 – 4 hours",
                desc: "Same-day delivery within your city. Perfect for urgent packages and everyday errands.",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                )
              },
              {
                title: "Nationwide Delivery",
                time: "1 – 2 days",
                desc: "We cover every state. Your package reaches any corner of the country, safely and on time.",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                )
              },
              {
                title: "International Delivery",
                time: "3 – 7 days",
                desc: "Sending abroad? We handle customs, packaging, and international shipping end to end.",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  </svg>
                )
              },
            ].map((s) => (
              <div key={s.title} className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg hover:border-orange-100 transition-all">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-5">
                  {s.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{s.title}</h3>
                <span className="text-xs font-semibold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full">{s.time}</span>
                <p className="text-gray-500 text-sm mt-4 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-2">Our Promise</p>
            <h2 className="text-4xl font-extrabold text-gray-900">Why Businesses Trust SwiftMove</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Real-Time Tracking",
                desc: "Every package gets a unique tracking ID. You and your customer can follow the delivery live.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                )
              },
              {
                title: "Insured Packages",
                desc: "Every item we carry is fully insured. If anything goes wrong, we take full responsibility.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                )
              },
              {
                title: "Transparent Pricing",
                desc: "No hidden fees. No surprises. You see the full price before you confirm your booking.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                )
              },
              {
                title: "24/7 Support",
                desc: "Our support team is available around the clock. Call, email, or chat — we are always here.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1 19.79 19.79 0 0 1 1.61 4.49 2 2 0 0 1 3.58 2.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l1.02-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 17z"/>
                  </svg>
                )
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-5 p-6 rounded-2xl border border-gray-100 hover:border-orange-100 hover:bg-orange-50/30 transition-all">
                <div className="w-11 h-11 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-24 px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-2">Get In Touch</p>
            <h2 className="text-4xl font-extrabold text-gray-900">Contact Us</h2>
            <p className="text-gray-500 mt-3">We are always ready to help you</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Call Us",
                detail: "+234 800 000 0000",
                sub: "Mon – Sat, 8am – 8pm",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1 19.79 19.79 0 0 1 1.61 4.49 2 2 0 0 1 3.58 2.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l1.02-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 17z"/>
                  </svg>
                )
              },
              {
                title: "Email Us",
                detail: "hello@swiftmove.com",
                sub: "We reply within 1 hour",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                )
              },
              {
                title: "Our Office",
                detail: "Port Harcourt, Rivers State",
                sub: "Nigeria",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                )
              },
            ].map((c) => (
              <div key={c.title} className="bg-white rounded-2xl p-8 border border-gray-100 text-center hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mx-auto mb-5">
                  {c.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{c.title}</h3>
                <p className="text-orange-500 font-semibold text-sm">{c.detail}</p>
                <p className="text-gray-400 text-xs mt-1">{c.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="bg-gray-900 py-20 px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-extrabold text-white mb-4">Ready to Send a Package?</h2>
          <p className="text-gray-400 mb-10 text-lg">Book your delivery in under 2 minutes. Fast, safe, and affordable.</p>
          <Link href="/booking"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-10 py-4 rounded-lg transition-colors text-base shadow-lg inline-block">
            Book a Delivery Now
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-950 text-white py-12 px-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
            </svg>
            <span className="font-bold text-lg">SwiftMove</span>
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