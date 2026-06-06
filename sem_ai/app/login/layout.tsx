import type { Metadata } from "next";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "SemAI",
  description: "Tree Plantation Live Tracking",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"  
      className='h-full antialiased'>
      <body className='min-h-full flex flex-col text-white'>
          <Navbar />
          {children}
      </body>
    </html>
  );
}

