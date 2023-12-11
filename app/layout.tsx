import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';

const monserrat_font = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | Froggy Project',
    default: 'Froggy Project', // a default is required when creating a template
  },
  description: 'Collection of fun projects made with love',
  openGraph: {
    title: 'Froggy Project',
    description: 'Collection of fun projects made with love',
    url: 'https://froggy-project.vercel.app',
    siteName: 'froggy-project.vercel.app',
    images: [
      {
        url: 'https://froggy-project.vercel.app/at-glass-logo.png',
        width: 2894,
        height: 2894,
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={monserrat_font.className}>{children}</body>
    </html>
  );
}
