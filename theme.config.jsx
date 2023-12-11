import logo from "@/public/at-glass-logo.png";
import Image from "next/image";
import Link from "next/link";
import "@/app/globals.css";

const config = {
  logo: (
    <div href="/" className="flex flex-row items-center text-xl space-x-6 text-gray-100">
      <Image src={logo} alt="Froggy Project Logo" width={50} height={50} />
      <span>
        <strong>Froggy Project</strong>
      </span>
    </div>
  ),
  project: {
    link: "https://github.com/sethhu20/froggy-project",
  },
  // ... other theme options
};

export default config;
