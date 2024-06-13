'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const CMSSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col gap-4 p-4 min-w-72 bg-slate-200">
      <h2 className="text-xl font-bold">EasyTrip CMS</h2>
      <div className="flex flex-col">
        <Link
          href="/cms/dashboard"
          className={`justify-start btn btn-primary btn-block ${
            pathname !== '/cms/dashboard' && 'btn-ghost'
          }`}
        >
          Dashboard
        </Link>
        <Link
          href="/cms/destinations"
          className={`justify-start btn btn-primary btn-block ${
            pathname !== '/cms/destinations' && 'btn-ghost'
          }`}
        >
          Destinations
        </Link>
        <Link
          href="/cms/transportations"
          className={`justify-start btn btn-primary btn-block ${
            pathname !== '/cms/transportations' && 'btn-ghost'
          }`}
        >
          Transportations
        </Link>
        <Link
          href="/cms/accommodations"
          className={`justify-start btn btn-primary btn-block ${
            pathname !== '/cms/accommodations' && 'btn-ghost'
          }`}
        >
          Accommodations
        </Link>
        <Link
          href="/cms/guides"
          className={`justify-start btn btn-primary btn-block ${
            pathname !== '/cms/guides' && 'btn-ghost'
          }`}
        >
          Guides
        </Link>
        <Link
          href="/cms/orders"
          className={`justify-start btn btn-primary btn-block ${
            pathname !== '/cms/orders' && 'btn-ghost'
          }`}
        >
          Orders
        </Link>
        <Link
          href="/cms/users"
          className={`justify-start btn btn-primary btn-block ${
            pathname !== '/cms/users' && 'btn-ghost'
          }`}
        >
          Users
        </Link>
      </div>
    </aside>
  );
};

export default CMSSidebar;
