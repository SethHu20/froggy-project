import { Vector3 } from "@react-three/fiber";
import { range } from "lodash";
import { MutableRefObject } from "react";
import { randInt, seededRandom } from "three/src/math/MathUtils.js";

export type Position = { x: number; y: number };

export enum GameStatus {
  Running,
  GameOver,
}

export type UiHooks = {
  onRoundUpdate: (round: number) => void;
  highScore: { highScore: string };
  onNewHighScore: (name: string, value: string) => void;
};

export type GameState = {
  status: GameStatus;
  playerPosition: Position;
  seed: number;
  tick: number;
  round: number;
  roundTime: number;
  hazardGrid: boolean[][];
  uiHooks: UiHooks;
};

const getRoundTime = (round: number) =>
  round == 0 ? 135 : Math.round(90 * Math.pow(0.9, (round - 1) / 10)) + 10;
// const getRoundTime = (round: number) => 10;

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
      if (stateRef.current.roundTime === 0) {
        if (
          stateRef.current.hazardGrid[stateRef.current.playerPosition.x][
            -stateRef.current.playerPosition.y
          ]
        ) {
          stateRef.current.status = GameStatus.GameOver;
          if (stateRef.current.uiHooks.highScore["highScore"] === undefined) {
            stateRef.current.uiHooks.onNewHighScore(
              "highScore",
              stateRef.current.round.toString()
            );
          }
          else if (
            Number.parseInt(stateRef.current.uiHooks.highScore["highScore"]) <
            stateRef.current.round
          )
            stateRef.current.uiHooks.onNewHighScore(
              "highScore",
              stateRef.current.round.toString()
            );
          return;
        }

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
      stateRef.current.roundTime -= 1;
      break;
  }
  stateRef.current.tick += 1;
};
