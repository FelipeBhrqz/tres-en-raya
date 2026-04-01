# tres-en-raya


Proyecto simple de Tres en Raya dividido en tres bloques:

1. frontend
2. backend
3. docker

## Objetivo

Definir una separacion clara entre Frontend, Backend y Docker files para un proyecto colaborativo sencillo.

## Cómo Ejecutar el Proyecto

### Prerrequisitos

- Docker y Docker Compose instalados en tu sistema.

### Pasos para Ejecutar

1. Clona el repositorio:
   ```
   git clone <url-del-repositorio>
   cd tres-en-raya
   ```

2. Navega al directorio de Docker:
   ```
   cd docker
   ```

3. Ejecuta Docker Compose:
   ```
   docker compose up --build
   ```

4. Accede a la aplicación:
   - Frontend: Abre tu navegador y ve a `http://localhost:8501`
   - Backend API: Disponible en `http://localhost:8000`

### Detener la Aplicación

Para detener los contenedores, presiona `Ctrl+C` en la terminal o ejecuta:
```
docker-compose down
```


## Responsabilidades por bloque

### Frontend

- Renderizar tablero 3x3.
- Capturar jugadas por turnos (X y O).
- Mostrar estado de partida: turno, ganador o empate.
- Consumir API del backend para crear partida y enviar jugadas.

### Backend

- Exponer API HTTP para gestionar partida.
- Validar reglas del juego: turno correcto, posicion disponible, deteccion de ganador y empate.
- Mantener estado de partida en memoria para esta version simple.

### Docker files

- Definir Dockerfile del frontend.
- Definir Dockerfile del backend.
- Definir docker-compose para levantar ambos servicios.

## Flujo de alto nivel

1. Frontend solicita al backend crear o reiniciar partida.
2. Usuario realiza jugada en frontend.
3. Frontend envia la jugada al backend.
4. Backend valida reglas, actualiza estado y responde.
5. Frontend actualiza UI con el nuevo estado.

## Alcance actual

- Esta fase define estructura y diseno.
- No se implementan tests para mantener el proyecto simple.

