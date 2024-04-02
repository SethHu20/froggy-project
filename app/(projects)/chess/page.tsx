import ChessMainUI from "@/chess/ui/ChessMainUI";
import ProjectHeaderBar from "@/components/ProjectHeaderBar";

export default function page() {
  return (
    <div className="bg-slate-800 text-white h-screen w-screen flex flex-col">
      <ProjectHeaderBar title="Chess" />
      <ChessMainUI />
    </div>
  );
}
