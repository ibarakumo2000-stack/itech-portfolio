import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminPage, OrderStatus, Driver, Product } from '../../types';
import { AdminAuthGate } from './AdminAuthGate';
import { DeliveryHubModule } from './DeliveryHubModule';
import { PrismaArchitectureView } from './PrismaArchitectureView';
import { ProductCatalogManager } from './ProductCatalogManager';
import { AssignDeliveryModal } from './AssignDeliveryModal';
import { ItechLogo } from '../common/ItechLogo';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingBag,
  Truck,
  Users,
  UserCheck,
  TrendingUp,
  Ticket,
  Mail,
  Settings,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  DollarSign,
  Radio,
  ExternalLink,
  Edit2,
  Trash2,
  X,
  ChevronRight,
  Eye,
  Send,
  Navigation,
  Layers,
  Sparkles,
  RefreshCw,
  Compass,
  Zap,
  Menu,
  Database,
  LogOut,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const AdminDashboardContent: React.FC = () => {
  const {
    currentUser,
    logout,
    adminPage,
    setAdminPage,
    products,
    addProduct,
    deleteProduct,
    categories,
    addCategory,
    orders,
    updateOrderStatus,
    assignDriverToOrder,
    drivers,
    toggleDriverStatus,
    users,
    coupons,
    addCoupon,
    deleteCoupon,
    emailLogs,
    storeSettings,
    updateStoreSettings,
    setPortalMode,
    setDeliveryPage,
    addToast,
  } = useApp();

  // Mobile sidebar drawer state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Search & filter states
  const [orderFilterStatus, setOrderFilterStatus] = useState<string>('ALL');
  const [selectedDriverId, setSelectedDriverId] = useState<string>(drivers[0]?.id || 'drv-1');
  const [liveMapZoom, setLiveMapZoom] = useState<number>(1);
  const [trafficActive, setTrafficActive] = useState<boolean>(true);

  // Add Coupon Modal State
  const [isAddCouponOpen, setIsAddCouponOpen] = useState(false);
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState(20);

  // Add Category Modal State
  const [isAddCatOpen, setIsAddCatOpen] = useState(false);
  const [newCatName, setNewCatName] = useState('');

  // Email Assignment Modal State
  const [isEmailAssignModalOpen, setIsEmailAssignModalOpen] = useState(false);
  const [targetAssignOrderId, setTargetAssignOrderId] = useState<string | undefined>(undefined);

  const openEmailModal = (orderId?: string) => {
    setTargetAssignOrderId(orderId);
    setIsEmailAssignModalOpen(true);
  };

  // Analytics mockup series
  const salesChartData = [
    { day: 'Mon', revenue: 14200, orders: 38 },
    { day: 'Tue', revenue: 19800, orders: 52 },
    { day: 'Wed', revenue: 17400, orders: 46 },
    { day: 'Thu', revenue: 24100, orders: 65 },
    { day: 'Fri', revenue: 31200, orders: 84 },
    { day: 'Sat', revenue: 28900, orders: 78 },
    { day: 'Sun', revenue: 35600, orders: 95 },
  ];

  const categoryDistributionData = [
    { name: 'Phones & Flagships', value: 45, color: '#6366f1' },
    { name: 'Laptops & Workstations', value: 30, color: '#8b5cf6' },
    { name: 'Wearables & Audio', value: 15, color: '#10b981' },
    { name: 'Accessories', value: 10, color: '#f59e0b' },
  ];

  // Calculated Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total ?? 0), 0);
  const pendingOrders = orders.filter((o) => o.status !== 'DELIVERED' && o.status !== 'CANCELLED');
  const activeDriversCount = drivers.filter((d) => d.status !== 'OFFLINE').length;
  const currentSelectedDriver = drivers.find((d) => d.id === selectedDriverId) || drivers[0];
  const driverActiveOrder = orders.find((o) => o.driverId === currentSelectedDriver?.id && o.status !== 'DELIVERED');

  const adminNavItems: { id: AdminPage; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'admin-overview', label: 'Executive Overview', icon: LayoutDashboard },
    { id: 'admin-delivery-ops', label: 'Live Fleet Radar & GPS', icon: Navigation },
    { id: 'admin-delivery-hub', label: `Delivery Hub & Dispatch`, icon: Truck },
    { id: 'admin-orders', label: `Orders Ledger (${orders.length})`, icon: ShoppingBag },
    { id: 'admin-products', label: `Hardware Catalog (${products.length})`, icon: Package },
    { id: 'admin-categories', label: `Categories (${categories.length})`, icon: FolderTree },
    { id: 'admin-drivers', label: `Driver Fleet (${drivers.length})`, icon: UserCheck },
    { id: 'admin-customers', label: `Customer CRM (${users.length})`, icon: Users },
    { id: 'admin-analytics', label: 'Analytics & KPIs', icon: TrendingUp },
    { id: 'admin-coupons', label: 'Coupons & Promos', icon: Ticket },
    { id: 'admin-notifications', label: `Audit Logs (${emailLogs.length})`, icon: Mail },
    { id: 'admin-prisma-arch', label: 'Prisma DB & Architecture', icon: Database },
    { id: 'admin-settings', label: 'System Settings', icon: Settings },
  ];

  // Normalization for matching subpage variants
  const activeTab: AdminPage =
    adminPage === 'admin-revenue' || adminPage === 'admin-reports' || adminPage === 'admin-payments'
      ? 'admin-analytics'
      : adminPage === 'admin-inventory'
      ? 'admin-products'
      : adminPage === 'admin-support' || adminPage === 'admin-company-settings' || adminPage === 'admin-roles' || adminPage === 'admin-staff' || adminPage === 'admin-integrations'
      ? 'admin-settings'
      : adminPage === 'admin-audit-logs'
      ? 'admin-notifications'
      : adminPage === 'admin-referrals'
      ? 'admin-coupons'
      : adminPage;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Top Admin Header Bar */}
      <header className="bg-slate-950 border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 transition"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2.5">
            <ItechLogo variant="dark" size="sm" showSubtitle={false} />
            <span className="hidden sm:inline bg-cyan-950/80 text-cyan-400 text-[10px] px-2 py-0.5 rounded-full border border-cyan-800 font-mono whitespace-nowrap">
              LOGISTICS COMMAND
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden md:flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-400 font-medium">Session:</span>
            <span className="font-bold text-indigo-300 font-mono">{currentUser?.email || 'admin@itech.com'}</span>
          </div>

          <button
            onClick={() => setPortalMode('customer')}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-1.5 rounded-xl border border-slate-700 font-semibold transition flex items-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Storefront</span>
          </button>

          <button
            onClick={logout}
            className="text-xs bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-800/80 px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5"
            title="Sign out of Administrator Session"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exit Admin</span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-72 max-w-[85vw] bg-slate-950 border-r border-slate-800 p-4 flex flex-col justify-between h-full shadow-2xl z-10 overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <ItechLogo variant="dark" size="sm" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1">
                {adminNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setAdminPage(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-bold transition text-left ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-center space-y-1 mt-4">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Authenticated Admin</div>
              <div className="text-xs font-extrabold text-indigo-300 font-mono truncate">{currentUser?.email}</div>
            </div>
          </div>
        </div>
      )}

      {/* Main Admin Body: Left Navigation + Right Content Canvas (CSS Flex/Grid) */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto p-3 sm:p-6 gap-6">
        {/* Left Navigation Sidebar (Desktop) */}
        <aside className="w-64 bg-slate-950 rounded-3xl border border-slate-800 p-3 shadow-xl hidden lg:flex flex-col justify-between shrink-0 self-start sticky top-20">
          <div className="space-y-1">
            <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider px-3 py-2">
              Operations Modules
            </div>
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setAdminPage(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-bold transition text-left ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-center space-y-1 mt-4">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Dispatcher Session</div>
            <div className="text-xs font-extrabold text-indigo-300 font-mono truncate">{currentUser?.email}</div>
            <div className="text-[10px] text-emerald-400 font-bold flex items-center justify-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Full Control Active</span>
            </div>
          </div>
        </aside>

        {/* Main Dynamic Screen Area */}
        <main className="flex-1 min-w-0 w-full space-y-6">
          {/* ================= 1. EXECUTIVE OVERVIEW ================= */}
          {activeTab === 'admin-overview' && (
            <div className="space-y-6">
              {/* Metric Cards Banner - CSS Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800 shadow-lg space-y-2 min-w-0">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
                    <span className="truncate">Total Revenue</span>
                    <DollarSign className="w-4 h-4 text-emerald-400 shrink-0" />
                  </div>
                  <div className="text-2xl font-black text-white font-mono truncate">${totalRevenue.toFixed(2)}</div>
                  <div className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 shrink-0" /> +24.8% this week
                  </div>
                </div>

                <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800 shadow-lg space-y-2 min-w-0">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
                    <span className="truncate">Active Orders</span>
                    <ShoppingBag className="w-4 h-4 text-indigo-400 shrink-0" />
                  </div>
                  <div className="text-2xl font-black text-white font-mono truncate">{orders.length}</div>
                  <div className="text-[11px] text-indigo-400 font-bold truncate">{pendingOrders.length} pending fulfillment</div>
                </div>

                <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800 shadow-lg space-y-2 min-w-0">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
                    <span className="truncate">Couriers Active</span>
                    <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                  </div>
                  <div className="text-2xl font-black text-white font-mono truncate">{activeDriversCount} / {drivers.length}</div>
                  <div className="text-[11px] text-emerald-400 font-bold">100% GPS Transmitters Active</div>
                </div>

                <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800 shadow-lg space-y-2 min-w-0">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
                    <span className="truncate">Active SKUs</span>
                    <Package className="w-4 h-4 text-amber-400 shrink-0" />
                  </div>
                  <div className="text-2xl font-black text-white font-mono truncate">{products.length} Items</div>
                  <div className="text-[11px] text-amber-400 font-bold">
                    {products.filter((p) => p.stock < 15).length} Low-Stock Alert SKUs
                  </div>
                </div>
              </div>

              {/* Weekly Analytics Chart */}
              <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">
                      Weekly Revenue & Fulfillment Velocity
                    </h3>
                    <p className="text-xs text-slate-400">Aggregated enterprise daily transactional volume.</p>
                  </div>
                  <span className="text-[11px] text-emerald-400 font-mono font-bold bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800 self-start sm:self-auto">
                    Daily Average: $24,400.00
                  </span>
                </div>

                <div className="h-64 sm:h-72 w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={salesChartData}>
                      <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                      <YAxis stroke="#64748b" fontSize={11} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#020617',
                          borderColor: '#334155',
                          borderRadius: '12px',
                          color: '#fff',
                        }}
                      />
                      <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Quick dispatch table & Low Stock alerts - CSS Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pending Dispatch Orders */}
                <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-lg space-y-4 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-extrabold text-white uppercase tracking-wider truncate">
                      Immediate Dispatch Queue
                    </h4>
                    <button
                      onClick={() => setAdminPage('admin-orders')}
                      className="text-xs text-indigo-400 font-bold hover:underline shrink-0"
                    >
                      View All
                    </button>
                  </div>

                  <div className="divide-y divide-slate-800">
                    {orders.slice(0, 3).map((ord) => (
                      <div key={ord.id} className="py-3 flex items-center justify-between text-xs gap-2">
                        <div className="min-w-0">
                          <div className="font-mono font-bold text-white truncate">{ord.orderNumber}</div>
                          <div className="text-[11px] text-slate-400 truncate">
                            {ord.items.length} items • ${ord.total.toFixed(2)}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="font-mono text-[10px] bg-amber-950 text-amber-300 border border-amber-800 px-2 py-0.5 rounded font-bold whitespace-nowrap">
                            OTP: {ord.otpCode}
                          </span>
                          <button
                            onClick={() => setAdminPage('admin-delivery-hub')}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg whitespace-nowrap"
                          >
                            Dispatch
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Low Stock Warning Box */}
                <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-lg space-y-4 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5 text-rose-400 truncate">
                      <AlertTriangle className="w-4 h-4 shrink-0" /> Low Stock Inventory
                    </h4>
                    <button
                      onClick={() => setAdminPage('admin-products')}
                      className="text-xs text-indigo-400 font-bold hover:underline shrink-0"
                    >
                      Restock SKUs
                    </button>
                  </div>

                  <div className="divide-y divide-slate-800">
                    {products.filter((p) => p.stock < 30).slice(0, 3).map((p) => (
                      <div key={p.id} className="py-3 flex items-center justify-between text-xs gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img src={p.images[0]} alt={p.name} className="w-9 h-9 rounded-lg object-cover border border-slate-800 shrink-0" />
                          <div className="min-w-0">
                            <div className="font-bold text-white truncate">{p.name}</div>
                            <div className="text-[11px] text-slate-400 truncate">{p.categoryName}</div>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="font-mono font-bold text-rose-400">{p.stock} in stock</div>
                          <div className="text-[10px] text-slate-500">${p.price}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= 2. LIVE FLEET RADAR & GPS ================= */}
          {activeTab === 'admin-delivery-ops' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl">
                <div>
                  <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
                    <Navigation className="w-5 h-5 text-emerald-400" />
                    <span>Real-Time Fleet Telemetry & Radar</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Live rotating GPS beacons for active courier dispatch and doorstep verification.
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => setTrafficActive(!trafficActive)}
                    className={`text-xs px-3 py-1.5 rounded-xl font-bold border transition ${
                      trafficActive
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                        : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}
                  >
                    Traffic Layer: {trafficActive ? 'ON' : 'OFF'}
                  </button>
                  <button
                    onClick={() => setAdminPage('admin-delivery-hub')}
                    className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3 py-1.5 rounded-xl transition flex items-center gap-1"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>Open Delivery Hub</span>
                  </button>
                </div>
              </div>

              {/* Radar Grid & Telemetry Panel */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                      <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                      <span>San Francisco Metro Delivery Grid</span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">Center: 37.7749° N, 122.4194° W</div>
                  </div>

                  {/* Simulated Map Canvas */}
                  <div className="relative h-96 w-full bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />

                    {/* Radar Sweep Ring */}
                    <div className="absolute w-80 h-80 rounded-full border border-emerald-500/20 animate-ping opacity-20 pointer-events-none" />
                    <div className="absolute w-56 h-56 rounded-full border border-indigo-500/30" />

                    {/* Driver Pins */}
                    {drivers.map((drv) => {
                      const isSelected = drv.id === selectedDriverId;
                      const lat = drv.location?.lat ?? 37.7749;
                      const lng = drv.location?.lng ?? -122.4194;
                      const leftPos = Math.min(85, Math.max(15, 50 + (lng + 122.4194) * 400));
                      const topPos = Math.min(85, Math.max(15, 50 - (lat - 37.7749) * 400));

                      return (
                        <div
                          key={drv.id}
                          onClick={() => setSelectedDriverId(drv.id)}
                          style={{ left: `${leftPos}%`, top: `${topPos}%` }}
                          className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
                            isSelected ? 'scale-125 z-20' : 'scale-100 z-10 opacity-80'
                          }`}
                        >
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold border-2 ${
                              drv.status === 'AVAILABLE'
                                ? 'bg-emerald-600 border-emerald-300 shadow-lg shadow-emerald-600/50'
                                : drv.status === 'BUSY'
                                ? 'bg-indigo-600 border-indigo-300 shadow-lg shadow-indigo-600/50'
                                : 'bg-slate-600 border-slate-400'
                            }`}
                          >
                            <Truck className="w-3.5 h-3.5" />
                          </div>
                          <div className="bg-slate-950 text-white text-[9px] px-1.5 py-0.5 rounded border border-slate-800 shadow font-bold mt-1 whitespace-nowrap text-center">
                            {drv.name.split(' ')[0]}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Selected Driver Telemetry Detail Card */}
                <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
                  <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">
                    Courier Telemetry Focus
                  </h3>

                  {currentSelectedDriver && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={currentSelectedDriver.avatar}
                          alt={currentSelectedDriver.name}
                          className="w-12 h-12 rounded-2xl object-cover border-2 border-indigo-500"
                        />
                        <div>
                          <div className="font-extrabold text-sm text-white">{currentSelectedDriver.name}</div>
                          <div className="text-xs text-indigo-400 font-mono">{currentSelectedDriver.phone}</div>
                          <div className="text-[11px] text-slate-400">{currentSelectedDriver.vehicle.model} • {currentSelectedDriver.vehicle.plateNumber}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800">
                          <div className="text-slate-500 text-[10px] uppercase font-bold">Status</div>
                          <div className="font-bold text-emerald-400 mt-0.5">{currentSelectedDriver.status}</div>
                        </div>
                        <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800">
                          <div className="text-slate-500 text-[10px] uppercase font-bold">Driver Rating</div>
                          <div className="font-bold text-amber-400 mt-0.5">★ {currentSelectedDriver.rating} / 5.0</div>
                        </div>
                        <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800">
                          <div className="text-slate-500 text-[10px] uppercase font-bold">Completed Trips</div>
                          <div className="font-mono font-bold text-white mt-0.5">{currentSelectedDriver.totalTrips} Trips</div>
                        </div>
                        <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800">
                          <div className="text-slate-500 text-[10px] uppercase font-bold">Live GPS Lat/Lng</div>
                          <div className="font-mono font-bold text-indigo-300 text-[10px] mt-0.5 truncate">
                            {(currentSelectedDriver.location?.lat ?? 37.7749).toFixed(4)}, {(currentSelectedDriver.location?.lng ?? -122.4194).toFixed(4)}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleDriverStatus(currentSelectedDriver.id)}
                        className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 rounded-xl text-xs transition border border-slate-700"
                      >
                        Toggle Status ({currentSelectedDriver.status})
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ================= 3. DELIVERY HUB & COURIER DISPATCH ================= */}
          {activeTab === 'admin-delivery-hub' && <DeliveryHubModule />}

          {/* ================= 4. ORDERS LEDGER ================= */}
          {activeTab === 'admin-orders' && (
            <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-extrabold text-white">Orders & Transaction Ledger</h2>
                  <p className="text-xs text-slate-400">Fulfillment lifecycle, doorstep OTP codes, and courier email dispatch.</p>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <button
                    onClick={() => openEmailModal()}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition shadow flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Assign Delivery by Email</span>
                  </button>

                  <div className="flex items-center gap-2 overflow-x-auto">
                    {['ALL', 'CONFIRMED', 'PROCESSING', 'OUT_FOR_DELIVERY', 'DELIVERED'].map((st) => (
                      <button
                        key={st}
                        onClick={() => setOrderFilterStatus(st)}
                        className={`text-xs px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap ${
                          orderFilterStatus === st
                            ? 'bg-indigo-600 text-white shadow'
                            : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Scrollable Orders Table */}
              <div className="w-full overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/80">
                <table className="w-full text-left text-xs min-w-[760px]">
                  <thead className="bg-slate-900 text-slate-400 font-bold border-b border-slate-800">
                    <tr>
                      <th className="p-3.5">Order Number</th>
                      <th className="p-3.5">Customer & Destination</th>
                      <th className="p-3.5">Total & Payment</th>
                      <th className="p-3.5">Doorstep OTP</th>
                      <th className="p-3.5">Assigned Courier</th>
                      <th className="p-3.5">Status Lifecycle</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-slate-300">
                    {orders
                      .filter((o) => (orderFilterStatus === 'ALL' ? true : o.status === orderFilterStatus))
                      .map((o) => (
                        <tr key={o.id} className="hover:bg-slate-900/50 transition">
                          <td className="p-3.5 font-mono font-bold text-indigo-400 whitespace-nowrap">{o.orderNumber}</td>
                          <td className="p-3.5">
                            <div className="font-bold text-white truncate max-w-[180px]">{o.shippingAddress?.fullName || 'Alexander Hayes'}</div>
                            <div className="text-[11px] text-slate-400 truncate max-w-[200px]">{o.shippingAddress?.street}, {o.shippingAddress?.city}</div>
                          </td>
                          <td className="p-3.5 whitespace-nowrap">
                            <div className="font-mono font-black text-emerald-400">${o.total.toFixed(2)}</div>
                            <div className="text-[10px] text-slate-500 uppercase">{o.paymentMethod}</div>
                          </td>
                          <td className="p-3.5 whitespace-nowrap">
                            <span className="font-mono font-bold text-amber-300 bg-amber-950/80 border border-amber-800 px-2 py-0.5 rounded text-[11px]">
                              {o.otpCode}
                            </span>
                          </td>
                          <td className="p-3.5 whitespace-nowrap">
                            {o.driverId ? (
                              <div className="space-y-0.5">
                                <span className="text-emerald-400 font-semibold">{drivers.find((d) => d.id === o.driverId)?.name || 'Assigned Courier'}</span>
                                <button
                                  onClick={() => openEmailModal(o.id)}
                                  className="block text-[10px] text-slate-400 hover:text-cyan-400 font-mono transition"
                                >
                                  Reassign by email →
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => openEmailModal(o.id)}
                                  className="text-[11px] text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 bg-cyan-950/50 px-2 py-1 rounded-lg border border-cyan-800/50"
                                >
                                  <Mail className="w-3 h-3" />
                                  <span>Assign Email</span>
                                </button>
                              </div>
                            )}
                          </td>
                          <td className="p-3.5 whitespace-nowrap">
                            <select
                              value={o.status}
                              onChange={(e) => updateOrderStatus(o.id, e.target.value as OrderStatus)}
                              className="bg-slate-900 border border-slate-700 text-white rounded-lg px-2 py-1 text-[11px] font-bold focus:outline-none focus:border-indigo-500"
                            >
                              <option value="CONFIRMED">CONFIRMED</option>
                              <option value="PROCESSING">PROCESSING</option>
                              <option value="SHIPPED">SHIPPED</option>
                              <option value="OUT_FOR_DELIVERY">OUT_FOR_DELIVERY</option>
                              <option value="DELIVERED">DELIVERED</option>
                              <option value="CANCELLED">CANCELLED</option>
                            </select>
                          </td>
                          <td className="p-3.5 text-right whitespace-nowrap space-x-1.5">
                            <button
                              onClick={() => openEmailModal(o.id)}
                              className="text-xs bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-800 font-bold px-2.5 py-1 rounded-lg transition inline-flex items-center gap-1"
                              title="Send Email Dispatch Assignment"
                            >
                              <Mail className="w-3 h-3" />
                              <span>Email</span>
                            </button>
                            <button
                              onClick={() => {
                                setAdminPage('admin-delivery-hub');
                              }}
                              className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-2.5 py-1 rounded-lg transition"
                            >
                              Dispatch Hub
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= 5. HARDWARE CATALOG ================= */}
          {activeTab === 'admin-products' && <ProductCatalogManager />}

          {/* ================= 6. CATEGORIES ================= */}
          {activeTab === 'admin-categories' && (
            <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-extrabold text-white">Product Categories</h2>
                  <p className="text-xs text-slate-400">Department taxonomy and navigation structures.</p>
                </div>
                <button
                  onClick={() => setIsAddCatOpen(!isAddCatOpen)}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-xl shadow flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Category</span>
                </button>
              </div>

              {isAddCatOpen && (
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex gap-2">
                  <input
                    type="text"
                    placeholder="Category Name"
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    className="px-3 py-2 bg-slate-950 border border-slate-700 text-white rounded-xl text-xs flex-1"
                  />
                  <button
                    onClick={() => {
                      if (!newCatName) return;
                      addCategory({
                        name: newCatName,
                        slug: newCatName.toLowerCase().replace(/\s+/g, '-'),
                        icon: 'Package',
                        description: `Hardware items in ${newCatName}`,
                      });
                      setNewCatName('');
                      setIsAddCatOpen(false);
                      addToast('success', 'Category Created', `${newCatName} added.`);
                    }}
                    className="bg-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-xl"
                  >
                    Save
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((c) => (
                  <div key={c.id} className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-sm text-white">{c.name}</span>
                      <span className="font-mono text-[11px] text-indigo-400">
                        {products.filter((p) => p.categoryId === c.id).length} Products
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{c.description || 'Hardware sub-department'}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= 7. DRIVER FLEET ================= */}
          {activeTab === 'admin-drivers' && (
            <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-extrabold text-white">Courier & Dispatch Fleet</h2>
                  <p className="text-xs text-slate-400">Manage drivers, license plates, and active routes.</p>
                </div>
              </div>

              {/* Scrollable Drivers Table */}
              <div className="w-full overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/80">
                <table className="w-full text-left text-xs min-w-[700px]">
                  <thead className="bg-slate-900 text-slate-400 font-bold border-b border-slate-800">
                    <tr>
                      <th className="p-3.5">Courier Name</th>
                      <th className="p-3.5">Vehicle Spec</th>
                      <th className="p-3.5">Rating</th>
                      <th className="p-3.5">Trips</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-slate-300">
                    {drivers.map((d) => (
                      <tr key={d.id} className="hover:bg-slate-900/50 transition">
                        <td className="p-3.5 flex items-center gap-3">
                          <img src={d.avatar} alt={d.name} className="w-9 h-9 rounded-xl object-cover border border-slate-800 shrink-0" />
                          <div>
                            <div className="font-bold text-white">{d.name}</div>
                            <div className="text-[11px] text-slate-400 font-mono">{d.phone}</div>
                          </div>
                        </td>
                        <td className="p-3.5">
                          <div className="text-white font-bold">{d.vehicle.model}</div>
                          <div className="text-[11px] text-slate-500 font-mono">{d.vehicle.plateNumber}</div>
                        </td>
                        <td className="p-3.5 text-amber-400 font-bold">★ {d.rating}</td>
                        <td className="p-3.5 font-mono text-slate-300">{d.totalTrips} deliveries</td>
                        <td className="p-3.5">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                              d.status === 'AVAILABLE'
                                ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                                : d.status === 'BUSY'
                                ? 'bg-indigo-950 text-indigo-400 border-indigo-800'
                                : 'bg-slate-800 text-slate-400 border-slate-700'
                            }`}
                          >
                            {d.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => toggleDriverStatus(d.id)}
                            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-3 py-1 rounded-lg border border-slate-700 transition"
                          >
                            Toggle Status
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= 8. CUSTOMER CRM ================= */}
          {activeTab === 'admin-customers' && (
            <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 shadow-xl space-y-6">
              <div>
                <h2 className="text-lg font-extrabold text-white">Customer CRM Directory</h2>
                <p className="text-xs text-slate-400">Registered client accounts, wallet balances, and purchase frequencies.</p>
              </div>

              {/* Scrollable Customers Table */}
              <div className="w-full overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/80">
                <table className="w-full text-left text-xs min-w-[650px]">
                  <thead className="bg-slate-900 text-slate-400 font-bold border-b border-slate-800">
                    <tr>
                      <th className="p-3.5">User</th>
                      <th className="p-3.5">Email</th>
                      <th className="p-3.5">Role</th>
                      <th className="p-3.5">Wallet Balance</th>
                      <th className="p-3.5">Referral ID</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-slate-300">
                    {users.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-900/50 transition">
                        <td className="p-3.5 flex items-center gap-3">
                          <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                          <span className="font-bold text-white">{u.name}</span>
                        </td>
                        <td className="p-3.5 font-mono text-slate-300">{u.email}</td>
                        <td className="p-3.5">
                          <span className="bg-slate-800 text-indigo-300 px-2 py-0.5 rounded text-[10px] font-bold">
                            {u.role}
                          </span>
                        </td>
                        <td className="p-3.5 font-mono font-black text-emerald-400">${(u.walletBalance ?? 0).toFixed(2)}</td>
                        <td className="p-3.5 font-mono text-slate-500">{u.referralCode}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= 9. ANALYTICS & KPIS ================= */}
          {activeTab === 'admin-analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Category Revenue Distribution */}
                <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
                  <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">
                    Category Revenue Share
                  </h3>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={categoryDistributionData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                          {categoryDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Average Delivery Speed KPI */}
                <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">
                      Logistics Speed Benchmarks
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">Average fulfillment duration across all orders.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-4 bg-emerald-950/60 rounded-2xl border border-emerald-800">
                      <div className="text-3xl font-black text-emerald-400 font-mono">24.2m</div>
                      <div className="text-xs font-bold text-emerald-200 mt-1">Avg Dispatch to Doorstep</div>
                    </div>
                    <div className="p-4 bg-indigo-950/60 rounded-2xl border border-indigo-800">
                      <div className="text-3xl font-black text-indigo-400 font-mono">99.4%</div>
                      <div className="text-xs font-bold text-indigo-200 mt-1">On-Time SLA Completion</div>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl text-xs text-slate-400 font-mono">
                    System Telemetry Frequency: 1.0s rotating GPS polling
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= 10. COUPONS & PROMOS ================= */}
          {activeTab === 'admin-coupons' && (
            <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-extrabold text-white">Marketing & Promo Codes</h2>
                  <p className="text-xs text-slate-400">Configure checkout discount incentives.</p>
                </div>
                <button
                  onClick={() => setIsAddCouponOpen(!isAddCouponOpen)}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-xl shadow flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Promo Code</span>
                </button>
              </div>

              {isAddCouponOpen && (
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Coupon Code (e.g. FLASH50)"
                      value={newCouponCode}
                      onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                      className="px-3 py-2 bg-slate-950 border border-slate-700 text-white rounded-xl text-xs font-mono font-bold"
                    />
                    <input
                      type="number"
                      placeholder="Discount %"
                      value={newCouponDiscount}
                      onChange={(e) => setNewCouponDiscount(+e.target.value)}
                      className="px-3 py-2 bg-slate-950 border border-slate-700 text-white rounded-xl text-xs font-mono"
                    />
                  </div>
                  <button
                    onClick={() => {
                      if (!newCouponCode) return;
                      addCoupon({
                        code: newCouponCode,
                        discountType: 'percentage',
                        discountValue: newCouponDiscount,
                        minOrderAmount: 100,
                        expiryDate: '2026-12-31',
                        isActive: true,
                        usageCount: 0,
                      });
                      setNewCouponCode('');
                      setIsAddCouponOpen(false);
                      addToast('success', 'Coupon Created', `Code ${newCouponCode} activated.`);
                    }}
                    className="bg-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-xl shadow"
                  >
                    Activate Coupon
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {coupons.map((c) => (
                  <div key={c.id} className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-extrabold text-sm text-indigo-400">{c.code}</span>
                      <button onClick={() => deleteCoupon(c.id)} className="text-slate-400 hover:text-rose-400">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-xs text-slate-200 font-bold">
                      {c.discountValue}% OFF orders over ${c.minOrderAmount}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">Expires: {c.expiryDate} • Used {c.usageCount} times</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= 11. NOTIFICATIONS & AUDIT LOGS ================= */}
          {activeTab === 'admin-notifications' && (
            <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 shadow-xl space-y-6">
              <div>
                <h2 className="text-lg font-extrabold text-white">System Notification & Audit Log</h2>
                <p className="text-xs text-slate-400">Chronological telemetry of transactional notifications and OTP dispatches.</p>
              </div>

              {/* Scrollable Audit Logs */}
              <div className="space-y-3">
                {emailLogs.map((log) => (
                  <div key={log.id} className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs space-y-1">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="font-bold text-white">{log.subject}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{log.timestamp}</span>
                    </div>
                    <div className="text-slate-300">
                      <strong>To:</strong> {log.recipient} ({log.type})
                    </div>
                    <p className="text-slate-400 text-[11px] mt-1">{log.body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= 12. PRISMA DB & ARCHITECTURE ================= */}
          {activeTab === 'admin-prisma-arch' && <PrismaArchitectureView />}

          {/* ================= 13. SYSTEM SETTINGS ================= */}
          {activeTab === 'admin-settings' && (
            <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 shadow-xl space-y-6 max-w-2xl">
              <div>
                <h2 className="text-lg font-extrabold text-white">Platform Configurations</h2>
                <p className="text-xs text-slate-400">Delivery radius, taxes, and courier dispatch automation.</p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Store Name</label>
                  <input
                    type="text"
                    value={storeSettings.storeName}
                    onChange={(e) => updateStoreSettings({ storeName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-white rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">Max Delivery Radius (km)</label>
                    <input
                      type="number"
                      value={storeSettings.deliveryRadiusKm}
                      onChange={(e) => updateStoreSettings({ deliveryRadiusKm: +e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-white rounded-xl font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-300 mb-1">Sales Tax Rate (%)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={storeSettings.taxRate}
                      onChange={(e) => updateStoreSettings({ taxRate: +e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-white rounded-xl font-mono"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                  <div>
                    <div className="font-bold text-slate-200">Auto-Assign Nearest Courier</div>
                    <div className="text-[11px] text-slate-400">Automatically pair new orders with closest available driver via GPS.</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={storeSettings.autoAssignDriver}
                    onChange={(e) => updateStoreSettings({ autoAssignDriver: e.target.checked })}
                    className="w-4 h-4 text-indigo-600 accent-indigo-600"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Email Assignment Modal */}
          <AssignDeliveryModal
            isOpen={isEmailAssignModalOpen}
            onClose={() => setIsEmailAssignModalOpen(false)}
            initialOrderId={targetAssignOrderId}
          />
        </main>
      </div>
    </div>
  );
};

export const AdminDashboard: React.FC = () => {
  const { currentUser } = useApp();

  if (!currentUser || currentUser.role !== 'ADMIN') {
    return <AdminAuthGate />;
  }

  return <AdminDashboardContent />;
};

