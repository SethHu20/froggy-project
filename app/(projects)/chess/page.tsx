import Chessboard from "@/chess/ui/Chessboard";
import Logo from "@/components/Logo";
import { FaChevronRight } from "react-icons/fa";

export default function ChessPage() {
  return (
    <div className="bg-slate-800 text-white flex flex-col items-center h-screen min-h-screen w-full min-w-fit">
      <div className="flex flex-row items-center w-full p-5">
        <Logo />
        <FaChevronRight className="text-xl" />
        <h1 className="ml-4 text-2xl">Chess</h1>
      </div>
      <Chessboard showCoord={true} />
    </div>
  );
}
