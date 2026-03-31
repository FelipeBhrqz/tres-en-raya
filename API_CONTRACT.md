# Backend API Contract

## Base URL
http://localhost:8000

## Endpoints

POST /api/game/new  
POST /api/game/move  
GET /api/game  

## Body para jugada

{
  "position": 0
}

## Response

{
  "board": [...],
  "current_player": "X",
  "winner": null,
  "is_draw": false,
  "is_finished": false,
  "moves": 3
}
