"use client";

import { Canvas } from "@react-three/fiber";
import { MutableRefObject, useEffect, useRef } from "react";
import { GameState } from "../engine/tick";
import { Grid } from "../renderer/Grid";

/**
 * Main UI component
 */
export default function MainUI({
  gameStateRef,
  score,
  highscore,
}: {
  gameStateRef: MutableRefObject<GameState>;
  score: number;
  highscore: string;
}) {

  // Reference to highscore element
  const highscoreRef = useRef<HTMLElement>(null);

  // Since it uses information from cookies, Next.js have hydration issues with
  // cookie information. Highscore hydration is done after mount.
  useEffect(() => {
    if (highscore) highscoreRef.current!.innerText = `Highscore: ${highscore}`;
  }, [highscore]);

  return (
    <div className="relative w-screen h-screen">
      <Canvas orthographic>
        <Grid gameStateRef={gameStateRef} />
      </Canvas>
      <div className="absolute bottom-0 right-0 space-x-5 p-5">
        <span className="text-xl inline-block" ref={highscoreRef}></span>
        <span className="text-9xl w-52 inline-block text-right">{score}</span>
      </div>
    </div>
  );
}
