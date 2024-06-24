import { databaseConnect } from '@/utilities/database';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from './components/Layout/Header';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'm3u8',
  description: 'm3u8',
};

databaseConnect();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="max-w-screen-xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
