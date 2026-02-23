import { LoadStatus, STATUS_CONFIG } from "@/lib/types";
import { Check } from "lucide-react";

const STEPS: LoadStatus[] = ['posted', 'accepted', 'picked', 'in_transit', 'delivered', 'completed'];

const StatusTimeline = ({ current }: { current: LoadStatus }) => {
  const currentIdx = STEPS.indexOf(current);

  return (
    <div className="flex items-center gap-1 w-full">
      {STEPS.map((step, i) => {
        const done = i <= currentIdx;
        const config = STATUS_CONFIG[step];
        return (
          <div key={step} className="flex-1 flex flex-col items-center gap-1">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                done ? `${config.color} text-foreground` : 'bg-muted text-muted-foreground'
              }`}
            >
              {done ? <Check className="w-3.5 h-3.5" /> : i + 1}
            </div>
            <span className="text-[9px] text-muted-foreground text-center leading-tight">
              {config.label}
            </span>
            {i < STEPS.length - 1 && (
              <div className={`absolute h-0.5 ${done ? config.color : 'bg-muted'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StatusTimeline;
