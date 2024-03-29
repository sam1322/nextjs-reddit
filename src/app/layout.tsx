import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/Toast/toaster";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
// import { Inter } from "next/font/google";
import localFont from "next/font/local";

export const metadata = {
  title: "Breadit",
  description: "A Reddit clone built with Next.js and TypeScript.",
};

// const inter = Open_Sans({ subsets: ["latin"], display: 'swap', adjustFontFallback: false });
// const inter = Inter({ subsets: ["latin"] });
const inter2 = localFont({
  // src: "/../../public/fonts/static/Inter-Semibold.ttf",
  src: "/../../public/fonts/static/Inter-Regular.ttf",
});

export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode;
  authModal: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "bg-white text-slate-900 antialiased light",
        inter2.className
      )}
    >
      <body className="min-h-screen pt-12 bg-slate-50 antialiased light ">
        <Providers>
          {/* @ts-expect-error server components */}
          <Navbar />
          {authModal}
          <div className="container max-w-7xl  mx-auto h-full pt-12">
            {children}
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
