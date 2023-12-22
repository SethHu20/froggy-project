import { MutableRefObject } from "react";
import {
  BoardState,
  HEIGHT,
  Position,
  ViewModelPiece,
  ViewModelPieceArray,
  WIDTH,
} from "../Types";
import { initialBoardState } from "../BoardState";

export function boardStateToRelativeCoordinates(
  boardState: BoardState
): ViewModelPieceArray {
  return boardState.board.flatMap((row, y) => {
    return row.map((piece, x) => {
      return {
        key: x + y * 8,
        piece,
        position: { x, y },
      };
    });
  });
}

export function relativeToAbsoluteCoordinatesArray(
  relative: ViewModelPieceArray,
  origin: Position,
  size: number
): ViewModelPieceArray {
  return relative.map((piece) => {
    return {
      ...piece,
      position: {
        x: origin.x + piece.position.x * size,
        y: origin.y + piece.position.y * size,
      },
    };
  });
}

export function populateChessMainUI(
  pieces: MutableRefObject<ViewModelPieceArray>,
  rect: DOMRect,
  forceUpdate: () => void
) {
  pieces.current = relativeToAbsoluteCoordinatesArray(
    boardStateToRelativeCoordinates(initialBoardState),
    { x: rect.x, y: rect.y },
    rect.width / 8
  );
  forceUpdate();
}

export const relativeToAbsoluteCoordinates =
  (origin: Position, size: number) => (piece: ViewModelPiece) => ({
    ...piece,
    position: {
      x: origin.x + piece.position.x * size,
      y: origin.y + piece.position.y * size,
    },
  });

export const absoluteToRelativeCoordinates =
  (origin: Position, size: number) => (piece: ViewModelPiece) => ({
    ...piece,
    position: {
      x: (piece.position.x - origin.x) / size,
      y: (piece.position.y - origin.y) / size,
    },
  });

export const resizeLocationConverter = ()

export const isOnBoardWithBoardAndPiece = (origin: Position, size: number) => (
  position: Position
) => {
    let halfSize = size / 2;
  return (
    position.x >= origin.x - halfSize &&
    position.x < origin.x + size * WIDTH + halfSize &&
    position.y >= origin.y - halfSize &&
    position.y < origin.y + size * HEIGHT + halfSize
  );
}
