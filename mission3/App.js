import SearchInput from "./SearchInput.js";
import SearchResult from "./SearchResult.js";
import { fetchLiveList } from "./api.js";

export default function App({ $target, initialState }) {
    this.state = initialState;
    const searchInput = new SearchInput({
        $target,
        onSearch: async (keyword) => {
            try {
                const data = await fetchLiveList(keyword)
                console.log(JSON.stringify(data, null, 2));
                console.log('this', this);
                this.setState(data);
            } catch (error) {
                alert('데이터를 가져오는데 문제가 있습니다.');
            }
        }
    });

    const searchResult = new SearchResult({$target, initialState: []});

    this.setState = (nextState) => {
        this.state = nextState;
        searchResult.setState(nextState);
    };
}

