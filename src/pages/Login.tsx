import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Truck, Phone, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [method, setMethod] = useState<'phone' | 'email'>('phone');
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (method === 'email') {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        // Fetch user profile to redirect correctly
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();

        toast({
          title: "Welcome Back! 👋",
          description: "Login successful (लॉगिन सफल रहा)",
        });

        if (profile?.role === 'admin') navigate("/admin");
        else if (profile?.role === 'company') navigate("/company");
        else navigate("/driver");
      } else {
        // Phone login - for now just simulated or use OTP
        toast({
          title: "Coming Soon! 🚀",
          description: "Phone login with OTP will be available soon. Please use Email for now.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Login Failed ❌",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Truck className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold">
              <span className="text-gradient-gold">LOAD</span>LINK
            </span>
          </Link>
          <h1 className="text-2xl font-bold mb-1">Welcome Back (वापस स्वागत है)</h1>
          <p className="text-sm text-muted-foreground">Login to your account</p>
        </div>

        <div className="glass rounded-2xl p-6">
          {/* Method toggle */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setMethod('phone')}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${method === 'phone' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}
            >
              <Phone className="w-4 h-4 inline mr-1.5" />
              Phone (फ़ोन)
            </button>
            <button
              onClick={() => setMethod('email')}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${method === 'email' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}
            >
              <Mail className="w-4 h-4 inline mr-1.5" />
              Email
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {method === 'phone' ? (
              <>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Phone Number (फ़ोन नंबर)
                  </label>
                  <div className="flex">
                    <span className="flex items-center px-3 bg-muted rounded-l-xl border-r border-border text-sm text-muted-foreground">
                      +91
                    </span>
                    <input
                      type="tel"
                      placeholder="98765 43210"
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="flex-1 bg-muted rounded-r-xl px-4 py-3 text-lg outline-none focus:ring-2 ring-primary/50 transition-all"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-gold text-lg py-4 rounded-xl disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send OTP (OTP भेजें)"}
                  {!loading && <ArrowRight className="inline ml-2 w-5 h-5" />}
                </button>
              </>
            ) : (
              <>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Email</label>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-muted rounded-xl px-4 py-3 outline-none focus:ring-2 ring-primary/50 transition-all"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Password (पासवर्ड)
                  </label>
                  <div className="relative">
                    <input
                      type={showPass ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full bg-muted rounded-xl px-4 py-3 pr-10 outline-none focus:ring-2 ring-primary/50 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    >
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-gold text-lg py-4 rounded-xl disabled:opacity-50"
                >
                  {loading ? "Logging in..." : "Login (लॉगिन करें)"}
                  {!loading && <ArrowRight className="inline ml-2 w-5 h-5" />}
                </button>
              </>
            )}
          </form>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary font-medium hover:underline">
            Register Free (मुफ़्त रजिस्टर करें)
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
