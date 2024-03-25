import { MutableRefObject, Ref } from "react";
import { GameState, GameStatus, defaultGameState } from "./tick";

export const keyboardInputController = (
  gameStateRef: MutableRefObject<GameState>
) => {
  const movePlayerWithState = movePlayer(gameStateRef);
  return (e: KeyboardEvent) => {
    if (e.repeat) return;
    if (gameStateRef.current.status === GameStatus.Running) {
      switch (e.key) {
        case "ArrowUp":
          movePlayerWithState(MovementDirection.Up);
          break;
        case "ArrowDown":
          movePlayerWithState(MovementDirection.Down);
          break;
        case "ArrowLeft":
          movePlayerWithState(MovementDirection.Left);
          break;
        case "ArrowRight":
          movePlayerWithState(MovementDirection.Right);
          break;
      }
    } else if (gameStateRef.current.status === GameStatus.GameOver) {
      switch (e.key) {
        case "Enter":
        case " ":
        case "r":
          gameStateRef.current = defaultGameState(gameStateRef.current.uiHooks, true);
          break;
      }
    }
  };
};

export enum MovementDirection {
  Up,
  Down,
  Left,
  Right,
}

export const movePlayer =
  (gameStateRef: MutableRefObject<GameState>) =>
  (movementDirection: MovementDirection) => {
    switch (movementDirection) {
      case MovementDirection.Up:
        if (gameStateRef.current.playerPosition.y >= 0) break;
        gameStateRef.current.playerPosition.y += 1;
        break;
      case MovementDirection.Down:
        if (gameStateRef.current.playerPosition.y <= -8) break;
        gameStateRef.current.playerPosition.y -= 1;
        break;
      case MovementDirection.Left:
        if (gameStateRef.current.playerPosition.x <= 0) break;
        gameStateRef.current.playerPosition.x -= 1;
        break;
      case MovementDirection.Right:
        if (gameStateRef.current.playerPosition.x >= 8) break;
        gameStateRef.current.playerPosition.x += 1;
        break;
    }
  };
