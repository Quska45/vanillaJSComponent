export default function SearchResult({ $target, initialState, onMusicianClick }){
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
              (live) =>
                `
                    <div style="display: inline-block; width: 33%"><img src="${live.poster}" style="object-fit: cover; width: 100%;">
                        <ul style="display: flex; flex-wrap: wrap; padding:0; gap: 4px;">
                            ${live.musicians.map(
                                musicianName => 
                                    `<li class="SearchResult_musicianName" style="list-style:none;">
                                        ${musicianName}
                                    </li>`
                            ).join('')}
                        </ul>
                    </div>
                `
            )
            .join('')}`;
          this.$element.innerHTML = htmlString;
    };

    this.render();

    this.$element.addEventListener('click', (e) => {
        const $musician = e.target.closest('.SearchResult_musicianName');

        if($musician){
            onMusicianClick($musician.innerText);
        }
    })
}