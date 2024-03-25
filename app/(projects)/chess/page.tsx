import ChessMainUI from "@/chess/ui/ChessMainUI";
import ProjectHeaderBar from "@/components/ProjectHeaderBar";

export default function page() {
  return (
    <div className="bg-slate-800 text-white flex flex-col items-center h-screen min-h-screen w-screen min-w-fit">
      <ProjectHeaderBar title="Chess" />
      <ChessMainUI />
    </div>
  );
}
