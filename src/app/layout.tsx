import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSideBar from "@/components/nav/app-sidebar";
import Footer from "@/components/footer/footer";
import AppSideBarTrigger from "@/components/nav/app-sidebar-trigger";
import Image from "next/image";

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
            <header className="sticky top-0 z-10 w-full flex justify-end bg-basket-header/95 shadow-basket-header/90 shadow-md">
              <AppSideBarTrigger />
              <div className="w-40 p-2">
                <Image
                  src={"/logo-compressed.png"}
                  alt="Hi-Fives logo"
                  width={13024}
                  height={5171}
                />
              </div>
            </header>

            <section className="font-sans min-h-[calc(100vh-50px)] bg-basket-background">
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
