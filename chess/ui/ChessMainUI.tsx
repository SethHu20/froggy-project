"use client";

import Chessboard from "@/chess/ui/Chessboard";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import {
  Position,
  PositionedPiece,
  PositionedPieceArray,
  UIConfig,
} from "../Types";
import Piece from "./Piece";
import {
  absToRelPos,
  initialPositionedBoardState,
  relToAbsPos,
} from "./utils/position";
import {
  chessBoardPosition as getChessBoardPosition,
  chessBoardSize as getChessBoardSize,
  isPortraitLayout,
} from "./utils/responsiveLayout";

const SIDEBAR_MIN_WIDTH = 300;
const SIDEBAR_MIN_HEIGHT = 200;

/**
 * Renders the main UI for the Chess game.
 */
export default function ChessMainUI({ config }: { config: UIConfig }) {
  /**
   * The main UI element.
   */
  const ui = useRef<HTMLDivElement>(null);

  /**
   * The size of the chess board.
   */
  const [chessBoardSize, setChessBoardSize] = useState<number>(0);

  /**
   * The position of the chess board, in absolute position space.
   */
  const [chessBoardPosition, setChessBoardPosition] = useState<Position>({
    x: 0,
    y: 0,
  });

  /**
   * Whether to position chess board and config panels in portrait mode.
   */
  const [portraitMode, setPortraitMode] = useState<boolean>(true);

  /**
   * The chess pieces.
   */
  const [pieces, setPieces] = useState<PositionedPieceArray>(
    initialPositionedBoardState
  );

  const relPosMapper = absToRelPos(chessBoardPosition, chessBoardSize / 8);

  const absPosMapper = relToAbsPos(chessBoardPosition, chessBoardSize / 8);

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
    if (ui.current === null) return;
    setPortraitMode(
      isPortraitLayout(ui.current.clientWidth, ui.current.clientHeight)
    );
    setChessBoardSize(
      getChessBoardSize(
        ui.current.clientWidth,
        ui.current.clientHeight,
        portraitMode,
        SIDEBAR_MIN_WIDTH,
        SIDEBAR_MIN_HEIGHT,
        config.sidebar
      )
    );
    const relativeChessBoardPosition = getChessBoardPosition(
      ui.current.clientWidth,
      ui.current.clientHeight,
      chessBoardSize,
      portraitMode,
      config.sidebar
    );
    setChessBoardPosition({
      x: relativeChessBoardPosition.x + ui.current.offsetLeft,
      y: relativeChessBoardPosition.y + ui.current.offsetTop,
    });
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
  });

  return (
    <div
      className={clsx(`flex flex-1`, portraitMode ? "flex-col" : "flex-row")}
      ref={ui}
    >
      <Chessboard
        coordinatesConfig={config.coordinates}
        size={chessBoardSize}
        position={chessBoardPosition}
        hidden={ui.current === null}
      />
      <div
        className="absolute h-screen w-screen top-0 left-0 pointer-events-none overflow-hidden" // don't capture any mouse events
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
                    size={chessBoardSize / 8}
                    onDragStopAction={pieceLocationUpdater(piece)}
                  />
                );
              })
            : null
        }
      </div>
      <div
        className="bg-slate-600"
        style={
          portraitMode
            ? { width: 0, height: chessBoardSize }
            : { width: chessBoardSize, height: 0 }
        }
      ></div>
      {config.sidebar ? (
        <div className="bg-gray-800 basis-20 flex-grow">
          <h2>Sidebar panel is still under construction!</h2>
        </div>
      ) : null}
    </div>
  );
}
