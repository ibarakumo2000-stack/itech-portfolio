import React, { useState } from 'react';
import { Database, Server, Cpu, Table, FileCode, CheckCircle2, Layers, GitBranch, ArrowRight, ShieldCheck, HardDrive, RefreshCw, Copy, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PrismaArchitectureView: React.FC = () => {
  const { products, orders, drivers, users, categories, coupons, emailLogs, addToast } = useApp();
  const [activeSubTab, setActiveSubTab] = useState<'models' | 'schema' | 'architecture' | 'migrations'>('models');
  const [copied, setCopied] = useState(false);

  const prismaSchemaCode = `// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  CUSTOMER
  ADMIN
  DRIVER
}

enum OrderStatus {
  PENDING
  CONFIRMED
  PROCESSING
  SHIPPED
  OUT_FOR_DELIVERY
  DELIVERED
  CANCELLED
}

enum DriverStatus {
  AVAILABLE
  BUSY
  OFFLINE
}

model User {
  id             String         @id @default(cuid())
  email          String         @unique
  name           String
  role           Role           @default(CUSTOMER)
  phone          String?
  avatar         String?
  walletBalance  Float          @default(0.0)
  referralCode   String         @unique
  isVerified     Boolean        @default(true)
  createdAt      DateTime       @default(now())
  updatedAt      DateTime       @updatedAt
  
  orders         Order[]
  reviews        Review[]
  addresses      Address[]
  transactions   WalletTransaction[]
}

model Product {
  id             String         @id @default(cuid())
  name           String
  brand          String
  slug           String         @unique
  description    String
  price          Float
  originalPrice  Float?
  stock          Int            @default(0)
  categoryId     String
  category       Category       @relation(fields: [categoryId], references: [id])
  images         String[]
  specifications Json
  isFeatured     Boolean        @default(false)
  tags           String[]
  createdAt      DateTime       @default(now())
  
  orderItems     OrderItem[]
  reviews        Review[]
}

model Category {
  id          String    @id @default(cuid())
  name        String
  slug        String    @unique
  description String?
  icon        String?
  image       String?
  products    Product[]
}

model Order {
  id              String       @id @default(cuid())
  orderNumber     String       @unique
  userId          String
  user            User         @relation(fields: [userId], references: [id])
  driverId        String?
  driver          Driver?      @relation(fields: [driverId], references: [id])
  status          OrderStatus  @default(PENDING)
  total           Float
  subtotal        Float
  deliveryFee     Float        @default(0.0)
  tax             Float        @default(0.0)
  discount        Float        @default(0.0)
  paymentMethod   String
  paymentStatus   String       @default("PAID")
  otpCode         String
  estimatedMinutes Int         @default(30)
  shippingAddress Json
  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt
  
  items           OrderItem[]
}

model OrderItem {
  id           String   @id @default(cuid())
  orderId      String
  order        Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)
  productId    String
  product      Product  @relation(fields: [productId], references: [id])
  productName  String
  productImage String
  price        Float
  quantity     Int      @default(1)
}

model Driver {
  id           String       @id @default(cuid())
  name         String
  phone        String
  email        String       @unique
  avatar       String?
  status       DriverStatus @default(AVAILABLE)
  vehicleType  String
  plateNumber  String
  model        String
  currentLat   Float
  currentLng   Float
  rating       Float        @default(4.9)
  totalTrips   Int          @default(0)
  orders       Order[]
}

model Coupon {
  id            String    @id @default(cuid())
  code          String    @unique
  discountType  String    @default("percentage")
  discountValue Float
  minSpend      Float     @default(0.0)
  expiryDate    DateTime
  usageCount    Int       @default(0)
  usageLimit    Int       @default(1000)
}`;

  const copySchema = () => {
    navigator.clipboard.writeText(prismaSchemaCode);
    setCopied(true);
    addToast('success', 'Schema Copied', 'Prisma schema copied to clipboard.');
    setTimeout(() => setCopied(false), 2000);
  };

  const dbModels = [
    { name: 'User', count: users.length, fields: 12, description: 'Customer & Admin profiles, auth RBAC, wallet ledger' },
    { name: 'Product', count: products.length, fields: 13, description: 'Hardware SKU catalog, specifications, pricing, inventory stock' },
    { name: 'Order', count: orders.length, fields: 15, description: 'Purchases, doorstep OTP tokens, courier assignment, status lifecycle' },
    { name: 'OrderItem', count: orders.reduce((acc, o) => acc + o.items.length, 0), fields: 8, description: 'Cart line items linked to orders with quantity & price snapshot' },
    { name: 'Driver', count: drivers.length, fields: 12, description: 'Couriers, live GPS telemetry coordinates, vehicle specs, availability' },
    { name: 'Category', count: categories.length, fields: 7, description: 'Taxonomy hierarchy, slug identifiers, banner imagery' },
    { name: 'Coupon', count: coupons.length, fields: 8, description: 'Promotional discount codes, usage limits, minimum spend thresholds' },
    { name: 'AuditLog', count: emailLogs.length, fields: 6, description: 'Real-time transactional audit log & dispatch broadcasts' },
  ];

  return (
    <div className="space-y-6">
      {/* Header & Sub-Nav */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-black text-white">Prisma ORM & System Architecture</h2>
            <span className="bg-emerald-950 text-emerald-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-emerald-800">
              PostgreSQL • Prisma v5.18
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Relational entity models, schema definitions, microservice routing, and database telemetry.
          </p>
        </div>

        {/* Sub-tab switcher */}
        <div className="flex bg-slate-900 p-1 rounded-2xl border border-slate-800 self-start sm:self-auto overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveSubTab('models')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeSubTab === 'models' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            <span>Entities ({dbModels.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('schema')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeSubTab === 'schema' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>schema.prisma</span>
          </button>

          <button
            onClick={() => setActiveSubTab('architecture')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeSubTab === 'architecture' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>System Microservices</span>
          </button>
        </div>
      </div>

      {/* 1. ENTITY MODELS TAB */}
      {activeSubTab === 'models' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="text-[11px] text-slate-400 font-bold uppercase">Connected DB Host</div>
              <div className="text-sm font-extrabold text-emerald-400 font-mono mt-1">db.itech-platform.internal</div>
              <div className="text-[10px] text-slate-500 mt-1">PostgreSQL 16.3 (Cloud Relational)</div>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="text-[11px] text-slate-400 font-bold uppercase">Active Entities</div>
              <div className="text-xl font-black text-white font-mono mt-1">{dbModels.length} Data Models</div>
              <div className="text-[10px] text-indigo-400 mt-1">Fully Typed TypeScript ORM</div>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="text-[11px] text-slate-400 font-bold uppercase">Total Records in Store</div>
              <div className="text-xl font-black text-white font-mono mt-1">
                {products.length + orders.length + drivers.length + users.length + categories.length} Live Rows
              </div>
              <div className="text-[10px] text-emerald-400 mt-1">Normalized 3NF Architecture</div>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="text-[11px] text-slate-400 font-bold uppercase">Connection Pool</div>
              <div className="text-xl font-black text-white font-mono mt-1">10 / 50 Active</div>
              <div className="text-[10px] text-slate-400 mt-1">Latency: 4.2ms avg query time</div>
            </div>
          </div>

          {/* Scrollable Model Table */}
          <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                <Table className="w-4 h-4 text-indigo-400" /> Prisma Relational Data Entities
              </h3>
              <span className="text-[11px] text-slate-400">All tables have indexes on foreign keys</span>
            </div>

            <div className="w-full overflow-x-auto rounded-2xl border border-slate-800">
              <table className="w-full text-left text-xs min-w-[640px]">
                <thead className="bg-slate-900 text-slate-400 font-bold border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Prisma Model</th>
                    <th className="p-3.5">Live Records</th>
                    <th className="p-3.5">Schema Fields</th>
                    <th className="p-3.5">Purpose & Description</th>
                    <th className="p-3.5">Key Relationships</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-300">
                  {dbModels.map((m) => (
                    <tr key={m.name} className="hover:bg-slate-900/50 transition">
                      <td className="p-3.5 font-mono font-bold text-indigo-400">{m.name}</td>
                      <td className="p-3.5 font-mono font-bold text-white">{m.count}</td>
                      <td className="p-3.5 font-mono text-slate-400">{m.fields} columns</td>
                      <td className="p-3.5 text-slate-300">{m.description}</td>
                      <td className="p-3.5 font-mono text-[11px] text-emerald-400">
                        {m.name === 'User'
                          ? '1:N Orders, 1:N Reviews'
                          : m.name === 'Product'
                          ? 'N:1 Category, 1:N OrderItems'
                          : m.name === 'Order'
                          ? 'N:1 User, N:1 Driver, 1:N OrderItems'
                          : m.name === 'Driver'
                          ? '1:N Assigned Orders'
                          : 'Indexed Foreign Keys'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. PRISMA SCHEMA FILE TAB */}
      {activeSubTab === 'schema' && (
        <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-indigo-400" />
              <span className="font-mono text-xs font-bold text-white">prisma/schema.prisma</span>
              <span className="text-[10px] text-slate-500 font-mono">UTF-8 • 115 lines</span>
            </div>
            <button
              onClick={copySchema}
              className="flex items-center gap-1.5 text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3 py-1.5 rounded-xl transition"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Schema'}</span>
            </button>
          </div>

          <div className="w-full overflow-x-auto bg-slate-900 p-4 rounded-2xl border border-slate-800 font-mono text-xs text-indigo-200 leading-relaxed max-h-[500px]">
            <pre>{prismaSchemaCode}</pre>
          </div>
        </div>
      )}

      {/* 3. SYSTEM ARCHITECTURE TAB */}
      {activeSubTab === 'architecture' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-black">
                1
              </div>
              <h4 className="font-extrabold text-sm text-white">Customer Storefront Tier</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                React 18 + Vite client rendering catalog filters, specifications comparisons, digital wallet ledger, and real-time OTP fulfillment updates.
              </p>
              <div className="pt-2 flex items-center gap-2 text-[11px] text-indigo-400 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Responsive UI & Local Caching
              </div>
            </div>

            <div className="bg-slate-950 p-6 rounded-3xl border border-indigo-500/40 shadow-xl space-y-3 ring-1 ring-indigo-500/20">
              <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black">
                2
              </div>
              <h4 className="font-extrabold text-sm text-white">Admin Operations & Telemetry</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Exclusive command center coordinating live GPS driver tracking, instant dispatch pool assignments, inventory REST APIs, and system audit trails.
              </p>
              <div className="pt-2 flex items-center gap-2 text-[11px] text-emerald-400 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Live GPS & Dispatch Automation
              </div>
            </div>

            <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-black">
                3
              </div>
              <h4 className="font-extrabold text-sm text-white">Courier Logistics & Verification</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Native delivery routing guidance, simulated turn-by-turn vehicle motion, 6-digit OTP doorstep verification, and digital handover signature.
              </p>
              <div className="pt-2 flex items-center gap-2 text-[11px] text-emerald-400 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> 6-Digit OTP Security Protocol
              </div>
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" /> Platform Communication Protocols
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-1">
                <div className="font-bold text-white">REST API Endpoint</div>
                <div className="text-slate-400 text-[11px]">JSON payloads for catalog, orders, and wallet CRUD</div>
              </div>
              <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-1">
                <div className="font-bold text-white">WebSocket / Telemetry</div>
                <div className="text-slate-400 text-[11px]">Live GPS driver coordinates broadcasted every 3.5s</div>
              </div>
              <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-1">
                <div className="font-bold text-white">OTP Handover Gateway</div>
                <div className="text-slate-400 text-[11px]">Cryptographic 6-digit delivery authentication code</div>
              </div>
              <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-1">
                <div className="font-bold text-white">Prisma Client Driver</div>
                <div className="text-slate-400 text-[11px]">Type-safe database transactions and query caching</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
