import { HEIGHT, WIDTH } from "../Types";

const getCoord = (i: number, j: number) => {
  return `${String.fromCharCode(104 - i)}${j + 1}`;
};

export default function Chessboard({
  CHESSBOARD_ID,
  showCoord = true,
  size,
  position,
}: {
  CHESSBOARD_ID: string;
  showCoord?: boolean;
  size: number;
  position: { x: number; y: number };
}) {
  return (
    <div
      role="grid"
      className={`absolute grid grid-rows-8 text-red-50`}
      style={{ width: size, height: size, left: position.x, top: position.y }}
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
                  (i + j) % 2 ? "bg-[#586378]" : "bg-[#feeec2] text-slate-800"
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
