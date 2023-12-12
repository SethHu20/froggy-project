const WIDTH = 8;
const HEIGHT = 8;

const getCoord = (i: number, j: number) => {
  return `${String.fromCharCode(104 - i)}${j + 1}`;
};

export default function Chessboard({
  showCoord = true,
}: {
  showCoord?: boolean;
}) {
  return (
    <div role="grid" className="grid grid-rows-8 h-[600px] w-[600px] text-red-50">
      {Array.from(Array(WIDTH)).map((_, i) => (
        <div key={i} role="row" className="grid grid-cols-8">
          {Array.from(Array(HEIGHT)).map((_, j) => {
            return (
              <div
                key={i * WIDTH + j}
                role="gridcell"
                className={`h-full w-full align-bottom relative ${
                  (i + j) % 2
                    ? "bg-yellow-900"
                    : "bg-yellow-100 text-slate-800"
                }`}
              >
                {showCoord ? <span className="absolute bottom-0 left-1">{getCoord(i, j)}</span> : ""}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}