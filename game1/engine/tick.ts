import { range } from "lodash";
import { MutableRefObject } from "react";
import { randInt, seededRandom } from "three/src/math/MathUtils.js";

/**
 * Position of the player
 *
 * In game1 2D mode, the grid defaults to 9x9 grid size with the player starting
 * at the center (4, -4). The top left corner is (0, 0) and the bottom right corner
 * is (8, -8).
 *
 * This makes it work naturally with three.js and WebGL coordinate system.
 */
export type Position = { x: number; y: number };

export enum GameStatus {
  Running,
  GameOver,
}

/**
 * UI hooks for the game state to interact with the UI
 *
 * Normally changes in a MutableRefObject are not detected by React, thus fail to
 * trigger rerenders on components outside of <Canvas> component from three fiber.
 *
 * UI components provides callback hooks from useState so the tick function can
 * trigger rerenders on the UI components.
 *
 * // TODO: Decouple UI hook logic from tick function
 */
export type UiHooks = {
  /**
   * Callback function to update the current score on the UI
   *
   * @param round rounds of games successfully completed
   * @returns
   */
  onRoundUpdate: (round: number) => void;

  /**
   * Highscore provided by the cookie, useCookies hook by default provides a
   * object with a key of the cookie name and value of the cookie value.
   */
  highScore: { highScore: string };

  /**
   * Callback function to update the high score on the UI, intended to work with
   * storing the high score in a cookie.
   *
   * @param name  "highScore"
   * @param value  new high score
   * @returns
   */
  onNewHighScore: (name: "highScore", value: string) => void;
};

export type GameState = {
  status: GameStatus;
  playerPosition: Position;
  seed: number;
  /**
   * The game runs on 60 ticks per second
   */
  tick: number;
  /**
   * Rounds successfully completed
   */
  round: number;
  /**
   * Time left in the current round
   */
  roundTime: number;
  /**
   * Grid of hazard tiles.
   * roundTime goes to zero, player on hazard tile, game over.
   */
  hazardGrid: boolean[][];
  uiHooks: UiHooks;
};

/**
 * Computes the total time of the current round for the player to react and move
 * to a safe tile.
 *
 * The time decreases exponentially with each round.
 *
 * The first round starts with 135 ticks (2.25 seconds). Second rounds starts
 * a little less than 90 ticks (1.5 seconds).
 *
 * The remaining rounds are computed with the formula: 90 * 0.9^(round/10) + 10
 * For every 10 rounds the time decreases by 10%.
 *
 * The minimum time is 10 ticks (0.167 seconds) (difficulty: impossible).
 *
 *
 * @param round current round
 * @returns time in ticks
 */
const getRoundTime = (round: number) =>
  round == 0 ? 135 : Math.round(90 * Math.pow(0.9, (round - 1) / 10)) + 10;

/**
 * Default game state for the game1 2D mode.
 *
 * Rerender flag enforces UI components to reset to initial state. However it
 * somehow causes an infinite loop of rerenders on initial mount, so that's when
 * you set it to false.
 *
 * @param uiHooks UI hooks for the game state to interact with the UI
 * @param rerender trigger rerender on the UI components
 * @returns
 */
export const defaultGameState = (uiHooks: UiHooks, rerender: boolean) => {
  if (rerender) {
    uiHooks.onRoundUpdate(0);
  }
  return {
    status: GameStatus.Running,
    playerPosition: { x: 4, y: -4 },
    seed: randInt(0, 0xffffffff),
    tick: 0,
    round: 0,
    roundTime: getRoundTime(0),
    hazardGrid: range(9).map((x) =>
      range(9).map(
        (y) => seededRandom(randInt(0, 0xffffffff) + x * 9 + y) < 0.5
      )
    ),
    uiHooks,
  } as GameState;
};

export const tick = (stateRef: MutableRefObject<GameState>) => {
  // Mutate game state for performance reasons
  switch (stateRef.current.status) {
    case GameStatus.GameOver:
      return;
    case GameStatus.Running:
      // Round timer elapsed
      if (stateRef.current.roundTime === 0) {
        // is player on hazard tile?
        if (
          stateRef.current.hazardGrid[stateRef.current.playerPosition.x][
            -stateRef.current.playerPosition.y
          ]
        ) {
          // Game over
          stateRef.current.status = GameStatus.GameOver;

          // Set high score if previously empty
          if (stateRef.current.uiHooks.highScore.highScore === undefined) {
            stateRef.current.uiHooks.onNewHighScore(
              "highScore",
              stateRef.current.round.toString()
            );
            stateRef.current.uiHooks.highScore.highScore =
              stateRef.current.round.toString();
          }
          // Update high score if new high score
          else if (
            Number.parseInt(stateRef.current.uiHooks.highScore.highScore) <
            stateRef.current.round
          ) {
            stateRef.current.uiHooks.onNewHighScore(
              "highScore",
              stateRef.current.round.toString()
            );
            stateRef.current.uiHooks.highScore.highScore =
              stateRef.current.round.toString();
          }
          return;
        }

        // Next round
        stateRef.current.seed = randInt(0, 0xffffffff);
        stateRef.current.round += 1;
        stateRef.current.uiHooks.onRoundUpdate(stateRef.current.round);
        stateRef.current.hazardGrid.forEach((row, x) =>
          row.forEach((_, y) => {
            stateRef.current.hazardGrid[x][y] =
              seededRandom(stateRef.current.seed + x * 9 + y) < 0.5;
          })
        );
        stateRef.current.roundTime = getRoundTime(stateRef.current.round);
      }
      // Decrease round time
      stateRef.current.roundTime -= 1;
      break;
  }
  // always tick the game state, even if game over, reset to zero on new game
  stateRef.current.tick += 1;
};
