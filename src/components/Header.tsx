import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Truck, Menu, X, Bell } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <Truck className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            <span className="text-gradient-gold">LOAD</span>
            <span className="text-foreground">LINK</span>
          </span>
        </Link>

        {isLanding && (
          <>
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
              <a href="#features" className="hover:text-foreground transition-colors">Features</a>
              <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
              <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
            </nav>
            <div className="hidden md:flex items-center gap-3">
              <Link to="/login" className="btn-glass text-sm py-2 px-4">Login</Link>
              <Link to="/register" className="btn-gold text-sm py-2 px-5">Get Started Free</Link>
            </div>
          </>
        )}

        {!isLanding && (
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary" />
            </button>
          </div>
        )}

        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && isLanding && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass border-t border-border/50 p-4 flex flex-col gap-3"
        >
          <a href="#features" className="py-2 text-muted-foreground" onClick={() => setOpen(false)}>Features</a>
          <a href="#how-it-works" className="py-2 text-muted-foreground" onClick={() => setOpen(false)}>How It Works</a>
          <Link to="/login" className="btn-glass text-center py-2" onClick={() => setOpen(false)}>Login</Link>
          <Link to="/register" className="btn-gold text-center" onClick={() => setOpen(false)}>Get Started Free</Link>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
