import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import ChatFAB from "@/components/ai-chatbot";

export const metadata: Metadata = {
  title: "SemAI",
  description: "Tree Plantation Live Tracking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"  
      className='h-full antialiased'>
      <body className='min-h-full flex flex-col'>
          <Navbar/>
          {children}
      </body>
    </html>
  );
}
