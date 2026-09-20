import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  PortalMode,
  CustomerPage,
  AdminPage,
  DeliveryPage,
  Product,
  CartItem,
  Order,
  Driver,
  Coupon,
  Address,
  Category,
  Review,
  Notification,
  SupportTicket,
  Invoice,
  SavedCard,
  ReferralReward,
  OrderStatus,
  DriverStatus,
  StoreSettings,
  EmailLog,
  WalletTransaction,
} from '../types';
import {
  initialProducts,
  initialCategories,
  initialAddresses,
  initialDrivers,
  initialOrders,
  initialCoupons,
  initialReviews,
  initialNotifications,
  initialSupportTickets,
  initialInvoices,
  initialSavedCards,
  initialReferrals,
  initialAuditLogs,
} from '../data/mockData';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

interface AppContextType {
  // Navigation & User
  portalMode: PortalMode;
  setPortalMode: (mode: PortalMode) => void;
  customerPage: CustomerPage;
  setCustomerPage: (page: CustomerPage) => void;
  adminPage: AdminPage;
  setAdminPage: (page: AdminPage) => void;
  deliveryPage: DeliveryPage;
  setDeliveryPage: (page: DeliveryPage) => void;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  users: User[];
  loginAsAdmin: () => void;
  loginAsCustomer: () => void;
  loginAsDriver: () => void;
  logout: () => void;

  // Catalog
  products: Product[];
  categories: Category[];
  addCategory: (cat: Omit<Category, 'id' | 'itemCount'> & Partial<Pick<Category, 'id' | 'itemCount'>>) => void;
  selectedProductId: string;
  setSelectedProductId: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
  compareList: Product[];
  toggleCompare: (product: Product) => void;
  clearCompare: () => void;

