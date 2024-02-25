"use client";

import Chessboard from "@/chess/ui/Chessboard";
import { useEffect, useRef, useState } from "react";
import { PositionedPiece, Position, PositionedPieceArray } from "../Types";
import Piece from "./Piece";
import { absToRelPos, initialPositionedBoardState, relToAbsPos } from "./utils";

const PIECES_DIV_ID = "piece-div";
const CHESSBOARD_ID = "chessboard-main";
const MAIN_UI_ID = "main-ui";

/**
 * Renders the main UI for the Chess game.
 */
export default function ChessMainUI() {
  /**
   * The main UI element.
   */
  const ui = useRef<HTMLDivElement>(null);

  /**
   * The size and position of the chess board.
   */
  const [chessBoardSizePos, setChessBoardSizePos] = useState<{
    size: number;
    position: Position;
  }>({
    size: 80,
    position: { x: 0, y: 0 },
  });

  /**
   * The chess pieces.
   */
  const [pieces, setPieces] = useState<PositionedPieceArray>(
    initialPositionedBoardState
  );

  const relPosMapper = absToRelPos(
    chessBoardSizePos.position,
    chessBoardSizePos.size / 8
  );

  const absPosMapper = relToAbsPos(
    chessBoardSizePos.position,
    chessBoardSizePos.size / 8
  );

  /**
   * Updates the location of a chess piece.
   *
   * This function is used as a callback for when a piece is dragged.
   * Then it will update the location of the piece in the pieces array.
   *
   * @param piece The piece to update.
   * @param data The new position data.
   */
  const pieceLocationUpdater =
    (piece: PositionedPiece) => (_: any, pos: Position) => {
      const index = pieces.findIndex((p) => p.key === piece.key);
      setPieces([
        ...pieces.slice(0, index),
        { ...piece, position: relPosMapper(pos) },
        ...pieces.slice(index + 1),
      ]);
    };

  /**
   * Handles the resize event.
   */
  const handleResize = () => {
    if (ui.current) {
      const uiRect = ui.current.getBoundingClientRect();
      const size = Math.min(Math.min(uiRect.width, 800), uiRect.height);
      const x = (uiRect.width - size) / 2;
      const y = uiRect.y;
      setChessBoardSizePos({ size, position: { x, y } });
    }
  };

  /**
   * This effect is run once when the component is mounted.
   */
  useEffect(() => {
    // listen for ChessMainUI div resize
    const observer = new ResizeObserver(handleResize);
    if (ui.current) {
      observer.observe(ui.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className="flex-1 flex flex-col items-center w-full overflow-hidden"
      id={MAIN_UI_ID}
      ref={ui}
    >
      <Chessboard
        showCoord={true}
        CHESSBOARD_ID={CHESSBOARD_ID}
        size={chessBoardSizePos.size}
        position={chessBoardSizePos.position}
        hidden={ui.current === null}
      />
      <div
        className="absolute h-screen w-screen top-0 pointer-events-none"
        id={PIECES_DIV_ID}
      >
        {
          // Renders the chess pieces.
          ui.current
            ? pieces.map((piece) => {
                return (
                  <Piece
                    {...piece}
                    position={absPosMapper(piece.position)}
                    key={piece.key}
                    size={chessBoardSizePos.size / 8}
                    onDragStop={pieceLocationUpdater(piece)}
                  />
                );
              })
            : null
        }
      </div>
    </div>
  );
}
