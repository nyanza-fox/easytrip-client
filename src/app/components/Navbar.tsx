/* eslint-disable @next/next/no-img-element */
"use server";

import Link from "next/link";

export default async function Navbar() {
  return (
    <>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        <Link href={"/"}>
          <span className="self-center text-3xl whitespace-nowrap text-blue-600">
            Buybuy
          </span>
        </Link>

        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8  md:mt-0 items-center">
            <li>
              <Link href={"/login"}>
                <button className="border bg-blue-600 text-white font-light py-2 px-4 rounded-full">
                  Masuk
                </button>
              </Link>
            </li>
            <li>
              <Link href={"/register"}>
                <button className="border bg-blue-600 text-white font-light py-2 px-4 rounded-full">
                  Daftar
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
