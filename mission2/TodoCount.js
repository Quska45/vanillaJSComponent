function TodoCount({$target, initialState}) {
  this.$element = document.createElement('div');

  $target.appendChild(this.$element);
  this.state = initialState;

  this.render = () => {
    this.$element.innerHTML = `Total: ${this.state.totalCount} / ${this.state.completedCount}`
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render();
}