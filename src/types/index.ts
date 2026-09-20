export type UserRole = 'ADMIN' | 'CUSTOMER' | 'DRIVER' | 'STAFF';

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PACKING'
  | 'READY'
  | 'ASSIGNED'
  | 'PICKED_UP'
  | 'ON_ROUTE'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'REFUNDED';

export type DriverStatus = 'AVAILABLE' | 'BUSY' | 'OFFLINE' | 'ON_BREAK';

export type PaymentMethod = 'CREDIT_CARD' | 'DEBIT_CARD' | 'WALLET' | 'PAYPAL' | 'APPLE_PAY' | 'CASH_ON_DELIVERY';
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  createdAt: string;
  isVerified: boolean;
  walletBalance: number;
  referralCode: string;
  twoFactorEnabled?: boolean;
}

export interface Address {
  id: string;
  userId: string;
  title: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
  lat: number;
  lng: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  image: string;
  itemCount: number;
  description: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  attributes: Record<string, string>;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  categoryName: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  stock: number;
  sku: string;
  barcode: string;
  supplier: string;
  isFeatured: boolean;
  isFlashSale: boolean;
  isVisible: boolean;
  description: string;
  specifications: Record<string, string>;
  images: string[];
  videoUrl?: string;
  tags: string[];
  variants?: ProductVariant[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  sku: string;
}

export interface OrderTimelineEvent {
  status: OrderStatus;
  label: string;
  timestamp: string;
  description: string;
  completed: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  tax: number;
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  shippingAddress: Address;
  deliveryOption: 'standard' | 'express' | 'same_day' | 'pickup';
  deliveryInstructions?: string;
  driverId?: string;
  driverName?: string;
  driverPhone?: string;
  driverAvatar?: string;
  driverVehicle?: string;
  driverPlate?: string;
  driverLocation?: { lat: number; lng: number };
  otpCode: string;
  createdAt: string;
  estimatedDeliveryTime: string;
  timeline: OrderTimelineEvent[];
  proofOfDelivery?: {
    photoUrl?: string;
    signatureUrl?: string;
    completedAt?: string;
    verifiedOtp?: string;
  };
  failureReason?: string;
}

export interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  status: DriverStatus;
  currentDeliveryId?: string;
  rating: number;
  totalDeliveries: number;
  earningsToday: number;
  vehicle: {
    type: 'Motorcycle' | 'Van' | 'Electric Bicycle' | 'Car';
    model: string;
    plateNumber: string;
    color: string;
  };
  location: {
    lat: number;
    lng: number;
    addressName: string;
    isGpsEnabled: boolean;
    heading: number;
  };
  documents: {
    licenseVerified: boolean;
    insuranceVerified: boolean;
    vehicleRegVerified: boolean;
  };
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minSpend: number;
  expiryDate: string;
  usageCount: number;
  usageLimit: number;
  description: string;
}

export interface Review {
  id: string;
  productId: string;
  productName: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  likes: number;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'order' | 'delivery' | 'promo' | 'system' | 'security';
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  userId: string;
  userName: string;
  userEmail: string;
  subject: string;
  category: 'Orders' | 'Delivery' | 'Payment' | 'Account' | 'Technical';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  createdAt: string;
  messages: {
    id: string;
    sender: 'user' | 'agent';
    senderName: string;
    message: string;
    timestamp: string;
  }[];
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  orderId: string;
  orderNumber: string;
  date: string;
  dueDate: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  status: 'PAID' | 'UNPAID' | 'OVERDUE';
  downloadUrl: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  ipAddress: string;
  timestamp: string;
  details: string;
}

export interface StoreSettings {
  storeName: string;
  deliveryRadiusKm: number;
  taxRate: number;
  autoAssignDriver: boolean;
}

export interface EmailLog {
  id: string;
  recipient: string;
  subject: string;
  body: string;
  type: string;
  timestamp: string;
}

export interface WalletTransaction {
  id: string;
  description: string;
  amount: number;
  type: 'CREDIT' | 'DEBIT';
  date: string;
}

export interface SavedCard {
  id: string;
  cardHolder: string;
  lastFour: string;
  brand: 'visa' | 'mastercard' | 'amex';
  expiryMonth: string;
  expiryYear: string;
  isDefault: boolean;
}

export interface ReferralReward {
  id: string;
  referredUserName: string;
  rewardAmount: number;
  status: 'PENDING' | 'REWARDED';
  date: string;
}

// Navigation and Portal types
export type PortalMode = 'customer' | 'admin' | 'delivery' | 'architecture';

export type CustomerPage =
  // Landing individual pages
  | 'landing-full'
  | 'landing-hero'
  | 'landing-categories'
  | 'landing-featured'
  | 'landing-flash-deals'
  | 'landing-flash-sales'
  | 'landing-why-us'
  | 'landing-recommended'
  | 'landing-testimonials'
  | 'landing-partners'
  | 'landing-faqs'
  | 'landing-contact'
  | 'landing-newsletter'
  // Auth
  | 'auth-login'
  | 'auth-register'
  | 'auth-forgot-password'
  | 'auth-reset-password'
  | 'auth-verify-email'
  | 'auth-verify-phone'
  | 'auth-otp'
  | 'auth-2fa'
  // Dashboard & Store views
  | 'cust-home'
  | 'cust-products'
  | 'cust-categories'
  | 'cust-product-details'
  | 'cust-wishlist'
  | 'cust-cart'
  | 'cust-checkout'
  | 'cust-orders'
  | 'cust-live-tracking'
  | 'cust-reviews'
  | 'cust-addresses'
  | 'cust-notifications'
  | 'cust-referrals'
  | 'cust-coupons'
  | 'cust-wallet'
  | 'cust-saved-cards'
  | 'cust-invoices'
  | 'cust-support'
  | 'cust-profile'
  | 'cust-settings'
  | 'cust-compare';

export type AdminPage =
  | 'admin-overview'
  | 'admin-revenue'
  | 'admin-orders'
  | 'admin-delivery-ops'
  | 'admin-delivery-hub'
  | 'admin-customers'
  | 'admin-drivers'
  | 'admin-products'
  | 'admin-categories'
  | 'admin-inventory'
  | 'admin-reports'
  | 'admin-analytics'
  | 'admin-payments'
  | 'admin-coupons'
  | 'admin-referrals'
  | 'admin-notifications'
  | 'admin-support'
  | 'admin-audit-logs'
  | 'admin-company-settings'
  | 'admin-settings'
  | 'admin-roles'
  | 'admin-staff'
  | 'admin-integrations'
  | 'admin-prisma-arch';

export type DeliveryPage =
  | 'del-todays-deliveries'
  | 'del-assign-deliveries'
  | 'del-live-tracking'
  | 'del-verify-otp'
  | 'del-earnings'
  | 'del-profile'
  | 'delivery-today'
  | 'delivery-assign'
  | 'delivery-accepted'
  | 'delivery-navigation'
  | 'delivery-live-tracking'
  | 'delivery-earnings'
  | 'delivery-history'
  | 'delivery-messages'
  | 'delivery-notifications'
  | 'delivery-wallet'
  | 'delivery-availability'
  | 'delivery-documents'
  | 'delivery-support'
  | 'delivery-settings'
  | 'delivery-screen';
