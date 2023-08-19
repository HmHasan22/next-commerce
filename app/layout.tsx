import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { ReduxProvider } from '@/redux/provider/provider';
const inter = Poppins({
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={inter.className}>
      <ReduxProvider>
        <body>
          <Header />
          <main>{children}</main>
          <Footer />
        </body>
      </ReduxProvider>
    </html>
  );
}
