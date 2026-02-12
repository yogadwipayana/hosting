import { cn } from '@/lib/utils';
import { Server, Globe, Database, Zap } from 'lucide-react';

const types = [
  { id: 'VPS', label: 'VPS', icon: Server },
  { id: 'HOSTING', label: 'Hosting', icon: Globe },
  { id: 'DATABASE', label: 'Database', icon: Database },
  { id: 'AUTOMATION', label: 'Automation', icon: Zap },
];

export function ProductTypeTabs({ value, onChange }) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {types.map((type) => {
        const Icon = type.icon;
        return (
          <button
            key={type.id}
            onClick={() => onChange(type.id)}
            className={cn(
              "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all",
              value === type.id
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50 border"
            )}
          >
            <Icon className="h-4 w-4" />
            {type.label}
          </button>
        );
      })}
    </div>
  );
}

export default ProductTypeTabs;
