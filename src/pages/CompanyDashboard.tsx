import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Package, Truck, IndianRupee, TrendingUp, MapPin, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import LoadCard from "@/components/LoadCard";
import StatusTimeline from "@/components/StatusTimeline";
import { MOCK_LOADS } from "@/lib/types";

const CompanyDashboard = () => {
  const [loads] = useState(MOCK_LOADS);

  const active = loads.filter((l) => !['delivered', 'completed'].includes(l.status));
  const completed = loads.filter((l) => ['delivered', 'completed'].includes(l.status));

  return (
    <div className="min-h-screen bg-background pb-10">
      <Header />
      <div className="pt-20 px-4 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Dashboard (डैशबोर्ड)</h1>
            <p className="text-sm text-muted-foreground">Tata Steel Ltd</p>
          </div>
          <Link to="/company/post-load" className="btn-gold flex items-center gap-2 py-2.5 px-5">
            <Plus className="w-5 h-5" />
            Post Load
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {[
            { icon: Package, label: "Active Loads", labelHi: "चालू लोड", value: active.length, color: "text-electric" },
            { icon: Truck, label: "Trucks Assigned", labelHi: "ट्रक लगे", value: 3, color: "text-success" },
            { icon: IndianRupee, label: "Total Spent", labelHi: "कुल खर्च", value: "₹2.5L", color: "text-primary" },
            { icon: TrendingUp, label: "Completed", labelHi: "पूरे हुए", value: completed.length, color: "text-gold-dim" },
          ].map((s) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-xl p-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <div>
                  <div className="text-xl font-bold">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Active loads */}
        <section className="mb-8">
          <h2 className="text-lg font-bold mb-4">Active Loads (चालू लोड)</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {active.map((l) => (
              <div key={l.id} className="space-y-3">
                <LoadCard load={l} role="company" />
                <StatusTimeline current={l.status} />
              </div>
            ))}
          </div>
        </section>

        {/* Completed */}
        {completed.length > 0 && (
          <section>
            <h2 className="text-lg font-bold mb-4">Completed (पूरे हुए)</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {completed.map((l) => (
                <LoadCard key={l.id} load={l} role="company" />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default CompanyDashboard;
