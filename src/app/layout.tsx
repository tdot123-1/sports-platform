import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSideBar from "@/components/nav/app-sidebar";
import Footer from "@/components/footer/footer";
import AppSideBarTrigger from "@/components/nav/app-sidebar-trigger";

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
    template: "%s | HI-FIVES",
    default: "HI-FIVES",
  },
  description: "Where Basketball Happens",
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
          <main className="flex-1 min-w-0 bg-basket-background">
            <div className="sticky top-0 z-10">
              <AppSideBarTrigger />
            </div>

            <section className="font-sans min-h-screen">{children}</section>
            <Footer />
          </main>
          <Toaster richColors />
        </SidebarProvider>
      </body>
    </html>
  );
}
