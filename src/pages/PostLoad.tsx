import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Package, Weight, Truck, IndianRupee, Calendar, ArrowRight, ArrowLeft, Check } from "lucide-react";
import Header from "@/components/Header";
import { TRUCK_TYPES, INDIAN_STATES, MAJOR_CITIES } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

import { supabase } from "@/integrations/supabase/client";

const STEPS = [
  { icon: MapPin, label: "Pickup City", labelHi: "लोडिंग जगह" },
  { icon: MapPin, label: "Drop City", labelHi: "उतराई जगह" },
  { icon: Package, label: "Material", labelHi: "सामान" },
  { icon: Weight, label: "Weight", labelHi: "वज़न" },
  { icon: Truck, label: "Truck Type", labelHi: "ट्रक प्रकार" },
  { icon: IndianRupee, label: "Price", labelHi: "किराया" },
  { icon: Calendar, label: "Date", labelHi: "तारीख़" },
];

const PostLoad = () => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    pickupState: '', pickupCity: '', dropState: '', dropCity: '',
    material: '', weight: '', truckType: '', price: '', pickupDate: '',
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const update = (key: string, value: string) => setData((d) => ({ ...d, [key]: value }));

  const next = async () => {
    if (step < STEPS.length - 1) setStep(step + 1);
    else {
      setLoading(true);
      try {
        const { data: userData } = await supabase.auth.getUser();
        if (!userData.user) throw new Error("User not authenticated");

        const { error } = await supabase.from('loads').insert({
          company_id: userData.user.id,
          pickup_city: data.pickupCity,
          pickup_state: data.pickupState,
          drop_city: data.dropCity,
          drop_state: data.dropState,
          material: data.material,
          weight: parseFloat(data.weight),
          truck_type: data.truckType,
          price: parseFloat(data.price),
          pickup_date: data.pickupDate || null,
          status: 'posted'
        });

        if (error) throw error;

        toast({ title: "Load Posted! ✅", description: "Your load is now visible to drivers (आपका लोड ड्राइवरों को दिख रहा है)" });
        navigate("/company");
      } catch (error: any) {
        toast({
          title: "Failed to post load ❌",
          description: error.message || "Something went wrong",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
  };
  const back = () => step > 0 && setStep(step - 1);

  const StepIcon = STEPS[step].icon;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-20 px-4 max-w-md mx-auto pb-10">
        {/* Progress */}
        <div className="flex gap-1 mb-8">
          {STEPS.map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i <= step ? 'bg-primary' : 'bg-muted'}`} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <StepIcon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-bold">{STEPS[step].label}</h2>
                <p className="text-sm text-primary/70">{STEPS[step].labelHi}</p>
              </div>
              <span className="ml-auto text-sm text-muted-foreground">{step + 1}/{STEPS.length}</span>
            </div>

            {step === 0 && (
              <div className="space-y-3">
                <SelectField label="State" value={data.pickupState} onChange={(v) => update('pickupState', v)} options={INDIAN_STATES as unknown as string[]} />
                {data.pickupState && (
                  <SelectField label="City" value={data.pickupCity} onChange={(v) => update('pickupCity', v)} options={MAJOR_CITIES[data.pickupState] || ['Other']} />
                )}
              </div>
            )}
            {step === 1 && (
              <div className="space-y-3">
                <SelectField label="State" value={data.dropState} onChange={(v) => update('dropState', v)} options={INDIAN_STATES as unknown as string[]} />
                {data.dropState && (
                  <SelectField label="City" value={data.dropCity} onChange={(v) => update('dropCity', v)} options={MAJOR_CITIES[data.dropState] || ['Other']} />
                )}
              </div>
            )}
            {step === 2 && (
              <input
                value={data.material}
                onChange={(e) => update('material', e.target.value)}
                placeholder="e.g. Steel Coils, Cement, FMCG"
                className="w-full bg-muted rounded-xl px-4 py-3 outline-none focus:ring-2 ring-primary/50"
              />
            )}
            {step === 3 && (
              <div className="flex items-center gap-2">
                <input
                  value={data.weight}
                  onChange={(e) => update('weight', e.target.value)}
                  placeholder="e.g. 18"
                  type="number"
                  className="flex-1 bg-muted rounded-xl px-4 py-3 outline-none focus:ring-2 ring-primary/50"
                />
                <span className="text-muted-foreground font-medium">Ton (टन)</span>
              </div>
            )}
            {step === 4 && (
              <div className="grid grid-cols-2 gap-2">
                {(TRUCK_TYPES as unknown as string[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => update('truckType', t)}
                    className={`py-3 px-3 rounded-xl text-sm font-medium transition-all ${data.truckType === t ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}
            {step === 5 && (
              <div className="flex items-center gap-2">
                <span className="text-2xl text-primary font-bold">₹</span>
                <input
                  value={data.price}
                  onChange={(e) => update('price', e.target.value)}
                  placeholder="85,000"
                  type="number"
                  className="flex-1 bg-muted rounded-xl px-4 py-3 text-lg outline-none focus:ring-2 ring-primary/50"
                />
              </div>
            )}
            {step === 6 && (
              <input
                value={data.pickupDate}
                onChange={(e) => update('pickupDate', e.target.value)}
                type="date"
                className="w-full bg-muted rounded-xl px-4 py-3 outline-none focus:ring-2 ring-primary/50"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex gap-3 mt-6">
          {step > 0 && (
            <button onClick={back} disabled={loading} className="btn-glass py-3 px-5 rounded-xl flex items-center gap-2 disabled:opacity-50">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          )}
          <button
            onClick={next}
            disabled={loading}
            className="flex-1 btn-gold py-3.5 rounded-xl flex items-center justify-center gap-2 text-lg disabled:opacity-50"
          >
            {loading ? "Posting..." : (
              step === STEPS.length - 1 ? (
                <>
                  <Check className="w-5 h-5" /> Post Load (लोड पोस्ट करें)
                </>
              ) : (
                <>
                  Next <ArrowRight className="w-5 h-5" />
                </>
              )
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const SelectField = ({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) => (
  <div>
    <label className="text-sm font-medium mb-1.5 block">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-muted rounded-xl px-4 py-3 outline-none focus:ring-2 ring-primary/50 appearance-none"
    >
      <option value="">Select...</option>
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  </div>
);

export default PostLoad;
