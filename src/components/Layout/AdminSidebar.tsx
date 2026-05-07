import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Brain,
  MessageSquare,
  FileText,
  UserCheck,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  onLogout: () => void;
  onCollapsedChange?: (collapsed: boolean) => void;
}

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard
  },
  {
    title: "User Activity",
    href: "/user-activity",
    icon: Users
  },
  {
    title: "ML Reports",
    href: "/ml-reports",
    icon: Brain
  },
  {
    title: "Community",
    href: "/community",
    icon: MessageSquare
  },
  {
    title: "Content",
    href: "/content",
    icon: FileText
  },
  {
    title: "Therapists",
    href: "/therapists",
    icon: UserCheck
  }
];

export const AdminSidebar = ({ onLogout, onCollapsedChange }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Notify parent when collapsed state changes
  useEffect(() => {
    onCollapsedChange?.(isCollapsed);
  }, [isCollapsed, onCollapsedChange]);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden bg-spectrum-text-primary text-white p-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold">SpectrumCare</h1>
          <p className="text-xs text-white/70">Admin Dashboard</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white hover:bg-white/10"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div className={cn(
        "bg-spectrum-text-primary text-white transition-all duration-300 flex flex-col",
        "lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:overflow-hidden",
        isMobileMenuOpen ? "fixed inset-0 z-50 lg:relative" : "hidden lg:flex",
        isCollapsed ? "lg:w-16" : "lg:w-64",
        "w-full lg:w-auto"
      )}>
        {/* Desktop Header */}
        <div className="hidden lg:flex p-4 border-b border-white/10 items-center justify-between">
          {!isCollapsed && (
            <div>
              <h1 className="text-xl font-bold">SpectrumCare</h1>
              <p className="text-sm text-white/70">Admin Dashboard</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-white hover:bg-white/10"
          >
            {isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Header */}
        <div className="lg:hidden p-4 border-b border-white/10 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">SpectrumCare</h1>
            <p className="text-sm text-white/70">Admin Dashboard</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-white hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <li key={item.href}>
                  <NavLink
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                      isActive
                        ? "bg-spectrum-accent-primary text-white"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    {(!isCollapsed || window.innerWidth < 1024) && <span className="font-medium">{item.title}</span>}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <Button
            variant="ghost"
            onClick={onLogout}
            className={cn(
              "w-full justify-start text-white/80 hover:bg-red-500/20 hover:text-red-200",
              isCollapsed && "justify-center"
            )}
          >
            <LogOut className="h-5 w-5" />
            {(!isCollapsed || window.innerWidth < 1024) && <span className="ml-3">Logout</span>}
          </Button>
        </div>
      </div>
    </>
  );
};