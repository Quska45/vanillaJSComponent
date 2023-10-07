function SearchInput({ $target, onSearch }){
    this.$element = document.createElement('input');
    $target.appendChild(this.$element);

    this.setState = (nextState) => {

    };

    this.render = () => {

    };

    this.render();
    this.$element.addEventListener('keyup', (e) => {
        onSearch(e.target.value);
    });
}