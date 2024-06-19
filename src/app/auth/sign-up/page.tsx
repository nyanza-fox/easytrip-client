import { Metadata } from 'next';
import Link from 'next/link';

import { register } from '@/app/auth/actions';
import { APP_NAME, APP_URL } from '@/constants/meta';
import ErrorAlert from '@/components/ErrorAlert';

export const metadata: Metadata = {
  title: 'Sign Up',
  alternates: {
    canonical: '/auth/sign-up',
  },
  openGraph: {
    title: `Sign Up | ${APP_NAME}`,
    url: `${APP_URL}/auth/sign-up`,
  },
};

const SignUpPage = () => {
  return (
    <section className="flex flex-col w-full gap-4 p-8 mx-auto border-2 bg-base-100 max-w-[30rem] card">
      <div className="text-center">
        <h1 className="mb-1 text-2xl font-bold">
          Sign up to <span className="text-primary">EasyTrip</span>
        </h1>
        <small>Enter your profile, email, and password to sign up.</small>
      </div>

      <ErrorAlert />

      <form action={register} className="flex flex-col gap-2">
        <div className="flex gap-2">
          <label className="w-full form-control">
            <div className="label">
              <span className="label-text">First Name</span>
            </div>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="w-full input input-bordered"
            />
          </label>
          <label className="w-full form-control">
            <div className="label">
              <span className="label-text">Last Name</span>
            </div>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="w-full input input-bordered"
            />
          </label>
        </div>

        <div className="flex gap-2">
          <label className="w-full form-control">
            <div className="label">
              <span className="label-text">Date of Birth</span>
            </div>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              className="w-full input input-bordered"
              max={new Date().toISOString().split('T')[0]}
            />
          </label>
          <label className="w-full form-control">
            <div className="label">
              <span className="label-text">Phone Number</span>
            </div>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              className="w-full input input-bordered"
            />
          </label>
        </div>

        <label className="w-full form-control">
          <div className="label">
            <span className="label-text">Image</span>
          </div>
          <input type="url" id="image" name="image" className="w-full input input-bordered" />
        </label>

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
          Sign Up
        </button>
      </form>

      <small className="text-center">
        Already have an account?{' '}
        <Link href="/auth/sign-in" className="text-primary link link-hover">
          Sign in here
        </Link>
      </small>

      <div className="divider">OR</div>

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

export default SignUpPage;
