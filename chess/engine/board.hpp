#pragma once
#include <vector>

enum Piece {
  None,
  Pawn,
  Knight,
  Bishop,
  Rook,
  Queen,
  King
};

class Board {
  public:
  Board();
  private:
  std::vector<Piece> board;
};