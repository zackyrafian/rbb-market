import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from './_components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RBB Market',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
