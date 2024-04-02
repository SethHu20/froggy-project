import { FaChevronRight } from "react-icons/fa";
import Logo from "./Logo";
import clsx from "clsx";

/**
 * The header bar for a project.
 *
 * @param title The title of the project
 * @param absolute Whether the header bar should be absolutely positioned
 * @returns     The header bar
 */
export default function ProjectHeaderBar({
  title,
  absolute,
  children,
}: {
  title: string;
  absolute?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <header
      className={clsx(
        "flex flex-row items-center w-full p-1 lg:p-3 transition-all duration-75",
        absolute && "absolute"
      )}
    >
      <Logo />
      <FaChevronRight className="text-xl" />
      <h1 className="sm:ml-2 lg:ml-5 text-2xl flex-grow">{title}</h1>
      {children}
    </header>
  );
}
