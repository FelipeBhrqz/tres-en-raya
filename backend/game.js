/**
 * backend/game.js
 * Lógica del juego Tres en Raya (Tic-Tac-Toe).
 *
 * Este módulo gestiona el estado del tablero, los turnos de los jugadores,
 * la validación de movimientos y la detección de victoria o empate.
 * El frontend solo necesita importar estas funciones y llamarlas según
 * las acciones del usuario.
 */

// Representación del tablero: array de 9 posiciones (índices 0-8).
// null  → casilla vacía
// 'X'   → jugada del jugador X
// 'O'   → jugada del jugador O
//
//   0 | 1 | 2
//   ---------
//   3 | 4 | 5
//   ---------
//   6 | 7 | 8

/** @type {Array<null|'X'|'O'>} */
let tablero = Array(9).fill(null);

/** @type {'X'|'O'} */
let jugadorActual = 'X';

/** @type {'X'|'O'|'empate'|null} */
let resultado = null;

// Combinaciones ganadoras (índices del tablero)
const COMBINACIONES_GANADORAS = [
  [0, 1, 2], // fila superior
  [3, 4, 5], // fila central
  [6, 7, 8], // fila inferior
  [0, 3, 6], // columna izquierda
  [1, 4, 7], // columna central
  [2, 5, 8], // columna derecha
  [0, 4, 8], // diagonal principal
  [2, 4, 6], // diagonal secundaria
];

/**
 * Reinicia el juego: limpia el tablero, establece el turno inicial en 'X'
 * y borra el resultado anterior.
 */
function reiniciarJuego() {
  tablero = Array(9).fill(null);
  jugadorActual = 'X';
  resultado = null;
}

/**
 * Devuelve una copia del estado actual del tablero.
 * @returns {Array<null|'X'|'O'>} Copia del tablero (array de 9 elementos).
 */
function obtenerTablero() {
  return [...tablero];
}

/**
 * Devuelve el jugador al que le toca mover.
 * @returns {'X'|'O'} Jugador actual.
 */
function obtenerJugadorActual() {
  return jugadorActual;
}

/**
 * Devuelve el resultado de la partida en curso.
 * @returns {'X'|'O'|'empate'|null}
 *   - 'X' o 'O' si hay un ganador.
 *   - 'empate' si el tablero está lleno sin ganador.
 *   - null si la partida sigue en juego.
 */
function obtenerResultado() {
  return resultado;
}

/**
 * Intenta realizar un movimiento en la casilla indicada.
 *
 * @param {number} indice - Posición en el tablero (0-8).
 * @returns {{ exito: boolean, mensaje: string }}
 *   `exito: true` si el movimiento es válido y se ha realizado;
 *   `exito: false` con un mensaje de error en caso contrario.
 */
function realizarMovimiento(indice) {
  if (resultado !== null) {
    return { exito: false, mensaje: 'La partida ya ha terminado.' };
  }

  if (indice < 0 || indice > 8 || !Number.isInteger(indice)) {
    return { exito: false, mensaje: 'Índice fuera de rango. Debe ser un entero entre 0 y 8.' };
  }

  if (tablero[indice] !== null) {
    return { exito: false, mensaje: 'La casilla ya está ocupada.' };
  }

  tablero[indice] = jugadorActual;

  const ganador = comprobarGanador();
  if (ganador) {
    resultado = ganador;
  } else if (comprobarEmpate()) {
    resultado = 'empate';
  } else {
    jugadorActual = jugadorActual === 'X' ? 'O' : 'X';
  }

  return { exito: true, mensaje: `Movimiento realizado por ${jugadorActual === tablero[indice] ? jugadorActual : (jugadorActual === 'X' ? 'O' : 'X')}.` };
}

/**
 * Comprueba si algún jugador ha completado una combinación ganadora.
 * @returns {'X'|'O'|null} El jugador ganador, o null si no hay ganador.
 */
function comprobarGanador() {
  for (const [a, b, c] of COMBINACIONES_GANADORAS) {
    if (tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c]) {
      return tablero[a];
    }
  }
  return null;
}

/**
 * Comprueba si el tablero está lleno sin ganador (empate).
 * @returns {boolean} true si hay empate, false en caso contrario.
 */
function comprobarEmpate() {
  return tablero.every((casilla) => casilla !== null) && comprobarGanador() === null;
}

/**
 * Indica si la partida ha terminado (hay ganador o empate).
 * @returns {boolean}
 */
function estaTerminada() {
  return resultado !== null;
}

module.exports = {
  reiniciarJuego,
  obtenerTablero,
  obtenerJugadorActual,
  obtenerResultado,
  realizarMovimiento,
  comprobarGanador,
  comprobarEmpate,
  estaTerminada,
};
