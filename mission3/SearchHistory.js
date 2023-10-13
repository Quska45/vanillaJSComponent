export default function SearchHistory({$target, initialState, onClick}){
    this.state = initialState;
    this.$element = document.createElement('div');
    this.$element.style.display = 'flex';
    this.$element.style.flexDirection = 'row';
    this.$element.style.gap = '8px';
    $target.appendChild(this.$element);

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        this.$element.innerHTML = `
                ${
                    this.state.map((keyword) => {
                        return `<div class="SeachHistory__item" style="border: 1px solid #ccc; padding: 4px; border-radius: 8px">${keyword}</div>`
                    }).join('')
                }
        `;
    };

    this.$element.addEventListener('click', (e) => {
        const $item = e.target.closest('.SeachHistory__item');
        if($item){
            onClick($item.innerText);
        }
    });

    this.render();
}