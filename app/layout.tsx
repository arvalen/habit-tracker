import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import NextSessionProvider from "./Components/NextSessionProvider";
import GlobalContextProvider from "./contextApi";

const inter = Inter({ subsets: ["latin"] });

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Habit Tracker",
  description: "Build habits that make you a king",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <NextSessionProvider>
        <GlobalContextProvider>
          <body className={poppins.className}>{children}</body>
        </GlobalContextProvider>
      </NextSessionProvider>
    </html>
  );
}
