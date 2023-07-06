import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "Soundly",
  description: "Music Sharing Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className="bg-black"
      lang="en"
    >
      <body className={`${inter.className} max-w-[740px] p-6 sm:p-8 m-auto `}>
        {children}
      </body>
    </html>
  );
}
