function SearchResult({ $target, initialState }){
    this.state = initialState;

    this.$element = document.createElement('div');
    $target.appendChild(this.$element);

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        const htmlString = `${this.state
            .map(
              (d) =>
                `<div style="display: inline-block; width: 33%"><img src="${d.poster}" style="object-fit: cover; width: 100%;"></div>`
            )
            .join('')}`;
          this.$element.innerHTML = htmlString;
    };

    this.render();
}