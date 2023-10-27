import type { PropsWithChildren } from 'react';
import { Metadata } from 'next';
import { Figtree } from 'next/font/google';

import { site } from '@/config';
import style from '@/styles/layout.module.css';
import '@/styles/globals.css';
import { ThemeProvider } from '@/app/providers';
import SearchBar from '@/components/search-bar';
import { ThemeToggle } from '@/components/theme-toggle';
import Header from '@/components/header';

const { title, description, name } = site;

export const metadata: Metadata = {
  metadataBase: new URL('https://magic-write.vercel.app'),
  title,
  description,
  openGraph: {
    title,
    description,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={figtree.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Header />
          <main className={style.main}>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
