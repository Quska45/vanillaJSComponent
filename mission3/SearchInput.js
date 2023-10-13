export default function SearchInput({ $target, initialState = '', onChange, onSearch }){
    this.state = initialState;
    this.$element = document.createElement('input');
    this.$element.value  = this.state;

    $target.appendChild(this.$element);

    this.setState = (nextState) => {
        this.state = nextState;
        this.$element.value = this.state;
    };

    this.render = () => {

    };

    this.render();
    this.$element.addEventListener('keyup', (e) => {
        onChange(e.target.value);
        onSearch(e.target.value);
    });
}