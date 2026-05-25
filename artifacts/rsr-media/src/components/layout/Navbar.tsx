import React from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Hexagon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/broadcasts", label: "Broadcasts" },
    { href: "/policy-institute", label: "Institute" },
    { href: "/doctrine-library", label: "Doctrine" },
    { href: "/mission", label: "Mission" },
    { href: "/channels", label: "Channels" },
    { href: "/network", label: "Systems" },
    { href: "/hotline", label: "Hotline" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group" data-testid="link-home-logo">
          <Hexagon className="h-6 w-6 text-primary group-hover:text-accent transition-colors" />
          <span className="font-mono font-bold tracking-tight text-lg">RSR MEDIA</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-mono tracking-tight transition-colors hover:text-primary ${
                location === link.href ? "text-primary border-b-2 border-primary pb-1" : "text-muted-foreground"
              }`}
              data-testid={`link-nav-${link.label.toLowerCase().replace(" ", "-")}`}
            >
              {link.label.toUpperCase()}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center font-mono text-xs text-muted-foreground">
          {time.toISOString().substring(11, 19)} UTC
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-testid="button-mobile-menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-background border-b border-border/40 shadow-lg">
          <nav className="flex flex-col px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-mono tracking-tight ${
                  location === link.href ? "text-primary" : "text-muted-foreground"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label.toUpperCase()}
              </Link>
            ))}
            <div className="pt-4 border-t border-border/40 font-mono text-xs text-muted-foreground text-center">
              {time.toISOString().substring(11, 19)} UTC
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
