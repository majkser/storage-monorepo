import { Sidebar } from '@/components/ui/sidebar';
import { SidebarProvider } from '@/components/sidebar/sidebar-context';
import { MobileMenu } from '@/components/sidebar/mobile-menu';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 overflow-auto md:ml-64 bg-background dark">
          <div className="p-4 md:hidden">
            <MobileMenu />
          </div>
          <div className="p-6 pt-0 md:pt-6 max-w-[1200px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
