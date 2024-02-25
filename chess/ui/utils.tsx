import { MutableRefObject } from "react";
import {
  BoardState,
  HEIGHT,
  Position,
  PositionedPiece,
  PositionedPieceArray,
  WIDTH,
} from "../Types";
import { initialBoardState } from "../BoardState";

export const boardStateToRelPos = (
  boardState: BoardState
): PositionedPieceArray =>
  boardState.board.flatMap((row, y) =>
    row.map((piece, x) => ({
      key: x + y * 8,
      piece,
      position: { x, y },
    }))
  );

export const initialPositionedBoardState =
  boardStateToRelPos(initialBoardState);

export const relToAbsPos =
  (origin: Position, size: number) =>
  (pos: Position): Position => ({
    x: origin.x + pos.x * size,
    y: origin.y + pos.y * size,
  });

export const absToRelPos =
  (origin: Position, size: number) =>
  (pos: Position): Position => ({
    x: (pos.x - origin.x) / size,
    y: (pos.y - origin.y) / size,
  });

export const isOnBoardWithBoardAndPiece =
  (origin: Position, size: number) => (position: Position) => {
    let halfSize = size / 2;
    return (
      position.x >= origin.x - halfSize &&
      position.x < origin.x + size * WIDTH + halfSize &&
      position.y >= origin.y - halfSize &&
      position.y < origin.y + size * HEIGHT + halfSize
    );
  };
