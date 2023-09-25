const data = [
  {
    text: 'JS 공부하기',
    isCompleted: false,
  },
  {
    text: 'JS 복습하기',
    isCompleted: false,
  },
];

function App({$target, initialState}){
  this.state = initialState;

  // 파라미터로 함수를 넘겨주고 이 함수안에서 state에 대한 변경이 일어나도록 함.
  //이런식으로 컴포넌트 끼리는 서로를 모르게 하고 의존성을 분리할 수 있게 됨.
  const todoInput = new TodoInput({ $target, onInput: (keyword) => {
    todoList.setState([...todoList.state, {text: keyword, isCompleted: false}])
  } });
  const todoList = new TodoList({ $target, initialState: this.state });
}

