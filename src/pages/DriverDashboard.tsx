import { useState } from "react";
import { motion } from "framer-motion";
import { Truck, MapPin, IndianRupee, TrendingUp, Package } from "lucide-react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import LoadCard from "@/components/LoadCard";
import type { Load } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

const DriverDashboard = () => {
  const [loads, setLoads] = useState<Load[]>([]);
  const { toast } = useToast();

  const handleAction = (loadId: string, action: string) => {
    setLoads((prev) =>
      prev.map((l) => {
        if (l.id !== loadId) return l;
        if (action === 'accept') return { ...l, status: 'accepted' as const };
        if (action === 'start') return { ...l, status: 'in_transit' as const };
        if (action === 'deliver') return { ...l, status: 'delivered' as const };
        return l;
      })
    );
    toast({
      title: action === 'accept' ? "Load Accepted! ✅" : action === 'start' ? "Trip Started! 🚚" : "Delivered! 🎉",
      description: action === 'accept' ? "लोड स्वीकार किया गया" : action === 'start' ? "यात्रा शुरू हो गई" : "माल पहुँचा दिया गया",
    });
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
            { icon: IndianRupee, label: "Earned", labelHi: "कमाई", value: "₹0", color: "text-primary" },
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
          {available.length === 0 ? (
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
