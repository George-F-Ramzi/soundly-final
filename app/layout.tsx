import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Soundly',
  description: 'Music Sharing Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className='bg-black' lang="en">
      <body className={`${inter.className} max-w-[740px] phone:p-6 p-8 m-auto `}>{children}</body>
    </html>
  )
}
