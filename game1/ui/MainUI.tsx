"use client";

import { Canvas } from "@react-three/fiber";
import { RefObject, useEffect, useRef } from "react";
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
  gameStateRef: RefObject<GameState>;
  score: number;
  highscore: string;
}) {
  // Reference to highscore element
  const highscoreRef = useRef<HTMLDivElement>(null);

  // Since it uses information from cookies, Next.js have hydration issues with
  // cookie information. Highscore hydration is done after mount.
  useEffect(() => {
    if (highscore) highscoreRef.current!.innerText = `Highscore: ${highscore}`;
  }, [highscore]);

  return (
    <div className="relative w-screen flex-1">
      <Canvas orthographic>
        <Grid gameStateRef={gameStateRef} />
      </Canvas>
      <div className="absolute bottom-0 sm:right-0 space-x-5 w-full sm:w-fit p-2 sm:p-5 flex flex-row items-baseline align-bottom justify-between">
        <div className="text-xl" ref={highscoreRef}></div>
        <div className="text-6xl font-medium sm:font-normal sm:text-9xl sm:w-52 text-right">
          {score}
        </div>
      </div>
    </div>
  );
}
