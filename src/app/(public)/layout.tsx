import { cookies } from 'next/headers';
import Link from 'next/link';

import { logout } from '@/app/auth/actions';

const PublicLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const loginInfo = cookies().get('loginInfo');

  return (
    <>
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <nav className="navbar sticky top-0 z-50 bg-base-100 shadow-md ">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
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
            <div className="navbar-start mx-10">
              <p className="text-xl font-extrabold text-primary">EasyTrip</p>
            </div>
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal gap-2 text-primary font-bold">
                <li>
                  <Link href={'/'}>Home</Link>
                </li>
                <li>
                  <Link href={'/destinations'}>Destinations</Link>
                </li>
                <li>
                  <Link href={'/about'}>About</Link>
                </li>
                <li>
                  <Link
                    href={'/destinations/generate'}
                    className="bg-primary hover:bg-secondary text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                      />
                    </svg>
                    AI Trip
                  </Link>
                </li>
              </ul>
            </div>
            {!loginInfo || !loginInfo.value.length ? (
              <div className="navbar-end hidden lg:flex gap-1">
                <Link href="/auth/sign-in" className="btn btn-ghost text-primary w-24">
                  Sign In
                </Link>
                <Link href="/auth/sign-up" className="btn btn-primary w-24">
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="navbar-end hidden lg:flex dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <picture>
                    <img
                      alt="user profile"
                      src="https://i.pinimg.com/564x/97/7e/56/977e568da382e808209b9294e0c0c10a.jpg"
                      className="w-10 rounded-full"
                    />
                  </picture>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-28 z-[1] p-2 shadow bg-base-100 rounded-box w-48"
                >
                  <li>
                    <Link href={'/profile'} className="justify-between">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <form action={logout}>
                      <button type="submit">Sign Out</button>
                    </form>
                  </li>
                </ul>
              </div>
            )}
          </nav>
          {children}
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay" />
          <ul className="menu p-4 pt-24 w-80 min-h-full gap-2 bg-neutral text-primary font-bold">
            <li>
              <Link href={'/'}>Home</Link>
            </li>
            <li>
              <Link href={'/destinations'}>Destinations</Link>
            </li>
            <li>
              <Link href={'/about'}>About</Link>
            </li>
            <li>
              <Link
                href={'/destinations/generate'}
                className="bg-primary hover:bg-secondary text-white w-32"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                  />
                </svg>
                AI Trip
              </Link>
            </li>
            <div className="divider"></div>
            {!loginInfo || !loginInfo.value.length ? (
              <ul className="menu menu-horizontal justify-center gap-2">
                <li>
                  <Link href="/auth/sign-in" className="btn btn-outline btn-primary w-24">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link href="/auth/sign-up" className="btn btn-primary w-24">
                    Sign Up
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="flex flex-row justify-center gap-2">
                <button>
                  <Link href={'/profile'} className="btn btn-outline btn-primary w-24">
                    Profile
                  </Link>
                </button>
                <form action={logout}>
                  <button type="submit" className="btn btn-error w-24">
                    Sign Out
                  </button>
                </form>
              </ul>
            )}
          </ul>
        </div>
      </div>

      <footer className="footer footer-center p-10 mt-10 bg-neutral text-base-content rounded">
        <nav className="grid grid-flow-col gap-4">
          <Link href={'/about'} className="link link-hover">
            About us
          </Link>
          <Link href={'/contact'} className="link link-hover">
            Contact
          </Link>
        </nav>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </nav>
        <aside>
          <p>Copyright © 2024 - All right reserved by BSD-14 Nyanza</p>
        </aside>
      </footer>
    </>
  );
};

export default PublicLayout;
