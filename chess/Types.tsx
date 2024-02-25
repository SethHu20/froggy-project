export const WIDTH = 8;
export const HEIGHT = 8;

export type Square = { file: number; rank: number };

// TODO: Include en passant, castling, and halfmove clock when going to implement
// game logic.
export type BoardState = {
  board: Array<Array<PlayerPiece>>;
};

export type PieceType =
  | "bishop"
  | "king"
  | "knight"
  | "pawn"
  | "queen"
  | "rook";

export type Player = "black" | "white";

export type PlayerPiece = {
  player: Player;
  piece: PieceType;
};

// The following types are used for rendering purposes only.

/**
 * Since html elements originate from the top left corner, by convention, a
 * chessboard's top left corner is A8, and the bottom right corner is H1.
 *
 * That means a relative position of (0, 0) is A8, and (7, 7) is H1.
 */

/**
 * Viewport coordinates of an element
 */
export type Position = { x: number; y: number };

/**
 * A piece that is rendered on the screen.
 */
export type PositionedPiece = {
  key: number;
  piece: PlayerPiece;
  position: Position;
};

/**
 * An array of PositionedPiece.
 */
export type PositionedPieceArray = Array<PositionedPiece>;
