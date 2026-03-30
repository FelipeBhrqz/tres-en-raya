# Tres en Raya

Proyecto colaborativo de Tres en Raya (Tic-Tac-Toe) dividido en **backend** (lógica del juego) y **frontend** (interfaz de usuario).

---

## Estructura del proyecto

```
tres-en-raya/
├── backend/           # Lógica del juego — NO modificar desde el frontend
│   ├── game.js        # Motor del juego: tablero, turnos, victoria, empate
│   └── index.js       # Punto de entrada del backend (re-exporta game.js)
│
├── frontend/          # Capa de presentación — A cargo del equipo de frontend
│   ├── renderer.js    # Funciones de renderizado (dibujar X, O, tablero…)  ← IMPLEMENTAR
│   └── index.js       # Bucle principal y manejadores de eventos            ← IMPLEMENTAR
│
└── README.md
```

---

## Backend — API pública

Importa el backend desde cualquier lugar del proyecto con:

```js
const game = require('./backend');
```

| Función | Descripción |
|---|---|
| `reiniciarJuego()` | Limpia el tablero y resetea el turno a `'X'`. |
| `obtenerTablero()` | Devuelve una copia del tablero (array de 9 elementos: `null`, `'X'` o `'O'`). |
| `obtenerJugadorActual()` | Devuelve `'X'` o `'O'` según el turno. |
| `obtenerResultado()` | Devuelve `'X'`, `'O'`, `'empate'` o `null` si la partida sigue. |
| `realizarMovimiento(indice)` | Realiza una jugada en la casilla `indice` (0-8). Devuelve `{ exito, mensaje }`. |
| `comprobarGanador()` | Devuelve el jugador ganador o `null`. |
| `comprobarEmpate()` | Devuelve `true` si hay empate. |
| `estaTerminada()` | Devuelve `true` si la partida ha terminado. |

### Índices del tablero

```
 0 | 1 | 2
 ---------
 3 | 4 | 5
 ---------
 6 | 7 | 8
```

---

## Frontend — Funciones a implementar

El archivo `frontend/renderer.js` contiene los **esqueletos** de las funciones de renderizado. El equipo de frontend debe implementar cada una de ellas según la tecnología elegida (DOM, canvas, consola, etc.).

| Función | Descripción |
|---|---|
| `dibujarX(indice)` | Dibuja una **X** en la casilla `indice`. |
| `dibujarO(indice)` | Dibuja un **O** (círculo) en la casilla `indice`. |
| `renderizarTablero(tablero)` | Renderiza el estado completo del tablero. |
| `mostrarGanador(jugador)` | Muestra un mensaje de victoria para `'X'` o `'O'`. |
| `mostrarEmpate()` | Muestra un mensaje de empate. |
| `limpiarTablero()` | Limpia la vista para iniciar una nueva partida. |

El archivo `frontend/index.js` conecta el backend con el renderer y expone:

| Función | Descripción |
|---|---|
| `iniciarJuego()` | Inicia o reinicia la partida. |
| `manejarCasilla(indice)` | Procesa la acción del usuario en la casilla `indice`. |

---

## Ejemplo de flujo

```js
const game = require('./backend');
const { manejarCasilla, iniciarJuego } = require('./frontend');

iniciarJuego();       // Prepara el tablero
manejarCasilla(4);    // X juega en el centro
manejarCasilla(0);    // O juega en la esquina superior izquierda
// ...
```
