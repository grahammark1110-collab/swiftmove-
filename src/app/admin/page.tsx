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

// ─── DEMO ORDERS ─────────────────────────────────────────────────────────────
const INITIAL_ORDERS: Order[] = [
  { id: "1", trackingId: "SWM-DEMO1234", senderName: "John Adeyemi",  senderPhone: "+2348012345678", senderEmail: "john@email.com",    senderAddress: "12 Aba Road, Port Harcourt",   receiverName: "Amara Okafor",  receiverPhone: "+2348087654321", receiverEmail: "amara@email.com",   receiverAddress: "5 Marina St, Lagos",     packageDesc: "Documents",   weight: "0.5kg", deliveryType: "express",   paymentMethod: "cash",   status: "transit",        date: "2025-03-18", price: "5,000" },
  { id: "2", trackingId: "SWM-DEMO5678", senderName: "Chidi Nwosu",   senderPhone: "+2348023456789", senderEmail: "chidi@email.com",   senderAddress: "3 Wuse Zone 4, Abuja",         receiverName: "Fatima Aliyu",  receiverPhone: "+2348076543210", receiverEmail: "fatima@email.com",  receiverAddress: "10 Kano Road, Kano",    packageDesc: "Clothing",    weight: "2kg",   deliveryType: "standard",  paymentMethod: "online", status: "outfordelivery", date: "2025-03-17", price: "2,500" },
  { id: "3", trackingId: "SWM-DEMO9999", senderName: "Emeka Eze",     senderPhone: "+2348034567890", senderEmail: "emeka@email.com",   senderAddress: "8 Independence Layout, Enugu", receiverName: "Ngozi Obi",     receiverPhone: "+2348065432109", receiverEmail: "ngozi@email.com",   receiverAddress: "2 Bridge Head, Onitsha", packageDesc: "Electronics", weight: "3kg",   deliveryType: "scheduled", paymentMethod: "cash",   status: "delivered",      date: "2025-03-15", price: "3,000" },
  { id: "4", trackingId: "SWM-AB123456", senderName: "Tunde Bakare",  senderPhone: "+2348045678901", senderEmail: "tunde@email.com",   senderAddress: "15 Allen Ave, Ikeja, Lagos",   receiverName: "Blessing Udo",  receiverPhone: "+2348054321098", receiverEmail: "blessing@email.com", receiverAddress: "7 Uyo Rd, Akwa Ibom",   packageDesc: "Shoes",       weight: "1.5kg", deliveryType: "express",   paymentMethod: "online", status: "placed",         date: "2025-03-18", price: "5,000" },
];

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

        {/* Actions */}
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
            <button onClick={onClose}
              className="border border-gray-300 hover:border-gray-400 text-gray-600 font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
              Close
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Header */}
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

          {/* Sender & Receiver */}
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

          {/* Details */}
          <div className="border-t border-dashed border-gray-200 pt-5 space-y-2.5 text-sm">
            {[
              { label: "Package",       value: order.packageDesc },
              { label: "Weight",        value: order.weight || "Not specified" },
              { label: "Delivery Type", value: order.deliveryType.charAt(0).toUpperCase() + order.deliveryType.slice(1) },
              { label: "Payment", value: "Payment Received ✓" },
              { label: "Date",          value: order.date },
            ].map((row) => (
              <div key={row.label} className="flex justify-between">
                <span className="text-gray-400">{row.label}</span>
                <span className="font-semibold text-gray-700">{row.value}</span>
              </div>
            ))}
          </div>


          {/* Footer */}
          <div className="mt-6 text-center text-xs text-gray-400 border-t border-dashed border-gray-200 pt-4">
            <p>Thank you for choosing SwiftMove!</p>
            <p className="mt-0.5">Support: hello@swiftmove.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN DASHBOARD ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn]           = useState(false);
  const [password, setPassword]               = useState("");
  const [loginError, setLoginError]           = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [dbLoading, setDbLoading] = useState(true);
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

  // ── LOGIN ──
  // ── LOAD ORDERS FROM DATABASE ──
  useEffect(() => {
    const loadOrders = async () => {
      setDbLoading(true);
      const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
      if (data) {
        setOrders(data.map((o: any) => ({
          id: o.id,
          trackingId: o.tracking_id,
          senderName: o.sender_name,
          senderPhone: o.sender_phone,
          senderEmail: o.sender_email,
          senderAddress: o.sender_address,
          receiverName: o.receiver_name,
          receiverPhone: o.receiver_phone,
          receiverEmail: o.receiver_email,
          receiverAddress: o.receiver_address,
          packageDesc: o.package_desc,
          weight: o.weight,
          deliveryType: o.delivery_type,
          paymentMethod: o.payment_method,
          price: o.price,
          status: o.status,
          date: new Date(o.created_at).toISOString().split("T")[0],
        })));
      }
      setDbLoading(false);
    };
    if (isLoggedIn) loadOrders();
  }, [isLoggedIn]);
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") { setIsLoggedIn(true); setLoginError(false); }
    else setLoginError(true);
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
      tracking_id:      newTrackingId,
      sender_name:      newOrder.senderName,
      sender_phone:     newOrder.senderPhone,
      sender_email:     newOrder.senderEmail,
      sender_address:   newOrder.senderAddress,
      receiver_name:    newOrder.receiverName,
      receiver_phone:   newOrder.receiverPhone,
      receiver_email:   newOrder.receiverEmail,
      receiver_address: newOrder.receiverAddress,
      package_desc:     newOrder.packageDesc,
      weight:           newOrder.weight,
      delivery_type:    newOrder.deliveryType,
      payment_method:   newOrder.paymentMethod,
      price:            newOrder.price,
      status:           "placed",
    }]).select().single();
    if (error || !data) { showSuccess("Error creating order."); return; }
    const order: Order = {
      id: data.id, trackingId: data.tracking_id,
      senderName: data.sender_name, senderPhone: data.sender_phone, senderEmail: data.sender_email, senderAddress: data.sender_address,
      receiverName: data.receiver_name, receiverPhone: data.receiver_phone, receiverEmail: data.receiver_email, receiverAddress: data.receiver_address,
      packageDesc: data.package_desc, weight: data.weight, deliveryType: data.delivery_type, paymentMethod: data.payment_method,
      price: data.price, status: data.status, date: new Date(data.created_at).toISOString().split("T")[0],
    };
    setOrders((prev) => [order, ...prev]);
    setReceiptOrder(order);
    setNewOrder({ senderName: "", senderPhone: "", senderEmail: "", senderAddress: "", receiverName: "", receiverPhone: "", receiverEmail: "", receiverAddress: "", packageDesc: "", weight: "", price: "", deliveryType: "standard", paymentMethod: "cash" });
    setActiveTab("orders");
    showSuccess("Order created! Receipt is ready.");
  };

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const inp = "w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-600";
  const lbl = "block text-xs text-gray-400 mb-1.5 font-medium";

  // ─── LOGIN SCREEN ─────────────────────────────────────────────────────────
  if (!isLoggedIn) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "#0f172a", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
              <span className="text-2xl font-extrabold text-white">SwiftMove</span>
            </div>
            <h1 className="text-xl font-bold text-white mb-1">Admin Dashboard</h1>
            <p className="text-gray-500 text-sm">Sign in to manage your deliveries</p>
          </div>
          <form onSubmit={handleLogin} className="bg-gray-800 rounded-2xl border border-gray-700 p-8 space-y-5">
            <div>
              <label className={lbl}>Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className={inp} />
              {loginError && <p className="text-red-400 text-xs mt-2">Incorrect password. Try again.</p>}
            </div>
            <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl transition-colors">
              Sign In
            </button>
            <p className="text-gray-600 text-xs text-center">Demo password: <span className="font-mono text-gray-400">admin123</span></p>
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
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 max-w-sm w-full text-center">
            <div className="w-14 h-14 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Delete Order?</h3>
            <p className="text-gray-400 text-sm mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirmId(null)}
                className="flex-1 border border-gray-600 text-gray-400 font-semibold py-2.5 rounded-xl text-sm hover:border-gray-500 transition-colors">Cancel</button>
              <button onClick={() => deleteOrder(deleteConfirmId)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2.5 rounded-xl text-sm transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* TOP NAV */}
      <nav className="border-b border-gray-800 px-6 py-4 flex justify-between items-center sticky top-0 z-40" style={{ background: "#0f172a" }}>
        <div className="flex items-center gap-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
          </svg>
          <span className="text-lg font-extrabold text-white">SwiftMove</span>
          <span className="text-gray-600 text-sm hidden md:block">/ Admin</span>
        </div>
        <div className="flex items-center gap-4">
          {successMsg && (
            <span className="text-green-400 text-xs font-semibold bg-green-400/10 px-3 py-1.5 rounded-full">✓ {successMsg}</span>
          )}
          <button onClick={() => setIsLoggedIn(false)}
            className="text-gray-400 hover:text-white text-sm flex items-center gap-1.5 transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Logout
          </button>
        </div>
      </nav>

      <div className="px-4 md:px-8 py-8 max-w-7xl mx-auto">

        {/* TITLE */}
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-white">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Manage all your deliveries in one place</p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Orders", value: stats.total,     color: "#6366f1", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> },
            { label: "Pending",      value: stats.pending,   color: "#f59e0b", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
            { label: "In Transit",   value: stats.transit,   color: "#3b82f6", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg> },
            { label: "Delivered",    value: stats.delivered, color: "#22c55e", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> },
          ].map((s) => (
            <div key={s.label} className="bg-gray-800 border border-gray-700 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide">{s.label}</p>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${s.color}20`, color: s.color }}>{s.icon}</div>
              </div>
              <p className="text-3xl font-extrabold text-white">{s.value}</p>
            </div>
          ))}
        </div>

        {/* TABS */}
        <div className="flex gap-1 mb-6 bg-gray-800 border border-gray-700 rounded-xl p-1 w-fit">
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
          <div className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
              <h2 className="text-white font-bold text-base">Orders</h2>
              <div className="relative w-full sm:w-72">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name or tracking ID..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500" />
              </div>
            </div>

            {/* Table — Desktop */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    {["Tracking ID", "Sender", "Receiver", "Type", "Status", "Price", "Date", "Actions"].map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr><td colSpan={8} className="px-6 py-12 text-center text-gray-500">No orders found.</td></tr>
                  ) : filtered.map((order) => {
                    const si = getStatusInfo(order.status);
                    return (
                      <tr key={order.id} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                        <td className="px-5 py-4 font-mono font-bold text-orange-400 text-xs">{order.trackingId}</td>
                        <td className="px-5 py-4">
                          <p className="font-semibold text-white">{order.senderName}</p>
                          <p className="text-gray-500 text-xs">{order.senderPhone}</p>
                          <p className="text-gray-600 text-xs">{order.senderEmail}</p>
                        </td>
                        <td className="px-5 py-4">
                          <p className="font-semibold text-white">{order.receiverName}</p>
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
                              className="text-xs font-bold px-3 py-1.5 rounded-full hover:opacity-80 transition-opacity"
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
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                              </svg>
                            </button>
                            <button onClick={() => setDeleteConfirmId(order.id)} title="Delete"
                              className="w-8 h-8 rounded-lg bg-gray-700 hover:bg-red-500 text-gray-400 hover:text-white flex items-center justify-center transition-all">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                              </svg>
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
            <div className="md:hidden divide-y divide-gray-700">
              {filtered.length === 0 ? (
                <p className="px-6 py-12 text-center text-gray-500">No orders found.</p>
              ) : filtered.map((order) => {
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
          </div>
        )}

        {/* ── CREATE ORDER TAB ── */}
        {activeTab === "create" && (
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 md:p-8">
            <h2 className="text-white font-bold text-base mb-6">Create New Order</h2>
            <form onSubmit={handleCreate} className="space-y-8">

              {/* Sender & Receiver */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-orange-400 text-xs font-bold uppercase tracking-widest border-b border-gray-700 pb-2">Sender Details</h3>
                  <div><label className={lbl}>Full Name</label><input required value={newOrder.senderName} onChange={(e) => setNewOrder({...newOrder, senderName: e.target.value})} className={inp} /></div>
                  <div><label className={lbl}>Phone Number</label><input required value={newOrder.senderPhone} onChange={(e) => setNewOrder({...newOrder, senderPhone: e.target.value})} className={inp} /></div>
                  <div><label className={lbl}>Email Address</label><input type="email" required value={newOrder.senderEmail} onChange={(e) => setNewOrder({...newOrder, senderEmail: e.target.value})} className={inp} /></div>
                  <div><label className={lbl}>Pickup Address</label><input required value={newOrder.senderAddress} onChange={(e) => setNewOrder({...newOrder, senderAddress: e.target.value})} className={inp} /></div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-orange-400 text-xs font-bold uppercase tracking-widest border-b border-gray-700 pb-2">Receiver Details</h3>
                  <div><label className={lbl}>Full Name</label><input required value={newOrder.receiverName} onChange={(e) => setNewOrder({...newOrder, receiverName: e.target.value})} className={inp} /></div>
                  <div><label className={lbl}>Phone Number</label><input required value={newOrder.receiverPhone} onChange={(e) => setNewOrder({...newOrder, receiverPhone: e.target.value})} className={inp} /></div>
                  <div><label className={lbl}>Email Address</label><input type="email" required value={newOrder.receiverEmail} onChange={(e) => setNewOrder({...newOrder, receiverEmail: e.target.value})} className={inp} /></div>
                  <div><label className={lbl}>Delivery Address</label><input required value={newOrder.receiverAddress} onChange={(e) => setNewOrder({...newOrder, receiverAddress: e.target.value})} className={inp} /></div>
                </div>
              </div>

              {/* Package */}
              <div className="space-y-4">
                <h3 className="text-orange-400 text-xs font-bold uppercase tracking-widest border-b border-gray-700 pb-2">Package Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div><label className={lbl}>Package Description</label><input required value={newOrder.packageDesc} onChange={(e) => setNewOrder({...newOrder, packageDesc: e.target.value})} className={inp} /></div>
                  <div><label className={lbl}>Weight (optional)</label><input value={newOrder.weight} onChange={(e) => setNewOrder({...newOrder, weight: e.target.value})} className={inp} /></div>
                  <div><label className={lbl}>Price / Amount</label><input required value={newOrder.price} onChange={(e) => setNewOrder({...newOrder, price: e.target.value})} placeholder="e.g. $50 or 5000" className={inp} /></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                  {/* Delivery Type */}
                  <div>
                    <label className={lbl}>Delivery Type</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["standard","express","scheduled"] as const).map((type) => (
                        <button key={type} type="button" onClick={() => setNewOrder({...newOrder, deliveryType: type})}
                          className="py-3 rounded-xl text-xs font-bold border-2 transition-all capitalize"
                          style={{
                            borderColor: newOrder.deliveryType === type ? "#f97316" : "#374151",
                            background:  newOrder.deliveryType === type ? "#f9731615" : "transparent",
                            color:       newOrder.deliveryType === type ? "#f97316" : "#6b7280",
                          }}>
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <label className={lbl}>Payment Method</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[{v:"cash",l:"Cash on Delivery"},{v:"online",l:"Online Payment"}].map((opt) => (
                        <button key={opt.v} type="button" onClick={() => setNewOrder({...newOrder, paymentMethod: opt.v as "cash"|"online"})}
                          className="py-3 rounded-xl text-xs font-bold border-2 transition-all"
                          style={{
                            borderColor: newOrder.paymentMethod === opt.v ? "#f97316" : "#374151",
                            background:  newOrder.paymentMethod === opt.v ? "#f9731615" : "transparent",
                            color:       newOrder.paymentMethod === opt.v ? "#f97316" : "#6b7280",
                          }}>
                          {opt.l}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <button type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-colors text-base">
                Create Order & Generate Receipt
              </button>
            </form>
          </div>
        )}

      </div>
    </main>
  );
}