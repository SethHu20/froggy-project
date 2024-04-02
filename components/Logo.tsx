import logo from "@/public/at-glass-logo.png";
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="group flex flex-row items-center text-xl space-x-3 text-gray-100 w-fit hover:bg-blue-100 hover:text-slate-900 lg:p-3 rounded-full transition-all"
    >
      <Image
        src={logo}
        alt="Froggy Project Logo"
        width={50}
        height={50}
        className="drop-shadow-3xl group-hover:animate-standingBounce"
      />
      <span className="pr-3 hidden sm:block">
        <strong>Froggy Project</strong>
      </span>
    </Link>
  );
}
