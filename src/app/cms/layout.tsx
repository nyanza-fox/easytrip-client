import { Metadata } from 'next';

import { APP_NAME } from '@/constants/meta';
import CMSDrawer from '@/components/CMSDrawer';

export const metadata: Metadata = {
  title: { default: '', template: `%s | ${APP_NAME} CMS` },
};

const CMSLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <CMSDrawer>
      <main className="p-4">{children}</main>
    </CMSDrawer>
  );
};

export default CMSLayout;
