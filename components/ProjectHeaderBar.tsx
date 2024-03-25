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
}: {
  title: string;
  absolute?: boolean;
}) {
  return (
    <header
      className={clsx(
        "flex flex-row items-center w-full p-1 lg:p-5 transition-all duration-75",
        absolute && "absolute"
      )}
    >
      <Logo />
      <FaChevronRight className="text-xl" />
      <h1 className="ml-4 text-2xl">{title}</h1>
    </header>
  );
}
