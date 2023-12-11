import Link from "next/link";
import Image from "next/image";
import logo from "@/public/at-glass-logo.png";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import NavBar from "@/components/NavBar";



export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // find the product of the list

  return (
    <div className="bg-slate-800 min-h-screen text-white flex flex-col items-center">
      <header className="flex justify-between items-center w-5/6 p-10 ">
        <Link
          href="/"
          className="flex flex-row items-center text-xl space-x-6 text-gray-100"
        >
          <Image src={logo} alt="Froggy Project Logo" width={50} height={50} />
          <span>
            <strong>Froggy Project</strong>
          </span>
        </Link>
        <NavBar />
      </header>
      {children}
    </div>
  );
}
