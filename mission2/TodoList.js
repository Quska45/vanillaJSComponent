function TodoList({ $target, initialState }) {
  this.$element = document.createElement('ul');
  $target.appendChild(this.$element);

  this.state = initialState;

  this.render = function () {
    this.$element.innerHTML = this.state
      .map(({text, isCompleted}) => {
        return `
          <li>
            ${
              isCompleted 
              ? `<s>${text}</s>` 
              : text
            }
          <button>x</button>
          </li>
        `
      })
      .join('');

      this.$element.querySelectorAll('button').forEach(($button, i) => {
        $button.addEventListener('click', (e) => {
          // 여기서 이벤트 전파를 중단 시켜서 버블링을 막을 수 있음.
          e.stopPropagation();
          // 원본을 유지할 수 있는 filter를 사용하는 방법과 원본을 변경하는 splice를 사용할 수 있음
          // 배열이 많아지는 경우 모든 배열ㅇ르 순회하는 filter는 약간 불리할 수 있음
          // const nextState = this.state.filter((_, index) => index !== i);
          const nextState = [...this.state];
          nextState.splice(i, 1);
          this.setState(nextState);
        })
      });
      this.$element.querySelectorAll('li').forEach(($li, i) => {
        $li.addEventListener('click', () => {
          const nextState = [...this.state];
          // 여기서 isCompleted가 없다는 에러가 발생되는데 이벤트 버블링이 발생하기 때문임.
          // button에서 발생된 이벤트 때문에 li에서도 이벤트가 전파 되고 지워진 데이터에 접근하는 결과가 생기게 됨.
          nextState[i].isCompleted = !nextState[i].isCompleted;

          this.setState(nextState);
        })
      })
  };

  this.setState = function (nextState) {
    this.state = nextState;
    this.render();
  };

  this.render();
}
