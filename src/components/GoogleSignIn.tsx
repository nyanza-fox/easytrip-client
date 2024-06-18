"use client";

import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

import { API_URL } from "@/constants/url";

const GoogleSignIn = () => {
  const router = useRouter();

  const handleGoogleLogin = async (gResponse: CredentialResponse) => {
    const response = await fetch(`${API_URL}/auth/google`, {
      method: "GET",
      headers: {
        token: gResponse.credential as any,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      const message = data.message || "Failed to login";
      router.replace(`/auth/sign-in?error=${encodeURIComponent(message)}`);
    }

    setCookie("loginInfo", JSON.stringify(data.data || ""), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now() + 1000 * 60 * 60),
      sameSite: "strict",
    });

    data.data?.role === "admin" ? router.replace("/cms") : router.replace("/");
  };

  return (
    <div className="flex justify-center">
      <GoogleLogin onSuccess={handleGoogleLogin} />
    </div>
  );
};

export default GoogleSignIn;
