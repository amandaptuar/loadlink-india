import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Package, Truck, IndianRupee, TrendingUp } from "lucide-react";
import Header from "@/components/Header";
import LoadCard from "@/components/LoadCard";
import StatusTimeline from "@/components/StatusTimeline";
import type { Load, LoadStatus } from "@/lib/types";

import { app } from "@/Firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

const CACHE_KEY = "company_loads_cache";

const CompanyDashboard = () => {
  const [loads, setLoads] = useState<Load[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth(app);
    const db = getFirestore(app);

    // ✅ STEP 1: restore cache on refresh
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const parsed: Load[] = JSON.parse(cached);
        setLoads(parsed);
        setLoading(false);
      } catch {}
    }

    let unsubscribeLoads: any = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      // ❌ no user + no cache → go home
      if (!user) {
        const hasCache = localStorage.getItem(CACHE_KEY);
        if (!hasCache) {
          navigate("/");
        }
        setLoading(false);
        return;
      }

      const q = query(
        collection(db, "loads"),
        where("company_id", "==", user.uid),
        orderBy("created_at", "desc")
      );

      unsubscribeLoads = onSnapshot(q, (snap) => {
        const data: Load[] = snap.docs.map((d: any) => ({
          id: d.id,
          companyName: "Me",
          pickupCity: d.data().pickup_city,
          pickupState: d.data().pickup_state,
          dropCity: d.data().drop_city,
          dropState: d.data().drop_state,
          material: d.data().material,
          weight: d.data().weight,
          truckType: d.data().truck_type,
          price: d.data().price,
          pickupDate: d.data().pickup_date,
          status: (d.data().status || "posted") as LoadStatus,
        }));

        setLoads(data);
        setLoading(false);

        // ✅ STEP 2: update cache
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
      });
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeLoads) unsubscribeLoads();
    };
  }, [navigate]);

  // categories
  const available = loads.filter(
    (l) => !["delivered", "completed"].includes(l.status)
  );

  const active = loads.filter((l) =>
    ["accepted", "in_transit"].includes(l.status)
  );

  const completed = loads.filter((l) =>
    ["delivered", "completed"].includes(l.status)
  );

  const trucksAssigned = active.length;
  const totalSpent = completed.reduce((acc, l) => acc + (l.price || 0), 0);

  return (
    <div className="min-h-screen bg-background pb-10">
      <Header />

      <div className="pt-20 px-4 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Dashboard (डैशबोर्ड)</h1>
            <p className="text-sm text-muted-foreground">Your Company</p>
          </div>

          <Link
            to="/company/post-load"
            className="btn-gold flex items-center gap-2 py-2.5 px-5"
          >
            <Plus className="w-5 h-5" />
            Post Load
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {[
            {
              icon: Package,
              label: "Available",
              value: available.length,
              color: "text-electric",
            },
            {
              icon: Truck,
              label: "Active",
              value: trucksAssigned,
              color: "text-success",
            },
            {
              icon: IndianRupee,
              label: "Spent",
              value: `₹${totalSpent.toLocaleString()}`,
              color: "text-primary",
            },
            {
              icon: TrendingUp,
              label: "Completed",
              value: completed.length,
              color: "text-gold-dim",
            },
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
                  <div className="text-xs text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* AVAILABLE */}
        <section className="mb-8">
          <h2 className="text-lg font-bold mb-4">
            Available Loads (उपलब्ध लोड)
          </h2>

          {loading ? (
            <div className="glass rounded-2xl p-8 text-center animate-pulse">
              Loading loads...
            </div>
          ) : available.length === 0 ? (
            <div className="glass rounded-2xl p-8 text-center">
              <Package className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">
                No loads posted yet
              </p>
              <Link
                to="/company/post-load"
                className="text-primary hover:underline font-medium block mt-2"
              >
                Post your first load
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {available.map((l) => (
                <LoadCard key={l.id} load={l} role="company" />
              ))}
            </div>
          )}
        </section>

        {/* ACTIVE */}
        {active.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold mb-4">
              Active Loads (चालू लोड)
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {active.map((l) => (
                <div key={l.id} className="space-y-3">
                  <LoadCard load={l} role="company" />
                  <StatusTimeline current={l.status} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* COMPLETED */}
        {completed.length > 0 && (
          <section>
            <h2 className="text-lg font-bold mb-4">
              Completed (पूरे हुए)
            </h2>
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