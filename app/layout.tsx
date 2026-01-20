import type { Metadata } from 'next';
import { Cutive_Mono } from 'next/font/google';
import './globals.css';

const cutive = Cutive_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-cutive',
});

export const metadata: Metadata = {
  title: 'kptankhoa',
  description: 'Khoa Phan Porfolio',
  openGraph: {
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
