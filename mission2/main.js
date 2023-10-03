const initialState = getItem('todo-list', []);
const $target = document.querySelector('#todo-list');


try {
  new App({
    $target,
    initialState
  });
} catch(e) {
  alert(e.message);
}