import { HEIGHT, WIDTH } from "./Types";

const getCoord = (i: number, j: number) => {
  return `${String.fromCharCode(104 - i)}${j + 1}`;
};

export default function Chessboard({
  CHESSBOARD_ID,
  showCoord = true,
}: {
  CHESSBOARD_ID: string;
  showCoord?: boolean;
}) {
  return (
    <div
      role="grid"
      className={`grid grid-rows-8 aspect-square max-w-[800px] w-full text-red-50`}
      id={CHESSBOARD_ID}
    >
      {Array.from(Array(WIDTH)).map((_, i) => (
        <div key={i} role="row" className="grid grid-cols-8">
          {Array.from(Array(HEIGHT)).map((_, j) => {
            return (
              <div
                key={i * WIDTH + j}
                role="gridcell"
                className={`h-full w-full align-bottom relative ${
                  (i + j) % 2 ? "bg-[#586378]" : "bg-yellow-100 text-slate-800"
                }`}
              >
                <span className="absolute bottom-0 left-1 select-none">
                  {showCoord ? getCoord(i, j) : ""}
                </span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
