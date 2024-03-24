import { MutableRefObject, use, useRef } from "react";
import { GameState, GameStatus } from "../engine/tick";
import { useFrame } from "@react-three/fiber";
import { Color, Mesh, MeshBasicMaterial, Vector3 } from "three";
import { temp } from "three/examples/jsm/nodes/Nodes.js";

const COLOR_SAFE = new Color(0xddeeee);
const COLOR_HAZARD = new Color(0xffbb66);
const COLOR_CHECK = new Color(0xff0000);

export const GridTile = ({
  x,
  y,
  gameStateRef,
}: {
  x: number;
  y: number;
  gameStateRef: MutableRefObject<GameState>;
}) => {
  const materialRef = useRef<MeshBasicMaterial>(null);
  const prevRound = useRef<number>(-1);
  const decay = useRef<number>(0);
  const decayCap = useRef<number>(0);
  const isHazard = useRef<boolean>(false);

  useFrame((_, delta) => {
    if (materialRef.current === null) return;
    if (prevRound.current !== gameStateRef.current.round) {
      prevRound.current = gameStateRef.current.round;
      decayCap.current = gameStateRef.current.roundTime * 16.66 * 0.3;
      decay.current = 0;
    }
    if (gameStateRef.current.status === GameStatus.GameOver) {
      if (isHazard.current) materialRef.current.color.set(COLOR_CHECK);
      prevRound.current = -1;
    } else if (decay.current > decayCap.current) {
      isHazard.current = gameStateRef.current.hazardGrid[x][y];
      materialRef.current.color.lerp(
        isHazard.current ? COLOR_HAZARD : COLOR_SAFE,
        Math.min(((decay.current - decayCap.current) / decayCap.current) * 2, 1)
      );
    } else {
      if (isHazard.current)
        materialRef.current.color.lerpColors(
          COLOR_CHECK,
          COLOR_SAFE,
          Math.pow(decay.current / decayCap.current, 3)
        );
    }
    decay.current += delta * 1000;
  });
  return (
    <mesh position={[x, -y, 0]}>
      <planeGeometry args={[0.95, 0.95]} />
      <meshBasicMaterial
        color={COLOR_SAFE}
        ref={materialRef}
        toneMapped={false}
      />
    </mesh>
  );
};
