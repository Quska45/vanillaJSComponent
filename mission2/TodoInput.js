function TodoInput({ $target, onInput }) {
  this.$element = document.createElement(
    'form'
  );
  $target.appendChild(this.$element);
  // this.$input = document.createElement('input');
  // this.$addTodoButton = document.createElement('button');
  // this.$addTodoButton.innerText = 'Add'

  // $target.appendChild(this.$input);
  // $target.appendChild(this.$addTodoButton);

  this.render = () => {
    // 폼안에 버튼을 누르는 경우 자동으로 서밋을 발생 시키게 되어 있음.
    // 그래서 화면에 대한 새로고침이 발생 될 수 밖에 없음.
    this.$element.innerHTML = `
      <input type="text" placeholder="할 일을 입력해주세요.">
      <button>Add Todo</button>
    `
  };

  this.render();

  // 여러개의 이벤트를 사용할 필요가 없어졌음.
  // 웹의 기본 동작방식에 가깝게 동작하도록 개선 됐음.
  this.$element.addEventListener('submit', (e) => {
    // 기본 동작을 방지한다. 따라서 폼에서 발생된 sumit에서 발생되는 새로고침 같은걸 방지 할 수 있다.
    e.preventDefault();

    const $input = this.$element.querySelector('input');
    onInput($input.value);
    $input.value = '';
    $input.focus();
  })

  // 이벤트
  // this.$input.addEventListener('keyup', (e) => {
  //   if(e.key === 'Enter'){
  //     onInput(e.target.value);
  //     e.target.value = '';
  //   }
  // });

  // this.$addTodoButton.addEventListener('click', (e) => {
  //   onInput(this.$input.value);
  //   this.$input.value = '';
  //   this.$input.focus();
  // })
}