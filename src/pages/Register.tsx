import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Truck, Building2, User, ArrowRight, ArrowLeft } from "lucide-react";
import { TRUCK_TYPES, INDIAN_STATES } from "@/lib/types";

type Role = 'company' | 'driver';

const Register = () => {
  const [params] = useSearchParams();
  const [role, setRole] = useState<Role>((params.get('role') as Role) || 'driver');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(role === 'driver' ? '/driver' : '/company');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <Truck className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold"><span className="text-gradient-gold">LOAD</span>LINK</span>
          </Link>
          <h1 className="text-2xl font-bold">Create Account (खाता बनाएं)</h1>
        </div>

        {/* Role toggle */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setRole('company')}
            className={`flex-1 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
              role === 'company' ? 'bg-primary text-primary-foreground' : 'glass'
            }`}
          >
            <Building2 className="w-5 h-5" />
            Company (कंपनी)
          </button>
          <button
            onClick={() => setRole('driver')}
            className={`flex-1 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
              role === 'driver' ? 'bg-primary text-primary-foreground' : 'glass'
            }`}
          >
            <User className="w-5 h-5" />
            Driver (ड्राइवर)
          </button>
        </div>

        <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 space-y-4">
          {role === 'driver' ? (
            <>
              <InputField label="Full Name (पूरा नाम)" placeholder="राजेश कुमार" />
              <PhoneField />
              <InputField label="License Number (लाइसेंस नंबर)" placeholder="DL-0420110012345" />
              <InputField label="Truck Number (ट्रक नंबर)" placeholder="MH 12 AB 1234" />
              <SelectField label="Truck Type (ट्रक का प्रकार)" options={TRUCK_TYPES as unknown as string[]} />
              <SelectField label="State (राज्य)" options={INDIAN_STATES as unknown as string[]} />
              <InputField label="City (शहर)" placeholder="Mumbai" />
            </>
          ) : (
            <>
              <InputField label="Company Name (कंपनी का नाम)" placeholder="ABC Logistics Pvt Ltd" />
              <InputField label="GST Number (GST नंबर)" placeholder="22AAAAA0000A1Z5" />
              <PhoneField />
              <InputField label="Email" placeholder="info@company.com" type="email" />
              <InputField label="Address (पता)" placeholder="123, Industrial Area" />
              <SelectField label="State (राज्य)" options={INDIAN_STATES as unknown as string[]} />
              <InputField label="City (शहर)" placeholder="Mumbai" />
            </>
          )}

          <button type="submit" className="w-full btn-gold text-lg py-4 rounded-xl mt-2">
            Register (रजिस्टर करें)
            <ArrowRight className="inline ml-2 w-5 h-5" />
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-medium hover:underline">Login</Link>
        </p>
      </motion.div>
    </div>
  );
};

const InputField = ({ label, placeholder, type = "text" }: { label: string; placeholder: string; type?: string }) => (
  <div>
    <label className="text-sm font-medium mb-1.5 block">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full bg-muted rounded-xl px-4 py-3 outline-none focus:ring-2 ring-primary/50 transition-all"
    />
  </div>
);

const PhoneField = () => (
  <div>
    <label className="text-sm font-medium mb-1.5 block">Phone Number (फ़ोन नंबर)</label>
    <div className="flex">
      <span className="flex items-center px-3 bg-muted rounded-l-xl border-r border-border text-sm text-muted-foreground">
        +91
      </span>
      <input
        type="tel"
        placeholder="98765 43210"
        maxLength={10}
        className="flex-1 bg-muted rounded-r-xl px-4 py-3 text-lg outline-none focus:ring-2 ring-primary/50 transition-all"
      />
    </div>
  </div>
);

const SelectField = ({ label, options }: { label: string; options: string[] }) => (
  <div>
    <label className="text-sm font-medium mb-1.5 block">{label}</label>
    <select className="w-full bg-muted rounded-xl px-4 py-3 outline-none focus:ring-2 ring-primary/50 transition-all appearance-none">
      <option value="">Select...</option>
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  </div>
);

export default Register;
