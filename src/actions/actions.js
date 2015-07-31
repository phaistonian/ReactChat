export function add (content, user) {
  return {
    type: 'ADD',
    content,
    user
  };
}

export function changeUsername (username) {
  return {
    type: 'CHANGE_USERNAME',
    username
  };
}
