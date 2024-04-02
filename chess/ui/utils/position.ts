import { initialBoardState } from "../../BoardState";
import {
  BoardState,
  HEIGHT,
  Position,
  PositionedPieceArray,
  WIDTH,
} from "../../Types";

/**
 * Convert board state to corresponding pieces in relative position.
 *
 * @param boardState
 * @returns
 */
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

/**
 * Initial positioned board state.
 */
export const initialPositionedBoardState =
  boardStateToRelPos(initialBoardState);

/**
 * Convert pieces in relative position to absolute position in DOM.
 *
 * @param origin
 * @param size
 * @returns
 */
export const relToAbsPos =
  (origin: Position, size: number) =>
  (pos: Position): Position => ({
    x: origin.x + pos.x * size,
    y: origin.y + pos.y * size,
  });

/**
 * Convert DOM space absolute position to relative position.
 *
 * @param origin
 * @param size
 * @returns
 */
export const absToRelPos =
  (origin: Position, size: number) =>
  (pos: Position): Position => ({
    x: (pos.x - origin.x) / size,
    y: (pos.y - origin.y) / size,
  });

/**
 * Check if a chess piece DOM space absolute position is on the board.
 *
 * @param origin
 * @param size
 * @returns
 */
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
