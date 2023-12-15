"use client";

import Chessboard from "@/chess/ui/Chessboard";
import { useEffect, useReducer, useRef } from "react";
import lodash from "lodash";
import { PieceType } from "./PieceType";
import Piece from "./Piece";

const PIECES_DIV_ID = "piece-div";
const CHESSBOARD_ID = "chessboard-main";

type KeyedPieceInfo = {
  key: number;
  piece: PieceType;
  x: number;
  y: number;
  isOnBoard: boolean;
};

const isOnBoard = (piece: { x: number; y: number }, board: DOMRect) => {
  const { x, y, width, height } = board;
  return (
    piece.x >= x &&
    piece.x <= x + width &&
    piece.y >= y &&
    piece.y <= y + height
  );
};

export default function ChessMainUI() {
  const board = useRef<HTMLElement>();
  const pieces = useRef<Array<KeyedPieceInfo>>([
    {
      key: 0,
      piece: { player: "white", piece: "king" },
      x: 0,
      y: 0,
      isOnBoard: false,
    },
  ]);

  const chessBoardRect = useRef<DOMRect>();

  // Force update: https://stackoverflow.com/a/53837442
  // TODO: I was told this is not the way to React, so please fix
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    // debounced rect logger
    const debounce_log_rect = lodash.debounce(() => {
      console.log("board resized", board.current?.getBoundingClientRect());
    }, 100);

    // poll chessboard rect
    const handleResize = () => {
      if (board.current !== undefined) {
        const rect = board.current.getBoundingClientRect();
        if (chessBoardRect.current !== undefined) {
          let {
            x: cbrx,
            y: cbry,
            width: cbrwidth,
            height: cbrheight,
          } = chessBoardRect.current;
          let windowWidth = window.innerWidth - rect.width / (8);
          let windowHeight = window.innerHeight - rect.height / (8);
          pieces.current = pieces.current.map((p) => {
            let x = p.x;
            let y = p.y;
            x = Math.max(0, Math.min(x + rect.x - cbrx, windowWidth));
            y = Math.max(0, Math.min(y + rect.y - cbry, windowHeight));
            if (rect.width !== cbrwidth) {
              x = (x - rect.x) * (rect.width / cbrwidth) + rect.x;
              y = (y - rect.y) * (rect.height / cbrheight) + rect.y;
            }
            return {
              ...p,
              x,
              y,
              isOnBoard: isOnBoard({ x, y }, rect),
            };
          });
        }
        chessBoardRect.current = rect;
        debounce_log_rect();
        forceUpdate();
      }
    };

    // poll for chessboard element
    const pollChessBoardInterval = setInterval(() => {
      const elem = document.getElementById(CHESSBOARD_ID);
      if (elem !== null) {
        console.log("loaded chessboard", elem);
        board.current = elem;
        handleResize();
        clearInterval(pollChessBoardInterval);
      }
    }, 10);

    // listen for window resize
    window.addEventListener("resize", handleResize);

    // cleanup window resize listener and chessboard poller if not cleaned up yet
    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(pollChessBoardInterval);
    };
  }, []);

  return (
    <div className="h-full w-full flex flex-col items-center">
      <Chessboard showCoord={true} CHESSBOARD_ID={CHESSBOARD_ID} />
      <div className="absolute h-screen w-screen top-0" id={PIECES_DIV_ID}>
        {pieces.current.map((piece) => {
          return (
            <Piece
              key={piece.key}
              piece={piece.piece}
              size={
                chessBoardRect.current ? chessBoardRect.current.width / 8 : 0
              }
              origin={{ x: piece.x, y: piece.y }}
              updatePieceLocation={(x, y) => {
                pieces.current = pieces.current.map((p) => {
                  if (p.key === piece.key) {
                    return {
                      ...p,
                      x,
                      y,
                      isOnBoard: chessBoardRect.current
                        ? isOnBoard({ x, y }, chessBoardRect.current)
                        : false,
                    };
                  }
                  return p;
                });
                forceUpdate();
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
