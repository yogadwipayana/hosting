import { cn } from '@/lib/utils';

export function PricingToggle({ value, onChange }) {
  return (
    <div className="inline-flex items-center rounded-full border bg-gray-100 p-1">
      <button
        onClick={() => onChange('monthly')}
        className={cn(
          "rounded-full px-4 py-2 text-sm font-medium transition-all",
          value === 'monthly'
            ? "bg-white text-gray-900 shadow-sm"
            : "text-gray-600 hover:text-gray-900"
        )}
      >
        Bulanan
      </button>
      <button
        onClick={() => onChange('yearly')}
        className={cn(
          "rounded-full px-4 py-2 text-sm font-medium transition-all",
          value === 'yearly'
            ? "bg-white text-gray-900 shadow-sm"
            : "text-gray-600 hover:text-gray-900"
        )}
      >
        Tahunan
        <span className="ml-1 text-xs text-green-600">Hemat</span>
      </button>
    </div>
  );
}

export default PricingToggle;
