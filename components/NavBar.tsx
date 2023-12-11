import Link from "next/link";
import Image from "next/image";
import logo from "@/public/at-glass-logo.png";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

export default function NavBar() {
  return (
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
  )    
}