import { NavLink, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";
import { navItems } from "../utils/utils";

const Nav: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  className,
  ...props
}) => {
  const { pathname } = useLocation();

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {navItems.map((navItem) => {
        // Simple hack to show active links
        const pathSegment = pathname.split("/");
        const isActive =
          navItem.matchKey === "dashboard"
            ? pathSegment.length === 3 && pathSegment.at(-1) !== "wsr-report"
            : pathname.includes(navItem.matchKey);

        return (
          <NavLink
            key={navItem.title}
            to={navItem.to}
            className={cn(
              "text-xs lg:text-sm font-medium transition-colors",
              isActive
                ? "active-link"
                : "text-muted-foreground hover:text-primary"
            )}
          >
            {navItem.title}
          </NavLink>
        );
      })}
    </nav>
  );
};

export default Nav;
