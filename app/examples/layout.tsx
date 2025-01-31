import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="container relative">
        <SidebarTrigger className="absolute left-0 top-0" />
        {children}
      </main>
    </SidebarProvider>
  );
}
