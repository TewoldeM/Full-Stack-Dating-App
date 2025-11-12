"use client"; // Required for client-side hooks like usePathname

import Link from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef, AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils"; // Assuming this is your className utility (e.g., from shadcn-ui)

interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string; // Use 'to' instead of 'href' for consistency with react-router, but map to 'href'
  activeClassName?: string;
  className?: string;
  // Removed pendingClassName since Next.js doesn't have built-in isPending
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ to, className, activeClassName, ...props }, ref) => {
    const pathname = usePathname();
    const isActive = pathname === to; // Simple exact match; adjust for nested routes if needed (e.g., startsWith)

    return (
      <Link
        ref={ref}
        href={to} // Map 'to' to 'href' for Next.js Link
        className={cn(className, isActive && activeClassName)}
        {...props}
      />
    );
  }
);

NavLink.displayName = "NavLink";

export { NavLink };
