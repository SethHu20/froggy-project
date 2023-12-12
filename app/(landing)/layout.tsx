import Link from "next/link";
import Image from "next/image";
import logo from "@/public/at-glass-logo.png";
import NavBar from "@/components/NavBar";



export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="bg-slate-800 text-white flex flex-col items-center h-screen min-h-screen w-full min-w-fit">
      <div className=" flex flex-col items-center max-w-screen-lg w-full px-10">
        <header className="flex flex-row justify-between items-center w-full flex-wrap gap-4 py-10">
          <Link
            href="/"
            className="flex flex-row items-center text-xl space-x-6 text-gray-100 w-fit"
          >
            <Image
              src={logo}
              alt="Froggy Project Logo"
              width={50}
              height={50}
            />
            <span className="">
              <strong>Froggy Project</strong>
            </span>
          </Link>
          <NavBar />
        </header>
        {children}
      </div>
    </div>
  );
}