  // Cart & Wishlist
  cart: CartItem[];
  wishlist: string[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  coupons: Coupon[];
  addCoupon: (coupon: Omit<Coupon, 'id' | 'usageCount'> & Partial<Pick<Coupon, 'id' | 'usageCount'>>) => void;
  deleteCoupon: (id: string) => void;

  // Orders & Deliveries
  orders: Order[];
  activeOrder: Order | null;
  setActiveOrderId: (id: string) => void;
  createOrder: (orderData: Partial<Order>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  assignDriverToOrder: (orderId: string, driverEmail: string, customSubject?: string, customNote?: string) => boolean;

  // Drivers & Delivery Hub
  drivers: Driver[];
  currentDriver: Driver;
  activeDeliveryOrder: Order | null;
  toggleDriverGps: (driverId: string, enabled: boolean) => void;
  toggleDriverStatus: (driverId: string) => void;
  setDriverStatus: (status: DriverStatus) => void;
  acceptDelivery: (orderId: string) => void;
  rejectDelivery: (orderId: string, reason?: string) => void;
  completeDelivery: (orderId: string, proof: { photoUrl?: string; signatureUrl?: string; otp: string }) => boolean;
  failDelivery: (orderId: string, reason: string) => void;
  rescheduleDelivery: (orderId: string, newDate: string) => void;

  // User Extras
  addresses: Address[];
  addAddress: (addr: Omit<Address, 'id'>) => void;
  deleteAddress: (id: string) => void;
  walletTransactions: WalletTransaction[];
  topUpWallet: (amount: number) => void;
  reviews: Review[];
  addReview: (productId: string, rating: number, comment: string) => void;
  notifications: Notification[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  supportTickets: SupportTicket[];
  createSupportTicket: (subject: string, category: any, message: string) => void;
  addTicketMessage: (ticketId: string, message: string) => void;
  invoices: Invoice[];
  savedCards: SavedCard[];
  addSavedCard: (card: Omit<SavedCard, 'id'>) => void;
  referrals: ReferralReward[];

  // Admin Settings & Operations
  storeSettings: StoreSettings;
  updateStoreSettings: (settings: Partial<StoreSettings>) => void;
  emailLogs: EmailLog[];

  // Admin CRUD for products
  addProduct: (prod: Partial<Product> & { name: string; price: number }) => Product;
  addBulkProducts: (prods: (Partial<Product> & { name: string; price: number })[]) => Product[];
  updateProduct: (id: string, prod: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  duplicateProduct: (id: string) => void;

  // Toasts
  toasts: Toast[];
  addToast: (type: Toast['type'], title: string, message: string) => void;
  removeToast: (id: string) => void;

  // Simulated & Live Email Dispatch Logs
  dispatchedEmails: {
    id: string;
    to: string;
    subject: string;
    body: string;
    timestamp: string;
    deliveryStatus?: 'TRANSMITTED' | 'SMTP_DELIVERED' | 'DIRECT_SENT' | 'FAILED';
    deliveryMode?: string;
    messageId?: string;
    previewUrl?: string;
  }[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEMO_ADMIN_USER: User = {
  id: 'usr-admin',
  name: 'Chief Systems Admin',
  email: 'Admin@itech.com',
  role: 'ADMIN',
  phone: '+1 (800) 555-0199',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  createdAt: '2026-01-01',
  isVerified: true,
  walletBalance: 8540.00,
  referralCode: 'ITECH-ADMIN',
  twoFactorEnabled: true,
};

const DEMO_CUSTOMER_USER: User = {
  id: 'user-demo-1',
  name: 'Alexander Hayes',
  email: 'alex.hayes@enterprise.io',
  role: 'CUSTOMER',
  phone: '+1 (415) 555-0198',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
  createdAt: '2026-03-15',
  isVerified: true,
  walletBalance: 250.00,
  referralCode: 'ITECH-ALEX',
  twoFactorEnabled: true,
};

const initialUsersList: User[] = [
  DEMO_ADMIN_USER,
  DEMO_CUSTOMER_USER,
  {
    id: 'user-demo-2',
    name: 'Sarah Jenkins',
    email: 'sarah.j@vertex.ai',
    role: 'CUSTOMER',
    phone: '+1 (415) 555-0312',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    createdAt: '2026-04-10',
    isVerified: true,
    walletBalance: 420.00,
    referralCode: 'ITECH-SARAH',
    twoFactorEnabled: false,
  },
  {
    id: 'user-demo-3',
    name: 'Marcus Vance',
    email: 'marcus.driver@itech-dispatch.com',
    role: 'DRIVER',
    phone: '+1 (415) 555-0144',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
    createdAt: '2026-02-18',
    isVerified: true,
    walletBalance: 1250.00,
    referralCode: 'ITECH-MARCUS',
    twoFactorEnabled: true,
  },
  {
    id: 'user-demo-4',
    name: 'Claire Dupont',
    email: 'claire@design.fr',
    role: 'CUSTOMER',
    phone: '+1 (415) 555-0789',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    createdAt: '2026-05-12',
    isVerified: true,
    walletBalance: 180.00,
    referralCode: 'ITECH-CLAIRE',
    twoFactorEnabled: true,
  },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [portalMode, setPortalMode] = useState<PortalMode>('customer');
  const [customerPage, setCustomerPage] = useState<CustomerPage>('landing-full');
  const [adminPage, setAdminPage] = useState<AdminPage>('admin-overview');
  const [deliveryPage, setDeliveryPage] = useState<DeliveryPage>('delivery-today');

  // Auth User & Users List
  const [currentUser, setCurrentUser] = useState<User | null>(DEMO_CUSTOMER_USER);
  const [users, setUsers] = useState<User[]>(initialUsersList);

  // Catalog
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('itech_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [selectedProductId, setSelectedProductId] = useState<string>('prod-1');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [compareList, setCompareList] = useState<Product[]>([]);

  // Cart & Wishlist
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('itech_cart');
    return saved ? JSON.parse(saved) : [
      { product: initialProducts[0], quantity: 1 },
      { product: initialProducts[2], quantity: 1 },
    ];
  });
  const [wishlist, setWishlist] = useState<string[]>(['prod-2', 'prod-4']);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);

  // Orders & Drivers
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('itech_orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });
  const [activeOrderId, setActiveOrderId] = useState<string>('ord-1');
  const [drivers, setDrivers] = useState<Driver[]>(() => {
    const saved = localStorage.getItem('itech_drivers');
    return saved ? JSON.parse(saved) : initialDrivers;
  });

  // User details
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(initialSupportTickets);
  const [invoices] = useState<Invoice[]>(initialInvoices);
  const [savedCards, setSavedCards] = useState<SavedCard[]>(initialSavedCards);
  const [referrals] = useState<ReferralReward[]>(initialReferrals);
  const [toasts, setToasts] = useState<Toast[]>([]);
  
  // Wallet
  const [walletTransactions, setWalletTransactions] = useState<WalletTransaction[]>([
    { id: 'tx-1', description: 'Referral Bonus (Jason Miller)', amount: 25.0, type: 'CREDIT', date: '2026-08-31' },
    { id: 'tx-2', description: 'Order #ORD-9821 Payment', amount: 1641.5, type: 'DEBIT', date: '2026-08-31' },
    { id: 'tx-3', description: 'Wallet Instant Top-Up (Visa 4092)', amount: 500.0, type: 'CREDIT', date: '2026-08-25' },
  ]);

  // Store Settings
  const [storeSettings, setStoreSettings] = useState<StoreSettings>({
    storeName: 'I-TECH Enterprise Electronics',
    deliveryRadiusKm: 35,
    taxRate: 8.5,
    autoAssignDriver: true,
  });

  // Audit and System Logs
  const [emailLogs, setEmailLogs] = useState<EmailLog[]>([
    {
      id: 'em-1',
      recipient: 'marcus.driver@itech-dispatch.com',
      type: 'DISPATCH_ASSIGNMENT',
      subject: '📦 New Express Order Assignment: #ORD-9821',
      body: 'Driver Marcus Vance assigned to Order #ORD-9821. Customer Alexander Hayes. Destination: 742 Evergreen Terrace, San Francisco, CA. Doorstep OTP: 8492.',
      timestamp: '2026-08-31 04:42 PM',
    },
    {
      id: 'em-2',
      recipient: 'alex.hayes@enterprise.io',
      type: 'ORDER_CONFIRMATION',
      subject: '✅ Order Confirmed: #ORD-9821 ($1,641.50)',
      body: 'Your payment was processed successfully. 30-min express courier dispatched. Your secure OTP code is 8492.',
      timestamp: '2026-08-31 04:15 PM',
    },
    {
      id: 'em-3',
      recipient: 'sarah.j@vertex.ai',
      type: 'SECURITY_ALERT',
      subject: '🔒 Two-Factor Verification Enabled',
      body: 'Two-factor biometric authentication successfully configured for account sarah.j@vertex.ai.',
      timestamp: '2026-08-30 08:30 PM',
    },
  ]);

  const [dispatchedEmails, setDispatchedEmails] = useState<{ id: string; to: string; subject: string; body: string; timestamp: string }[]>([
    {
      id: 'em-1',
      to: 'marcus.driver@itech-dispatch.com',
      subject: '📦 New Express Order Assignment: #ORD-9821',
      body: 'Hi Marcus,\n\nYou have been assigned Order #ORD-9821 for customer Alexander Hayes (Phone: +1 415 555-0198).\nDelivery Destination: 742 Evergreen Terrace, Apt 4B, San Francisco, CA.\nItems: 1x I-Tech Quantum Pro Max 5G, 1x SonicPure Studio ANC Headphones.\n\n⚠️ IMPORTANT: Please ensure your GPS location is turned ON in the I-Tech Delivery App so the customer and operations hub can track your live ETA.\n\nDispatch Team,\nI-Tech Logistics Enterprise',
      timestamp: '2026-08-31 04:42 PM',
    }
  ]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('itech_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('itech_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('itech_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('itech_drivers', JSON.stringify(drivers));
  }, [drivers]);

  // Real-time GPS movement simulation for Marcus Vance (driver 1) on route
  useEffect(() => {
    const interval = setInterval(() => {
      setDrivers((prevDrivers) =>
        prevDrivers.map((drv) => {
          if (drv.id === 'drv-1' && drv.location?.isGpsEnabled && drv.status === 'BUSY') {
            // Subtle simulated drift along SF Market St towards destination
            const latDelta = (Math.random() - 0.48) * 0.0003;
            const lngDelta = (Math.random() - 0.48) * 0.0003;
            const currentLat = drv.location?.lat ?? 37.7812;
            const currentLng = drv.location?.lng ?? -122.4132;
            return {
              ...drv,
              location: {
                ...drv.location,
                lat: +(currentLat + latDelta).toFixed(5),
                lng: +(currentLng + lngDelta).toFixed(5),
                heading: ((drv.location?.heading ?? 45) + (Math.random() * 6 - 3)) % 360,
              },
            };
          }
          return drv;
        })
      );
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const addToast = (type: Toast['type'], title: string, message: string) => {
    const id = 'toast-' + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Auth Helpers
  const loginAsAdmin = () => {
    setCurrentUser(DEMO_ADMIN_USER);
    setPortalMode('admin');
    setAdminPage('admin-overview');
    addToast('success', 'Admin Authenticated', 'Logged in as Chief Administrator (Admin@itech.com)');
  };

  const loginAsCustomer = () => {
    setCurrentUser(DEMO_CUSTOMER_USER);
    setPortalMode('customer');
    setCustomerPage('cust-home');
    addToast('success', 'Customer Session', 'Logged in as Alexander Hayes');
  };

  const loginAsDriver = () => {
    setCurrentUser({
      id: 'drv-1',
      name: 'Marcus Vance',
      email: 'marcus.driver@itech-dispatch.com',
      role: 'DRIVER',
      phone: '+1 (415) 890-2341',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      createdAt: '2026-02-10',
      isVerified: true,
      walletBalance: 420.50,
      referralCode: 'DRV-MARCUS',
    });
    setPortalMode('admin'); // Delivery is inside admin dashboard
    setDeliveryPage('delivery-today');
    addToast('info', 'Delivery Hub Mode', 'Switched to Marcus Vance active courier session');
  };

  const logout = () => {
    setCurrentUser(null);
    setPortalMode('customer');
    setCustomerPage('auth-login');
    addToast('info', 'Logged Out', 'You have been securely signed out.');
  };

  // Catalog & Compare
  const toggleCompare = (product: Product) => {
    setCompareList((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 4) {
        addToast('warning', 'Comparison Limit', 'You can compare up to 4 devices at once.');
        return prev;
      }
      addToast('info', 'Added to Compare', `${product.name} added to comparison board.`);
      return [...prev, product];
    });
  };

  const clearCompare = () => setCompareList([]);

  // Cart
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    addToast('success', 'Added to Cart', `${product.name} (x${quantity}) added to your shopping bag.`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    addToast('info', 'Item Removed', 'Product removed from shopping bag.');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast('info', 'Wishlist Updated', 'Removed item from your wishlist.');
        return prev.filter((id) => id !== productId);
      }
      addToast('success', 'Added to Wishlist', 'Saved item to your favorites wishlist.');
      return [...prev, productId];
    });
  };

  const applyCoupon = (code: string) => {
    const found = coupons.find((c) => c.code.toUpperCase() === code.toUpperCase().trim());
    if (found) {
      setAppliedCoupon(found);
      addToast('success', 'Coupon Applied!', `Applied discount code: ${found.code} (${found.description})`);
      return true;
    }
    addToast('error', 'Invalid Coupon', 'The coupon code entered is invalid or expired.');
    return false;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('info', 'Coupon Removed', 'Discount coupon removed from order.');
  };

  // Orders
  const activeOrder = orders.find((o) => o.id === activeOrderId) || orders[0] || null;

  const createOrder = (orderData: Partial<Order>): Order => {
    const orderNum = 'ORD-' + Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      id: 'ord-' + Date.now(),
      orderNumber: orderNum,
      customerId: currentUser?.id || 'user-guest',
      customerName: currentUser?.name || 'Alexander Hayes',
      customerEmail: currentUser?.email || 'alex.hayes@enterprise.io',
      customerPhone: currentUser?.phone || '+1 (415) 555-0198',
      items: cart.map((ci) => ({
        id: 'oi-' + Math.random().toString(36).substr(2, 6),
        productId: ci.product.id,
        productName: ci.product.name,
        productImage: ci.product.images[0],
        price: ci.product.price,
        quantity: ci.quantity,
        sku: ci.product.sku,
      })),
      subtotal: cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
      discount: appliedCoupon ? (appliedCoupon.discountType === 'percentage' ? (cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0) * appliedCoupon.discountValue) / 100 : appliedCoupon.discountValue) : 0,
      deliveryFee: 15,
      tax: 85.20,
      total: 0,
      status: 'CONFIRMED',
      paymentMethod: orderData.paymentMethod || 'CREDIT_CARD',
      paymentStatus: 'PAID',
      shippingAddress: orderData.shippingAddress || addresses[0],
      deliveryOption: orderData.deliveryOption || 'express',
      deliveryInstructions: orderData.deliveryInstructions || '',
      otpCode: Math.floor(1000 + Math.random() * 9000).toString(),
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      estimatedDeliveryTime: 'Today in ~35-45 mins',
      timeline: [
        { status: 'CONFIRMED', label: 'Order Placed & Paid', timestamp: 'Just now', description: 'Order authorized and payment secured', completed: true },
        { status: 'PACKING', label: 'Warehouse Dispatched', timestamp: 'Pending', description: 'Item queued for automated packing', completed: false },
        { status: 'READY', label: 'Ready for Courier', timestamp: 'Pending', description: 'Pending driver assignment', completed: false },
        { status: 'ON_ROUTE', label: 'Courier On Route', timestamp: 'Pending', description: 'Live GPS tracking will activate', completed: false },
        { status: 'DELIVERED', label: 'Delivered', timestamp: 'Pending', description: 'OTP signature handover', completed: false },
      ],
      ...orderData,
    };
    newOrder.total = newOrder.subtotal - newOrder.discount + newOrder.deliveryFee + newOrder.tax;

    setOrders((prev) => [newOrder, ...prev]);
    setActiveOrderId(newOrder.id);
    clearCart();
    setAppliedCoupon(null);
    addToast('success', 'Order Confirmed!', `Your order ${orderNum} has been received and sent to dispatch.`);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const updatedTimeline = ord.timeline.map((tl) => {
            if (tl.status === status) return { ...tl, completed: true, timestamp: 'Just now' };
            return tl;
          });
          return { ...ord, status, timeline: updatedTimeline };
        }
        return ord;
      })
    );
    addToast('info', 'Order Status Updated', `Order ${orderId} status set to ${status}`);
  };

  // Assign Driver with Email Dispatch and GPS Tracking Enable Notification
  const assignDriverToOrder = (
    orderId: string,
    driverEmailOrId: string,
    customSubject?: string,
    customNote?: string
  ): boolean => {
    const cleanInput = (driverEmailOrId || '').trim();
    if (!cleanInput) {
      addToast('error', 'Missing Recipient', 'Please enter a valid driver or courier email address.');
      return false;
    }

    // Match by ID or by email
    const existingDriver = drivers.find(
      (d) => d.id === cleanInput || d.email.toLowerCase() === cleanInput.toLowerCase()
    );

    const targetEmail = existingDriver ? existingDriver.email : cleanInput;
    const targetDriver = existingDriver || {
      id: 'drv-custom-' + Date.now(),
      name: cleanInput.includes('@') ? cleanInput.split('@')[0] : cleanInput,
      email: cleanInput.includes('@') ? cleanInput : `${cleanInput}@logistics.itech.com`,
      phone: '+1 (415) 555-0144',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      status: 'BUSY' as DriverStatus,
      rating: 5.0,
      totalDeliveries: 1,
      earningsToday: 35.0,
      vehicle: { type: 'Motorcycle' as const, model: 'Honda CB500X', plateNumber: 'CA-DISPATCH', color: 'Gloss Black' },
      location: { lat: 37.7812, lng: -122.4132, addressName: 'Market St Dispatch Hub', isGpsEnabled: true, heading: 45 },
      documents: { licenseVerified: true, insuranceVerified: true, vehicleRegVerified: true },
    };

    // If it's a new driver, register them in drivers pool
    if (!existingDriver) {
      setDrivers((prev) => [targetDriver, ...prev]);
    }

    const targetOrder = orders.find((o) => o.id === orderId || o.orderNumber === orderId);
    if (!targetOrder) {
      addToast('error', 'Order Not Found', `No active order found matching ID ${orderId}`);
      return false;
    }

    // 1. Update Order with Assigned Driver
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === targetOrder.id) {
          return {
            ...ord,
            status: 'ASSIGNED' as OrderStatus,
            driverId: targetDriver.id,
            driverName: targetDriver.name,
            driverPhone: targetDriver.phone,
            driverAvatar: targetDriver.avatar,
            driverVehicle: `${targetDriver.vehicle.type} - ${targetDriver.vehicle.model} (${targetDriver.vehicle.plateNumber})`,
            driverPlate: targetDriver.vehicle.plateNumber,
            driverLocation: { lat: targetDriver.location.lat, lng: targetDriver.location.lng },
            timeline: ord.timeline.map((t) =>
              t.status === 'ASSIGNED'
                ? { ...t, completed: true, timestamp: 'Just now', description: `Assigned to ${targetDriver.name} (${targetEmail})` }
                : t
            ),
          };
        }
        return ord;
      })
    );

    // 2. Dispatch Email Log to Dispatched Emails
    const subjectLine = customSubject || `🚨 NEW DELIVERY ASSIGNMENT: Order #${targetOrder.orderNumber}`;
    const emailBody = `Hello ${targetDriver.name},

You have been officially assigned Order #${targetOrder.orderNumber} for express doorstep fulfillment by I-TECH Operations Dispatch.

CUSTOMER & DISPATCH INFORMATION:
• Customer Name: ${targetOrder.customerName || targetOrder.shippingAddress?.fullName || 'Customer'}
• Recipient Email: ${targetOrder.customerEmail}
• Customer Phone: ${targetOrder.customerPhone || '+1 (415) 555-0198'}
• Delivery Destination: ${targetOrder.shippingAddress.street}, ${targetOrder.shippingAddress.city}, ${targetOrder.shippingAddress.zipCode}
• Delivery Notes / Gate Code: ${targetOrder.deliveryInstructions || 'Standard Secure Handover'}
• Doorstep Verification OTP: ${targetOrder.deliveryOtp || '8492'}
${customNote ? `\nSPECIAL ADMIN INSTRUCTIONS:\n• ${customNote}\n` : ''}
ORDER CONTENTS (${targetOrder.items.length} items):
${targetOrder.items.map((it) => ` - ${it.quantity}x ${it.name} ($${it.price.toFixed(2)})`).join('\n')}
Total Order Value: $${targetOrder.total.toFixed(2)}

📍 REQUIRED ACTION:
1. Open the I-TECH Courier App on your mobile device.
2. Enable GPS location tracking to broadcast real-time telemetry to the customer and dispatch console.
3. Collect the security OTP code from the customer at handover.

Best regards,
I-TECH Logistics Dispatch Command Center
admin@itech.com`;

    const newEmailItem = {
      id: 'em-' + Date.now(),
      to: targetEmail,
      subject: subjectLine,
      body: emailBody,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      deliveryStatus: 'TRANSMITTED' as const,
      deliveryMode: 'DISPATCH_TRANSMISSION',
    };

    setDispatchedEmails((prev) => [newEmailItem, ...prev]);

    // Transmit actual email payload to the server backend email dispatcher
    fetch('/api/send-dispatch-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: targetEmail,
        subject: subjectLine,
        orderNumber: targetOrder.orderNumber,
        customerName: targetOrder.customerName || targetOrder.shippingAddress?.fullName || 'Customer',
        customerEmail: targetOrder.customerEmail,
        deliveryAddress: `${targetOrder.shippingAddress.street}, ${targetOrder.shippingAddress.city}, ${targetOrder.shippingAddress.zipCode}`,
        otpCode: targetOrder.deliveryOtp || targetOrder.otpCode || '8492',
        items: targetOrder.items,
        notes: customNote,
        totalAmount: targetOrder.total.toFixed(2),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.success) {
          setDispatchedEmails((prev) =>
            prev.map((em) =>
              em.id === newEmailItem.id
                ? {
                    ...em,
                    deliveryStatus: 'SMTP_DELIVERED' as const,
                    deliveryMode: data.deliveryMode || 'SMTP_GATEWAY',
                    messageId: data.messageId,
                    previewUrl: data.previewUrl,
                  }
                : em
            )
          );
        }
      })
      .catch((err) => {
        console.warn('Live SMTP endpoint transmission notice:', err);
      });

    // Also push to audit email logs
    setEmailLogs((prev) => [
      {
        id: 'log-' + Date.now(),
        recipient: targetEmail,
        subject: subjectLine,
        type: 'DISPATCH_ASSIGNMENT',
        timestamp: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
        body: `Dispatch order #${targetOrder.orderNumber} assigned to ${targetEmail}. Full customer destination (${targetOrder.shippingAddress.street}, ${targetOrder.shippingAddress.city}) and OTP (${targetOrder.deliveryOtp || '8492'}) instructions sent.`,
      },
      ...prev,
    ]);

    // 3. Add to customer notifications
    setNotifications((prev) => [
      {
        id: 'notif-' + Date.now(),
        userId: targetOrder.customerId,
        title: 'Driver Assigned & Dispatched! 🛵',
        message: `${targetDriver.name} has been assigned to Order #${targetOrder.orderNumber}. Dispatch mail sent to ${targetEmail}.`,
        type: 'delivery',
        timestamp: 'Just now',
        isRead: false,
        actionUrl: 'cust-live-tracking',
      },
      ...prev,
    ]);

    addToast(
      'success',
      'Delivery Assigned & Email Dispatched',
      `Order #${targetOrder.orderNumber} assigned. Formal dispatch email sent to ${targetEmail}.`
    );
    return true;
  };

  // Driver actions
  const currentDriver = drivers[0];
  const activeDeliveryOrder = orders.find((o) => o.status === 'ON_ROUTE' || o.status === 'ASSIGNED' || o.status === 'PICKED_UP') || orders[0];

  const toggleDriverGps = (driverId: string, enabled: boolean) => {
    setDrivers((prev) =>
      prev.map((d) => (d.id === driverId ? { ...d, location: { ...d.location, isGpsEnabled: enabled } } : d))
    );
    addToast(
      enabled ? 'success' : 'warning',
      enabled ? 'GPS Location Tracking Activated' : 'GPS Tracking Paused',
      enabled
        ? 'Real-time telemetry and speed data broadcasting to customer & admin dispatch map.'
        : 'GPS broadcasting disabled.'
    );
  };

  const setDriverStatus = (status: DriverStatus) => {
    setDrivers((prev) =>
      prev.map((d) => (d.id === currentDriver.id ? { ...d, status } : d))
    );
    addToast('info', 'Driver Availability Updated', `Status changed to ${status}`);
  };

  const acceptDelivery = (orderId: string) => {
    updateOrderStatus(orderId, 'PICKED_UP');
    addToast('success', 'Delivery Accepted', 'Package confirmed in transit. Navigation route generated.');
  };

  const rejectDelivery = (orderId: string, reason = 'Driver unavailable') => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'READY', driverId: undefined } : o))
    );
    addToast('warning', 'Delivery Declined', `Order reassigned to dispatch queue. Reason: ${reason}`);
  };

  const completeDelivery = (orderId: string, proof: { photoUrl?: string; signatureUrl?: string; otp: string }): boolean => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return false;

    if (proof.otp.trim() !== order.otpCode.trim()) {
      addToast('error', 'OTP Mismatch', `Entered OTP "${proof.otp}" does not match customer's secure code.`);
      return false;
    }

    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          return {
            ...o,
            status: 'DELIVERED',
            proofOfDelivery: {
              photoUrl: proof.photoUrl || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=500&q=80',
              signatureUrl: proof.signatureUrl || '',
              completedAt: new Date().toLocaleTimeString(),
              verifiedOtp: proof.otp,
            },
            timeline: o.timeline.map((t) =>
              t.status === 'DELIVERED'
                ? { ...t, completed: true, timestamp: 'Just now', description: 'Handover complete. Signature and OTP verified.' }
                : t
            ),
          };
        }
        return o;
      })
    );

    // Update Driver earnings
    setDrivers((prev) =>
      prev.map((d) => (d.id === currentDriver.id ? { ...d, earningsToday: d.earningsToday + 28.50, totalDeliveries: d.totalDeliveries + 1, status: 'AVAILABLE' } : d))
    );

    addToast('success', 'Delivery Completed! 🎉', `Order #${order.orderNumber} successfully signed and verified.`);
    return true;
  };

  const failDelivery = (orderId: string, reason: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'CANCELLED', failureReason: reason } : o))
    );
    addToast('error', 'Delivery Marked Failed', `Reason recorded: ${reason}`);
  };

  const rescheduleDelivery = (orderId: string, newDate: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, estimatedDeliveryTime: `Rescheduled for ${newDate}` } : o))
    );
    addToast('info', 'Delivery Rescheduled', `Order #${orderId} moved to ${newDate}`);
  };

  // Addresses
  const addAddress = (addr: Omit<Address, 'id'>) => {
    const newAddr: Address = { ...addr, id: 'addr-' + Date.now() };
    setAddresses((prev) => [...prev, newAddr]);
    addToast('success', 'Address Saved', `${newAddr.title} added to your delivery book.`);
  };

  // Reviews
  const addReview = (productId: string, rating: number, comment: string) => {
    const prod = products.find((p) => p.id === productId);
    const newRev: Review = {
      id: 'rev-' + Date.now(),
      productId,
      productName: prod?.name || 'Verified Tech Product',
      userId: currentUser?.id || 'user-demo-1',
      userName: currentUser?.name || 'Alexander Hayes',
      userAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating,
      comment,
      date: new Date().toISOString().split('T')[0],
      verifiedPurchase: true,
      likes: 1,
    };
    setReviews((prev) => [newRev, ...prev]);
    addToast('success', 'Review Published', 'Thank you for your rating and feedback!');
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    addToast('info', 'Notifications Read', 'All notifications cleared.');
  };

  // Support Tickets
  const createSupportTicket = (subject: string, category: any, message: string) => {
    const newTkt: SupportTicket = {
      id: 'tkt-' + Date.now(),
      ticketNumber: 'TKT-' + Math.floor(1000 + Math.random() * 9000),
      userId: currentUser?.id || 'user-demo-1',
      userName: currentUser?.name || 'Alexander Hayes',
      userEmail: currentUser?.email || 'alex.hayes@enterprise.io',
      subject,
      category,
      status: 'OPEN',
      priority: 'MEDIUM',
      createdAt: new Date().toLocaleDateString(),
      messages: [
        {
          id: 'msg-' + Date.now(),
          sender: 'user',
          senderName: currentUser?.name || 'Alexander Hayes',
          message,
          timestamp: 'Just now',
        },
      ],
    };
    setSupportTickets((prev) => [newTkt, ...prev]);
    addToast('success', 'Ticket Submitted', `Ticket #${newTkt.ticketNumber} created. Support agent will respond promptly.`);
  };

  const addTicketMessage = (ticketId: string, message: string) => {
    setSupportTickets((prev) =>
      prev.map((tkt) => {
        if (tkt.id === ticketId) {
          return {
            ...tkt,
            messages: [
              ...tkt.messages,
              {
                id: 'msg-' + Date.now(),
                sender: currentUser?.role === 'ADMIN' ? 'agent' : 'user',
                senderName: currentUser?.name || 'User',
                message,
                timestamp: 'Just now',
              },
            ],
          };
        }
        return tkt;
      })
    );
  };

  // Saved Cards
  const addSavedCard = (card: Omit<SavedCard, 'id'>) => {
    const newCard: SavedCard = { ...card, id: 'card-' + Date.now() };
    setSavedCards((prev) => [...prev, newCard]);
    addToast('success', 'Payment Method Saved', `Card ending in ${card.lastFour} saved.`);
  };

  // Admin Product CRUD
  const addProduct = (prod: Partial<Product> & { name: string; price: number }) => {
    const categoryObj =
      categories.find((c) => c.id === prod.categoryId) ||
      categories[0] || { id: 'cat-phones', name: 'Smartphones' };
    const brandName = prod.brand?.trim() || 'I-Tech';
    const fallbackImage =
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80';
    const cleanImages =
      prod.images && prod.images.length > 0
        ? prod.images.filter(Boolean)
        : [fallbackImage];

    const newProduct: Product = {
      id: prod.id || `prod-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: prod.name.trim(),
      slug:
        prod.slug ||
        prod.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, ''),
      categoryId: prod.categoryId || categoryObj.id,
      categoryName: prod.categoryName || categoryObj.name,
      brand: brandName,
      price: Number(prod.price) || 0,
      originalPrice:
        Number(prod.originalPrice) || Math.round(Number(prod.price) * 1.12),
      rating: prod.rating || 4.8,
      reviewCount: prod.reviewCount ?? Math.floor(15 + Math.random() * 40),
      stock: prod.stock !== undefined ? Number(prod.stock) : 25,
      sku:
        prod.sku ||
        `IT-${brandName.toUpperCase().slice(0, 3)}-${Math.floor(
          1000 + Math.random() * 9000
        )}`,
      barcode:
        prod.barcode ||
        Math.floor(100000000000 + Math.random() * 900000000000).toString(),
      supplier: prod.supplier || 'I-Tech Direct Enterprise Logistics',
      isFeatured: prod.isFeatured ?? true,
      isFlashSale: prod.isFlashSale ?? false,
      isVisible: prod.isVisible ?? true,
      description:
        prod.description?.trim() ||
        'Certified enterprise-grade hardware with direct 30-min express courier delivery and 2-year warranty.',
      specifications:
        prod.specifications && Object.keys(prod.specifications).length > 0
          ? prod.specifications
          : {
              Warranty: '2-Year Enterprise Hardware Warranty',
              Condition: 'Brand New Factory Sealed',
              Dispatch: '30-Minute Live Courier Fulfillment',
            },
      images: cleanImages,
      videoUrl: prod.videoUrl || '',
      tags:
        prod.tags && prod.tags.length > 0
          ? prod.tags
          : ['Hardware', categoryObj.name, brandName, 'Enterprise'],
      variants: prod.variants || [],
    };

    setProducts((prev) => [newProduct, ...prev]);
    setCategories((prev) =>
      prev.map((c) =>
        c.id === newProduct.categoryId
          ? { ...c, itemCount: (c.itemCount || 0) + 1 }
          : c
      )
    );
    addToast(
      'success',
      'Product Published',
      `${newProduct.name} is now live in the store!`
    );
    return newProduct;
  };

  const addBulkProducts = (
    prods: (Partial<Product> & { name: string; price: number })[]
  ) => {
    if (!prods || prods.length === 0) return [];
    const fallbackImage =
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80';

    const created: Product[] = prods.map((prod, idx) => {
      const categoryObj =
        categories.find((c) => c.id === prod.categoryId) ||
        categories[0] || { id: 'cat-phones', name: 'Smartphones' };
      const brandName = prod.brand?.trim() || 'I-Tech';
      const cleanImages =
        prod.images && prod.images.length > 0
          ? prod.images.filter(Boolean)
          : [fallbackImage];

      return {
        id:
          prod.id ||
          `prod-${Date.now()}-${idx}-${Math.floor(Math.random() * 1000)}`,
        name: prod.name.trim(),
        slug:
          prod.slug ||
          prod.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, ''),
        categoryId: prod.categoryId || categoryObj.id,
        categoryName: prod.categoryName || categoryObj.name,
        brand: brandName,
        price: Number(prod.price) || 0,
        originalPrice:
          Number(prod.originalPrice) || Math.round(Number(prod.price) * 1.15),
        rating: prod.rating || 4.8,
        reviewCount: prod.reviewCount ?? Math.floor(10 + Math.random() * 50),
        stock: prod.stock !== undefined ? Number(prod.stock) : 20,
        sku:
          prod.sku ||
          `IT-${brandName.toUpperCase().slice(0, 3)}-${Math.floor(
            1000 + Math.random() * 9000
          )}`,
        barcode:
          prod.barcode ||
          Math.floor(100000000000 + Math.random() * 900000000000).toString(),
        supplier: prod.supplier || 'I-Tech Direct Enterprise Logistics',
        isFeatured: prod.isFeatured ?? true,
        isFlashSale: prod.isFlashSale ?? false,
        isVisible: prod.isVisible ?? true,
        description:
          prod.description?.trim() ||
          'Enterprise certified hardware with express courier dispatch.',
        specifications:
          prod.specifications && Object.keys(prod.specifications).length > 0
            ? prod.specifications
            : {
                Warranty: 'Enterprise Hardware Warranty',
                Condition: 'Brand New Sealed',
              },
        images: cleanImages,
        videoUrl: prod.videoUrl || '',
        tags:
          prod.tags && prod.tags.length > 0
            ? prod.tags
            : ['Hardware', categoryObj.name, brandName],
        variants: prod.variants || [],
      };
    });

    setProducts((prev) => [...created, ...prev]);
    addToast(
      'success',
      'Bulk Products Published',
      `${created.length} hardware products successfully imported and live on storefront!`
    );
    return created;
  };

  const updateProduct = (id: string, prod: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...prod } : p))
    );
    addToast('success', 'Product Updated', 'Changes synced successfully.');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    addToast('info', 'Product Deleted', 'Product removed from catalog.');
  };

  const duplicateProduct = (id: string) => {
    const target = products.find((p) => p.id === id);
    if (!target) return;
    const duplicated: Product = {
      ...target,
      id: 'prod-' + Date.now(),
      name: `${target.name} (Copy)`,
      sku: `${target.sku}-COPY`,
      barcode: Math.floor(100000000000 + Math.random() * 900000000000).toString(),
    };
    setProducts((prev) => [duplicated, ...prev]);
    addToast('success', 'Product Duplicated', `Created copy: ${duplicated.name}`);
  };

  // Address Management
  const deleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    addToast('info', 'Address Removed', 'Saved address location removed.');
  };

  // Wallet Top Up
  const topUpWallet = (amount: number) => {
    if (currentUser) {
      const updatedBalance = (currentUser.walletBalance || 0) + amount;
      setCurrentUser({ ...currentUser, walletBalance: updatedBalance });
      const newTx: WalletTransaction = {
        id: 'tx-' + Date.now(),
        description: 'Wallet Top-Up (Instant Card)',
        amount,
        type: 'CREDIT',
        date: '2026-08-31',
      };
      setWalletTransactions((prev) => [newTx, ...prev]);
      addToast('success', 'Wallet Loaded', `$${amount.toFixed(2)} added to your I-Tech Wallet balance!`);
    }
  };

  // Store Settings
  const updateStoreSettings = (settings: Partial<StoreSettings>) => {
    setStoreSettings((prev) => ({ ...prev, ...settings }));
    addToast('success', 'Settings Saved', 'Platform configuration updated.');
  };

  // Categories CRUD
  const addCategory = (cat: Omit<Category, 'id' | 'itemCount'> & Partial<Pick<Category, 'id' | 'itemCount'>>) => {
    const newCat: Category = {
      id: cat.id || `cat-${Date.now()}`,
      name: cat.name,
      slug: cat.slug || cat.name.toLowerCase().replace(/\s+/g, '-'),
      icon: cat.icon || 'Package',
      image: cat.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
      itemCount: cat.itemCount || 0,
      description: cat.description || '',
    };
    setCategories((prev) => [...prev, newCat]);
    addToast('success', 'Category Added', `Category "${newCat.name}" added successfully.`);
  };

  // Coupons CRUD
  const addCoupon = (coupon: Omit<Coupon, 'id' | 'usageCount'> & Partial<Pick<Coupon, 'id' | 'usageCount'>>) => {
    const newCoupon: Coupon = {
      id: coupon.id || `cp-${Date.now()}`,
      code: coupon.code.toUpperCase(),
      discountType: coupon.discountType || 'percentage',
      discountValue: coupon.discountValue || 10,
      minSpend: coupon.minSpend || 50,
      expiryDate: coupon.expiryDate || '2026-12-31',
      usageCount: coupon.usageCount || 0,
      usageLimit: coupon.usageLimit || 500,
      description: coupon.description || 'Promotional coupon',
    };
    setCoupons((prev) => [newCoupon, ...prev]);
    addToast('success', 'Coupon Created', `Promo code ${newCoupon.code} created.`);
  };

  const deleteCoupon = (id: string) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
    addToast('info', 'Coupon Removed', 'Coupon deleted.');
  };

  // Driver Status Toggle
  const toggleDriverStatus = (driverId: string) => {
    setDrivers((prev) =>
      prev.map((d) => {
        if (d.id === driverId) {
          const nextStatus: DriverStatus = d.status === 'AVAILABLE' ? 'OFFLINE' : 'AVAILABLE';
          return { ...d, status: nextStatus };
        }
        return d;
      })
    );
    addToast('info', 'Driver Status Updated', 'Driver availability toggled.');
  };

  return (
    <AppContext.Provider
      value={{
        portalMode,
        setPortalMode,
        customerPage,
        setCustomerPage,
        adminPage,
        setAdminPage,
        deliveryPage,
        setDeliveryPage,
        currentUser,
        setCurrentUser,
        users,
        loginAsAdmin,
        loginAsCustomer,
        loginAsDriver,
        logout,
        products,
        categories,
        addCategory,
        selectedProductId,
        setSelectedProductId,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        compareList,
        toggleCompare,
        clearCompare,
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        coupons,
        addCoupon,
        deleteCoupon,
        orders,
        activeOrder,
        setActiveOrderId,
        createOrder,
        updateOrderStatus,
        assignDriverToOrder,
        drivers,
        currentDriver,
        activeDeliveryOrder,
        toggleDriverGps,
        toggleDriverStatus,
        setDriverStatus,
        acceptDelivery,
        rejectDelivery,
        completeDelivery,
        failDelivery,
        rescheduleDelivery,
        addresses,
        addAddress,
        deleteAddress,
        walletTransactions,
        topUpWallet,
        reviews,
        addReview,
        notifications,
        markNotificationAsRead,
        markAllNotificationsRead,
        supportTickets,
        createSupportTicket,
        addTicketMessage,
        invoices,
        savedCards,
        addSavedCard,
        referrals,
        storeSettings,
        updateStoreSettings,
        emailLogs,
        addProduct,
        addBulkProducts,
        updateProduct,
        deleteProduct,
        duplicateProduct,
        toasts,
        addToast,
        removeToast,
        dispatchedEmails,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
