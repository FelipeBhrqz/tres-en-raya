/**
 * frontend/index.js
 * Punto de entrada del frontend — a cargo del equipo de frontend.
 *
 * Aquí se conecta la lógica del backend con la capa de presentación.
 * El frontend debe:
 *   1. Escuchar las interacciones del usuario (clics, teclado…).
 *   2. Llamar a las funciones del backend para actualizar el estado.
 *   3. Llamar a las funciones de renderer.js para actualizar la vista.
 *
 * TODO: implementar el bucle principal del juego y los manejadores de eventos.
 */

const game = require('../backend');
const renderer = require('./renderer');

/**
 * Inicializa el juego: reinicia el estado del backend y limpia la vista.
 * Llamar a esta función al cargar la página o al pulsar "Nueva partida".
 */
function iniciarJuego() {
  game.reiniciarJuego();
  renderer.limpiarTablero();
}

/**
 * Maneja el clic (o acción) del usuario sobre una casilla del tablero.
 *
 * @param {number} indice - Posición en el tablero (0-8) que el usuario ha seleccionado.
 *
 * TODO: conectar esta función con los eventos de la interfaz de usuario.
 */
function manejarCasilla(indice) {
  if (game.estaTerminada()) return;

  const jugador = game.obtenerJugadorActual();
  const { exito } = game.realizarMovimiento(indice);

  if (!exito) return;

  // Dibujar la ficha del jugador en la casilla
  if (jugador === 'X') {
    renderer.dibujarX(indice);
  } else {
    renderer.dibujarO(indice);
  }

  // Comprobar si la partida ha terminado
  const resultado = game.obtenerResultado();
  if (resultado === 'X' || resultado === 'O') {
    renderer.mostrarGanador(resultado);
  } else if (resultado === 'empate') {
    renderer.mostrarEmpate();
  }
}

module.exports = { iniciarJuego, manejarCasilla };
