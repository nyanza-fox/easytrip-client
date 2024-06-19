import { Metadata } from 'next';
import Link from 'next/link';

import { login } from '@/app/auth/actions';
import { APP_NAME, APP_URL } from '@/constants/meta';
import ErrorAlert from '@/components/ErrorAlert';
import GoogleSignIn from '@/components/GoogleSignIn';

export const metadata: Metadata = {
  title: 'Sign In',
  alternates: {
    canonical: '/auth/sign-in',
  },
  openGraph: {
    title: `Sign In | ${APP_NAME}`,
    url: `${APP_URL}/auth/sign-in`,
  },
};

const SignInPage = () => {
  return (
    <section className="flex flex-col w-full gap-4 p-8 mx-auto border-2 bg-base-100 max-w-[30rem] card">
      <div className="text-center">
        <h1 className="mb-1 text-2xl font-bold">
          Sign in to <span className="text-primary">EasyTrip</span>
        </h1>
        <small>Enter your email and password to sign in.</small>
      </div>

      <ErrorAlert />

      <form action={login} className="flex flex-col gap-2">
        <label className="w-full form-control">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <input type="email" id="email" name="email" className="w-full input input-bordered" />
        </label>
        <label className="w-full form-control">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full input input-bordered"
          />
        </label>
        <button type="submit" className="my-2 btn btn-success text-base-100">
          Sign in
        </button>
      </form>

      <small className="text-center">
        Don&apos;t have an account?{' '}
        <Link href="/auth/sign-up" className="text-primary link link-hover">
          Sign up here
        </Link>
      </small>

      <div className="divider">OR</div>

      <GoogleSignIn />

      {/* FACEBOOK SIGN IN */}
      <div className="btn btn-primary">
        <a href="http://localhost:3001/api/auth/facebook">Sign in with Facebook</a>
      </div>

      <Link href="/" className="btn btn-outline">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-5"
        >
          <path
            fillRule="evenodd"
            d="M18 10a.75.75 0 0 1-.75.75H4.66l2.1 1.95a.75.75 0 1 1-1.02 1.1l-3.5-3.25a.75.75 0 0 1 0-1.1l3.5-3.25a.75.75 0 1 1 1.02 1.1l-2.1 1.95h12.59A.75.75 0 0 1 18 10Z"
            clipRule="evenodd"
          />
        </svg>
        Back to Home
      </Link>
    </section>
  );
};

export default SignInPage;
