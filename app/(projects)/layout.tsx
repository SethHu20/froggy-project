import { Montserrat } from "next/font/google";

const monserrat_font = Montserrat({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${monserrat_font.className} bg-slate-800 text-white`}>
        {children}
      </body>
    </html>
  );
}
