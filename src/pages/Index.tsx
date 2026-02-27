import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Truck, Shield, MapPin, IndianRupee, Clock, Users, ArrowRight, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import heroBg from "@/assets/hero-bg.jpg";

const features = [
  { icon: Truck, title: "Smart Load Matching", titleHi: "स्मार्ट लोड मैचिंग", desc: "AI-powered matching connects the right trucks with the right loads instantly." },
  { icon: MapPin, title: "Live GPS Tracking", titleHi: "लाइव ट्रैकिंग", desc: "Track your shipment in real-time across India with live map updates." },
  { icon: Shield, title: "Verified Drivers", titleHi: "सत्यापित ड्राइवर", desc: "Every driver is verified with license and vehicle documents." },
  { icon: IndianRupee, title: "Secure Payments", titleHi: "सुरक्षित भुगतान", desc: "Pay via UPI, cards, or netbanking. Escrow-protected payments." },
  { icon: Clock, title: "Quick Booking", titleHi: "तुरंत बुकिंग", desc: "Post a load in under 2 minutes. Drivers accept within seconds." },
  { icon: Users, title: "Pan-India Network", titleHi: "पूरे भारत में नेटवर्क", desc: "50,000+ trucks and 10,000+ companies across all states." },
];

const steps = [
  { num: "01", title: "Post Your Load", titleHi: "लोड पोस्ट करें", desc: "Enter pickup, drop, material and price." },
  { num: "02", title: "Get Matched", titleHi: "ड्राइवर मिलें", desc: "Verified drivers near you accept your load." },
  { num: "03", title: "Track & Pay", titleHi: "ट्रैक करें और भुगतान करें", desc: "Live tracking + secure payment on delivery." },
];

const stats = [
  { value: "50,000+", label: "Trucks", labelHi: "ट्रक" },
  { value: "10,000+", label: "Companies", labelHi: "कंपनियाँ" },
  { value: "₹200 Cr+", label: "Freight Moved", labelHi: "माल भेजा" },
  { value: "28", label: "States", labelHi: "राज्य" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-16">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 text-sm">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse-glow" />
              <span className="text-muted-foreground">India's #1 Freight Marketplace</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.1] mb-6">
              <span className="text-gradient-gold">Ab Trucking</span>
              <br />
              Hogi
              <br />
              <span className="text-gradient-blue">Bez-Misal!</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mb-8">
             Kuchh bhi bhejo kahi bhi. Aapka saaman hamari technology
              <br />
              <span className="text-sm">(भारत का सबसे भरोसेमंद फ्रेट प्लेटफॉर्म)</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/register?role=company" className="btn-gold text-center text-lg py-4 px-8 rounded-2xl">
                I Need Trucks (मुझे ट्रक चाहिए)
                <ArrowRight className="inline ml-2 w-5 h-5" />
              </Link>
              <Link to="/register?role=driver" className="btn-glass text-center text-lg py-4 px-8 rounded-2xl border border-primary/30">
                I'm a Driver (मैं ड्राइवर हूँ)
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl font-extrabold text-gradient-gold">{s.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.label} ({s.labelHi})</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              Why Choose <span className="text-gradient-gold">Truckbez</span>?
            </h2>
            <p className="text-muted-foreground">Everything you need for freight movement (माल ढुलाई के लिए सबकुछ)</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className="glass glass-hover rounded-2xl p-6 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-1">{f.title}</h3>
                <p className="text-xs text-primary/70 mb-2">{f.titleHi}</p>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-navy-deep/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              How It Works <span className="text-muted-foreground text-lg">(कैसे काम करता है)</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-5xl font-extrabold text-gradient-gold mb-4">{s.num}</div>
                <h3 className="text-xl font-bold mb-1">{s.title}</h3>
                <p className="text-xs text-primary/70 mb-2">{s.titleHi}</p>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8 sm:p-14 glow-gold max-w-3xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Maal dhone ka naya tareeka -<span className="text-gradient-gold">TruckBez</span><span>🛻</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of companies and drivers across India.
              <br />
              (आज ही शुरू करें — मुफ़्त में रजिस्टर करें)
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/register?role=company" className="btn-gold text-lg py-4 px-10 rounded-2xl">
                Register as Company
              </Link>
              <Link to="/register?role=driver" className="btn-glass text-lg py-4 px-10 rounded-2xl border border-primary/30">
                Register as Driver
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-10">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-primary" />
            <span className="font-bold text-foreground">Truckbez</span>
            <span>© 2026</span>
          </div>
          <p>Smart Freight Movement Platform for India</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
