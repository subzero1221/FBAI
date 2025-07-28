import { Inter } from 'next/font/google';
import './globals.css';
import Header from './_mainComponents/Header';
import { Providers } from './utils/Provider';
import AuthSync from './utils/AuthSync';
const inter = Inter({ subsets: ['latin'] });


export default function RootLayout({ children }) {
 

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var lang = localStorage.getItem('language') || 'en';
                document.documentElement.lang = lang;
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <Header />
          <AuthSync />
          {children}
        </Providers>
      </body>
    </html>
  );
}
