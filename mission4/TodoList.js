export default function TodoList(params) {
    const $target = params.$target
    const onClick = params.onClick
    const onRemove = params.onRemove
    
    this.$element = document.createElement('div')
    $target.appendChild(this.$element)
  
    this.state = params.initialState || []
  
    $target.addEventListener('click', function (e) {
      const id = e.target.closest('li').dataset.id
  
      if (e.target.className === 'remove-button') {
        e.stopPropagation()
        onRemove(id)
      } else {
        onClick(id)
      }
    })
  
    this.setState = function (nextState) {
      this.state = nextState
      this.render()
    }
  
    this.render = function () {
      const htmlString = this.state.map(function (todo) {
        const contentHTML = todo.isCompleted
          ? `<strike>${todo.content}</strike>`
          : `${todo.content}`
  
        return `<li data-id="${todo._id}">${contentHTML} <button class="remove-button">Remove</button></li>`
      })
  
      this.$element.innerHTML = `<ul>${htmlString.join('')}</ul>`
    }
  
    this.render()
  }