import NavBar from "@/components/navBar";
import "./globals.css";
import { Inter } from "next/font/google";
import TokenProvider from "@/components/tokenProvider";
import NextTopLoader from "nextjs-toploader";
import PlayerProvider from "@/components/playerProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotificationHandler from "@/components/notificationHandler";

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
      className='bg-black'
      lang='en'
    >
      <body className={`${inter.className} max-w-[740px]  p-6 sm:p-8 m-auto `}>
        <TokenProvider>
          <NavBar />
          <NextTopLoader showSpinner={false} />
          <PlayerProvider>{children}</PlayerProvider>
          <NotificationHandler />
          <ToastContainer closeOnClick={false} />
        </TokenProvider>
      </body>
    </html>
  );
}
