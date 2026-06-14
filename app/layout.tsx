import type { Metadata } from 'next';
import { Cutive_Mono } from 'next/font/google';
import './globals.css';

const cutive = Cutive_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-cutive',
});

export const metadata: Metadata = {
  title: 'Khoa Phan — kptankhoa',
  description: 'Khoa Phan, fullstack developer. A retro Finder-style portfolio.',
  metadataBase: new URL('https://kptankhoa.dev'),
  openGraph: {
    title: 'Khoa Phan — kptankhoa',
    description: 'Khoa Phan, fullstack developer. A retro Finder-style portfolio.',
    images: 'https://bucket.kptankhoa.dev/bg.jpg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cutive.className}>
        {children}
      </body>
    </html>
  );
}
