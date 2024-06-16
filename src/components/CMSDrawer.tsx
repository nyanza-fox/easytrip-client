'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

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
            <button className="btn btn-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5"
              >
                <path
                  fillRule="evenodd"
                  d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M6 10a.75.75 0 0 1 .75-.75h9.546l-1.048-.943a.75.75 0 1 1 1.004-1.114l2.5 2.25a.75.75 0 0 1 0 1.114l-2.5 2.25a.75.75 0 1 1-1.004-1.114l1.048-.943H6.75A.75.75 0 0 1 6 10Z"
                  clipRule="evenodd"
                />
              </svg>
              Logout
            </button>
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
