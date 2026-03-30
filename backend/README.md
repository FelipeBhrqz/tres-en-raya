# Backend

Servicio API en Python para reglas de negocio del Tres en Raya.

## Stack

- FastAPI
- Uvicorn

## Ejecutar local

1. Crear entorno virtual.
2. Instalar dependencias con `pip install -r requirements.txt`.
3. Levantar servidor con `uvicorn app.main:app --reload --host 0.0.0.0 --port 8000`.

## Endpoints

- GET /health
- GET /api/game
- POST /api/game/new
- POST /api/game/reset
- POST /api/game/move

Body para jugada:

{
	"position": 0
}

Reglas:

- Posiciones validas: 0 a 8.
- Turnos alternados entre X y O.
- Rechaza jugadas en casillas ocupadas.
- Detecta ganador o empate.