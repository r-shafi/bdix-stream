import { databaseConnect } from '@/utilities/database';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from './components/Layout/Footer';
import Header from './components/Layout/Header';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Live Streams | BDIX Live Stream',
  description:
    'Watch live cricket, football, and entertainment TV channels streamed by members of our website. Enjoy high-quality streaming and diverse content on our platform. Join today to experience the thrill of live sports and entertainment at your fingertips.',
  twitter: {
    creator: '@shafiemoji',
    site: '@shafiemoji',
    card: 'summary',
    title: 'Live Streams | BDIX Live Stream',
    description:
      'Watch live cricket, football, and entertainment TV channels streamed by members of our website. Enjoy high-quality streaming and diverse content on our platform. Join today to experience the thrill of live sports and entertainment at your fingertips.',
  },
  openGraph: {
    type: 'website',
    title: 'Live Streams | BDIX Live Stream',
    description:
      'Watch live cricket, football, and entertainment TV channels streamed by members of our website. Enjoy high-quality streaming and diverse content on our platform. Join today to experience the thrill of live sports and entertainment at your fingertips.',
    url: 'https://bdix-stream.vercel.app',
  },
  keywords: [
    'live stream',
    'BDIX Live Stream',
    'cricket',
    'football',
    'entertainment',
    'tv channels',
    'high-quality streaming',
    'diverse content',
    'live sports',
    'live entertainment',
  ],
  authors: [
    {
      name: 'Shafi',
      url: 'https://shafirayhan.me',
    },
  ],
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
        <main className="max-w-screen-xl mx-auto container-padding py-8 min-h-screen">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
