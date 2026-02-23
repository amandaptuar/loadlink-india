import { MapPin, ArrowRight, Package, Weight, Truck, Calendar, IndianRupee } from "lucide-react";
import { Load, STATUS_CONFIG } from "@/lib/types";
import { motion } from "framer-motion";

interface LoadCardProps {
  load: Load;
  role?: 'company' | 'driver';
  onAction?: (action: string) => void;
}

const LoadCard = ({ load, role = 'driver', onAction }: LoadCardProps) => {
  const status = STATUS_CONFIG[load.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-4 space-y-3"
    >
      {/* Route */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          <MapPin className="w-4 h-4 text-success shrink-0" />
          <span className="font-semibold truncate">{load.pickupCity}</span>
        </div>
        <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          <MapPin className="w-4 h-4 text-destructive shrink-0" />
          <span className="font-semibold truncate">{load.dropCity}</span>
        </div>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Package className="w-3.5 h-3.5" />
          <span>{load.material}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Weight className="w-3.5 h-3.5" />
          <span>{load.weight} Ton</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Truck className="w-3.5 h-3.5" />
          <span>{load.truckType}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          <span>{load.pickupDate}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-border/50">
        <div className="flex items-center gap-1">
          <IndianRupee className="w-4 h-4 text-primary" />
          <span className="text-lg font-bold text-primary">
            {load.price.toLocaleString('en-IN')}
          </span>
        </div>
        <span className={`status-badge ${status.color} text-foreground`}>
          {status.label}
        </span>
      </div>

      {/* Distance */}
      {load.distance && (
        <p className="text-xs text-muted-foreground">{load.distance} km • {load.companyName}</p>
      )}

      {/* Action buttons */}
      {role === 'driver' && load.status === 'posted' && (
        <button
          onClick={() => onAction?.('accept')}
          className="w-full btn-gold text-base py-3.5 rounded-xl mt-1"
        >
          Accept Load (लोड स्वीकार करें)
        </button>
      )}
      {role === 'driver' && load.status === 'accepted' && (
        <button
          onClick={() => onAction?.('start')}
          className="w-full bg-electric text-foreground font-semibold py-3.5 rounded-xl mt-1 hover:brightness-110 transition-all"
        >
          Start Trip (यात्रा शुरू करें)
        </button>
      )}
      {role === 'driver' && load.status === 'in_transit' && (
        <button
          onClick={() => onAction?.('deliver')}
          className="w-full bg-success text-foreground font-semibold py-3.5 rounded-xl mt-1 hover:brightness-110 transition-all"
        >
          Mark Delivered (डिलीवर हुआ)
        </button>
      )}
    </motion.div>
  );
};

export default LoadCard;
