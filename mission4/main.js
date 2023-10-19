import { fetchData, toggle, removeTodo, createTodo } from './api.js';
import TodoList from './TodoList.js';

(async function () {
    const $target = document.querySelector('.App')
  
    const username = 'roto'
  
    const data = await fetchData(username)
    console.log('data',data);
  
    const todoList = new TodoList({
      $target,
      initialState: data,
      onClick: async function (id) {
        await toggle(username, id);
  
        // 데이터 추가 후 서버에서 목록 다시 불러서 다시 그리기
        const updatedData = await fetchData(username)
        todoList.setState(updatedData)
      },
      onRemove: async function (id) {
        await removeTodo(username, id);
  
        // 데이터 추가 후 서버에서 목록 다시 불러서 다시 그리기
        const updatedData = await fetchData(username)
        todoList.setState(updatedData)
      },
    })
  
    // document.querySelector('#add-todo-button').addEventListener('click', async function () {
    //   const todoText = document.querySelector('#todo-input').value
  
    //   if (todoText.length > 0) {
    //     // 데이터 추가하기
    //     await createTodo(username, todoText);
  
    //     // 데이터 추가 후 서버에서 목록 다시 불러서 다시 그리기
    //     const updatedData = await fetchData()
    //     todoList.setState(updatedData)
    //   }
    // })
  })()