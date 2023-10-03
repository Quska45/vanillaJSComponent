function TodoList({ $target, initialState, onRemove, onToggle }) {
  this.$element = document.createElement('ul');
  $target.appendChild(this.$element);

  this.state = initialState;

  this.render = function () {
    this.$element.innerHTML = this.state
      .map(({text, isCompleted}, i) => {
        return `
          <li data-index="${i}">
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

      /**
       * 이런식으로 여러개의 이벤트들로 처리할 수도 있지만 위임을 통해 하나로 처리하는 것도 가능 하다.
      */
      // this.$element.querySelectorAll('button').forEach(($button, i) => {
      //   $button.addEventListener('click', (e) => {
      //     // 여기서 이벤트 전파를 중단 시켜서 버블링을 막을 수 있음.
      //     // e.stopPropagation();
      //     // 원본을 유지할 수 있는 filter를 사용하는 방법과 원본을 변경하는 splice를 사용할 수 있음
      //     // 배열이 많아지는 경우 모든 배열ㅇ르 순회하는 filter는 약간 불리할 수 있음
      //     // const nextState = this.state.filter((_, index) => index !== i);
      //     const nextState = [...this.state];
      //     nextState.splice(i, 1);
      //     this.setState(nextState);
      //   })
      // });

      // this.$element.querySelectorAll('li').forEach(($li, i) => {
      //   $li.addEventListener('click', () => {
      //     const nextState = [...this.state];
      //     // 여기서 isCompleted가 없다는 에러가 발생되는데 이벤트 버블링이 발생하기 때문임.
      //     // button에서 발생된 이벤트 때문에 li에서도 이벤트가 전파 되고 지워진 데이터에 접근하는 결과가 생기게 됨.
      //     nextState[i].isCompleted = !nextState[i].isCompleted;

      //     this.setState(nextState);
      //   })
      // });


  };

  this.setState = function (nextState) {
    this.state = nextState;
    this.render();
  };

  // 이렇게 이벤트 버블링을 이용한 이벤트 위임을 통해 이벤트를 최적화해서 사용할 수 있음.
  this.$element.addEventListener('click', (e) => {
    // closest 같은 api로 li를 찾아서 dataset를 간편하게 이용할 수 있는 방법도 있음.
    const $li = e.target.closest('li');
    if(!$li){
      throw new Error('li 태그가 존재 하지 않습니다.');
    }
    // 커스텀 어트리뷰트로 불러오는 값은 무조건 스트링 값이라는 것을 알아두자.
    const i = parseInt($li.dataset.index);

    // e.target을 통해 잡히는 타겟을 이용하면 이벤트 위임을 잘 구현할 수 있다.
    // ul에 걸어놓은 한개의 이벤트로 li, button에서 필요한 이벤트를 한번에 구현할 수 있다.
    if(e.target.tagName === 'BUTTON'){
      e.stopPropagation();
      onRemove(i);
    } else if(e.target.tagName === 'S' || e.target.tagName === 'LI'){
      onToggle(i);
    }
  });

  this.render();
}
