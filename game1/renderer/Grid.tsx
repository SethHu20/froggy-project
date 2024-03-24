import { range } from "lodash";
import { GridTile } from "./GridTile";
import { Matrix4, WebGLRenderTarget } from "three";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { MutableRefObject, useMemo, useReducer, useRef } from "react";
import { Player } from "./Player";
import { GameState } from "../engine/tick";
extend({ WebGLRenderTarget });

const GRID_WIDTH = 9,
  GRID_HEIGHT = 9;

/**
 * Grid render component
 *
 * Consider using render targets to manipulate the grid view in the future
 * https://codesandbox.io/p/sandbox/r3f-render-target-qgcrx?file=%2Fsrc%2Findex.js%3A19%2C10
 * https://threejs.org/manual/#en/rendertargets
 */
export const Grid = ({gameStateRef}: {gameStateRef: MutableRefObject<GameState>}) => {
  // TODO: Might be expensive on mount, GridTile is a mesh that recompile on every mount
  // https://docs.pmnd.rs/react-three-fiber/advanced/pitfalls#tips-and-tricks
  // May change it into using useMemo
  const gridTiles = range(GRID_HEIGHT)
    .map((x) =>
      range(GRID_WIDTH).map((y) => (
        <GridTile x={x} y={y} key={x * GRID_WIDTH + y} gameStateRef={gameStateRef}/>
      ))
    )
    .flat();

  const { viewport } = useThree();
  const minGridSize =
    Math.min(viewport.width / GRID_WIDTH, viewport.height / GRID_HEIGHT) * 0.7;

  return (
    <group
      position={[
        (-minGridSize * (GRID_WIDTH - 1)) / 2,
        (minGridSize * (GRID_HEIGHT - 1)) / 2,
        0,
      ]}
      scale={[minGridSize, minGridSize, 0]}
    >
      {gridTiles}
      <Player gameStateRef={gameStateRef} />
    </group>
  );
};
