import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My trophies",
  description:
    "A collection of the trophies i've earned over the years on playstation",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex items-center justify-center w-screen h-screen">
          <div className="bg-neutral-900 md:border w-screen max-w-[1800px] h-[1024px] h-screen overflow-auto md:rounded-2xl">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
