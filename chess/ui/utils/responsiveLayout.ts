import { Position } from "@/chess/Types";

/**
 * Tailwind breakpoints.
 */
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

/**
 * Check if the Chess UI layout is portrait.
 * 
 * @param width Chess UI width
 * @param height Chess UI height
 * @returns 
 */
export const isPortraitLayout = (width: number, height: number) => {
  return width < breakpoints.sm || height > width;
};

/**
 * Compute chess board size, giving room for config panels.
 * 
 * @param width Chess UI width
 * @param height Chess UI height 
 * @param isPortraitLayout Chess UI layout
 * @param sideBarWidth Minimum sidebar width
 * @param sideBarHeight Minimum sidebar height
 * @returns 
 */
export const chessBoardSize = (
  width: number,
  height: number,
  isPortraitLayout: boolean,
  sideBarWidth: number,
  sideBarHeight: number,
  sidebar: boolean
) => {
  if (!sidebar) {
    return Math.min(width, height);
  }
  if (isPortraitLayout) {
    return Math.min(width, height - sideBarHeight);
  }
  return Math.min(width - sideBarWidth, height);
};

/**
 * Compute chess board position, chessboard is placed in absolute position space.
 * 
 * Note that the returned position only corresponds to the absolute position
 * relative to the Chess UI layout, which does not include other elements such as
 * header bar, therefore the chess piece div (which covers the entire screen) should
 * have its origin adjusted accordingly.
 * 
 * @param width 
 * @param height 
 * @param chessBoardSize 
 * @param isPortraitLayout 
 * @returns 
 */
export const chessBoardPosition = (
  width: number,
  height: number,
  chessBoardSize: number,
  isPortraitLayout: boolean,
  sidebar: boolean
): Position => {
  if (!sidebar) {
    return { x: (width - chessBoardSize) / 2, y: (height - chessBoardSize) / 2 };
  }
  if (isPortraitLayout) {
    return { x: (width - chessBoardSize) / 2, y: 0 };
  }
  return { x: 0, y: (height - chessBoardSize) / 2 };
};
