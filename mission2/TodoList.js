function TodoList({ $target, initialState }) {
  this.$input = document.createElement('input');
  this.$addTodoButton = document.createElement('button');
  this.$addTodoButton.innerText = 'Add'
  this.$element = document.createElement('ul');
  $target.appendChild(this.$input);
  $target.appendChild(this.$addTodoButton);
  $target.appendChild(this.$element);

  this.state = initialState;

  this.render = function () {
    this.$element.innerHTML = this.state
      .map(({text, isCompleted}) => `<li>${isCompleted ? `<s>${text}</s>` : text}</li>`)
      .join('');
  };

  this.setState = function (nextState) {
    this.state = nextState;
    this.render();
  };

  this.render();

  // 이벤트
  this.$input.addEventListener('keyup', (e) => {
    if(e.key === 'Enter'){
      const nextState = [...this.state, {text: e.target.value, isCompleted: false}];
      e.target.value = '';
      this.setState(nextState);
    }
  });

  this.$addTodoButton.addEventListener('click', (e) => {
    const nextState = [...this.state, {text: this.$input.value, isCompleted: false}];
    this.$input.value = '';
    this.setState(nextState);
    this.$input.focus();
  })
}
