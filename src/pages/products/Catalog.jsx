import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Package } from 'lucide-react';
import { productCatalogApi } from '@/lib/api';
import { ProductCard } from '@/components/products/ProductCard';
import { PricingToggle } from '@/components/products/PricingToggle';
import { ProductTypeTabs } from '@/components/products/ProductTypeTabs';
import { OrderModal } from '@/components/products/OrderModal';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export default function ProductCatalog() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState('VPS');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [orderProduct, setOrderProduct] = useState(null);

  useEffect(() => {
    loadProducts();
  }, [selectedType]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await productCatalogApi.getProducts({
        type: selectedType,
        active: 'true'
      });
      setProducts(response.data || []);
    } catch (err) {
      setError(err.message || 'Gagal memuat produk');
    } finally {
      setLoading(false);
    }
  };

  const handleOrder = async (product, cycle) => {
    if (!user) {
      toast.error('Silakan login terlebih dahulu');
      navigate('/login');
      return;
    }
    setOrderProduct({ ...product, billingCycle: cycle });
  };

  const handleOrderSuccess = (data) => {
    toast.success('Pesanan berhasil dibuat!');
    // Redirect to the appropriate dashboard after a delay
    setTimeout(() => {
      const routes = {
        VPS: '/dashboard/vps',
        HOSTING: '/dashboard/hosting',
        DATABASE: '/dashboard/database',
        AUTOMATION: '/dashboard/automation'
      };
      navigate(routes[selectedType] || '/dashboard');
    }, 2000);
  };

  const getPageTitle = () => {
    switch (selectedType) {
      case 'VPS': return 'VPS Cloud Indonesia';
      case 'HOSTING': return 'Web Hosting Indonesia';
      case 'DATABASE': return 'Database Cloud';
      case 'AUTOMATION': return 'n8n Automation';
      default: return 'Produk Kami';
    }
  };

  const getPageDescription = () => {
    switch (selectedType) {
      case 'VPS':
        return 'VPS KVM berperforma tinggi dengan SSD NVMe, jaringan 10Gbps, dan lokasi server di Jakarta untuk latensi terbaik.';
      case 'HOSTING':
        return 'Web hosting cepat dan handal dengan panel CyberPanel, SSL gratis, dan backup otomatis.';
      case 'DATABASE':
        return 'Database cloud managed dengan auto-backup, monitoring, dan skalabilitas tinggi.';
      case 'AUTOMATION':
        return 'Deploy n8n workflow automation dalam hitungan detik untuk otomatisasi bisnis Anda.';
      default:
        return 'Pilih layanan yang sesuai dengan kebutuhan Anda.';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {getPageTitle()}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              {getPageDescription()}
            </p>

            {/* Product Type Tabs */}
            <div className="mb-8">
              <ProductTypeTabs value={selectedType} onChange={setSelectedType} />
            </div>

            {/* Billing Toggle */}
            <PricingToggle value={billingCycle} onChange={setBillingCycle} />
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Memuat produk...</span>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="text-red-500 mb-4">{error}</div>
            <Button onClick={loadProducts} variant="outline">
              Coba Lagi
            </Button>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Belum ada produk
            </h3>
            <p className="text-gray-500">
              Produk untuk kategori ini akan segera tersedia.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                billingCycle={billingCycle}
                onOrder={handleOrder}
              />
            ))}
          </div>
        )}
      </div>

      {/* Features Comparison (Optional) */}
      {products.length > 0 && (
        <div className="bg-white border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
              Mengapa Memilih Kami?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Deploy Cepat</h3>
                <p className="text-sm text-gray-600">
                  Instance siap digunakan dalam hitungan menit, bukan jam.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Aman & Handal</h3>
                <p className="text-sm text-gray-600">
                  Data center Tier-3 dengan uptime 99.9% dan backup otomatis.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                  <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Support 24/7</h3>
                <p className="text-sm text-gray-600">
                  Tim support teknis siap membantu kapan saja Anda butuhkan.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Order Modal */}
      <OrderModal
        product={orderProduct}
        billingCycle={orderProduct?.billingCycle || billingCycle}
        isOpen={!!orderProduct}
        onClose={() => setOrderProduct(null)}
        onSuccess={handleOrderSuccess}
      />
    </div>
  );
}
