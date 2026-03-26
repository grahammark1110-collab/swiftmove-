"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

// ─── TYPES ───────────────────────────────────────────────────────────────────
type StatusKey = "placed" | "preparing" | "transit" | "outfordelivery" | "delivered";

interface Order {
  id: string;
  trackingId: string;
  senderName: string;
  senderPhone: string;
  senderEmail: string;
  senderAddress: string;
  receiverName: string;
  receiverPhone: string;
  receiverEmail: string;
  receiverAddress: string;
  packageDesc: string;
  weight: string;
  deliveryType: "standard" | "express" | "scheduled";
  paymentMethod: "cash" | "online";
  status: StatusKey;
  date: string;
  price: string;
}

const STATUS_OPTIONS: { key: StatusKey; label: string; color: string }[] = [
  { key: "placed",         label: "Order Placed",      color: "#6366f1" },
  { key: "preparing",      label: "Preparing to Ship", color: "#f59e0b" },
  { key: "transit",        label: "In Transit",        color: "#3b82f6" },
  { key: "outfordelivery", label: "Out for Delivery",  color: "#f97316" },
  { key: "delivered",      label: "Delivered",         color: "#22c55e" },
];

const generateTrackingId = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "SWM-";
  for (let i = 0; i < 8; i++) id += chars.charAt(Math.floor(Math.random() * chars.length));
  return id;
};

const getStatusInfo = (status: StatusKey) =>
  STATUS_OPTIONS.find((s) => s.key === status) || STATUS_OPTIONS[0];

