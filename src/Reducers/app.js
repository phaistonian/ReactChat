const initialAppState = {
  username: 'phaistonian'
};
export default function app(state = initialAppState, action) {
  switch(action.type) {
    case 'CHANGE_USERNAME':
      return {...state, username: action.username};
    default:
      return state;
  }
}
