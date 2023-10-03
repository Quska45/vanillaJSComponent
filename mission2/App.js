// 이제 전반적으로 App이 리스트, 카운트, 인풋을 제어하는 구조가 만들어지게 됐음.
function App({$target, initialState}){
  this.state = initialState;

  /**
   * todoCount가 정상적으로 돌아가기 위해 App에도 setState가 필요해지게 됐음.
   * 리스트의 상태가 App에도 반영되어야 하기 떄문.
   * 리액트에서 얘기하는 단방향 바인딩과 유사한 구조가 만들어지게 됐음.
   * 최상위에 있는 App의 상태를 변경하는 setState안에서 하위 컴포넌트들의 상태를 전부 변경해주고 있는 것을 알 수 있음.
   */
  this.setState = (nextState) => {
    this.state = nextState;
    todoList.setState(nextState);
    todoCount.setState({
      totalCount: nextState.length,
      completedCount: nextState.filter((todo) => todo.isCompleted).length
    })

    window.localStorage.setItem('todo-list', JSON.stringify(this.state));
  }
  // 파라미터로 함수를 넘겨주고 이 함수안에서 state에 대한 변경이 일어나도록 함.
  //이런식으로 컴포넌트 끼리는 서로를 모르게 하고 의존성을 분리할 수 있게 됨.
  const todoInput = new TodoInput({ $target, onInput: (keyword) => {
    this.setState([...todoList.state, {text: keyword, isCompleted: false}])
  } });
  const todoList = new TodoList({ $target, initialState: this.state,
    onRemove: (i) => {
      const nextState = [...this.state];
      nextState.splice(i, 1);
      this.setState(nextState);
    },
    onToggle: (i) => {
      const nextState = [...this.state];
      nextState[i].isCompleted = !nextState[i].isCompleted;
      this.setState(nextState);
    }
 });
  /**
   * todoCount가 처음 만들어 졌을 때 투두리스트에서 상태를 변경하는 경우엔 당연히 카운트가 반영이 안됨.
  왜냐면 투두리스트에서 변경된 상태는 App의 상태와는 별개이기 때문임.
  따라서 리스트에서 변경된 상태를 App의 상태에 반영해주고 이걸 다시 카운트에 반영해주는 과정이 필요함.
  */
  const todoCount = new TodoCount({$target, initialState: {totalCount: this.state.length, completedCount: this.state.filter((todo) => todo.isCompleted).length}})

  // window에 removeAll이라는 이벤트를 등록해 놓을 수 있다.
  window.addEventListener('removeAll', () => {
    this.setState([]);
  })
}

