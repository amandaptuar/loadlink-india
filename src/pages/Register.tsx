import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Truck, Building2, User, ArrowRight, ArrowLeft } from "lucide-react";
import { TRUCK_TYPES, INDIAN_STATES } from "@/lib/types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type Role = 'company' | 'driver';

const Register = () => {
  const [params] = useSearchParams();
  const [role, setRole] = useState<Role>((params.get('role') as Role) || 'driver');
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [truckNumber, setTruckNumber] = useState("");
  const [truckType, setTruckType] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Sign up user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role,
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        // 2. Create profile
        const profileData = {
          id: authData.user.id,
          name: fullName || companyName,
          phone,
          role,
          company_name: companyName,
          gst_number: gstNumber,
          license_number: licenseNumber,
          truck_number: truckNumber,
          truck_type: truckType,
          state,
          city,
        };

        const { error: profileError } = await supabase.from('profiles').insert(profileData);
        if (profileError) throw profileError;

        toast({
          title: "Registration Successful! 🎉",
          description: "Welcome to LoadLink (LoadLink में आपका स्वागत है)",
        });

        navigate(role === 'driver' ? '/driver' : '/company');
      }
    } catch (error: any) {
      toast({
        title: "Registration Failed ❌",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
            type="button"
            onClick={() => setRole('company')}
            className={`flex-1 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${role === 'company' ? 'bg-primary text-primary-foreground' : 'glass'
              }`}
          >
            <Building2 className="w-5 h-5" />
            Company (कंपनी)
          </button>
          <button
            type="button"
            onClick={() => setRole('driver')}
            className={`flex-1 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${role === 'driver' ? 'bg-primary text-primary-foreground' : 'glass'
              }`}
          >
            <User className="w-5 h-5" />
            Driver (ड्राइवर)
          </button>
        </div>

        <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 space-y-4">
          <InputField label="Email" placeholder="you@example.com" type="email" value={email} onChange={setEmail} required />
          <InputField label="Password (पासवर्ड)" placeholder="••••••••" type="password" value={password} onChange={setPassword} required />

          {role === 'driver' ? (
            <>
              <InputField label="Full Name (पूरा नाम)" placeholder="राजेश कुमार" value={fullName} onChange={setFullName} required />
              <PhoneField value={phone} onChange={setPhone} required />
              <InputField label="License Number (लाइसेंस नंबर)" placeholder="DL-0420110012345" value={licenseNumber} onChange={setLicenseNumber} required />
              <InputField label="Truck Number (ट्रक नंबर)" placeholder="MH 12 AB 1234" value={truckNumber} onChange={setTruckNumber} required />
              <SelectField label="Truck Type (ट्रक का प्रकार)" options={TRUCK_TYPES as unknown as string[]} value={truckType} onChange={setTruckType} required />
              <SelectField label="State (राज्य)" options={INDIAN_STATES as unknown as string[]} value={state} onChange={setState} required />
              <InputField label="City (शहर)" placeholder="Mumbai" value={city} onChange={setCity} required />
            </>
          ) : (
            <>
              <InputField label="Company Name (कंपनी का नाम)" placeholder="ABC Logistics Pvt Ltd" value={companyName} onChange={setCompanyName} required />
              <InputField label="GST Number (GST नंबर)" placeholder="22AAAAA0000A1Z5" value={gstNumber} onChange={setGstNumber} required />
              <PhoneField value={phone} onChange={setPhone} required />
              <InputField label="Address (पता)" placeholder="123, Industrial Area" value={address} onChange={setAddress} required />
              <SelectField label="State (राज्य)" options={INDIAN_STATES as unknown as string[]} value={state} onChange={setState} required />
              <InputField label="City (शहर)" placeholder="Mumbai" value={city} onChange={setCity} required />
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-gold text-lg py-4 rounded-xl mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Registering..." : "Register (रजिस्टर करें)"}
            {!loading && <ArrowRight className="inline ml-2 w-5 h-5" />}
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

const InputField = ({ label, placeholder, type = "text", value, onChange, required }: { label: string; placeholder: string; type?: string; value: string; onChange: (v: string) => void; required?: boolean }) => (
  <div>
    <label className="text-sm font-medium mb-1.5 block">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className="w-full bg-muted rounded-xl px-4 py-3 outline-none focus:ring-2 ring-primary/50 transition-all"
    />
  </div>
);

const PhoneField = ({ value, onChange, required }: { value: string; onChange: (v: string) => void; required?: boolean }) => (
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
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="flex-1 bg-muted rounded-r-xl px-4 py-3 text-lg outline-none focus:ring-2 ring-primary/50 transition-all"
      />
    </div>
  </div>
);

const SelectField = ({ label, options, value, onChange, required }: { label: string; options: string[]; value: string; onChange: (v: string) => void; required?: boolean }) => (
  <div>
    <label className="text-sm font-medium mb-1.5 block">{label}</label>
    <select
      className="w-full bg-muted rounded-xl px-4 py-3 outline-none focus:ring-2 ring-primary/50 transition-all appearance-none"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
    >
      <option value="">Select...</option>
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  </div>
);

export default Register;
