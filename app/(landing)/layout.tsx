import NavBar from "@/components/NavBar";
import Logo from "@/components/Logo";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

const monserrat_font = Montserrat({ subsets: ["latin"] });

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-slate-800 text-white">
      <body className={`${monserrat_font.className} max-w-screen-lg min-w-80 m-auto`}>
        <header className="flex flex-row justify-between items-center w-full flex-wrap gap-4 pt-5 pb-10">
          <Logo />
          <NavBar />
        </header>
        {children}
      </body>
    </html>
  );
}

// export default function LandingLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="bg-slate-800 text-white flex flex-col items-center min-h-screen">
//       <div className=" flex flex-col items-center max-w-screen-lg w-full px-10 pb-10">
//         <header className="flex flex-row justify-between items-center w-full flex-wrap gap-4 pt-5 pb-10">
//           <Logo />
//           <NavBar />
//         </header>
//         {children}
//       </div>
//     </div>
//   );
// }
