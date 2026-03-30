from typing import List, Optional

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

from app.game import GameError, InMemoryGameService


app = FastAPI(title="Tres en Raya API", version="1.0.0")
service = InMemoryGameService()


class MoveRequest(BaseModel):
    position: int = Field(ge=0, le=8)


class GameStateResponse(BaseModel):
    board: List[Optional[str]]
    current_player: str
    winner: Optional[str]
    is_draw: bool
    is_finished: bool
    moves: int


def to_response() -> GameStateResponse:
    state = service.get_state()
    return GameStateResponse(
        board=state.board,
        current_player=state.current_player,
        winner=state.winner,
        is_draw=state.is_draw,
        is_finished=state.is_finished,
        moves=state.moves,
    )


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/api/game/new", response_model=GameStateResponse)
def new_game() -> GameStateResponse:
    service.reset()
    return to_response()


@app.post("/api/game/reset", response_model=GameStateResponse)
def reset_game() -> GameStateResponse:
    service.reset()
    return to_response()


@app.get("/api/game", response_model=GameStateResponse)
def get_game() -> GameStateResponse:
    return to_response()


@app.post("/api/game/move", response_model=GameStateResponse)
def play_move(payload: MoveRequest) -> GameStateResponse:
    try:
        service.play(payload.position)
        return to_response()
    except GameError as error:
        raise HTTPException(status_code=400, detail=error.message) from error