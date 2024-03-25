import { useFrame } from "@react-three/fiber";
import { MutableRefObject, useRef } from "react";
import { Color, MeshBasicMaterial } from "three";
import { GameState, GameStatus } from "../engine/tick";

const COLOR_SAFE = new Color(0xddeeee);
const COLOR_HAZARD = new Color(0xffbb66);
const COLOR_CHECK = new Color(0xff0000);

/**
 * Grid tile render component
 */
export const GridTile = ({
  x,
  y,
  gameStateRef,
}: {
  x: number;
  y: number;
  gameStateRef: MutableRefObject<GameState>;
}) => {
  /**
   * Modify material color based on the game state
   */
  const materialRef = useRef<MeshBasicMaterial>(null);
  /**
   * Previous round to detect round change
   */
  const prevRound = useRef<number>(-1);
  /**
   * Counter timer to slowly decay the red color, and quickly show the hazard color
   *
   * decay units in milliseconds
   */
  const decay = useRef<number>(0);
  /**
   * The cutoff for when the red decay should finish and when hazard color should be shown
   * 30% of the round time
   *
   * decayCap units in milliseconds
   */
  const decayCap = useRef<number>(0);
  const isHazard = useRef<boolean>(false);

  useFrame((_, delta) => {
    if (materialRef.current === null) return;
    // If round changed, reset decay, decay cap
    if (prevRound.current !== gameStateRef.current.round) {
      prevRound.current = gameStateRef.current.round;
      decayCap.current = gameStateRef.current.roundTime * 16.66 * 0.3;
      decay.current = 0;
    }
    // If game over, set to red
    if (gameStateRef.current.status === GameStatus.GameOver) {
      if (isHazard.current) materialRef.current.color.set(COLOR_CHECK);
      prevRound.current = -1;
    }
    // Transition from safe to hazard color
    else if (decay.current > decayCap.current) {
      isHazard.current = gameStateRef.current.hazardGrid[x][y];
      // Linear interpolation between safe and hazard color
      // Transition time is double of decay time
      materialRef.current.color.lerp(
        isHazard.current ? COLOR_HAZARD : COLOR_SAFE,
        Math.min(((decay.current - decayCap.current) / decayCap.current) * 2, 1)
      );
    }
    // Decay red color if tile was hazard last round
    else {
      if (isHazard.current)
        // Cubic interpolation between red and safe color
        // transition time is 30% of the round time
        materialRef.current.color.lerpColors(
          COLOR_CHECK,
          COLOR_SAFE,
          Math.pow(decay.current / decayCap.current, 3)
        );
    }
    // Decay counter
    decay.current += delta * 1000;
  });
  return (
    <mesh position={[x, -y, 0]}>
      <planeGeometry args={[0.95, 0.95]} />
      <meshBasicMaterial
        color={COLOR_SAFE}
        ref={materialRef}
        toneMapped={false} // disable ACESFilmicToneMapping from three fiber
      />
    </mesh>
  );
};
