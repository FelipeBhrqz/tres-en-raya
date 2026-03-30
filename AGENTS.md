# AGENTS

Reglas basicas del repositorio:

1. Commits: usar convencion Angular (Conventional Commits).
2. Pull Requests: titulo y descripcion siguiendo convencion Angular.
3. Branches de nuevas funcionalidades: feature/nombre-de-la-caracteristica.

## Division del sistema

1. Frontend
2. Backend
3. Docker files

## Responsabilidades tecnicas

### Frontend

- Interfaz del tablero 3x3.
- Manejo visual de turnos y estado de partida.
- Consumo de API del backend.

### Backend

- API de juego.
- Reglas de negocio: validacion de jugadas, ganador y empate.
- Estado de partida en memoria.

### Docker files

- Contenedorizacion de frontend y backend.
- Orquestacion con docker-compose.