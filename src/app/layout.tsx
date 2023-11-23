import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import TrophyService from "~/services/TrophyService";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My trophies",
  description:
    "A collection of the trophies i've earned over the years on playstation",
};

/** Keep revalidate on 0, because doesn't revalidate every 5 seconds if it's 5. (Bug in Next.Js 13?) */
export const revalidate = 0;
// export const revalidate = 5;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    await TrophyService.refresh();
  } catch (e) {
    console.log(e);
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex items-center justify-center w-screen h-[100svh]">
          <div className="bg-neutral-900 xl:border w-screen max-w-[1800px] max-h-[1024px] h-[100svh] overflow-auto xl:rounded-2xl">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
