'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import LogoutButton from './LogoutButton';

const CMSDrawer = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="drawer lg:drawer-open">
      <input id="cms-drawer" type="checkbox" className="drawer-toggle" />

      <header className="drawer-content flex flex-col">
        <div className="w-full navbar bg-neutral px-4">
          <div className="flex-none lg:hidden mr-2">
            <label
              htmlFor="cms-drawer"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1">
            <h1 className="text-lg font-bold">EasyTrip CMS</h1>
          </div>
          <div className="flex-none">
            <LogoutButton />
          </div>
        </div>
        {children}
      </header>

      <aside className="drawer-side z-50">
        <label htmlFor="cms-drawer" aria-label="close sidebar" className="drawer-overlay" />
        <nav className="menu p-4 w-80 min-h-full bg-accent">
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
        </nav>
      </aside>
    </div>
  );
};

export default CMSDrawer;
