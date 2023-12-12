import Link from "next/link";
import Image from "next/image";
import logo from "@/public/at-glass-logo.png";
import NavBar from "@/components/NavBar";
import Logo from "@/components/Logo";



export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="bg-slate-800 text-white flex flex-col items-center h-screen min-h-screen w-full min-w-fit">
      <div className=" flex flex-col items-center max-w-screen-lg w-full px-10">
        <header className="flex flex-row justify-between items-center w-full flex-wrap gap-4 pt-5 pb-10">
          <Logo />
          <NavBar />
        </header>
        {children}
      </div>
    </div>
  );
}
