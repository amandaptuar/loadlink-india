import { Link, useLocation } from "react-router-dom";
import { Home, Search, MapPin, Wallet, User } from "lucide-react";

const navItems = [
  { icon: Home, label: "Home", labelHi: "होम", path: "/driver" },
  { icon: Search, label: "Loads", labelHi: "लोड", path: "/driver/loads" },
  { icon: MapPin, label: "Track", labelHi: "ट्रैक", path: "/driver/track" },
  { icon: Wallet, label: "Earnings", labelHi: "कमाई", path: "/driver/earnings" },
  { icon: User, label: "Profile", labelHi: "प्रोफ़ाइल", path: "/driver/profile" },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border/50 md:hidden safe-area-bottom">
      <div className="flex items-center justify-around py-2 px-1">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-0.5 min-w-[56px] py-1.5 rounded-xl transition-all ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <item.icon className={`w-5 h-5 ${active ? "stroke-[2.5]" : ""}`} />
              <span className="text-[10px] font-medium leading-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
