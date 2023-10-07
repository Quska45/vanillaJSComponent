function App({ $target, initialState }) {
    this.state = initialState;
    const searchInput = new SearchInput({
        $target,
        onSearch: (keyword) => {
            fetch(`https://api.idiots.band/api/search?keyword=${keyword}`)
                .then((x) => x.json())
                .then((data) => {
                    console.log(JSON.stringify(data, null, 2));
                    console.log('this', this);
                    this.setState(data);
                });
        }
    });

    const searchResult = new SearchResult({$target, initialState: []});

    this.setState = (nextState) => {
        this.state = nextState;
        searchResult.setState(nextState);
    };
}

