import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Git a life",
  description: "See your .env's getting exposed",
  openGraph: {
    images: ["https://i.imgur.com/tRsu10s.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.className} bg-black text-white antialiased`}
      >
        <DotPattern
          width={15}
          height={15}
          cx={1}
          cy={1}
          cr={1}
          className={cn(
            "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] w-full "
          )}
        />
        {children
        }
        <Footer />
      </body>
    </html>
  );
}
