import { RefObject } from "react";
import { GameState, GameStatus, defaultGameState } from "./tick";

/**
 * Keyboard input controller
 *
 * Takes in a mutable reference to the game state for modifying player position,
 * reading game status, and restarting the game.
 *
 * @param gameStateRef mutable reference to the game state
 * @returns
 */
export const keyboardInputController = (
  gameStateRef: RefObject<GameState>
) => {
  const movePlayerWithState = movePlayer(gameStateRef);
  return (e: KeyboardEvent) => {
    if (e.repeat) return;
    if (gameStateRef.current.status === GameStatus.Running) {
      switch (e.key) {
        case "w":
        case "ArrowUp":
          movePlayerWithState(MovementDirection.Up);
          break;
        case "s":
        case "ArrowDown":
          movePlayerWithState(MovementDirection.Down);
          break;
        case "a":
        case "ArrowLeft":
          movePlayerWithState(MovementDirection.Left);
          break;
        case "d":
        case "ArrowRight":
          movePlayerWithState(MovementDirection.Right);
          break;
      }
    } else if (gameStateRef.current.status === GameStatus.GameOver) {
      switch (e.key) {
        case "Enter":
        case " ":
        case "r":
          resetGameState(gameStateRef);
          break;
      }
    }
  };
};

/**
 * Touch input controller
 *
 * @param gameStateRef mutable reference to the game state
 * @returns a function for moving player with direction, and another function
 * for resetting the game state
 */
export const touchInputMovementController = (
  gameStateRef: RefObject<GameState>
) => {
  const movePlayerWithState = movePlayer(gameStateRef);
  return [
    (action: MovementDirection) => {
      if (gameStateRef.current.status === GameStatus.Running)
        movePlayerWithState(action);
    },
    () => resetGameState(gameStateRef),
  ] as const;
};

export enum MovementDirection {
  Up,
  Down,
  Left,
  Right,
}

/**
 * Mutates game state to move the player in the given direction
 *
 * The player is moved in the given direction if the player is not at the edge
 * of the game board.
 *
 * The game board is a 9x9 grid with the player starting at the center (4, -4).
 *
 * @param gameStateRef
 * @returns
 */
export const movePlayer =
  (gameStateRef: RefObject<GameState>) =>
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

/**
 * Reset the game state to the default state
 */
export const resetGameState = (gameStateRef: RefObject<GameState>) => {
  gameStateRef.current = defaultGameState(gameStateRef.current.uiHooks, true);
  gameStateRef.current.uiHooks.setGameStatus(GameStatus.Running);
};
