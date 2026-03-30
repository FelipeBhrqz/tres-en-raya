import streamlit as st
import requests
import uuid

st.set_page_config(page_title="Tres en Raya", layout="centered")

API_BASE_URL = "http://localhost:8000"
SESSION_ID_KEY = "game_session_id"

def get_session_id():
    """Get or create a game session ID"""
    if SESSION_ID_KEY not in st.session_state:
        st.session_state[SESSION_ID_KEY] = str(uuid.uuid4())
    return st.session_state[SESSION_ID_KEY]

def api_new_game():
    """Initialize a new game"""
    try:
        response = requests.post(
            f"{API_BASE_URL}/game/new",
            json={"session_id": get_session_id()},
            timeout=5
        )
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        st.error(f"Error creating new game: {e}")
        return None

def api_make_move(position):
    """Send a move to the backend"""
    try:
        response = requests.post(
            f"{API_BASE_URL}/game/move",
            json={"session_id": get_session_id(), "position": position},
            timeout=5
        )
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        st.error(f"Error making move: {e}")
        return None

def api_get_state():
    """Fetch current game state"""
    try:
        response = requests.get(
            f"{API_BASE_URL}/game/state",
            params={"session_id": get_session_id()},
            timeout=5
        )
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        st.error(f"Error fetching game state: {e}")
        return None

st.title("Tres en Raya")

game_state = api_get_state()

if game_state is None:
    st.error("Unable to connect to game backend. Please check if the server is running.")
    st.stop()

board = game_state.get("board", [None] * 9)
current_player = game_state.get("current_player")
game_over = game_state.get("game_over", False)
winner = game_state.get("winner")

col1, col2, col3 = st.columns(3)
cols = [col1, col2, col3]

for i in range(9):
    col = cols[i % 3]
    with col:
        cell_value = board[i]
        button_text = cell_value if cell_value else "⬜"
        
        # Disable button if cell is occupied or game is over
        disabled = cell_value is not None or game_over
        
        if st.button(button_text, key=f"cell_{i}", use_container_width=True, disabled=disabled):
            result = api_make_move(i)
            if result:
                if result.get("valid_move", True):
                    st.rerun()
                else:
                    st.error("Movimiento inválido. Intenta en una casilla vacía.")
            else:
                st.error("Error al realizar el movimiento.")

st.divider()

if game_over:
    if winner:
        st.success(f" ¡Ganador: Jugador {winner}!", icon="✅")
    else:
        st.warning("¡Empate!", icon="⚠️")
else:
    st.info(f"Turno: Jugador {current_player}", icon="ℹ️")

if st.button("🔄 Nuevo Juego", use_container_width=True):
    api_new_game()
    st.rerun()
