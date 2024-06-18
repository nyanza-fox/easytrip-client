import Link from "next/link";

import { register } from "@/app/auth/actions";

import ErrorAlert from "@/components/ErrorAlert";

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
          <input
            type="url"
            id="image"
            name="image"
            className="w-full input input-bordered"
          />
        </label>

        <label className="w-full form-control">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full input input-bordered"
          />
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
        Already have an account?{" "}
        <Link href="/auth/sign-in" className="text-primary link link-hover">
          Sign in here
        </Link>
      </small>
    </section>
  );
};

export default SignUpPage;
