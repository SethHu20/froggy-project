import { HEIGHT, Position, WIDTH } from "../Types";

const getCoord = (i: number, j: number) => {
  return `${String.fromCharCode(97 + j)}${8 - i}`;
};

export default function Chessboard({
  showCoord = true,
  size,
  position,
  hidden,
}: {
  showCoord?: boolean;
  size: number;
  position: Position;
  hidden?: boolean;
}) {
  return (
    <div
      role="grid"
      className={`${
        hidden ? "invisible" : "grid"
      } grid-rows-8 text-red-50 absolute`}
      style={{ width: size, height: size, top: position.y, left: position.x }}
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
