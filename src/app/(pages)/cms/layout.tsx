import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { APP_NAME } from '@/constants/meta';
import CMSDrawer from '@/components/CMSDrawer';

export const metadata: Metadata = {
  title: { default: '', template: `%s | ${APP_NAME} CMS` },
};

const CMSLayout = ({ children }: { children: React.ReactNode }) => {
  const loginInfo = cookies().get('loginInfo');

  if (!loginInfo || !loginInfo.value.length) {
    return redirect('/auth/sign-in');
  }

  const { role } = JSON.parse(loginInfo.value);

  if (role !== 'admin') {
    return redirect('/');
  }

  return (
    <CMSDrawer>
      <main className="p-4">{children}</main>
    </CMSDrawer>
  );
};

export default CMSLayout;
