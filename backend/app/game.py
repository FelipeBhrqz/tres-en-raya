from dataclasses import dataclass, field
from typing import List, Optional


WINNING_LINES = [
    (0, 1, 2),
    (3, 4, 5),
    (6, 7, 8),
    (0, 3, 6),
    (1, 4, 7),
    (2, 5, 8),
    (0, 4, 8),
    (2, 4, 6),
]


@dataclass
class GameState:
    board: List[Optional[str]] = field(default_factory=lambda: [None] * 9)
    current_player: str = "X"
    winner: Optional[str] = None
    is_draw: bool = False
    is_finished: bool = False
    moves: int = 0


class GameError(Exception):
    def __init__(self, message: str):
        super().__init__(message)
        self.message = message


class InMemoryGameService:
    def __init__(self) -> None:
        self._state = GameState()

    def get_state(self) -> GameState:
        return self._state

    def reset(self) -> GameState:
        self._state = GameState()
        return self._state

    def play(self, position: int) -> GameState:
        state = self._state

        if state.is_finished:
            raise GameError("La partida ya termino. Reinicia para volver a jugar.")

        if position < 0 or position > 8:
            raise GameError("La posicion debe estar entre 0 y 8.")

        if state.board[position] is not None:
            raise GameError("La posicion ya esta ocupada.")

        state.board[position] = state.current_player
        state.moves += 1

        winner = self._find_winner(state.board)
        if winner:
            state.winner = winner
            state.is_finished = True
            return state

        if state.moves == 9:
            state.is_draw = True
            state.is_finished = True
            return state

        state.current_player = "O" if state.current_player == "X" else "X"
        return state

    @staticmethod
    def _find_winner(board: List[Optional[str]]) -> Optional[str]:
        for a, b, c in WINNING_LINES:
            if board[a] and board[a] == board[b] == board[c]:
                return board[a]
        return None