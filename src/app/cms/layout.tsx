import CMSHeader from '@/components/CMSHeader';
import CMSSidebar from '@/components/CMSSidebar';

const CMSLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <CMSSidebar />
      <div className="grow">
        <CMSHeader />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
};

export default CMSLayout;
