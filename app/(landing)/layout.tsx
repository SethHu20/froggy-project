import Link from "next/link";
import Image from "next/image";
import logo from "@/public/at-glass-logo.png";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

export const metadata = {
    openGraph: {
      title: 'Froggy Project',
      description: 'Skill Issue',
    },
  }


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
        <nav>
          <ul className="flex space-x-10">
            <li>
              <Link href="/projects">Projects</Link>
            </li>
            <li>
              <Link
                href="/docs"
                className="flex flex-row items-center space-x-2"
              >
                <FaExternalLinkAlt /> <span>Docs</span>
              </Link>
            </li>
            <li>
              <Link
                href="https://github.com/sethhu20/froggy-project"
                className="flex flex-row items-center space-x-2"
              >
                <FaGithub />
                <span>Github</span>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      {children}
    </div>
  );
}
