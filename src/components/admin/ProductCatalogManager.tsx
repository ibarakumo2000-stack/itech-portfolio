import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Product, Category } from '../../types';
import {
  Package,
  Plus,
  Search,
  Filter,
  Trash2,
  Edit3,
  Copy,
  Eye,
  Upload,
  Link as LinkIcon,
  Image as ImageIcon,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Layers,
  FileJson,
  FileSpreadsheet,
  RefreshCw,
  X,
  ExternalLink,
  SlidersHorizontal,
  Check,
  Tag,
  DollarSign,
  Box,
  Zap,
} from 'lucide-react';

const PRESET_IMAGES = [
  { label: 'Smartphone', url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80' },
  { label: 'M3 Laptop', url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80' },
  { label: 'Studio Headphones', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80' },
  { label: 'Smartwatch', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80' },
  { label: 'Pro Tablet', url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80' },
  { label: 'Wireless Earbuds', url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80' },
  { label: 'Mechanical Keyboard', url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80' },
  { label: '4K Display', url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80' },
];

const PRESET_BUNDLES = [
  {
    title: 'Ultra-Flagship Mobile Ecosystem',
    description: '4 premium smartphones & mobile accessories',
    badge: 'Flagship Mobile',
    items: [
      {
        name: 'I-Tech Titan Pro Ultra 5G',
        brand: 'I-Tech',
        categoryId: 'cat-phones',
        price: 1299,
        originalPrice: 1449,
        stock: 35,
        description: 'Titanium chassis, Snapdragon 8 Gen 4, 200MP periscope zoom lens, and 65W wireless charging.',
        images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80'],
        tags: ['Flagship', 'Titanium', '5G'],
        isFeatured: true,
      },
      {
        name: 'Nova Fold 6 Enterprise Edition',
        brand: 'Samsung',
        categoryId: 'cat-phones',
        price: 1799,
        originalPrice: 1999,
        stock: 20,
        description: 'Dual Dynamic AMOLED 120Hz flexible screen with armored aluminum hinge and stylus support.',
        images: ['https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80'],
        tags: ['Foldable', 'Enterprise', 'Multitasking'],
        isFeatured: true,
      },
      {
        name: 'MagSafe 3-in-1 Fast Charging Station',
        brand: 'Belkin',
        categoryId: 'cat-accessories',
        price: 149,
        originalPrice: 179,
        stock: 50,
        description: 'Simultaneous 15W wireless charging for phone, earbuds, and smartwatch with weighted aluminum base.',
        images: ['https://images.unsplash.com/photo-1622445262464-84b1456045b6?auto=format&fit=crop&w=600&q=80'],
        tags: ['MagSafe', 'Wireless', 'Charger'],
        isFeatured: false,
      },
      {
        name: 'PureShield Ceramic Glass Armor',
        brand: 'I-Tech',
        categoryId: 'cat-accessories',
        price: 39,
        originalPrice: 49,
        stock: 120,
        description: '9H diamond hardness shatterproof screen protector with optical clarity and anti-fingerprint coating.',
        images: ['https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80'],
        tags: ['Protection', 'Armor'],
        isFeatured: false,
      },
    ],
  },
  {
    title: 'Creator Studio & Workstation Pack',
    description: '4 high-performance laptops and studio workstations',
    badge: 'Pro Creator',
    items: [
      {
        name: 'Apex StudioBook 16 M3 Max',
        brand: 'Apple',
        categoryId: 'cat-laptops',
        price: 2899,
        originalPrice: 3199,
        stock: 18,
        description: '16-core CPU, 40-core GPU, 64GB Unified Memory, Liquid Retina XDR screen with 1600 nits peak brightness.',
        images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80'],
        tags: ['M3 Max', 'Creator', 'Retina'],
        isFeatured: true,
      },
      {
        name: 'Dell Precision 7780 Dual-Screen',
        brand: 'Dell',
        categoryId: 'cat-laptops',
        price: 2499,
        originalPrice: 2799,
        stock: 14,
        description: 'Intel Core i9-14900HX with RTX 4080 Ada generation 16GB graphics and dual 4K touch display panels.',
        images: ['https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80'],
        tags: ['RTX 4080', 'Workstation', 'CAD'],
        isFeatured: true,
      },
      {
        name: 'UltraWide Curved 38-inch Nano IPS Hub',
        brand: 'LG',
        categoryId: 'cat-accessories',
        price: 1199,
        originalPrice: 1399,
        stock: 22,
        description: '3840x1600 WQHD+ 144Hz HDR600 curved monitor with built-in 90W USB-C docking hub and KVM switch.',
        images: ['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80'],
        tags: ['Curved', 'Monitor', 'USB-C'],
        isFeatured: false,
      },
      {
        name: 'MX Master 3S Ergonomic Precision Bundle',
        brand: 'Logitech',
        categoryId: 'cat-accessories',
        price: 199,
        originalPrice: 229,
        stock: 65,
        description: 'Electromagnetic MagSpeed wheel, 8000 DPI sensor, quiet click switches paired with mechanical tactile keyboard.',
        images: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80'],
        tags: ['Ergonomic', 'Bluetooth', 'Logitech'],
        isFeatured: false,
      },
    ],
  },
  {
    title: 'Audiophile ANC & Spatial Sound Suite',
    description: '3 studio-grade audio hardware items with active noise cancelling',
    badge: 'Pro Audio',
    items: [
      {
        name: 'AcousticPure Studio Pro Reference',
        brand: 'Sony',
        categoryId: 'cat-wearables',
        price: 499,
        originalPrice: 549,
        stock: 30,
        description: 'Custom 50mm beryllium drivers, dual dedicated DSP chips for hybrid active noise cancelling and lossless LDAC.',
        images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80'],
        tags: ['Lossless', 'ANC', 'Spatial'],
        isFeatured: true,
      },
      {
        name: 'Vortex Air Pro True Wireless ANC',
        brand: 'Apple',
        categoryId: 'cat-wearables',
        price: 249,
        originalPrice: 279,
        stock: 45,
        description: 'Adaptive audio, conversation awareness, spatial tracking and USB-C MagSafe case with lanyard loop.',
        images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80'],
        tags: ['TWS', 'ANC', 'Apple'],
        isFeatured: true,
      },
      {
        name: 'OmniBeam Smart Spatial Soundbar 7.1',
        brand: 'Sonos',
        categoryId: 'cat-wearables',
        price: 899,
        originalPrice: 999,
        stock: 16,
        description: 'Dolby Atmos 7.1.4 architecture, 11 precision drivers including upward firing height channels and Trueplay tuning.',
        images: ['https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80'],
        tags: ['Dolby Atmos', 'Spatial', 'Smart'],
        isFeatured: false,
      },
    ],
  },
];

export const ProductCatalogManager: React.FC = () => {
  const {
    products,
    addProduct,
    addBulkProducts,
    updateProduct,
    deleteProduct,
    duplicateProduct,
    categories,
    addCategory,
    setPortalMode,
    setSelectedProductId,
    setCustomerPage,
    addToast,
  } = useApp();

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCatFilter, setSelectedCatFilter] = useState('ALL');
  const [stockFilter, setStockFilter] = useState<'ALL' | 'LOW' | 'IN_STOCK'>('ALL');

  // Single Product Modal State
  const [isSingleModalOpen, setIsSingleModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // Single Product Form Fields
  const [prodName, setProdName] = useState('');
  const [prodBrand, setProdBrand] = useState('I-Tech');
  const [prodCategoryId, setProdCategoryId] = useState(categories[0]?.id || 'cat-phones');
  const [prodPrice, setProdPrice] = useState<number | ''>(999);
  const [prodOriginalPrice, setProdOriginalPrice] = useState<number | ''>(1099);
  const [prodStock, setProdStock] = useState<number | ''>(25);
  const [prodDescription, setProdDescription] = useState('');
  const [prodTags, setProdTags] = useState('Flagship, New, Enterprise');
  const [prodIsFeatured, setProdIsFeatured] = useState(true);
  const [prodIsFlashSale, setProdIsFlashSale] = useState(false);

  // Image Management in Single Form
  const [prodImages, setProdImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
  ]);
  const [urlInput, setUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Specifications in Single Form
  const [specs, setSpecs] = useState<{ key: string; value: string }[]>([
    { key: 'Warranty', value: '2-Year Enterprise Hardware Warranty' },
    { key: 'Condition', value: 'Brand New Factory Sealed' },
    { key: 'Courier Dispatch', value: '30-Minute Guaranteed' },
  ]);

  // Bulk Modal State
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [bulkTab, setBulkTab] = useState<'table' | 'json' | 'bundles'>('table');

  // Bulk Table Entry Rows
  const [bulkRows, setBulkRows] = useState<
    {
      name: string;
      brand: string;
      categoryId: string;
      price: number;
      stock: number;
      image: string;
      description: string;
    }[]
  >([
    {
      name: 'I-Tech UltraPad Pro 13',
      brand: 'I-Tech',
      categoryId: 'cat-tablets',
      price: 1099,
      stock: 30,
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80',
      description: '13-inch OLED Tandem display with M3 Pro chip and stylus support.',
    },
    {
      name: 'SonicPure Studio ANC Max',
      brand: 'Sony',
      categoryId: 'cat-wearables',
      price: 399,
      stock: 45,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
      description: 'Studio reference lossless noise cancelling headphones.',
    },
    {
      name: 'CyberStation Pro Desktop 14900K',
      brand: 'Dell',
      categoryId: 'cat-laptops',
      price: 3299,
      stock: 12,
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
      description: 'Water-cooled liquid workstation with RTX 4090 24GB VRAM.',
    },
  ]);

  // Bulk JSON string
  const [jsonText, setJsonText] = useState('');

  // Handle local image upload via FileReader
  const handleDeviceUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) {
        addToast('warning', 'Invalid File Type', 'Please upload a valid image file (PNG, JPG, WEBP).');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          setProdImages((prev) => [...prev, result]);
          addToast('success', 'Image Uploaded', `${file.name} attached to product.`);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Add Image URL
  const handleAddImageUrl = () => {
    if (!urlInput.trim()) return;
    setProdImages((prev) => [...prev, urlInput.trim()]);
    setUrlInput('');
    addToast('info', 'Image URL Added', 'Image link appended to gallery.');
  };

  // Remove image
  const handleRemoveImage = (index: number) => {
    setProdImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Set as primary image (move to index 0)
  const handleSetPrimaryImage = (index: number) => {
    setProdImages((prev) => {
      const copy = [...prev];
      const [chosen] = copy.splice(index, 1);
      return [chosen, ...copy];
    });
  };

  // Open modal to create new product
  const handleOpenCreateModal = () => {
    setEditingProductId(null);
    setProdName('');
    setProdBrand('I-Tech');
    setProdCategoryId(categories[0]?.id || 'cat-phones');
    setProdPrice(999);
    setProdOriginalPrice(1099);
    setProdStock(25);
    setProdDescription('');
    setProdTags('Flagship, New, Enterprise');
    setProdIsFeatured(true);
    setProdIsFlashSale(false);
    setProdImages(['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80']);
    setSpecs([
      { key: 'Warranty', value: '2-Year Enterprise Hardware Warranty' },
      { key: 'Condition', value: 'Brand New Factory Sealed' },
      { key: 'Courier Dispatch', value: '30-Minute Guaranteed' },
    ]);
    setIsSingleModalOpen(true);
  };

  // Open modal to edit existing product
  const handleOpenEditModal = (p: Product) => {
    setEditingProductId(p.id);
    setProdName(p.name);
    setProdBrand(p.brand);
    setProdCategoryId(p.categoryId);
    setProdPrice(p.price);
    setProdOriginalPrice(p.originalPrice || Math.round(p.price * 1.12));
    setProdStock(p.stock);
    setProdDescription(p.description);
    setProdTags(p.tags ? p.tags.join(', ') : 'Hardware');
    setProdIsFeatured(p.isFeatured);
    setProdIsFlashSale(p.isFlashSale);
    setProdImages(p.images && p.images.length > 0 ? p.images : ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80']);
    const specEntries = p.specifications
      ? Object.entries(p.specifications).map(([key, value]) => ({ key, value }))
      : [{ key: 'Warranty', value: '2-Year Enterprise Hardware Warranty' }];
    setSpecs(specEntries);
    setIsSingleModalOpen(true);
  };

  // Save Single Product
  const handleSaveSingleProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName.trim()) {
      addToast('error', 'Product Name Required', 'Please enter a valid product title.');
      return;
    }
    if (prodPrice === '' || Number(prodPrice) < 0) {
      addToast('error', 'Invalid Price', 'Please enter a valid positive price amount.');
      return;
    }

    const catObj = categories.find((c) => c.id === prodCategoryId) || categories[0];
    const cleanTags = prodTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const specObj: Record<string, string> = {};
    specs.forEach((s) => {
      if (s.key.trim() && s.value.trim()) {
        specObj[s.key.trim()] = s.value.trim();
      }
    });

    const finalImages =
      prodImages.length > 0
        ? prodImages
        : ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80'];

    if (editingProductId) {
      // Update existing
      updateProduct(editingProductId, {
        name: prodName.trim(),
        brand: prodBrand.trim() || 'I-Tech',
        categoryId: prodCategoryId,
        categoryName: catObj?.name || 'Smartphones',
        price: Number(prodPrice),
        originalPrice: prodOriginalPrice !== '' ? Number(prodOriginalPrice) : Math.round(Number(prodPrice) * 1.12),
        stock: prodStock !== '' ? Number(prodStock) : 25,
        description: prodDescription.trim() || 'Enterprise grade certified device.',
        tags: cleanTags.length > 0 ? cleanTags : ['Hardware', prodBrand],
        isFeatured: prodIsFeatured,
        isFlashSale: prodIsFlashSale,
        images: finalImages,
        specifications: specObj,
      });
      setIsSingleModalOpen(false);
    } else {
      // Create new
      addProduct({
        name: prodName.trim(),
        brand: prodBrand.trim() || 'I-Tech',
        categoryId: prodCategoryId,
        categoryName: catObj?.name || 'Smartphones',
        price: Number(prodPrice),
        originalPrice: prodOriginalPrice !== '' ? Number(prodOriginalPrice) : Math.round(Number(prodPrice) * 1.12),
        stock: prodStock !== '' ? Number(prodStock) : 25,
        description: prodDescription.trim() || 'Enterprise certified hardware with guaranteed express dispatch.',
        tags: cleanTags.length > 0 ? cleanTags : ['Hardware', prodBrand],
        isFeatured: prodIsFeatured,
        isFlashSale: prodIsFlashSale,
        images: finalImages,
        specifications: specObj,
      });
      setIsSingleModalOpen(false);
    }
  };

  // Bulk Table Add Row
  const handleAddBulkRow = () => {
    setBulkRows((prev) => [
      ...prev,
      {
        name: '',
        brand: 'I-Tech',
        categoryId: categories[0]?.id || 'cat-phones',
        price: 499,
        stock: 20,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
        description: 'Certified enterprise hardware.',
      },
    ]);
  };

  // Bulk Table Remove Row
  const handleRemoveBulkRow = (index: number) => {
    setBulkRows((prev) => prev.filter((_, i) => i !== index));
  };

  // Save Bulk Rows
  const handleSaveBulkRows = () => {
    const validRows = bulkRows.filter((r) => r.name.trim() && r.price > 0);
    if (validRows.length === 0) {
      addToast('warning', 'No Valid Items', 'Please fill in at least one item name and valid price.');
      return;
    }

    const payload = validRows.map((r) => {
      const cat = categories.find((c) => c.id === r.categoryId) || categories[0];
      return {
        name: r.name.trim(),
        brand: r.brand || 'I-Tech',
        categoryId: r.categoryId || cat.id,
        categoryName: cat.name,
        price: Number(r.price),
        originalPrice: Math.round(Number(r.price) * 1.15),
        stock: Number(r.stock) || 15,
        description: r.description || 'Enterprise hardware unit.',
        images: [r.image || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80'],
        tags: ['Hardware', r.brand || 'I-Tech', 'Bulk-Import'],
        isFeatured: true,
      };
    });

    addBulkProducts(payload);
    setIsBulkModalOpen(false);
  };

  // Import JSON
  const handleImportJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      const list = Array.isArray(parsed) ? parsed : [parsed];
      const valid = list.filter((item) => item.name && item.price);
      if (valid.length === 0) {
        addToast('error', 'Invalid JSON Schema', 'JSON array must contain objects with "name" and "price".');
        return;
      }
      addBulkProducts(valid);
      setIsBulkModalOpen(false);
      setJsonText('');
    } catch (err) {
      addToast('error', 'JSON Syntax Error', 'Failed to parse JSON string. Please verify brackets and quotes.');
    }
  };

  // Load sample JSON template
  const handleLoadSampleJson = () => {
    const sample = [
      {
        name: 'I-Tech Horizon Vision Pro Max',
        brand: 'I-Tech',
        categoryId: 'cat-phones',
        price: 1399,
        stock: 30,
        description: 'Micro-OLED spatial headset with eye-tracking and neural gesture recognition.',
        images: ['https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=600&q=80'],
        tags: ['Spatial', 'AR/VR', 'Flagship'],
      },
      {
        name: 'QuantumKey Ergonomic Mechanical Pro',
        brand: 'Logitech',
        categoryId: 'cat-accessories',
        price: 219,
        stock: 60,
        description: 'Hot-swappable linear magnetic switches with 8000Hz polling rate and sound-dampening gasket.',
        images: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80'],
        tags: ['Keyboard', 'Mechanical', 'Gaming'],
      },
    ];
    setJsonText(JSON.stringify(sample, null, 2));
    addToast('info', 'Template Loaded', 'Sample hardware JSON loaded into editor.');
  };

  // Import One-Click Bundle
  const handleImportBundle = (bundle: (typeof PRESET_BUNDLES)[0]) => {
    addBulkProducts(bundle.items);
    setIsBulkModalOpen(false);
  };

  // Quick Restock Function
  const handleQuickRestock = (p: Product, amount: number) => {
    updateProduct(p.id, { stock: p.stock + amount });
    addToast('success', 'Stock Replenished', `Added +${amount} units to ${p.name} (Total: ${p.stock + amount}).`);
  };

  // View on customer storefront
  const handleViewOnStorefront = (productId: string) => {
    setSelectedProductId(productId);
    setPortalMode('customer');
    setCustomerPage('cust-product-details');
    addToast('info', 'Customer Storefront', 'Viewing product live on the customer store.');
  };

  // Filtered Products for table
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.categoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCatFilter === 'ALL' || p.categoryId === selectedCatFilter;
    const matchesStock =
      stockFilter === 'ALL'
        ? true
        : stockFilter === 'LOW'
        ? p.stock < 15
        : p.stock >= 15;

    return matchesSearch && matchesCategory && matchesStock;
  });

  return (
    <div className="space-y-6">
      {/* Top Action Header */}
      <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-extrabold text-white">Hardware Product Catalog Management</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Add single items, upload images from your device, or paste web URLs. Use Bulk Import to populate entire hardware bundles instantly.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => {
              setPortalMode('customer');
              setCustomerPage('cust-products');
            }}
            className="text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white px-3.5 py-2 rounded-xl border border-slate-800 font-semibold transition flex items-center gap-1.5"
            title="Inspect how items appear to customers"
          >
            <Eye className="w-3.5 h-3.5 text-emerald-400" />
            <span>Storefront View</span>
          </button>

          <button
            onClick={() => {
              setBulkTab('table');
              setIsBulkModalOpen(true);
            }}
            className="text-xs bg-indigo-950/80 hover:bg-indigo-900 text-indigo-300 border border-indigo-800/80 px-4 py-2 rounded-xl font-bold transition flex items-center gap-1.5 shadow"
          >
            <Layers className="w-4 h-4 text-indigo-400" />
            <span>Bulk Add & Import</span>
          </button>

          <button
            onClick={handleOpenCreateModal}
            className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl font-extrabold transition flex items-center gap-1.5 shadow-lg shadow-indigo-600/30"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Product</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Strip */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3 w-full sm:w-auto flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products by title, brand, SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 text-white pl-9 pr-3 py-2 rounded-xl text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>

          <select
            value={selectedCatFilter}
            onChange={(e) => setSelectedCatFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-slate-300 px-3 py-2 rounded-xl text-xs focus:outline-none focus:border-indigo-500"
          >
            <option value="ALL">All Categories ({products.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({products.filter((p) => p.categoryId === c.id).length})
              </option>
            ))}
          </select>

          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value as any)}
            className="bg-slate-900 border border-slate-800 text-slate-300 px-3 py-2 rounded-xl text-xs focus:outline-none focus:border-indigo-500"
          >
            <option value="ALL">All Stock Levels</option>
            <option value="LOW">Low Stock Alert (&lt; 15)</option>
            <option value="IN_STOCK">Well Stocked (15+)</option>
          </select>
        </div>

        <div className="text-xs text-slate-400 font-mono">
          Showing <strong className="text-indigo-300">{filteredProducts.length}</strong> of {products.length} catalog items
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-slate-950 rounded-3xl border border-slate-800 shadow-xl overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[780px]">
            <thead className="bg-slate-900/90 text-slate-400 font-bold border-b border-slate-800">
              <tr>
                <th className="p-3.5">Hardware Item & Image</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Price & Compare</th>
                <th className="p-3.5">Inventory Stock</th>
                <th className="p-3.5">Badges</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    No hardware products match your search or filter. Click "+ Add Product" or "Bulk Add & Import" above.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-900/50 transition">
                    <td className="p-3.5 flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shrink-0">
                        <img
                          src={p.images?.[0] || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80'}
                          alt={p.name}
                          className="w-full h-full object-cover"
                        />
                        {p.images && p.images.length > 1 && (
                          <span className="absolute bottom-0 right-0 bg-slate-950/90 text-slate-300 text-[9px] px-1 font-mono font-bold rounded-tl">
                            +{p.images.length - 1}
                          </span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div
                          onClick={() => handleViewOnStorefront(p.id)}
                          className="font-bold text-white hover:text-indigo-400 transition cursor-pointer truncate max-w-[220px]"
                          title="Click to view live product on storefront"
                        >
                          {p.name}
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-2">
                          <span className="text-indigo-300 font-semibold">{p.brand}</span>
                          <span className="text-slate-600">•</span>
                          <span className="font-mono text-[10px] text-slate-500">SKU: {p.sku}</span>
                        </div>
                      </div>
                    </td>

                    <td className="p-3.5 whitespace-nowrap">
                      <span className="bg-slate-900 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-800 text-[11px]">
                        {p.categoryName}
                      </span>
                    </td>

                    <td className="p-3.5 whitespace-nowrap">
                      <div className="font-mono font-black text-emerald-400 text-sm">${p.price.toFixed(2)}</div>
                      {p.originalPrice && p.originalPrice > p.price && (
                        <div className="text-[10px] text-slate-500 line-through font-mono">
                          ${p.originalPrice.toFixed(2)}
                        </div>
                      )}
                    </td>

                    <td className="p-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-mono font-bold px-2 py-0.5 rounded text-[11px] ${
                            p.stock < 15
                              ? 'bg-rose-950 text-rose-300 border border-rose-800'
                              : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          }`}
                        >
                          {p.stock} units
                        </span>
                        <button
                          onClick={() => handleQuickRestock(p, 25)}
                          className="text-[10px] text-indigo-400 hover:text-indigo-300 font-bold bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800 hover:border-slate-700 transition"
                          title="Quick restock +25 units"
                        >
                          +25
                        </button>
                      </div>
                    </td>

                    <td className="p-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {p.isFeatured && (
                          <span className="bg-indigo-950 text-indigo-300 text-[10px] px-1.5 py-0.5 rounded border border-indigo-800 font-semibold">
                            Featured
                          </span>
                        )}
                        {p.isFlashSale && (
                          <span className="bg-rose-950 text-rose-300 text-[10px] px-1.5 py-0.5 rounded border border-rose-800 font-semibold">
                            Flash Sale
                          </span>
                        )}
                        <span className="text-amber-400 font-bold text-[10px]">★ {p.rating}</span>
                      </div>
                    </td>

                    <td className="p-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleViewOnStorefront(p.id)}
                          className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition"
                          title="View on Customer Storefront"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleOpenEditModal(p)}
                          className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-indigo-300 hover:bg-slate-800 transition"
                          title="Edit Product Details & Images"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => duplicateProduct(p.id)}
                          className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-sky-300 hover:bg-slate-800 transition"
                          title="Duplicate SKU"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => {
                            deleteProduct(p.id);
                          }}
                          className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. SINGLE PRODUCT CREATE / EDIT MODAL                                     */}
      {/* ========================================================================= */}
      {isSingleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setIsSingleModalOpen(false)}
          />
          <div className="relative w-full max-w-3xl bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white">
                    {editingProductId ? 'Edit Hardware Product' : 'Add New Hardware Product'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Instantly published and rendered on the live customer storefront.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsSingleModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSingleProduct} className="space-y-6">
              {/* Basic Fields */}
              <div className="space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                  1. General Information
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-bold text-slate-300">Product Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., I-Tech Titan Pro Ultra 5G"
                      value={prodName}
                      onChange={(e) => setProdName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Category *</label>
                    <select
                      value={prodCategoryId}
                      onChange={(e) => setProdCategoryId(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-indigo-500"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Brand Name</label>
                    <input
                      type="text"
                      placeholder="e.g., Apple, Samsung, Sony, I-Tech"
                      value={prodBrand}
                      onChange={(e) => setProdBrand(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Selling Price ($) *</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      placeholder="999.00"
                      value={prodPrice}
                      onChange={(e) => setProdPrice(e.target.value === '' ? '' : Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 text-emerald-400 font-mono font-bold rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Original / List Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="1099.00"
                      value={prodOriginalPrice}
                      onChange={(e) => setProdOriginalPrice(e.target.value === '' ? '' : Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 text-slate-400 font-mono rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Stock Inventory Units</label>
                    <input
                      type="number"
                      placeholder="25"
                      value={prodStock}
                      onChange={(e) => setProdStock(e.target.value === '' ? '' : Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 text-white font-mono rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Tags (comma-separated)</label>
                    <input
                      type="text"
                      placeholder="Flagship, 5G, OLED, Deal"
                      value={prodTags}
                      onChange={(e) => setProdTags(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-6 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-300">
                    <input
                      type="checkbox"
                      checked={prodIsFeatured}
                      onChange={(e) => setProdIsFeatured(e.target.checked)}
                      className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-900 border-slate-700"
                    />
                    <span>Highlight on Homepage Featured Carousel</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-300">
                    <input
                      type="checkbox"
                      checked={prodIsFlashSale}
                      onChange={(e) => setProdIsFlashSale(e.target.checked)}
                      className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 bg-slate-900 border-slate-700"
                    />
                    <span>Mark as Flash Deal</span>
                  </label>
                </div>
              </div>

              {/* Image Manager Section (Link paste & Device upload) */}
              <div className="space-y-4 border-t border-slate-800 pt-5">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4" />
                    <span>2. Product Images & Gallery (URL or Device Upload)</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {prodImages.length} attached images
                  </span>
                </div>

                {/* Upload & Link Action Bars */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Paste Image URL */}
                  <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 space-y-2">
                    <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <LinkIcon className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Paste Image URL</span>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        placeholder="https://example.com/device-photo.jpg"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        className="flex-1 bg-slate-950 border border-slate-700 text-white rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-indigo-500"
                      />
                      <button
                        type="button"
                        onClick={handleAddImageUrl}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-3 py-1.5 rounded-xl transition"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  {/* Upload from Local Device */}
                  <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 space-y-2">
                    <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Upload from Device</span>
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      multiple
                      accept="image/*"
                      onChange={(e) => handleDeviceUpload(e.target.files)}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full bg-slate-950 hover:bg-slate-800 border border-dashed border-slate-700 text-slate-300 hover:text-white rounded-xl py-2 text-xs font-bold flex items-center justify-center gap-2 transition"
                    >
                      <Upload className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Choose File(s) or Photos</span>
                    </button>
                  </div>
                </div>

                {/* Quick Stock Presets */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold text-slate-400">1-Click Professional Photo Presets:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {PRESET_IMAGES.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setProdImages((prev) => [...prev, preset.url]);
                          addToast('info', 'Preset Attached', `${preset.label} photo added.`);
                        }}
                        className="text-[11px] bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 px-2.5 py-1 rounded-lg transition"
                      >
                        + {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Image Gallery Previews */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold text-slate-400">Current Image Gallery (First image is Primary cover):</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {prodImages.map((imgUrl, index) => (
                      <div
                        key={index}
                        className="relative group bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden p-1.5 flex flex-col justify-between"
                      >
                        <div className="h-28 rounded-xl overflow-hidden bg-slate-950 relative">
                          <img src={imgUrl} alt={`Product ${index}`} className="w-full h-full object-cover" />
                          {index === 0 && (
                            <span className="absolute top-1 left-1 bg-indigo-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow">
                              COVER
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-2 px-1">
                          {index !== 0 ? (
                            <button
                              type="button"
                              onClick={() => handleSetPrimaryImage(index)}
                              className="text-[10px] text-indigo-400 hover:text-indigo-300 font-bold"
                            >
                              Make Cover
                            </button>
                          ) : (
                            <span className="text-[10px] text-slate-500 font-medium">Primary Cover</span>
                          )}

                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="p-1 rounded text-slate-500 hover:text-rose-400 transition"
                            title="Remove image"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description & Technical Specs */}
              <div className="space-y-4 border-t border-slate-800 pt-5">
                <div className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                  3. Description & Technical Specs
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Product Description</label>
                  <textarea
                    rows={3}
                    placeholder="Provide detailed description of hardware features, battery longevity, performance metrics..."
                    value={prodDescription}
                    onChange={(e) => setProdDescription(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-3 text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Specs List */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-300">Key Specifications</label>
                    <button
                      type="button"
                      onClick={() => setSpecs((prev) => [...prev, { key: '', value: '' }])}
                      className="text-xs text-indigo-400 hover:text-indigo-300 font-bold"
                    >
                      + Add Spec Row
                    </button>
                  </div>

                  <div className="space-y-2">
                    {specs.map((sp, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <input
                          type="text"
                          placeholder="Specification Name (e.g., Processor)"
                          value={sp.key}
                          onChange={(e) => {
                            const val = e.target.value;
                            setSpecs((prev) => prev.map((item, i) => (i === idx ? { ...item, key: val } : item)));
                          }}
                          className="w-1/3 bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-1.5 text-xs"
                        />
                        <input
                          type="text"
                          placeholder="Value (e.g., M3 Max 16-Core)"
                          value={sp.value}
                          onChange={(e) => {
                            const val = e.target.value;
                            setSpecs((prev) => prev.map((item, i) => (i === idx ? { ...item, value: val } : item)));
                          }}
                          className="flex-1 bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-1.5 text-xs"
                        />
                        <button
                          type="button"
                          onClick={() => setSpecs((prev) => prev.filter((_, i) => i !== idx))}
                          className="p-1.5 text-slate-500 hover:text-rose-400"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsSingleModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 text-slate-300 hover:text-white font-bold text-xs border border-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs shadow-lg shadow-indigo-600/30 transition flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingProductId ? 'Update Product' : 'Publish Product to Store'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. BULK ADD & IMPORT MODAL                                                */}
      {/* ========================================================================= */}
      {isBulkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setIsBulkModalOpen(false)}
          />
          <div className="relative w-full max-w-4xl bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white">Bulk Add & Hardware Catalog Importer</h3>
                  <p className="text-xs text-slate-400">
                    Import multiple devices at once via fast spreadsheet entry, JSON code, or 1-click curated hardware bundles.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsBulkModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mode Tabs */}
            <div className="flex bg-slate-900 p-1 rounded-2xl border border-slate-800 gap-1">
              <button
                type="button"
                onClick={() => setBulkTab('table')}
                className={`flex-1 py-2 rounded-xl text-xs font-extrabold transition flex items-center justify-center gap-2 ${
                  bulkTab === 'table' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Multi-Item Form Table</span>
              </button>
              <button
                type="button"
                onClick={() => setBulkTab('bundles')}
                className={`flex-1 py-2 rounded-xl text-xs font-extrabold transition flex items-center justify-center gap-2 ${
                  bulkTab === 'bundles' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>1-Click Curated Bundles</span>
              </button>
              <button
                type="button"
                onClick={() => setBulkTab('json')}
                className={`flex-1 py-2 rounded-xl text-xs font-extrabold transition flex items-center justify-center gap-2 ${
                  bulkTab === 'json' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <FileJson className="w-4 h-4" />
                <span>JSON Code Importer</span>
              </button>
            </div>

            {/* ================= TAB 1: MULTI-ITEM TABLE ================= */}
            {bulkTab === 'table' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-300">
                    Enter product details in the rows below ({bulkRows.length} rows ready):
                  </div>
                  <button
                    type="button"
                    onClick={handleAddBulkRow}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-bold bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl transition flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Another Row</span>
                  </button>
                </div>

                <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
                  {bulkRows.map((row, idx) => (
                    <div key={idx} className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-indigo-400 font-mono">Row #{idx + 1}</span>
                        {bulkRows.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveBulkRow(idx)}
                            className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-400">Product Title *</label>
                          <input
                            type="text"
                            placeholder="Product Title"
                            value={row.name}
                            onChange={(e) => {
                              const val = e.target.value;
                              setBulkRows((prev) => prev.map((r, i) => (i === idx ? { ...r, name: val } : r)));
                            }}
                            className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-3 py-1.5 text-xs"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-400">Category *</label>
                          <select
                            value={row.categoryId}
                            onChange={(e) => {
                              const val = e.target.value;
                              setBulkRows((prev) => prev.map((r, i) => (i === idx ? { ...r, categoryId: val } : r)));
                            }}
                            className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-3 py-1.5 text-xs"
                          >
                            {categories.map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-400">Brand</label>
                          <input
                            type="text"
                            placeholder="Brand"
                            value={row.brand}
                            onChange={(e) => {
                              const val = e.target.value;
                              setBulkRows((prev) => prev.map((r, i) => (i === idx ? { ...r, brand: val } : r)));
                            }}
                            className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-3 py-1.5 text-xs"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-400">Price ($) *</label>
                          <input
                            type="number"
                            placeholder="Price ($)"
                            value={row.price}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setBulkRows((prev) => prev.map((r, i) => (i === idx ? { ...r, price: val } : r)));
                            }}
                            className="w-full bg-slate-950 border border-slate-700 text-emerald-400 font-mono font-bold rounded-xl px-3 py-1.5 text-xs"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-400">Stock Units</label>
                          <input
                            type="number"
                            placeholder="Stock Units"
                            value={row.stock}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setBulkRows((prev) => prev.map((r, i) => (i === idx ? { ...r, stock: val } : r)));
                            }}
                            className="w-full bg-slate-950 border border-slate-700 text-white font-mono rounded-xl px-3 py-1.5 text-xs"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-400">Image URL</label>
                          <input
                            type="url"
                            placeholder="https://..."
                            value={row.image}
                            onChange={(e) => {
                              const val = e.target.value;
                              setBulkRows((prev) => prev.map((r, i) => (i === idx ? { ...r, image: val } : r)));
                            }}
                            className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-3 py-1.5 text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={handleAddBulkRow}
                    className="text-xs text-slate-400 hover:text-white font-bold"
                  >
                    + Add More Rows
                  </button>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsBulkModalOpen(false)}
                      className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 font-bold text-xs border border-slate-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveBulkRows}
                      className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-indigo-600/30"
                    >
                      Import All {bulkRows.length} Items to Store
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ================= TAB 2: 1-CLICK CURATED BUNDLES ================= */}
            {bulkTab === 'bundles' && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">
                  Select a pre-configured hardware ecosystem bundle below to populate high-grade devices into the store in one click:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {PRESET_BUNDLES.map((bundle, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-2">
                        <span className="text-[10px] font-black uppercase tracking-wider bg-indigo-950 text-indigo-300 border border-indigo-800 px-2 py-0.5 rounded-full">
                          {bundle.badge}
                        </span>
                        <h4 className="text-sm font-extrabold text-white">{bundle.title}</h4>
                        <p className="text-xs text-slate-400">{bundle.description}</p>
                        <div className="text-[11px] text-emerald-400 font-mono font-bold">
                          Includes {bundle.items.length} hardware products
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleImportBundle(bundle)}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-1.5 shadow"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>1-Click Import Bundle</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ================= TAB 3: JSON IMPORTER ================= */}
            {bulkTab === 'json' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-300">Paste JSON array of products:</div>
                  <button
                    type="button"
                    onClick={handleLoadSampleJson}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-bold underline"
                  >
                    Load Sample Template
                  </button>
                </div>

                <textarea
                  rows={10}
                  placeholder={`[\n  {\n    "name": "I-Tech Quantum Pro",\n    "brand": "I-Tech",\n    "categoryId": "cat-phones",\n    "price": 1099,\n    "stock": 25,\n    "description": "Enterprise certified device",\n    "images": ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80"]\n  }\n]`}
                  value={jsonText}
                  onChange={(e) => setJsonText(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-indigo-200 font-mono text-xs rounded-2xl p-4 focus:outline-none focus:border-indigo-500"
                />

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsBulkModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 font-bold text-xs border border-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleImportJson}
                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow"
                  >
                    Parse & Import JSON
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
