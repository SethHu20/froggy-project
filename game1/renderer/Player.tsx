import { useFrame } from "@react-three/fiber";
import { MutableRefObject, useRef } from "react";
import { Mesh, Vector3 } from "three";
import { GameState } from "../engine/tick";

export const Player = ({gameStateRef}: {gameStateRef: MutableRefObject<GameState>}) => {
  const playerMesh = useRef<Mesh>(null);
  const vec = new Vector3();
  useFrame((_, delta) => {
    if (playerMesh.current === null) return;
    vec.set(gameStateRef.current.playerPosition.x, gameStateRef.current.playerPosition.y, 1);
    vec.sub(playerMesh.current.position);
    vec.clampLength(0, delta * 40);
    playerMesh.current.position.add(vec);
  });
  return (
    <mesh position={[4, -4, 1]} ref={playerMesh}>
      <planeGeometry args={[0.7, 0.7, 1]} />
      <meshBasicMaterial color={0x5577ff} toneMapped={false}/>
    </mesh>
  );
};
