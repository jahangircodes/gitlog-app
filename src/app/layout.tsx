import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { PlanProvider } from "@/context/PlanContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster as HotToaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FitLog - Train with intent",
  description: "Track your workouts and gym progress easily.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0c0f17] text-white min-h-screen flex flex-col justify-between`}>
        <PlanProvider>
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />

          <HotToaster
            position="top-right"
            reverseOrder={false}
            containerStyle={{
              top: 70,
              right: 20,
            }}
          />
        </PlanProvider>
      </body>
    </html>
  );
}