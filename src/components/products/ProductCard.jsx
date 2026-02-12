import { useState } from 'react';
import { Check, Cpu, MemoryStick, HardDrive, Globe, Database, Zap, Server } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const specIcons = {
  cpuCores: Cpu,
  ramGb: MemoryStick,
  storageGb: HardDrive,
  diskGb: HardDrive,
  bandwidthGb: Globe,
  bandwidthTb: Globe,
  storage: HardDrive,
};

const specLabels = {
  cpuCores: (v) => `${v} vCPU`,
  ramGb: (v) => `${v} GB RAM`,
  storageGb: (v) => `${v} GB SSD`,
  diskGb: (v) => `${v} GB Disk`,
  bandwidthGb: (v) => `${v} GB Bandwidth`,
  bandwidthTb: (v) => `${v} TB Bandwidth`,
  storage: (v) => `${v} GB Storage`,
};

export function ProductCard({ product, billingCycle, onOrder }) {
  const [isOrdering, setIsOrdering] = useState(false);

  const price = billingCycle === 'yearly' && product.priceYearly
    ? product.priceYearly
    : product.priceMonthly;

  const monthlyEquivalent = billingCycle === 'yearly' && product.priceYearly
    ? Math.round(product.priceYearly / 12)
    : product.priceMonthly;

  const specs = product.specs || {};
  const features = product.features || [];
  const highlightedFeatures = features.filter(f => f.isHighlight);
  const regularFeatures = features.filter(f => !f.isHighlight);

  const handleOrder = async () => {
    setIsOrdering(true);
    try {
      await onOrder?.(product, billingCycle);
    } finally {
      setIsOrdering(false);
    }
  };

  const getProductIcon = () => {
    switch (product.type) {
      case 'VPS': return Server;
      case 'HOSTING': return Globe;
      case 'DATABASE': return Database;
      case 'AUTOMATION': return Zap;
      default: return Server;
    }
  };

  const Icon = getProductIcon();

  return (
    <div className={cn(
      "relative flex flex-col rounded-xl border bg-white p-6 shadow-sm transition-all hover:shadow-md",
      product.badge && "ring-2 ring-blue-500"
    )}>
      {product.badge && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 hover:bg-blue-600">
          {product.badge}
        </Badge>
      )}

      {/* Header */}
      <div className="text-center mb-6">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        {product.description && (
          <p className="mt-1 text-sm text-gray-500">{product.description}</p>
        )}
      </div>

      {/* Price */}
      <div className="text-center mb-6">
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-sm text-gray-500">Rp</span>
          <span className="text-3xl font-bold text-gray-900">
            {price.toLocaleString('id-ID')}
          </span>
        </div>
        <p className="text-sm text-gray-500">
          /{billingCycle === 'yearly' ? 'tahun' : 'bulan'}
        </p>
        {billingCycle === 'yearly' && product.priceYearly && (
          <p className="text-xs text-green-600 mt-1">
            Rp {monthlyEquivalent.toLocaleString('id-ID')}/bulan
          </p>
        )}
      </div>

      {/* Key Specs */}
      <div className="mb-6 grid grid-cols-2 gap-3">
        {Object.entries(specs).slice(0, 4).map(([key, value]) => {
          const SpecIcon = specIcons[key] || Server;
          const label = specLabels[key]?.(value) || `${value} ${key}`;
          return (
            <div key={key} className="flex items-center gap-2 text-sm text-gray-600">
              <SpecIcon className="h-4 w-4 text-gray-400" />
              <span>{label}</span>
            </div>
          );
        })}
      </div>

      {/* Features */}
      <div className="mb-6 flex-1 space-y-3">
        {highlightedFeatures.length > 0 && (
          <div className="space-y-2">
            {highlightedFeatures.map((feature) => (
              <div key={feature.id} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-gray-900">{feature.text}</span>
              </div>
            ))}
          </div>
        )}

        {regularFeatures.length > 0 && (
          <div className="space-y-2 pt-3 border-t">
            {regularFeatures.slice(0, 4).map((feature) => (
              <div key={feature.id} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{feature.text}</span>
              </div>
            ))}
            {regularFeatures.length > 4 && (
              <p className="text-xs text-gray-500 pl-6">
                +{regularFeatures.length - 4} fitur lainnya
              </p>
            )}
          </div>
        )}
      </div>

      {/* CTA */}
      <Button
        className="w-full"
        size="lg"
        onClick={handleOrder}
        disabled={isOrdering || !product.isActive}
      >
        {isOrdering ? 'Memproses...' : product.isActive ? 'Pilih Paket' : 'Tidak Tersedia'}
      </Button>
    </div>
  );
}

export default ProductCard;
