import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

import { APP_NAME, APP_DESCRIPTION, APP_URL } from "@/constants/meta";

import "@/styles/globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: APP_NAME, template: `%s | ${APP_NAME}` },
  description: APP_DESCRIPTION,
  metadataBase: new URL(APP_URL),
  openGraph: {
    title: APP_NAME,
    description: APP_DESCRIPTION,
    url: APP_URL,
    siteName: APP_NAME,
    type: "website",
  },
  authors: [
    {
      name: "Muhammad Akmal Hisyam",
      url: "https://akmalhisyam.my.id",
    },
    {
      name: "Badzlin Maladzi",
      url: "https://hascine.xyz",
    },
    {
      name: "Pristiwan Akbar Subery",
      url: "https://pristiwanakbars.biz.id",
    },
    {
      name: "Putri Balqis Hermayani",
      url: "https://pbalqish.my.id",
    },
    {
      name: "Simson Hamonangan Hutagaol",
      url: "https://simson.id",
    },
  ],
  keywords: ["travel", "trip", "planner", "booking"],
  creator: "Nyanza Fox",
  publisher: "Nyanza Fox",
  generator: "Next.js",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
    >
      <html lang="en" data-theme="light">
        <head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </head>
        <body className={inter.className}>
          <main>{children}</main>
          <Toaster position="bottom-center" />
        </body>
      </html>
    </GoogleOAuthProvider>
  );
};

export default RootLayout;
