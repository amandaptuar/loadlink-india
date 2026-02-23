import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Truck, Package, IndianRupee, Shield } from "lucide-react";
import Header from "@/components/Header";
import { supabase } from "@/integrations/supabase/client";

interface Driver {
  id: string;
  name: string;
  phone: string;
  truck_number: string;
  truck_type: string;
  city: string;
  verified: boolean;
}

const AdminDashboard = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({ totalUsers: 0, drivers: 0, activeLoads: 0, revenue: 0 });

  const fetchStats = async () => {
    try {
      const { count: userCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
      const { count: driverCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'driver');
      const { count: loadCount } = await supabase.from('loads').select('*', { count: 'exact', head: true }).neq('status', 'delivered');
      const { data: revenueData } = await supabase.from('loads').select('price').eq('status', 'delivered');

      const totalRevenue = revenueData?.reduce((acc, load) => acc + (load.price || 0), 0) || 0;

      setStats({
        totalUsers: userCount || 0,
        drivers: driverCount || 0,
        activeLoads: loadCount || 0,
        revenue: totalRevenue
      });
    } catch (error) {
      console.error("Error fetching admin stats:", error);
    }
  };

  const fetchDrivers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'driver');

      if (error) throw error;

      setDrivers(data.map((d: any) => ({
        id: d.id,
        name: d.name || 'Unknown',
        phone: d.phone || 'N/A',
        truck_number: d.truck_number || 'N/A',
        truck_type: d.truck_type || 'N/A',
        city: d.city || 'N/A',
        verified: d.verified || false,
      })));
    } catch (error) {
      console.error("Error fetching drivers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchDrivers();
  }, []);

  const toggleVerify = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ verified: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      fetchDrivers();
    } catch (error) {
      console.error("Error toggling verification:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-10">
      <Header />
      <div className="pt-20 px-4 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Admin Panel (एडमिन पैनल)</h1>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {[
            { icon: Users, label: "Total Users", value: stats.totalUsers, color: "text-electric" },
            { icon: Truck, label: "Drivers", value: stats.drivers, color: "text-success" },
            { icon: Package, label: "Active Loads", value: stats.activeLoads, color: "text-warning" },
            { icon: IndianRupee, label: "Revenue", value: `₹${stats.revenue.toLocaleString()}`, color: "text-primary" },
          ].map((s) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl p-4">
              <s.icon className={`w-5 h-5 mb-2 ${s.color}`} />
              <div className="text-xl font-bold">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Driver verification */}
        <section>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Driver Verification (ड्राइवर सत्यापन)
          </h2>
          <div className="glass rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50 text-muted-foreground">
                    <th className="text-left py-3 px-4 font-medium">Name</th>
                    <th className="text-left py-3 px-4 font-medium hidden sm:table-cell">Phone</th>
                    <th className="text-left py-3 px-4 font-medium">Truck</th>
                    <th className="text-left py-3 px-4 font-medium hidden md:table-cell">City</th>
                    <th className="text-left py-3 px-4 font-medium">Status</th>
                    <th className="text-right py-3 px-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="py-10 text-center text-muted-foreground animate-pulse">
                        Loading drivers...
                      </td>
                    </tr>
                  ) : drivers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-10 text-center text-muted-foreground">
                        No drivers found.
                      </td>
                    </tr>
                  ) : drivers.map((d) => (
                    <tr key={d.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4 font-medium">{d.name}</td>
                      <td className="py-3 px-4 text-muted-foreground hidden sm:table-cell">{d.phone}</td>
                      <td className="py-3 px-4">{d.truck_number} <span className="text-muted-foreground text-xs">({d.truck_type})</span></td>
                      <td className="py-3 px-4 text-muted-foreground hidden md:table-cell">{d.city}</td>
                      <td className="py-3 px-4">
                        {d.verified ? (
                          <span className="status-badge bg-success/20 text-success">Verified</span>
                        ) : (
                          <span className="status-badge bg-warning/20 text-warning">Pending</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => toggleVerify(d.id, d.verified)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${d.verified
                            ? 'bg-destructive/20 text-destructive hover:bg-destructive/30'
                            : 'bg-success/20 text-success hover:bg-success/30'
                            }`}
                        >
                          {d.verified ? 'Revoke' : 'Verify'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
