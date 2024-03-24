"use client";

import ProjectHeaderBar from "@/components/ProjectHeaderBar";
import { keyboardInputController } from "@/game1/engine/inputHandler";
import { defaultGameState, tick } from "@/game1/engine/tick";
import MainUI from "@/game1/ui/MainUI";
import { useEffect, useRef, useState } from "react";
import { CookiesProvider } from "react-cookie";
import { useCookies } from "react-cookie";

export default function Page() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useCookies(["highScore"]) as [
    { highScore: string },
    (name: string, value: string) => void,
    any,
    any
  ];
  
  const gameStateRef = useRef(
    defaultGameState(
      {
        onRoundUpdate: setScore,
        highScore: highScore,
        onNewHighScore: setHighScore,
      },
      false
    )
  );
  const keyboardInputControllerWithState =
    keyboardInputController(gameStateRef);

  useEffect(() => {
    addEventListener("keydown", keyboardInputControllerWithState);
    const tickId = setInterval(() => tick(gameStateRef), 1000 / 60);
    return () => {
      removeEventListener("keydown", keyboardInputControllerWithState);
      clearInterval(tickId);
    };
  });
  return (
    <CookiesProvider>
      <div className="bg-slate-800 text-white flex flex-col items-center h-screen min-h-screen w-screen min-w-fit">
        <MainUI gameStateRef={gameStateRef} score={score} highscore={highScore["highScore"]}/>
        <ProjectHeaderBar title="Game1" absolute />
      </div>
    </CookiesProvider>
  );
}
