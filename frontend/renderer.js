/**
 * frontend/renderer.js
 * Esqueleto de las funciones de renderizado — a cargo del equipo de frontend.
 *
 * Este archivo define las interfaces que el frontend debe implementar para
 * visualizar el juego. Cada función recibe los datos necesarios desde el
 * backend (importado con `require('../backend')`) y debe encargarse de
 * actualizar la interfaz de usuario.
 *
 * ⚠️  IMPORTANTE PARA EL FRONTEND:
 *   - NO modifiques el backend (`../backend/`).
 *   - Implementa cada función TODOaquí abajo.
 *   - Puedes añadir funciones auxiliares propias en este mismo archivo o
 *     en nuevos archivos dentro de `frontend/`.
 */

// ---------------------------------------------------------------------------
// Ejemplo de cómo conectar con el backend:
//
//   const game = require('../backend');
//   game.reiniciarJuego();
//   const resultado = game.realizarMovimiento(4); // casilla central
//   console.log(game.obtenerTablero());
// ---------------------------------------------------------------------------

/**
 * Dibuja una equis (X) en la posición indicada del tablero visual.
 *
 * @param {number} indice - Posición en el tablero (0-8).
 *                          0=esquina superior izquierda … 8=esquina inferior derecha.
 * TODO: implementar la representación visual de la X (DOM, canvas, consola…).
 */
function dibujarX(indice) {
  // TODO: implementar
  throw new Error('dibujarX() aún no está implementada por el frontend.');
}

/**
 * Dibuja un círculo (O) en la posición indicada del tablero visual.
 *
 * @param {number} indice - Posición en el tablero (0-8).
 * TODO: implementar la representación visual del círculo (DOM, canvas, consola…).
 */
function dibujarO(indice) {
  // TODO: implementar
  throw new Error('dibujarO() aún no está implementada por el frontend.');
}

/**
 * Renderiza el estado completo del tablero.
 * Se debe llamar cada vez que cambia el estado de la partida.
 *
 * @param {Array<null|'X'|'O'>} tablero - Array de 9 elementos devuelto por
 *   `game.obtenerTablero()`. Los valores posibles por casilla son:
 *   - null → casilla vacía
 *   - 'X'  → casilla ocupada por X
 *   - 'O'  → casilla ocupada por O
 * TODO: recorrer el tablero y llamar a dibujarX / dibujarO según corresponda.
 */
function renderizarTablero(tablero) {
  // TODO: implementar
  throw new Error('renderizarTablero() aún no está implementada por el frontend.');
}

/**
 * Muestra un mensaje indicando quién ha ganado la partida.
 *
 * @param {'X'|'O'} jugador - El jugador ganador ('X' o 'O').
 * TODO: mostrar un mensaje, modal, animación, etc.
 */
function mostrarGanador(jugador) {
  // TODO: implementar
  throw new Error('mostrarGanador() aún no está implementada por el frontend.');
}

/**
 * Muestra un mensaje indicando que la partida ha terminado en empate.
 * TODO: mostrar un mensaje, modal, animación, etc.
 */
function mostrarEmpate() {
  // TODO: implementar
  throw new Error('mostrarEmpate() aún no está implementada por el frontend.');
}

/**
 * Limpia/reinicia la vista del tablero para comenzar una nueva partida.
 * Se debe llamar junto con `game.reiniciarJuego()` del backend.
 * TODO: limpiar el DOM, canvas u otro sistema de renderizado utilizado.
 */
function limpiarTablero() {
  // TODO: implementar
  throw new Error('limpiarTablero() aún no está implementada por el frontend.');
}

module.exports = {
  dibujarX,
  dibujarO,
  renderizarTablero,
  mostrarGanador,
  mostrarEmpate,
  limpiarTablero,
};
