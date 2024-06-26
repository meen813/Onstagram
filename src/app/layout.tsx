import './globals.css';
import { Open_Sans } from 'next/font/google';
import Navbar from '../components/Navbar';
import AuthContext from '@/context/AuthContext';
import SWRConfigContext from '@/context/SWRConfigContext';
import { Metadata } from 'next';

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: "Onstagram",
    template: "Onstagram | %s"
  },
  description: "Onstagram Photos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={openSans.className}>
      <body className='w-full bg-neutral-50 dark:bg-black dark:text-white overflow-auto'>
        <AuthContext>
          <header className='sticky top-0 z-10'>
            <div className='max-w-screen-xl mx-auto'>
              <Navbar/>
            </div>
          </header>
          <main className='w-full flex justify-center max-w-screen-xl mx-auto'>
            <SWRConfigContext>{children}</SWRConfigContext>
          </main>
        </AuthContext>
        <div id='portal'/>
      </body>
    </html>
  );
}
