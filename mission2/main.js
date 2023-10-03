const initialState = JSON.parse(window.localStorage.getItem('todo-list'));
const $target = document.querySelector('#todo-list');

new App({
  $target,
  initialState
})