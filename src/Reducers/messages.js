const initialState = [];

export default function messages(state = initialState, action) {
  switch(action.type) {
    case 'LOAD':
      return action.messages;
    case 'ADD':
      return [...state, {
        content: action.content,
        user: action.user,
        timestamp: Date.now()
      }];
    default:
      return state;
  }
}
