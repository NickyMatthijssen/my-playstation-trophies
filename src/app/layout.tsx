import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My trophies",
  description:
    "A collection of the trophies i've earned over the years on playstation",
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex items-center justify-center w-screen h-screen">
          <div className="bg-neutral-900 xl:border w-screen max-w-[1800px] xl:max-h-[1024px] h-screen overflow-auto xl:rounded-2xl">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
