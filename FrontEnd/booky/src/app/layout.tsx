import { Rubik } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';
import UserCont from './context/UserCtx';

export const metadata: Metadata = {
  title: 'Booky',
  description: 'Get to know your books',
};

const rubik = Rubik({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <div className="min-h-screen min-w-screen">
          <UserCont>{children}</UserCont>
        </div>
      </body>
    </html>
  );
}
