import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand to-primary shadow-sm" />
          <span className="font-extrabold tracking-tight text-lg">
            Purplex
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(
                "text-muted-foreground hover:text-foreground transition-colors",
                isActive && "text-foreground",
              )
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/help"
            className={({ isActive }) =>
              cn(
                "text-muted-foreground hover:text-foreground transition-colors",
                isActive && "text-foreground",
              )
            }
          >
            Help Center
          </NavLink>
          <NavLink
            to="/admin/faq"
            className={({ isActive }) =>
              cn(
                "text-muted-foreground hover:text-foreground transition-colors",
                isActive && "text-foreground",
              )
            }
          >
            Admin
          </NavLink>
        </nav>
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="hidden sm:inline-flex">
            Schedule Demo
          </Button>
          <Button className="bg-gradient-to-r from-brand to-primary">
            Start Free Trial
          </Button>
        </div>
      </div>
    </header>
  );
}
