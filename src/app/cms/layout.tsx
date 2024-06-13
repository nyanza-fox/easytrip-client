import CMSDrawer from '@/components/CMSDrawer';

const CMSLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <CMSDrawer>
      <main className="p-4">{children}</main>
    </CMSDrawer>
  );
};

export default CMSLayout;
