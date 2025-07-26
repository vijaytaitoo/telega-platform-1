import { MainNav } from '@/components/main-nav';
import { StudioHeader } from '@/components/studio-header';
import { WorkspaceArea } from '@/components/workspace-area';

export default function StudioPage() {
  return (
    <div className="flex h-screen flex-col">
      <StudioHeader />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
          <MainNav />
        </aside>
        <main className="flex w-full flex-col overflow-hidden">
          <WorkspaceArea />
        </main>
      </div>
    </div>
  );
}
