# Backend API Contract

This document defines the expected API endpoints and data structures for the tic tac toe backend.

## Base URL
`http://localhost:8000`

## Endpoints

### 1. Create New Game
**POST** `/game/new`

**Request:**
```json
{
  "session_id": "uuid-string"
}
```

**Response:**
```json
{
  "session_id": "uuid-string",
  "board": [null, null, null, null, null, null, null, null, null],
  "current_player": "X",
  "game_over": false,
  "winner": null
}
```

### 2. Make a Move
**POST** `/game/move`

**Request:**
```json
{
  "session_id": "uuid-string",
  "position": 0
}
```

**Response:**
```json
{
  "session_id": "uuid-string",
  "board": ["X", null, null, null, null, null, null, null, null],
  "current_player": "O",
  "game_over": false,
  "winner": null,
  "valid_move": true
}
```

### 3. Get Game State
**GET** `/game/state?session_id=uuid-string`

**Response:**
```json
{
  "session_id": "uuid-string",
  "board": ["X", null, null, null, null, null, null, null, null],
  "current_player": "O",
  "game_over": false,
  "winner": null
}
```

## Game State Object

- **session_id** (string): Unique identifier for the game session
- **board** (array): 9-element array representing the board (positions 0-8, left-to-right, top-to-bottom)
  - Values: `null` (empty), `"X"`, or `"O"`
- **current_player** (string): "X" or "O"
- **game_over** (boolean): True if game has ended
- **winner** (string|null): "X" or "O" if someone won, null otherwise

## Error Handling

- **400 Bad Request**: Invalid move or malformed request
- **404 Not Found**: Session not found
- **500 Internal Server Error**: Backend error
