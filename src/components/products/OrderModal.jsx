import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Loader2, Check, Wallet } from 'lucide-react';
import { productCatalogApi, creditApi } from '@/lib/api';
import { Link } from 'react-router-dom';

const databaseEngines = [
  { value: 'POSTGRESQL', label: 'PostgreSQL' },
  { value: 'MYSQL', label: 'MySQL' },
  { value: 'MONGODB', label: 'MongoDB' },
  { value: 'REDIS', label: 'Redis' },
  { value: 'MARIADB', label: 'MariaDB' },
];

export function OrderModal({ product, billingCycle, isOpen, onClose, onSuccess }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [balance, setBalance] = useState(null);
  const [balanceLoading, setBalanceLoading] = useState(false);

  // Form fields based on product type
  const [formData, setFormData] = useState({
    name: '',
    hostname: '',
    domain: '',
    subdomain: '',
    engine: 'POSTGRESQL',
  });

  // Fetch balance when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchBalance();
    }
  }, [isOpen]);

  const fetchBalance = async () => {
    setBalanceLoading(true);
    try {
      const response = await creditApi.getCredits();
      setBalance(response.data?.balance || 0);
    } catch (err) {
      console.error('Failed to fetch balance:', err);
      setBalance(0);
    } finally {
      setBalanceLoading(false);
    }
  };

  const price = billingCycle === 'yearly' && product?.priceYearly
    ? product.priceYearly
    : product?.priceMonthly;

  const hasInsufficientBalance = balance !== null && price > balance;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Check balance before submitting
    if (hasInsufficientBalance) {
      setError('Saldo tidak mencukupi. Silakan top up terlebih dahulu.');
      setIsSubmitting(false);
      return;
    }

    try {
      const orderData = {
        billingCycle,
        name: formData.name || undefined,
        hostname: formData.hostname || undefined,
        domain: formData.domain || undefined,
        subdomain: formData.subdomain || undefined,
        engine: formData.engine || undefined,
      };

      const response = await productCatalogApi.orderProduct(product.slug, orderData);
      setSuccess(true);
      onSuccess?.(response.data);

      // Close after showing success
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    } catch (err) {
      // Handle insufficient balance error from API
      if (err.response?.status === 402 || err.message?.toLowerCase().includes('insufficient')) {
        setError('Saldo tidak mencukupi. Silakan top up terlebih dahulu.');
      } else {
        setError(err.message || 'Gagal membuat pesanan. Silakan coba lagi.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFormFields = () => {
    switch (product?.type) {
      case 'VPS':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">Nama Server</Label>
              <Input
                id="name"
                placeholder="Contoh: Production Server"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hostname">Hostname</Label>
              <Input
                id="hostname"
                placeholder="Contoh: prod-server-01"
                value={formData.hostname}
                onChange={(e) => setFormData({ ...formData, hostname: e.target.value })}
              />
            </div>
          </>
        );

      case 'HOSTING':
        return (
          <div className="space-y-2">
            <Label htmlFor="domain">Domain</Label>
            <Input
              id="domain"
              placeholder="Contoh: example.com"
              value={formData.domain}
              onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
              required
            />
          </div>
        );

      case 'DATABASE':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">Nama Database</Label>
              <Input
                id="name"
                placeholder="Contoh: production-db-01"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="engine">Database Engine</Label>
              <Select
                value={formData.engine}
                onValueChange={(value) => setFormData({ ...formData, engine: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {databaseEngines.map((engine) => (
                    <SelectItem key={engine.value} value={engine.value}>
                      {engine.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        );

      case 'AUTOMATION':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">Nama Instance</Label>
              <Input
                id="name"
                placeholder="Contoh: My n8n Instance"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subdomain">Subdomain</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="subdomain"
                  placeholder="Contoh: my-automation"
                  value={formData.subdomain}
                  onChange={(e) => setFormData({ ...formData, subdomain: e.target.value })}
                />
                <span className="text-gray-500 whitespace-nowrap">.belajarhosting.com</span>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Pesan {product?.name}</DialogTitle>
          <DialogDescription>
            Lengkapi detail berikut untuk membuat instance baru.
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Pesanan Berhasil!</h3>
            <p className="text-sm text-gray-500 mt-1">Instance Anda sedang dibuat...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {renderFormFields()}

            {/* Balance Info */}
            <div className={`rounded-lg p-4 space-y-2 ${hasInsufficientBalance ? 'bg-red-50 border border-red-200' : 'bg-blue-50 border border-blue-200'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wallet className={`w-4 h-4 ${hasInsufficientBalance ? 'text-red-500' : 'text-blue-600'}`} />
                  <span className={`text-sm font-medium ${hasInsufficientBalance ? 'text-red-700' : 'text-blue-700'}`}>
                    Saldo Anda
                  </span>
                </div>
                <span className={`text-sm font-bold ${hasInsufficientBalance ? 'text-red-600' : 'text-blue-600'}`}>
                  {balanceLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    `Rp ${balance?.toLocaleString('id-ID') || '0'}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className={hasInsufficientBalance ? 'text-red-600' : 'text-blue-600'}>Total Pesanan</span>
                <span className={`font-bold ${hasInsufficientBalance ? 'text-red-600' : 'text-blue-700'}`}>
                  Rp {price?.toLocaleString('id-ID')}
                </span>
              </div>
              {hasInsufficientBalance && (
                <div className="pt-2 border-t border-red-200">
                  <p className="text-xs text-red-600 mb-2">
                    Saldo tidak mencukupi. Anda membutuhkan Rp {(price - balance).toLocaleString('id-ID')} lebih.
                  </p>
                  <Link
                    to="/dashboard/credit"
                    onClick={onClose}
                    className="inline-flex items-center text-xs font-medium text-red-700 hover:text-red-800 underline"
                  >
                    Top up sekarang →
                  </Link>
                </div>
              )}
            </div>

            <div className="rounded-lg bg-gray-50 p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Paket</span>
                <span className="font-medium">{product?.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Periode</span>
                <span className="font-medium capitalize">{billingCycle === 'yearly' ? 'Tahunan' : 'Bulanan'}</span>
              </div>
              <div className="border-t pt-2 flex justify-between">
                <span className="font-medium">Total</span>
                <span className="font-bold text-blue-600">Rp {price?.toLocaleString('id-ID')}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Batal
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || hasInsufficientBalance || balanceLoading}
                className="flex-1"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Memproses...
                  </>
                ) : hasInsufficientBalance ? (
                  'Saldo Tidak Cukup'
                ) : (
                  'Konfirmasi Pesanan'
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default OrderModal;
