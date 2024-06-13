/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { redirect } from "next/navigation";
// import { z } from "zod";
// import { getUserByEmail } from "../db/models/user";
// import { compare } from "../db/utils/bcrypt";
// import { signToken } from "@/lib/jwt";
// import { cookies } from "next/headers";
import Navbar from "../components/Navbar";
import ClientFlashComponent from "../components/ClientFlashComponent";

export default function Login() {
  const handleFormAction = async (formData: FormData) => {
    "use server";

    // const loginInputSchema = z.object({
    //   email: z.string().email(),
    //   password: z.string(),
    // });

    // const email = formData.get("email");
    // const password = formData.get("password");

    // const parsedData = loginInputSchema.safeParse({
    //   email,
    //   password,
    // });

    // if (!parsedData.success) {
    //   const errPath = parsedData.error.issues[0].path[0];
    //   const errMessage = parsedData.error.issues[0].message;
    //   const errFinalMessage = `${errPath} - ${errMessage}`;

    //   return redirect(
    //     `${process.env.NEXT_PUBLIC_BASE_URL}login?error=${errFinalMessage}`
    //   );
    // }

    // const user = await getUserByEmail(parsedData.data.email);

    // if (!user || !compare(parsedData.data.password, user.password)) {
    //   return redirect(
    //     `${process.env.NEXT_PUBLIC_BASE_URL}login?error=Invalid%20Username%20Password`
    //   );
    // }

    // const payload = {
    //   id: user._id,
    //   email: user.email,
    // };

    // const token = signToken(payload);

    // cookies().set("token", token, {
    //   httpOnly: true,
    //   secure: false,
    //   expires: new Date(Date.now() + 1000 * 60 * 60),
    //   sameSite: "strict",
    // });

    return redirect(`${process.env.NEXT_PUBLIC_BASE_URL}`);
  };
  return (
    <>
      <div>
        <nav className="bg-white border-b">
          <Navbar />
        </nav>
      </div>
      <div className="py-16">
        <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
          <div
            className="hidden lg:block lg:w-1/2 bg-cover"
            style={{
              backgroundImage:
                'url("https://www.static-src.com/siva/asset/12_2023/blibli-logo-h-social.png")',
            }}
          ></div>
          <div className="w-full p-8 lg:w-1/2">
            <h2 className="text-2xl font-semibold text-blue-700 text-center">
              Masuk ke akunmu
            </h2>
            <a
              href="#"
              className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100"
            >
              <div className="px-4 py-3">
                <svg className="h-6 w-6" viewBox="0 0 40 40">
                  <path
                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                    fill="#FFC107"
                  />
                  <path
                    d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                    fill="#FF3D00"
                  />
                  <path
                    d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                    fill="#4CAF50"
                  />
                  <path
                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                    fill="#1976D2"
                  />
                </svg>
              </div>
              <h1 className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">
                Sign in with Google
              </h1>
            </a>
            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 lg:w-1/4" />
              <a
                href="#"
                className="text-xs text-center text-gray-500 uppercase"
              >
                or login with email
              </a>
              <span className="border-b w-1/5 lg:w-1/4" />
            </div>
            <ClientFlashComponent />
            <form action={handleFormAction}>
              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  className="bg-gray-100 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  placeholder="Email"
                />
              </div>
              <div className="mt-4">
                <div className="flex justify-between">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                  </label>
                </div>
                <input
                  type="password"
                  name="password"
                  className="bg-gray-100 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  placeholder="Password"
                />
              </div>
              <div className="mt-8">
                <button
                  className="bg-gray-400 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
