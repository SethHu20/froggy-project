"use client";

import ProjectHeaderBar from "@/components/ProjectHeaderBar";
import {
  keyboardInputController,
  MovementDirection,
  touchInputMovementController
} from "@/game1/engine/inputHandler";
import { defaultGameState, GameStatus, tick } from "@/game1/engine/tick";
import MainUI from "@/game1/ui/MainUI";
import { useEffect, useRef, useState } from "react";
import { CookiesProvider, useCookies } from "react-cookie";

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
   * Game status
   */
  const [gameStatus, setGameStatus] = useState(GameStatus.Running);

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
        gameStatus,
        setGameStatus,
      },
      false
    )
  );

  /**
   * Is touch device
   */
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  /**
   * Keyboard input controller with state
   */
  const keyboardInputControllerWithState =
    keyboardInputController(gameStateRef);

  /**
   * Touch input controller with state
   */
  const [touchMove, touchReset] = touchInputMovementController(gameStateRef);

  /**
   * Add event listener for keyboard input controller and tick the game state
   */
  useEffect(() => {
    // Keyboard input controller
    addEventListener("keydown", keyboardInputControllerWithState);
    // Game Model tick
    const tickId = setInterval(() => tick(gameStateRef), 1000 / 60);

    /**
     * Is touch device
     */
    setIsTouchDevice("ontouchstart" in window);

    // Cleanup
    return () => {
      removeEventListener("keydown", keyboardInputControllerWithState);
      clearInterval(tickId);
    };
  }, [keyboardInputControllerWithState]);

  return (
    // CookiesProvider is used to store high score in a cookie
    <CookiesProvider>
      <div className="flex flex-col items-center h-screen min-h-screen w-screen min-w-fit">
        <MainUI
          gameStateRef={gameStateRef}
          score={score}
          highscore={highScore["highScore"]}
        />
        {isTouchDevice && (
          <div className="bottom-0 w-full text-center text-xs grid grid-cols-3 grid-rows-2 gap-2 max-w-screen-sm">
            <div
              className="bg-slate-300 rounded-2xl aspect-square col-start-2 col-span-1 row-start-1 row-span-1"
              onTouchStart={() => touchMove(MovementDirection.Up)}
            ></div>
            <div
              className="bg-slate-300 rounded-2xl aspect-square col-start-1 col-span-1 row-start-2 row-span-1"
              onTouchStart={() => touchMove(MovementDirection.Left)}
            ></div>
            <div
              className="bg-slate-300 rounded-2xl aspect-square col-start-2 col-span-1 row-start-2 row-span-1"
              onTouchStart={() => touchMove(MovementDirection.Down)}
            ></div>
            <div
              className="bg-slate-300 rounded-2xl aspect-square col-start-3 col-span-1 row-start-2 row-span-1"
              onTouchStart={() => touchMove(MovementDirection.Right)}
            ></div>
            {gameStateRef.current.status === GameStatus.GameOver && (
              <div
                className="bg-orange-500 rounded-2xl aspect-square col-start-1 col-span-1 row-start-1 row-span-1"
                onTouchStart={() => touchReset()}
              ></div>
            )}
          </div>
        )}
        <ProjectHeaderBar title="Game1" absolute />
      </div>
    </CookiesProvider>
  );
}
