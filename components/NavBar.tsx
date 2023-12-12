import Link from "next/link";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

export default function NavBar() {
  return (
    <nav className="">
      <ul className="flex space-x-5 flex-row items-center">
        <li>
          <Link
            href="/projects"
            className="hover:bg-white hover:text-slate-900 p-3 rounded-full transition-all"
          >
            Projects
          </Link>
        </li>
        <li>
          <Link
            href="/docs"
            className="flex flex-row items-center space-x-2 hover:bg-white hover:text-slate-900 p-3 rounded-full transition-all"
          >
            <FaExternalLinkAlt /> <span>Docs</span>
          </Link>
        </li>
        <li>
          <Link
            href="https://github.com/sethhu20/froggy-project"
            className="flex flex-row items-center space-x-2 hover:bg-white hover:text-slate-900 p-3 rounded-full transition-all"
          >
            <FaGithub />
            <span>Github</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
