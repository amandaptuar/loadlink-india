import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Truck, MapPin, IndianRupee, TrendingUp, Package } from "lucide-react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import LoadCard from "@/components/LoadCard";
import type { Load, LoadStatus } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const DriverDashboard = () => {
  const [loads, setLoads] = useState<Load[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchLoads = async () => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;

      const { data, error } = await supabase
        .from('loads')
        .select('*')
        .or(`status.eq.posted,driver_id.eq.${userData.user.id}`);

      if (error) throw error;

      // Transform to match Load type if necessary
      const transformedLoads: Load[] = (data || []).map((l: any) => ({
        id: l.id,
        companyName: "Loading...", // Will need another join if we want real company names
        pickupCity: l.pickup_city,
        pickupState: l.pickup_state,
        dropCity: l.drop_city,
        dropState: l.drop_state,
        material: l.material,
        weight: l.weight,
        truckType: l.truck_type,
        price: l.price,
        pickupDate: l.pickup_date,
        status: l.status as LoadStatus,
      }));

      setLoads(transformedLoads);
    } catch (error: any) {
      toast({
        title: "Error fetching loads",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoads();
  }, []);

  const handleAction = async (loadId: string, action: string) => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("Not authenticated");

      let updates: any = {};
      if (action === 'accept') {
        updates = { status: 'accepted', driver_id: userData.user.id };
      } else if (action === 'start') {
        updates = { status: 'in_transit' };
      } else if (action === 'deliver') {
        updates = { status: 'delivered' };
      }

      const { error } = await supabase
        .from('loads')
        .update(updates)
        .eq('id', loadId);

      if (error) throw error;

      toast({
        title: action === 'accept' ? "Load Accepted! ✅" : action === 'start' ? "Trip Started! 🚚" : "Delivered! 🎉",
        description: action === 'accept' ? "लोड स्वीकार किया गया" : action === 'start' ? "यात्रा शुरू हो गई" : "माल पहुँचा दिया गया",
      });

      fetchLoads(); // Refresh list
    } catch (error: any) {
      toast({
        title: "Action failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const available = loads.filter((l) => l.status === 'posted');
  const myLoads = loads.filter((l) => ['accepted', 'in_transit'].includes(l.status));
  const delivered = loads.filter((l) => ['delivered', 'completed'].includes(l.status));

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />
      <div className="pt-20 px-4 max-w-lg mx-auto">
        {/* Greeting */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
          <h1 className="text-2xl font-bold">Namaste 🙏</h1>
          <p className="text-sm text-muted-foreground">Find loads near you (अपने पास के लोड खोजें)</p>
        </motion.div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { icon: Package, label: "Active", labelHi: "चालू", value: myLoads.length, color: "text-electric" },
            { icon: TrendingUp, label: "Done", labelHi: "पूरे", value: delivered.length, color: "text-success" },
            { icon: IndianRupee, label: "Earned", labelHi: "कमाई", value: `₹${delivered.reduce((acc, l) => acc + (l.price || 0), 0).toLocaleString()}`, color: "text-primary" },
          ].map((s) => (
            <div key={s.label} className="glass rounded-xl p-3 text-center">
              <s.icon className={`w-5 h-5 mx-auto mb-1 ${s.color}`} />
              <div className="text-lg font-bold">{s.value}</div>
              <div className="text-[10px] text-muted-foreground">{s.label} ({s.labelHi})</div>
            </div>
          ))}
        </div>

        {/* My active loads */}
        {myLoads.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-3">My Loads (मेरे लोड)</h2>
            <div className="space-y-3">
              {myLoads.map((l) => (
                <LoadCard key={l.id} load={l} role="driver" onAction={(a) => handleAction(l.id, a)} />
              ))}
            </div>
          </section>
        )}

        {/* Available loads */}
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3">
            Available Loads (उपलब्ध लोड)
            <span className="ml-2 text-sm text-muted-foreground font-normal">({available.length})</span>
          </h2>
          {loading ? (
            <div className="glass rounded-2xl p-8 text-center animate-pulse">
              <p className="text-muted-foreground">Loading loads...</p>
            </div>
          ) : available.length === 0 ? (
            <div className="glass rounded-2xl p-8 text-center">
              <Truck className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No loads available right now</p>
              <p className="text-xs text-muted-foreground mt-1">(अभी कोई लोड उपलब्ध नहीं है)</p>
            </div>
          ) : (
            <div className="space-y-3">
              {available.map((l) => (
                <LoadCard key={l.id} load={l} role="driver" onAction={(a) => handleAction(l.id, a)} />
              ))}
            </div>
          )}
        </section>
      </div>
      <BottomNav />
    </div>
  );
};

export default DriverDashboard;
