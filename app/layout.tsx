import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';

const monserrat_font = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://froggy-project.vercel.app/'),
  title: {
    template: '%s | Froggy Project',
    default: 'Froggy Project', // a default is required when creating a template
  },
  description: 'Collection of fun projects made with love',
  openGraph: {
    title: 'Froggy Project',
    description: 'Collection of fun projects made with love',
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
