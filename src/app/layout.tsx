import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Narbar from "@/components/Narbar";
import ClientProvider from "@/providers/ClientProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meeting App",
  description: "A calling app build with Next.js and Stream.io",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ClientProvider>
            <Narbar />
            <main className="mx-auto max-w-5xl px-3 py-6">{children}</main>
          </ClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
