"use client";

import ProjectHeaderBar from "@/components/ProjectHeaderBar";
import { keyboardInputController } from "@/game1/engine/inputHandler";
import { defaultGameState, tick } from "@/game1/engine/tick";
import MainUI from "@/game1/ui/MainUI";
import { useEffect, useRef, useState } from "react";
import { CookiesProvider } from "react-cookie";
import { useCookies } from "react-cookie";

export default function Page() {
  /**
   * Score and highScore are owned by page.tsx
   *
   * They are less frequently updated information and can work as normal
   * React components, and passed down to the MainUI component as props.
   */
  const [score, setScore] = useState(0);

  /**
   * High score is stored in a cookie to persist the high score across sessions.
   */
  const [highScore, setHighScore] = useCookies<
    "highScore",
    { highScore: string }
  >(["highScore"]);

  /**
   * GameState is intended to be a mutable model for the controller (tick.ts) and view (MainUI)
   * part of the game. The mutable copied is stored using useRef hook.
   *
   * This enables three.js and WebGL to render the game in full fps (and even
   * high refresh rate monitors) without setting states 144 times per second and
   * rerendering components every time.
   *
   * page.tsx is currently responsible for the ownership of the game state.
   * // TODO: Move the game state to a more appropriate location
   */
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

  /**
   * Keyboard input controller with state
   */
  const keyboardInputControllerWithState =
    keyboardInputController(gameStateRef);

  /**
   * Add event listener for keyboard input controller and tick the game state
   */
  useEffect(() => {
    // Keyboard input controller
    addEventListener("keydown", keyboardInputControllerWithState);
    // Game Model tick
    const tickId = setInterval(() => tick(gameStateRef), 1000 / 60);

    // Cleanup
    return () => {
      removeEventListener("keydown", keyboardInputControllerWithState);
      clearInterval(tickId);
    };
  });

  return (
    // CookiesProvider is used to store high score in a cookie
    <CookiesProvider>
      <div className="bg-slate-800 text-white flex flex-col items-center h-screen min-h-screen w-screen min-w-fit">
        <MainUI
          gameStateRef={gameStateRef}
          score={score}
          highscore={highScore["highScore"]}
        />
        <ProjectHeaderBar title="Game1" absolute />
      </div>
    </CookiesProvider>
  );
}
