
export default function menuOpen(state = false, action = {}) {
    if(action.type === 'TOGGLE_MENU') return !state
    return state
}