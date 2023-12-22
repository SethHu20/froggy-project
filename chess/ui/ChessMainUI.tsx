"use client";

import Chessboard from "@/chess/ui/Chessboard";
import { MutableRefObject, useEffect, useReducer, useRef } from "react";
import lodash from "lodash";
import {
  HEIGHT,
  ViewModelPiece,
  WIDTH,
  Position,
  ViewModelPieceArray,
} from "../Types";
import Piece from "./Piece";
import {
  isOnBoardWithBoardAndPiece as isOnBoardGivenBoard,
  populateChessMainUI,
  relativeToAbsoluteCoordinates,
} from "./utils";

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
  const ui = useRef<HTMLElement>();

  /**
   * The chessboard element.
   */
  const board = useRef<HTMLElement>();

  /**
   * The chess pieces.
   */
  const pieces = useRef<ViewModelPieceArray>([
    {
      key: 0,
      piece: { player: "white", piece: "king" },
      position: { x: 0, y: 0 },
    },
  ]);

  /**
   * The chessboard element's rect.
   * A rect is a DOMRect object, which is a set of read-only properties
   * describing a rectangle. Usually a DOMRect object is returned when calling
   * getBoundingClientRect() on an element.
   *
   * I totally did not generate this (and everything else) with copilot.
   */
  const chessBoardRect = useRef<DOMRect>();

  // TODO: I was told this is not the way to React, so please fix
  /**
   * Forces the current React component to re-render.
   * Source: https://stackoverflow.com/a/53837442
   */
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

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
    (piece: ViewModelPiece) => (_: any, position: Position) => {
      const index = pieces.current.findIndex((p) => p.key == piece.key);
      pieces.current[index] = {
        ...pieces.current[index],
        position: {
          x: position.x,
          y: position.y,
        },
      };
      forceUpdate();
    };

  /**
   * The size of the chessboard.
   * This is calculated by getting the minimum of the width and height of the
   * chessboard element, and 800.
   */
  const getBoardSize = (ui: MutableRefObject<HTMLElement | undefined>) => {
    if (ui.current === undefined) return 80;
    const rect = ui.current.getBoundingClientRect();
    return Math.min(rect.width, rect.height, 800);
  };

  const getBoardPosition = (ui: MutableRefObject<HTMLElement | undefined>) => {
    if (ui.current === undefined) return { x: 0, y: 0 };
    const rect = ui.current.getBoundingClientRect();
    return { x: (rect.width - getBoardSize(ui)) / 2, y: rect.y };
  };

  /**
   * This effect is run once when the component is mounted.
   */
  useEffect(() => {
    // debounced rect logger
    const debounce_log_rect = lodash.debounce(() => {
      console.log("board resized", board.current?.getBoundingClientRect());
    }, 100); // 100 milliseconds

    /**
     * Handles the resize event.
     */
    const handleResize = () => {
      if (board.current && chessBoardRect.current) {
        /**
         * The new rect of the chessboard element. This is the rect of the
         * chessboard element after it has been resized. This is used to
         * calculate the new positions of the chess pieces. The old rect is
         * stored in chessBoardRect.current.
         */
        const newRect = board.current.getBoundingClientRect();
        let oldRect = chessBoardRect.current;

        /**
         * The new window width and height.
         * This is used to clamp the new positions of the chess pieces.
         *
         * The chess pieces SVG has its origin at the top left corner, therefore
         * the window dimensions are subtracted by the width and height of the
         * chess piece size respectively. So the chess pieces will not end up
         * outside of the window.
         */
        let windowWidth = window.innerWidth - newRect.width / WIDTH;
        let windowHeight = window.innerHeight - newRect.height / HEIGHT;

        const getIsOnBoard = isOnBoardGivenBoard(newRect, windowWidth / WIDTH);

        const isResized =
          newRect.width != oldRect.width || newRect.height != oldRect.height;

        if (isResized) {
          const relocater = 

          pieces.current = pieces.current.map((p) => {
            let position = p.position;
            let isOnBoard = getIsOnBoard(position);

            if (!isOnBoard) {
              position = {
                x: Math.max(0, Math.min(position.x, windowWidth)),
                y: Math.max(0, Math.min(position.y, windowHeight)),
              };
            }

            return {
              ...p,
              position,
            };
          });
        }

        /**
         * Updates the positions of the chess pieces.
         */
        pieces.current = pieces.current.map((p) => {
          let position = p.position;
          let isOnBoard = getIsOnBoard(position);

          /**
           * The new x and y positions of the chess piece. This is calculated
           * by adding the difference between the old and new chessboard rects
           * to the old x and y positions of the chess piece. The new x and y
           * positions are then clamped to the window width and height.
           */
          // x = Math.max(0, Math.min(x + newRect.x - oldRect.x, windowWidth));
          // y = Math.max(0, Math.min(y + newRect.y - oldRect.y, windowHeight));

          // calculate the resize ratio, if the width of the chessboard
          // changed, then the pieces should be resized as well

          return {
            ...p,
            position,
          };
        });

        // update the old rect
        chessBoardRect.current = newRect;
        debounce_log_rect();
        forceUpdate();
      }
    };

    /**
     * Polls for the chessboard element.
     */
    const initPolling = setInterval(() => {
      if (ui.current === undefined) {
        const uiElem = document.getElementById(MAIN_UI_ID);
        if (uiElem !== null) {
          console.log("loaded main ui", uiElem);
          ui.current = uiElem;
          forceUpdate();
        }
      } else {
        const boardElem = document.getElementById(CHESSBOARD_ID);
        if (boardElem !== null) {
          console.log("loaded chessboard", boardElem);
          board.current = boardElem;

          const rect = boardElem.getBoundingClientRect();
          chessBoardRect.current = rect;

          handleResize();
          clearInterval(initPolling);
          populateChessMainUI(pieces, rect, forceUpdate);
          console.log("loaded pieces", pieces.current);
        }
      }
    }, 10);

    // listen for window resize, and call handleResize when it happens
    window.addEventListener("resize", lodash.debounce(handleResize, 100));

    // cleanup window resize listener and chessboard poller if not cleaned up yet
    // when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(initPolling);
    };
  }, []);

  return (
    <div
      className="flex-1 flex flex-col items-center w-full overflow-hidden"
      id={MAIN_UI_ID}
    >
      <div className="h-full w-full">
        <Chessboard
          showCoord={true}
          CHESSBOARD_ID={CHESSBOARD_ID}
          size={getBoardSize(ui)}
          position={getBoardPosition(ui)}
          hidden={false}
        />
      </div>
      <div
        className="absolute h-screen w-screen top-0 pointer-events-none"
        id={PIECES_DIV_ID}
      >
        {
          // Renders the chess pieces.
          pieces.current.map((piece) => {
            return (
              <Piece
                {...piece}
                key={piece.key}
                size={
                  chessBoardRect.current ? chessBoardRect.current.width / 8 : 0
                }
                onDragStop={pieceLocationUpdater(piece)}
              />
            );
          })
        }
      </div>
    </div>
  );
}
