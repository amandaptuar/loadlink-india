import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Truck, Package, IndianRupee, CheckCircle, XCircle, Shield, Eye } from "lucide-react";
import Header from "@/components/Header";

const mockDrivers = [
  { id: '1', name: 'Rajesh Kumar', phone: '9876543210', truck: 'MH 12 AB 1234', type: 'Trailer', city: 'Mumbai', verified: true },
  { id: '2', name: 'Suresh Singh', phone: '9876543211', truck: 'DL 01 CD 5678', type: 'Container', city: 'Delhi', verified: false },
  { id: '3', name: 'Amit Patel', phone: '9876543212', truck: 'GJ 05 EF 9012', type: 'Open Body', city: 'Ahmedabad', verified: true },
  { id: '4', name: 'Vikram Yadav', phone: '9876543213', truck: 'RJ 14 GH 3456', type: 'Tanker', city: 'Jaipur', verified: false },
];

const AdminDashboard = () => {
  const [drivers, setDrivers] = useState(mockDrivers);

  const toggleVerify = (id: string) => {
    setDrivers((prev) => prev.map((d) => d.id === id ? { ...d, verified: !d.verified } : d));
  };

  return (
    <div className="min-h-screen bg-background pb-10">
      <Header />
      <div className="pt-20 px-4 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Admin Panel (एडमिन पैनल)</h1>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {[
            { icon: Users, label: "Total Users", value: "12,450", color: "text-electric" },
            { icon: Truck, label: "Drivers", value: "8,200", color: "text-success" },
            { icon: Package, label: "Active Loads", value: "340", color: "text-warning" },
            { icon: IndianRupee, label: "Revenue", value: "₹4.2 Cr", color: "text-primary" },
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
                <tbody>
                  {drivers.map((d) => (
                    <tr key={d.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4 font-medium">{d.name}</td>
                      <td className="py-3 px-4 text-muted-foreground hidden sm:table-cell">{d.phone}</td>
                      <td className="py-3 px-4">{d.truck} <span className="text-muted-foreground text-xs">({d.type})</span></td>
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
                          onClick={() => toggleVerify(d.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            d.verified
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
