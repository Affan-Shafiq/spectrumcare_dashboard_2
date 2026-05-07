import { ReactNode, useState } from "react";
import { AdminSidebar } from "./AdminSidebar";

interface AdminLayoutProps {
  children: ReactNode;
  onLogout: () => void;
}

export const AdminLayout = ({ children, onLogout }: AdminLayoutProps) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      <AdminSidebar onLogout={onLogout} onCollapsedChange={setIsSidebarCollapsed} />
      <main className={`flex-1 transition-all duration-300 overflow-auto ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <div className="p-3 sm:p-4 lg:p-6">
          {children}
        </div>
      </main>
    </div>
  );
};