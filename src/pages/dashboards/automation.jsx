import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Helmet } from "react-helmet-async";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardTopbar } from "@/components/DashboardTopbar";
import { automationApi } from "@/services/automation.service";
import { toast } from "sonner";
import {
  Plus,
  Cpu,
  Activity,
  AlertCircle,
  Zap,
  Clock,
  Loader2,
} from "lucide-react";

const StatusBadge = ({ status }) => {
  const styles = {
    active: "bg-green-100 text-green-700",
    stopped: "bg-gray-100 text-gray-700",
    provisioning: "bg-blue-100 text-blue-700",
    error: "bg-red-100 text-red-700",
  };

  const labels = {
    active: "Active",
    stopped: "Stopped",
    provisioning: "Provisioning",
    error: "Error",
  };

  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
};
const MainContent = () => {
  const [services, setServices] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, status: 'Normal' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setIsLoading(true);
      const response = await automationApi.getAll();
      setServices(response.data.data.items || []);
      setStats(response.data.data.stats || { total: 0, active: 0, status: 'Normal' });
    } catch (error) {
      toast.error('Failed to load automation services');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-[calc(100vh-64px)] bg-gray-50 p-8">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p>Loading automation services...</p>
        </div>
      </main>
    );
  }


  return (
    <main className="min-h-[calc(100vh-64px)] bg-gray-50 p-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Manage Automation
          </h1>
          <p className="text-gray-500">Kelola workflow automation n8n Anda</p>
        </div>
        <Link
          to="/dashboard/automation/deploy"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
        >
          <Plus size={18} />
          <span>Deploy Automation Baru</span>
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">
              Total Automation
            </h3>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Zap size={20} />
            </div>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-gray-900">
              {stats.total}
            </span>
            <span className="text-green-600 text-xs font-medium mb-1">
              +0 bulan ini
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">
              Active Automation
            </h3>
            <div className="p-2 bg-green-50 text-green-600 rounded-lg">
              <Activity size={20} />
            </div>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-gray-900">
              {stats.active}
            </span>
            <span className="text-gray-400 text-xs font-medium mb-1">
              services
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">Status</h3>
            <div className="p-2 bg-red-50 text-red-600 rounded-lg">
              <AlertCircle size={20} />
            </div>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-gray-900">{stats.status}</span>
            <span className="text-green-600 text-xs font-medium mb-1">
              All services running
            </span>
          </div>
        </div>
      </div>

      {/* List Content */}
      <div className="space-y-6">
        <div className="grid gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
                  {/* Service Info */}
                  <div className="flex items-start gap-4">
                    <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-lg bg-pink-50 text-pink-600 p-2">
                      {service.icon ? (
                        <img
                          src={service.icon}
                          alt={service.platform || "n8n Automation"}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <Clock size={24} />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-bold text-gray-900">
                          {service.name}
                        </h3>
                        <StatusBadge status={service.status} />
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1.5">
                          {service.platform || "n8n Automation"}
                        </span>
                        <span className="hidden sm:inline">&#8226;</span>
                        <span>{service.locationName || service.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 w-full lg:w-auto">
                    <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 h-9 bg-white border border-gray-200 text-gray-700 rounded-md text-xs font-bold uppercase hover:bg-gray-50 transition-colors shadow-sm">
                      Cek
                    </button>
                    <Link to={`/dashboard/automation/${service.id}`} className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 h-9 bg-blue-600 text-white rounded-md text-xs font-bold uppercase hover:bg-blue-700 transition-colors shadow-sm bg-opacity-90">
                      Kelola
                    </Link>
                  </div>
                </div>

                {/* divider */}
                <div className="h-px bg-gray-100 w-full mb-6"></div>

                {/* Resources */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-blue-50 text-blue-600">
                      <Zap size={18} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-0.5">Plan Type</p>
                      <p className="text-sm font-medium text-gray-900">
                        {service.plan}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-orange-50 text-orange-600">
                      <Cpu size={18} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-0.5">Resources</p>
                      <p className="text-sm font-medium text-gray-900">
                        {service.cpu} vCPU / {service.ram} GB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default function AutomationDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>Automation Dashboard - BelajarHosting</title>
      </Helmet>

      <div className="flex min-h-screen bg-gray-50">
        <DashboardSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activePage="/dashboard/automation"
        />

        <div className="flex-1 lg:pl-64 flex flex-col min-h-screen transition-all duration-300">
          <DashboardTopbar onMenuClick={() => setSidebarOpen(true)} />
          <MainContent />
        </div>
      </div>
    </>
  );
}
