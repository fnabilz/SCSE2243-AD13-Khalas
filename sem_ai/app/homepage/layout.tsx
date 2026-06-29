import type { Metadata } from "next";
import Sidebar from "@/components/sidebar";
import TopBar from "@/components/topbar";

export const metadata: Metadata = {
  title: "SemAI",
  description: "Tree Plantation Live Tracking",
};

export default function HomepageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='h-full antialiased'>
      <body className='min-h-full bg-slate-50 text-slate-900 font-sans'>
          {/* Sidebar sits here globally */}
          <Sidebar />
          
          {/* Main layout frame pushes content right to prevent layout overlap */}
          <div className="pl-64 min-h-screen flex flex-col">
            <TopBar />
            {children}
          </div>
      </body>
    </html>
  );
}