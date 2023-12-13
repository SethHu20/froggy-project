import BishopBlack from "@/public/pieces/cburnett/Chess_bdt45.svg";
import BishopWhite from "@/public/pieces/cburnett/Chess_blt45.svg";
import KingBlack from "@/public/pieces/cburnett/Chess_kdt45.svg";
import KingWhite from "@/public/pieces/cburnett/Chess_klt45.svg";
import KnightBlack from "@/public/pieces/cburnett/Chess_ndt45.svg";
import KnightWhite from "@/public/pieces/cburnett/Chess_nlt45.svg";
import PawnBlack from "@/public/pieces/cburnett/Chess_pdt45.svg";
import PawnWhite from "@/public/pieces/cburnett/Chess_plt45.svg";
import QueenBlack from "@/public/pieces/cburnett/Chess_qdt45.svg";
import QueenWhite from "@/public/pieces/cburnett/Chess_qlt45.svg";
import RookBlack from "@/public/pieces/cburnett/Chess_rdt45.svg";
import RookWhite from "@/public/pieces/cburnett/Chess_rlt45.svg";

export type Piece = "bishop" | "king" | "knight" | "pawn" | "queen" | "rook";

export type Player = "black" | "white";

export type PieceType = {
  player: Player;
  piece: Piece;
};

export const get_svg = (piece: PieceType) => {
  switch (piece.piece) {
    case "bishop":
      return piece.player === "black" ? BishopBlack : BishopWhite;
    case "king":
      return piece.player === "black" ? KingBlack : KingWhite;
    case "knight":
      return piece.player === "black" ? KnightBlack : KnightWhite;
    case "pawn":
      return piece.player === "black" ? PawnBlack : PawnWhite;
    case "queen":
      return piece.player === "black" ? QueenBlack : QueenWhite;
    case "rook":
      return piece.player === "black" ? RookBlack : RookWhite;
  }
};
