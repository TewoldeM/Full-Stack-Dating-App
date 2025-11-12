import { LogOut } from "lucide-react";
import { NavLink } from "./NavLink";
import { Button } from "../ui/button";

const ProfileNavigation = () => {
  return (
    <nav className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            StreamMatch
          </h1>
          <div className="hidden md:flex items-center gap-6">
            <NavLink
              to="/"
              className="text-muted-foreground hover:text-foreground transition-colors"
              activeClassName="text-foreground font-medium"
            >
              Discover
            </NavLink>
            <NavLink
              to="/matches"
              className="text-muted-foreground hover:text-foreground transition-colors"
              activeClassName="text-foreground font-medium"
            >
              Matches
            </NavLink>
            <NavLink
              to="/messages"
              className="text-muted-foreground hover:text-foreground transition-colors"
              activeClassName="text-foreground font-medium"
            >
              Messages
            </NavLink>
            <NavLink
              to="/profile"
              className="text-muted-foreground hover:text-foreground transition-colors"
              activeClassName="text-foreground font-medium"
            >
              Profile
            </NavLink>
          </div>
        </div>
        <Button variant="destructive" size="sm" className="gap-2">
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>
    </nav>
  );
};

export default ProfileNavigation;
