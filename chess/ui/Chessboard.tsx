import { CoordinatesConfig, HEIGHT, Position, WIDTH } from "../Types";

/**
 * Get coordinates components based on configuration.
 * 
 * @param i vertical index from top
 * @param j horizontal index from left
 * @param coordinatesConfig  coordinates configuration
 * @returns
 */
const getCoordinatesComponent = (
  i: number,
  j: number,
  coordinatesConfig: CoordinatesConfig
) => {
  let res = <></>;
  if (coordinatesConfig === "axis") {
    if (i === 7) {
      res = (
        <>
          <span className="absolute bottom-0 right-1">
            {String.fromCharCode(97 + j)}
          </span>
        </>
      );
    }
    if (j === 0) {
      res = (
        <>
          <span className="absolute top-1 left-1">{8 - i}</span>
          {res.props.children}
        </>
      );
    }
  } else if (coordinatesConfig === "all") {
    res = (
      <>
        <span className="absolute top-0 left-1">
          {`${String.fromCharCode(97 + j)}${8 - i}`}
        </span>
      </>
    );
  }
  return res;
};

export default function Chessboard({
  coordinatesConfig,
  size,
  position,
  hidden,
}: {
  coordinatesConfig: CoordinatesConfig;
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
                {getCoordinatesComponent(i, j, coordinatesConfig)}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
