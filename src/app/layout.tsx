import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/header";
import { Toaster } from "@/components/ui/sonner";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSideBar from "@/components/nav/app-sidebar";
import Footer from "@/components/footer/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Sports Platform",
    default: "Sports Platform",
  },
  description: "Find your sports events",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider>
          <AppSideBar />
          <main className="flex-1 min-w-0">
            <Header />
            <section className="font-sans min-h-[calc(100vh-50px)]">
              {children}
            </section>
            <Footer />
          </main>
          <Toaster richColors />
        </SidebarProvider>
      </body>
    </html>
  );
}
