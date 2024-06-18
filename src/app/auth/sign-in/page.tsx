import Link from 'next/link';

import { login } from '@/app/auth/actions';
import ErrorAlert from '@/components/ErrorAlert';
import GoogleSignIn from '@/components/GoogleSignIn';

const SignInPage = () => {
  return (
    <section className="flex flex-col w-full gap-4 p-8 mx-auto border-2 bg-base-100 max-w-[30rem] card">
      <Link href="/" className="text-primary text-center link link-hover">
        &larr; Back to Home
      </Link>

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
    </section>
  );
};

export default SignInPage;
