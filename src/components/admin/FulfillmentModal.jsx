import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Loader2, Check, Server, Globe, Database, Cpu } from 'lucide-react';
import { adminApi } from '@/lib/api';

const SERVICE_ICONS = {
  VPS: Server,
  HOSTING: Globe,
  DATABASE: Database,
  AUTOMATION: Cpu,
};

// VPS Fulfillment Form
function VpsForm({ data, onChange }) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="ipAddress">IP Address *</Label>
        <Input
          id="ipAddress"
          placeholder="e.g., 103.56.148.100"
          value={data.ipAddress || ''}
          onChange={(e) => onChange({ ...data, ipAddress: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="rootPassword">Root Password</Label>
        <Input
          id="rootPassword"
          type="password"
          placeholder="Leave empty to auto-generate"
          value={data.rootPassword || ''}
          onChange={(e) => onChange({ ...data, rootPassword: e.target.value })}
        />
        <p className="text-xs text-gray-500">If left empty, a secure password will be generated.</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="sshPort">SSH Port</Label>
          <Input
            id="sshPort"
            type="number"
            placeholder="22"
            value={data.sshPort || '22'}
            onChange={(e) => onChange({ ...data, sshPort: parseInt(e.target.value) })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="controlPanelUrl">Control Panel URL</Label>
          <Input
            id="controlPanelUrl"
            placeholder="https://panel.example.com"
            value={data.controlPanelUrl || ''}
            onChange={(e) => onChange({ ...data, controlPanelUrl: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}

// Hosting Fulfillment Form
function HostingForm({ data, onChange }) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="ipAddress">IP Address *</Label>
        <Input
          id="ipAddress"
          placeholder="e.g., 192.168.1.100"
          value={data.ipAddress || ''}
          onChange={(e) => onChange({ ...data, ipAddress: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="cpanelUrl">Control Panel URL *</Label>
        <Input
          id="cpanelUrl"
          placeholder="e.g., https://cpanel.example.com"
          value={data.cpanelUrl || ''}
          onChange={(e) => onChange({ ...data, cpanelUrl: e.target.value })}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username *</Label>
          <Input
            id="username"
            placeholder="Control panel username"
            value={data.username || ''}
            onChange={(e) => onChange({ ...data, username: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Auto-generate if empty"
            value={data.password || ''}
            onChange={(e) => onChange({ ...data, password: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}

// Database Fulfillment Form
function DatabaseForm({ data, onChange }) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="hostname">Host/Hostname *</Label>
        <Input
          id="hostname"
          placeholder="e.g., db.example.com"
          value={data.hostname || ''}
          onChange={(e) => onChange({ ...data, hostname: e.target.value })}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="port">Port *</Label>
          <Input
            id="port"
            type="number"
            placeholder="5432"
            value={data.port || ''}
            onChange={(e) => onChange({ ...data, port: parseInt(e.target.value) })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="databaseName">Database Name</Label>
          <Input
            id="databaseName"
            placeholder="Auto-generate if empty"
            value={data.databaseName || ''}
            onChange={(e) => onChange({ ...data, databaseName: e.target.value })}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            placeholder="Auto-generate if empty"
            value={data.username || ''}
            onChange={(e) => onChange({ ...data, username: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Auto-generate if empty"
            value={data.password || ''}
            onChange={(e) => onChange({ ...data, password: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}

// Automation Fulfillment Form
function AutomationForm({ data, onChange }) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="instanceUrl">Service URL *</Label>
        <Input
          id="instanceUrl"
          placeholder="e.g., https://my-instance.belajarhosting.com"
          value={data.instanceUrl || ''}
          onChange={(e) => onChange({ ...data, instanceUrl: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="adminEmail">Admin Email</Label>
        <Input
          id="adminEmail"
          type="email"
          placeholder="Admin email for the instance"
          value={data.adminEmail || ''}
          onChange={(e) => onChange({ ...data, adminEmail: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="adminPassword">Admin Password</Label>
        <Input
          id="adminPassword"
          type="password"
          placeholder="Leave empty to auto-generate"
          value={data.adminPassword || ''}
          onChange={(e) => onChange({ ...data, adminPassword: e.target.value })}
        />
        <p className="text-xs text-gray-500">If left empty, a secure password will be generated.</p>
      </div>
    </div>
  );
}

export function FulfillmentModal({ order, isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  if (!order) return null;

  const Icon = SERVICE_ICONS[order.serviceType] || Server;

  const validateForm = () => {
    switch (order.serviceType) {
      case 'VPS':
        return !!formData.ipAddress;
      case 'HOSTING':
        return !!formData.ipAddress && !!formData.cpanelUrl && !!formData.username;
      case 'DATABASE':
        return !!formData.hostname && !!formData.port;
      case 'AUTOMATION':
        return !!formData.instanceUrl;
      default:
        return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      let response;
      switch (order.serviceType) {
        case 'VPS':
          response = await adminApi.fulfillVpsOrder(order.id, formData);
          break;
        case 'HOSTING':
          response = await adminApi.fulfillHostingOrder(order.id, formData);
          break;
        case 'DATABASE':
          response = await adminApi.fulfillDatabaseOrder(order.id, formData);
          break;
        case 'AUTOMATION':
          response = await adminApi.fulfillAutomationOrder(order.id, formData);
          break;
        default:
          throw new Error('Unknown service type');
      }

      setSuccess(true);
      onSuccess?.(response.data);

      // Close after showing success
      setTimeout(() => {
        setSuccess(false);
        setFormData({});
        onClose();
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to fulfill order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderForm = () => {
    switch (order.serviceType) {
      case 'VPS':
        return <VpsForm data={formData} onChange={setFormData} />;
      case 'HOSTING':
        return <HostingForm data={formData} onChange={setFormData} />;
      case 'DATABASE':
        return <DatabaseForm data={formData} onChange={setFormData} />;
      case 'AUTOMATION':
        return <AutomationForm data={formData} onChange={setFormData} />;
      default:
        return <p className="text-red-500">Unknown service type: {order.serviceType}</p>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-gray-950 border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon className="h-5 w-5 text-blue-400" />
            Fulfill {order.serviceType} Order
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Enter the provisioning details for this order.
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-white">Order Fulfilled!</h3>
            <p className="text-sm text-gray-400 mt-1">
              The customer will be notified of their active service.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Order Summary */}
            <div className="bg-gray-900 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Order ID</span>
                <span className="font-mono text-gray-300">{order.id?.slice(0, 12)}...</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">User</span>
                <span className="text-white">{order.user?.email}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Plan</span>
                <span className="text-white capitalize">{order.plan || order.planId}</span>
              </div>
            </div>

            {error && (
              <Alert variant="destructive" className="bg-red-950/50 border-red-900">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-red-400">{error}</AlertDescription>
              </Alert>
            )}

            {renderForm()}

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
                className="border-gray-700 text-white hover:bg-gray-800"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !validateForm()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Fulfill Order'
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default FulfillmentModal;