// ─── RECEIPT ─────────────────────────────────────────────────────────────────
function Receipt({ order, onClose }: { order: Order; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.85)" }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="bg-gray-100 px-6 py-4 flex justify-between items-center print:hidden">
          <p className="font-bold text-gray-700 text-sm">Delivery Receipt</p>
          <div className="flex gap-3">
            <button onClick={() => window.print()}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>
              </svg>
              Print / Save PDF
            </button>
            <button onClick={onClose} className="border border-gray-300 hover:border-gray-400 text-gray-600 font-semibold px-4 py-2 rounded-lg text-sm transition-colors">Close</button>
          </div>
        </div>
        <div className="p-8">
          <div className="text-center border-b border-dashed border-gray-200 pb-6 mb-6">
            <div className="flex items-center justify-center gap-2 mb-1">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
              <span className="text-xl font-extrabold text-gray-900">SwiftMove</span>
            </div>
            <p className="text-gray-400 text-xs">Official Delivery Receipt</p>
            <div className="mt-4 bg-orange-50 rounded-xl px-5 py-3 inline-block">
              <p className="text-xs text-gray-400 mb-0.5">Tracking ID</p>
              <p className="font-mono font-extrabold text-orange-500 text-xl tracking-widest">{order.trackingId}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 mb-5 text-sm">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Sender</p>
              <p className="font-bold text-gray-800">{order.senderName}</p>
              <p className="text-gray-500">{order.senderPhone}</p>
              <p className="text-gray-500">{order.senderEmail}</p>
              <p className="text-gray-400 text-xs mt-1">{order.senderAddress}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Receiver</p>
              <p className="font-bold text-gray-800">{order.receiverName}</p>
              <p className="text-gray-500">{order.receiverPhone}</p>
              <p className="text-gray-500">{order.receiverEmail}</p>
              <p className="text-gray-400 text-xs mt-1">{order.receiverAddress}</p>
            </div>
          </div>
          <div className="border-t border-dashed border-gray-200 pt-5 space-y-2.5 text-sm">
            {[
              { label: "Package",       value: order.packageDesc },
              { label: "Weight",        value: order.weight || "Not specified" },
              { label: "Delivery Type", value: order.deliveryType.charAt(0).toUpperCase() + order.deliveryType.slice(1) },
              { label: "Payment",       value: "Payment Received ✓" },
              { label: "Date",          value: order.date },
            ].map((row) => (
              <div key={row.label} className="flex justify-between">
                <span className="text-gray-400">{row.label}</span>
                <span className="font-semibold text-gray-700">{row.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center text-xs text-gray-400 border-t border-dashed border-gray-200 pt-4">
            <p>Thank you for choosing SwiftMove!</p>
            <p className="mt-0.5">Support: hello@swiftmove.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── LOADING SCREEN ───────────────────────────────────────────────────────────
function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#0f172a" }}>
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
          </svg>
          <span className="text-2xl font-extrabold text-white">SwiftMove</span>
        </div>
        <div className="flex gap-2 justify-center">
          {[0,1,2].map((i) => (
            <div key={i} className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
        <p className="text-gray-500 text-sm mt-4">Loading dashboard...</p>
      </div>
    </div>
  );
}

// ─── MAIN DASHBOARD ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [session, setSession]                 = useState<any>(null);
  const [authLoading, setAuthLoading]         = useState(true);
  const [email, setEmail]                     = useState("");
  const [password, setPassword]               = useState("");
  const [loginError, setLoginError]           = useState("");
  const [loginLoading, setLoginLoading]       = useState(false);
  const [orders, setOrders]                   = useState<Order[]>([]);
  const [dbLoading, setDbLoading]             = useState(true);
  const [search, setSearch]                   = useState("");
  const [activeTab, setActiveTab]             = useState<"orders" | "create">("orders");
  const [receiptOrder, setReceiptOrder]       = useState<Order | null>(null);
  const [updatingId, setUpdatingId]           = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [successMsg, setSuccessMsg]           = useState("");

  const [newOrder, setNewOrder] = useState({
    senderName: "", senderPhone: "", senderEmail: "", senderAddress: "",
    receiverName: "", receiverPhone: "", receiverEmail: "", receiverAddress: "",
    packageDesc: "", weight: "", price: "",
    deliveryType: "standard" as "standard" | "express" | "scheduled",
    paymentMethod: "cash" as "cash" | "online",
  });

  // ── CHECK SESSION ON LOAD ──
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  // ── LOAD ORDERS ──
  useEffect(() => {
    if (!session) return;
    const loadOrders = async () => {
      setDbLoading(true);
      const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
      if (data) {
        setOrders(data.map((o: any) => ({
          id: o.id, trackingId: o.tracking_id,
          senderName: o.sender_name, senderPhone: o.sender_phone, senderEmail: o.sender_email, senderAddress: o.sender_address,
          receiverName: o.receiver_name, receiverPhone: o.receiver_phone, receiverEmail: o.receiver_email, receiverAddress: o.receiver_address,
          packageDesc: o.package_desc, weight: o.weight, deliveryType: o.delivery_type, paymentMethod: o.payment_method,
          price: o.price, status: o.status, date: new Date(o.created_at).toISOString().split("T")[0],
        })));
      }
      setDbLoading(false);
    };
    loadOrders();
  }, [session]);

  // ── LOGIN ──
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setLoginError("Incorrect email or password. Please try again.");
    setLoginLoading(false);
  };

  // ── LOGOUT ──
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  // ── STATS ──
  const stats = {
    total:     orders.length,
    pending:   orders.filter((o) => o.status === "placed" || o.status === "preparing").length,
    transit:   orders.filter((o) => o.status === "transit" || o.status === "outfordelivery").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
  };

  // ── SEARCH ──
  const filtered = orders.filter((o) =>
    o.trackingId.toLowerCase().includes(search.toLowerCase()) ||
    o.senderName.toLowerCase().includes(search.toLowerCase()) ||
    o.receiverName.toLowerCase().includes(search.toLowerCase())
  );

  // ── UPDATE STATUS ──
  const updateStatus = async (id: string, status: StatusKey) => {
    await supabase.from("orders").update({ status }).eq("id", id);
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status } : o));
    setUpdatingId(null);
    showSuccess("Status updated!");
  };

  // ── DELETE ──
  const deleteOrder = async (id: string) => {
    await supabase.from("orders").delete().eq("id", id);
    setOrders((prev) => prev.filter((o) => o.id !== id));
    setDeleteConfirmId(null);
    showSuccess("Order deleted.");
  };

  // ── CREATE ──
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTrackingId = generateTrackingId();
    const { data, error } = await supabase.from("orders").insert([{
      tracking_id: newTrackingId,
      sender_name: newOrder.senderName, sender_phone: newOrder.senderPhone, sender_email: newOrder.senderEmail, sender_address: newOrder.senderAddress,
      receiver_name: newOrder.receiverName, receiver_phone: newOrder.receiverPhone, receiver_email: newOrder.receiverEmail, receiver_address: newOrder.receiverAddress,
      package_desc: newOrder.packageDesc, weight: newOrder.weight, delivery_type: newOrder.deliveryType,
      payment_method: newOrder.paymentMethod, price: newOrder.price, status: "placed",
    }]).select().single();
    if (error || !data) { showSuccess("Error creating order."); return; }
    const order: Order = {
      id: data.id, trackingId: data.tracking_id,
      senderName: data.sender_name, senderPhone: data.sender_phone, senderEmail: data.sender_email, senderAddress: data.sender_address,
      receiverName: data.receiver_name, receiverPhone: data.receiver_phone, receiverEmail: data.receiver_email, receiverAddress: data.receiver_address,
      packageDesc: data.package_desc, weight: data.weight, deliveryType: data.delivery_type, paymentMethod: data.payment_method,
      price: data.price, status: data.status, date: new Date(data.created_at).toISOString().split("T")[0],
    };

    // Send receipt email
    if (newOrder.senderEmail) {
      await fetch("/api/send-receipt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order }),
      });
    }

    setOrders((prev) => [order, ...prev]);
    setReceiptOrder(order);
    setNewOrder({ senderName: "", senderPhone: "", senderEmail: "", senderAddress: "", receiverName: "", receiverPhone: "", receiverEmail: "", receiverAddress: "", packageDesc: "", weight: "", price: "", deliveryType: "standard", paymentMethod: "cash" });
    setActiveTab("orders");
    showSuccess("Order created! Receipt sent & ready.");
  };

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const inp = "w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-600";
  const lbl = "block text-xs text-gray-400 mb-1.5 font-medium";

  // ── SHOW LOADING ──
  if (authLoading) return <LoadingScreen />;

  // ─── LOGIN SCREEN ─────────────────────────────────────────────────────────
  if (!session) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
        style={{ background: "#0f172a", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
        </div>

        <div className="w-full max-w-sm relative z-10">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
              </div>
            </div>
            <h1 className="text-2xl font-extrabold text-white mb-1">SwiftMove Admin</h1>
            <p className="text-gray-500 text-sm">Sign in to manage your deliveries</p>
          </div>

          <form onSubmit={handleLogin} className="bg-gray-800/80 backdrop-blur rounded-2xl border border-gray-700/50 p-8 space-y-5 shadow-2xl">
            <div>
              <label className={lbl}>Email Address</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className={inp} placeholder="admin@swiftmove.com"/>
            </div>
            <div>
              <label className={lbl}>Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                className={inp} placeholder="••••••••"/>
              {loginError && (
                <div className="mt-2 flex items-center gap-2 text-red-400 text-xs">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  {loginError}
                </div>
              )}
            </div>
            <button type="submit" disabled={loginLoading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-orange-500/30 flex items-center justify-center gap-2">
              {loginLoading ? (
                <>
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                  Signing in...
                </>
              ) : "Sign In"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  // ─── DASHBOARD ────────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen" style={{ background: "#0f172a", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* Receipt Modal */}
      {receiptOrder && <Receipt order={receiptOrder} onClose={() => setReceiptOrder(null)} />}

      {/* Delete Confirm */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.85)" }}>
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl">
            <div className="w-14 h-14 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Delete Order?</h3>
            <p className="text-gray-400 text-sm mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirmId(null)} className="flex-1 border border-gray-600 text-gray-400 font-semibold py-2.5 rounded-xl text-sm hover:border-gray-500 transition-colors">Cancel</button>
              <button onClick={() => deleteOrder(deleteConfirmId)} className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2.5 rounded-xl text-sm transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* TOP NAV */}
      <nav className="border-b border-gray-800/80 px-6 py-4 flex justify-between items-center sticky top-0 z-40 backdrop-blur" style={{ background: "rgba(15,23,42,0.95)" }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
            </svg>
          </div>
          <div>
            <span className="text-base font-extrabold text-white">SwiftMove</span>
            <span className="text-gray-600 text-xs ml-2 hidden md:inline">Admin Dashboard</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {successMsg && (
            <span className="text-green-400 text-xs font-semibold bg-green-400/10 px-3 py-1.5 rounded-full border border-green-400/20 animate-pulse">
              ✓ {successMsg}
            </span>
          )}
          <div className="hidden md:flex items-center gap-2 text-xs text-gray-500 bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-700">
            <div className="w-2 h-2 bg-green-400 rounded-full" />
            {session.user.email}
          </div>
          <button onClick={handleLogout}
            className="text-gray-400 hover:text-white text-sm flex items-center gap-1.5 transition-colors bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-lg border border-gray-700">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Logout
          </button>
        </div>
      </nav>

      <div className="px-4 md:px-8 py-8 max-w-7xl mx-auto">

        {/* TITLE */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-white">Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">Manage all your deliveries in one place</p>
          </div>
          <button onClick={() => setActiveTab("create")}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all hover:shadow-lg hover:shadow-orange-500/20 flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            New Order
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Orders", value: stats.total,     color: "#6366f1", bg: "#6366f115", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> },
            { label: "Pending",      value: stats.pending,   color: "#f59e0b", bg: "#f59e0b15", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
            { label: "In Transit",   value: stats.transit,   color: "#3b82f6", bg: "#3b82f615", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg> },
            { label: "Delivered",    value: stats.delivered, color: "#22c55e", bg: "#22c55e15", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> },
          ].map((s) => (
            <div key={s.label} className="bg-gray-800/80 border border-gray-700/50 rounded-2xl p-5 hover:border-gray-600 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide">{s.label}</p>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: s.bg, color: s.color }}>{s.icon}</div>
              </div>
              <p className="text-4xl font-extrabold text-white">{s.value}</p>
              <div className="mt-2 h-1 rounded-full bg-gray-700 overflow-hidden">
                <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${stats.total ? (s.value / stats.total) * 100 : 0}%`, background: s.color }} />
              </div>
            </div>
          ))}
        </div>

        {/* TABS */}
        <div className="flex gap-1 mb-6 bg-gray-800/80 border border-gray-700/50 rounded-xl p-1 w-fit">
          {[{ key: "orders", label: "All Orders" }, { key: "create", label: "+ Create Order" }].map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key as "orders" | "create")}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all"
              style={{ background: activeTab === tab.key ? "#f97316" : "transparent", color: activeTab === tab.key ? "white" : "#6b7280" }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── ORDERS TAB ── */}
        {activeTab === "orders" && (
          <div className="bg-gray-800/80 border border-gray-700/50 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700/50 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
              <div>
                <h2 className="text-white font-bold text-base">Orders</h2>
                <p className="text-gray-500 text-xs mt-0.5">{filtered.length} total orders</p>
              </div>
              <div className="relative w-full sm:w-72">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name or tracking ID..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"/>
              </div>
            </div>

            {dbLoading ? (
              <div className="py-16 flex flex-col items-center gap-3">
                <div className="flex gap-2">
                  {[0,1,2].map((i) => <div key={i} className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }}/>)}
                </div>
                <p className="text-gray-500 text-sm">Loading orders...</p>
              </div>
            ) : (
              <>
                {/* Table — Desktop */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-700/50">
                        {["Tracking ID", "Sender", "Receiver", "Type", "Status", "Price", "Date", "Actions"].map((h) => (
                          <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.length === 0 ? (
                        <tr><td colSpan={8} className="px-6 py-16 text-center text-gray-500">
                          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#4b5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-3">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                          </svg>
                          No orders found.
                        </td></tr>
                      ) : filtered.map((order) => {
                        const si = getStatusInfo(order.status);
                        return (
                          <tr key={order.id} className="border-b border-gray-700/30 hover:bg-gray-700/20 transition-colors">
                            <td className="px-5 py-4 font-mono font-bold text-orange-400 text-xs">{order.trackingId}</td>
                            <td className="px-5 py-4">
                              <p className="font-semibold text-white text-sm">{order.senderName}</p>
                              <p className="text-gray-500 text-xs">{order.senderPhone}</p>
                              <p className="text-gray-600 text-xs">{order.senderEmail}</p>
                            </td>
                            <td className="px-5 py-4">
                              <p className="font-semibold text-white text-sm">{order.receiverName}</p>
                              <p className="text-gray-500 text-xs">{order.receiverPhone}</p>
                              <p className="text-gray-600 text-xs">{order.receiverEmail}</p>
                            </td>
                            <td className="px-5 py-4 capitalize text-gray-300 text-xs">{order.deliveryType}</td>
                            <td className="px-5 py-4">
                              {updatingId === order.id ? (
                                <select autoFocus defaultValue={order.status}
                                  onChange={(e) => updateStatus(order.id, e.target.value as StatusKey)}
                                  onBlur={() => setUpdatingId(null)}
                                  className="bg-gray-900 border border-gray-600 text-white text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-orange-500">
                                  {STATUS_OPTIONS.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
                                </select>
                              ) : (
                                <button onClick={() => setUpdatingId(order.id)}
                                  className="text-xs font-bold px-3 py-1.5 rounded-full hover:opacity-80 transition-opacity cursor-pointer"
                                  style={{ background: `${si.color}20`, color: si.color }}>
                                  {si.label}
                                </button>
                              )}
                            </td>
                            <td className="px-5 py-4 font-bold text-white text-sm">{order.price}</td>
                            <td className="px-5 py-4 text-gray-400 text-xs">{order.date}</td>
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-2">
                                <button onClick={() => setReceiptOrder(order)} title="Receipt"
                                  className="w-8 h-8 rounded-lg bg-gray-700 hover:bg-orange-500 text-gray-400 hover:text-white flex items-center justify-center transition-all">
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                                </button>
                                <button onClick={() => setDeleteConfirmId(order.id)} title="Delete"
                                  className="w-8 h-8 rounded-lg bg-gray-700 hover:bg-red-500 text-gray-400 hover:text-white flex items-center justify-center transition-all">
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Cards — Mobile */}
                <div className="md:hidden divide-y divide-gray-700/50">
                  {filtered.map((order) => {
                    const si = getStatusInfo(order.status);
                    return (
                      <div key={order.id} className="p-5 space-y-3">
                        <div className="flex justify-between items-start">
                          <p className="font-mono font-bold text-orange-400 text-sm">{order.trackingId}</p>
                          <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: `${si.color}20`, color: si.color }}>{si.label}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div><p className="text-gray-500">From</p><p className="text-white font-semibold">{order.senderName}</p></div>
                          <div><p className="text-gray-500">To</p><p className="text-white font-semibold">{order.receiverName}</p></div>
                          <div><p className="text-gray-500">Type</p><p className="text-white capitalize">{order.deliveryType}</p></div>
                          <div><p className="text-gray-500">Price</p><p className="text-white font-bold">{order.price}</p></div>
                        </div>
                        <div className="flex gap-2 pt-1">
                          <select value={order.status} onChange={(e) => updateStatus(order.id, e.target.value as StatusKey)}
                            className="flex-1 bg-gray-900 border border-gray-600 text-white text-xs rounded-lg px-2 py-2 focus:outline-none">
                            {STATUS_OPTIONS.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
                          </select>
                          <button onClick={() => setReceiptOrder(order)} className="px-3 py-2 bg-gray-700 hover:bg-orange-500 text-gray-400 hover:text-white rounded-lg text-xs transition-all">Receipt</button>
                          <button onClick={() => setDeleteConfirmId(order.id)} className="px-3 py-2 bg-gray-700 hover:bg-red-500 text-gray-400 hover:text-white rounded-lg text-xs transition-all">Delete</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}

        {/* ── CREATE ORDER TAB ── */}
        {activeTab === "create" && (
          <div className="bg-gray-800/80 border border-gray-700/50 rounded-2xl p-6 md:p-8">
            <div className="mb-6">
              <h2 className="text-white font-bold text-base">Create New Order</h2>
              <p className="text-gray-500 text-xs mt-1">Fill in the details below to create a new delivery order</p>
            </div>
            <form onSubmit={handleCreate} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-orange-400 text-xs font-bold uppercase tracking-widest border-b border-gray-700 pb-2">Sender Details</h3>
                  <div><label className={lbl}>Full Name</label><input required value={newOrder.senderName} onChange={(e) => setNewOrder({...newOrder, senderName: e.target.value})} className={inp}/></div>
                  <div><label className={lbl}>Phone Number</label><input required value={newOrder.senderPhone} onChange={(e) => setNewOrder({...newOrder, senderPhone: e.target.value})} className={inp}/></div>
                  <div><label className={lbl}>Email Address</label><input type="email" required value={newOrder.senderEmail} onChange={(e) => setNewOrder({...newOrder, senderEmail: e.target.value})} className={inp}/></div>
                  <div><label className={lbl}>Pickup Address</label><input required value={newOrder.senderAddress} onChange={(e) => setNewOrder({...newOrder, senderAddress: e.target.value})} className={inp}/></div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-orange-400 text-xs font-bold uppercase tracking-widest border-b border-gray-700 pb-2">Receiver Details</h3>
                  <div><label className={lbl}>Full Name</label><input required value={newOrder.receiverName} onChange={(e) => setNewOrder({...newOrder, receiverName: e.target.value})} className={inp}/></div>
                  <div><label className={lbl}>Phone Number</label><input required value={newOrder.receiverPhone} onChange={(e) => setNewOrder({...newOrder, receiverPhone: e.target.value})} className={inp}/></div>
                  <div><label className={lbl}>Email Address</label><input type="email" required value={newOrder.receiverEmail} onChange={(e) => setNewOrder({...newOrder, receiverEmail: e.target.value})} className={inp}/></div>
                  <div><label className={lbl}>Delivery Address</label><input required value={newOrder.receiverAddress} onChange={(e) => setNewOrder({...newOrder, receiverAddress: e.target.value})} className={inp}/></div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-orange-400 text-xs font-bold uppercase tracking-widest border-b border-gray-700 pb-2">Package Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div><label className={lbl}>Package Description</label><input required value={newOrder.packageDesc} onChange={(e) => setNewOrder({...newOrder, packageDesc: e.target.value})} className={inp}/></div>
                  <div><label className={lbl}>Weight (optional)</label><input value={newOrder.weight} onChange={(e) => setNewOrder({...newOrder, weight: e.target.value})} className={inp}/></div>
                  <div><label className={lbl}>Price / Amount</label><input required value={newOrder.price} onChange={(e) => setNewOrder({...newOrder, price: e.target.value})} placeholder="e.g. $50 or 5000" className={inp}/></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={lbl}>Delivery Type</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["standard","express","scheduled"] as const).map((type) => (
                        <button key={type} type="button" onClick={() => setNewOrder({...newOrder, deliveryType: type})}
                          className="py-3 rounded-xl text-xs font-bold border-2 transition-all capitalize"
                          style={{ borderColor: newOrder.deliveryType === type ? "#f97316" : "#374151", background: newOrder.deliveryType === type ? "#f9731615" : "transparent", color: newOrder.deliveryType === type ? "#f97316" : "#6b7280" }}>
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className={lbl}>Payment Method</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[{v:"cash",l:"Cash on Delivery"},{v:"online",l:"Online Payment"}].map((opt) => (
                        <button key={opt.v} type="button" onClick={() => setNewOrder({...newOrder, paymentMethod: opt.v as "cash"|"online"})}
                          className="py-3 rounded-xl text-xs font-bold border-2 transition-all"
                          style={{ borderColor: newOrder.paymentMethod === opt.v ? "#f97316" : "#374151", background: newOrder.paymentMethod === opt.v ? "#f9731615" : "transparent", color: newOrder.paymentMethod === opt.v ? "#f97316" : "#6b7280" }}>
                          {opt.l}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-orange-500/20 text-base">
                Create Order & Send Receipt Email
              </button>
            </form>
          </div>
        )}

      </div>
    </main>
  );
}