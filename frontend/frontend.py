import streamlit as st
import requests
import os

st.set_page_config(page_title="Tres en Raya", layout="centered")

API_BASE_URL = os.getenv("API_BASE_URL", "http://localhost:8000")

def api_new_game():
    try:
        response = requests.post(
            f"{API_BASE_URL}/api/game/new",
            timeout=5
        )
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        st.error(f"Error creando juego: {e}")
        return None

def api_make_move(position):
    try:
        response = requests.post(
            f"{API_BASE_URL}/api/game/move",
            json={"position": position},
            timeout=5
        )
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        st.error(f"Error en jugada: {e}")
        return None

def api_get_state():
    try:
        response = requests.get(
            f"{API_BASE_URL}/api/game",
            timeout=5
        )
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        st.error(f"Error obteniendo estado: {e}")
        return None


st.title("Tres en Raya")

game_state = api_get_state()

if game_state is None:
    st.error("No se pudo conectar al backend.")
    st.stop()

board = game_state.get("board", [None] * 9)
current_player = game_state.get("current_player")
game_over = game_state.get("is_finished", False)
winner = game_state.get("winner")

cols = st.columns(3)

for i in range(9):
    col = cols[i % 3]
    with col:
        cell_value = board[i]
        button_text = cell_value if cell_value else "⬜"

        disabled = cell_value is not None or game_over

        if st.button(button_text, key=f"cell_{i}", use_container_width=True, disabled=disabled):
            result = api_make_move(i)
            if result:
                st.rerun()
            else:
                st.error("Error al jugar.")

st.divider()

if game_over:
    if winner:
        st.success(f"Ganador: {winner}")
    else:
        st.warning("Empate")
else:
    st.info(f"Turno: {current_player}")

if st.button("Nuevo Juego", use_container_width=True):
    api_new_game()
    st.rerun()
