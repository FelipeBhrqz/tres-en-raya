/**
 * backend/index.js
 * Punto de entrada del backend.
 * Re-exporta todas las funciones de lógica del juego para que el frontend
 * pueda importar desde un único lugar.
 *
 * Uso desde el frontend:
 *   const game = require('../backend');
 *   game.reiniciarJuego();
 *   game.realizarMovimiento(4);
 */

module.exports = require('./game');
