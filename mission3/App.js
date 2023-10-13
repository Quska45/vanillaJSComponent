import SearchInput from "./SearchInput.js";
import SearchResult from "./SearchResult.js";
import SearchHistory from "./SearchHistory.js";
import { fetchLiveList } from "./api.js";
import debounce from "./debounce.js";
import * as localStorage from './localStorage.js';
import { SEARCH_HISTORY_KEY } from './constants.js';

// 매직넘버를 사용하게 될 경우 이런식으로 의미를 부여한 상수로 분리해서 사용한다.
const MAX_HISTORY_COUNT = 5;

export default function App({ $target, initialState }) {
    /**
     * SearchHistory가 없었을 떄는 데이터가 아래의 형태 였음.
     * [
     *  {
     *      data1
     *  },
     *  {
     *      data2
     *  }
     * ]
     * 
     * 그러나 SearchHistory가 생기면서 searchinput을 통해 입력 받은 값을 가지고 있을 필요가 생겼음.
     * [
     *  {
     *      liveItem: [],
     *      histories: []
     *  }
     * ]
     */
    this.state = initialState;
    console.log('this.state', this.state);
    const searchInput = new SearchInput({
        $target,
        initialState: this.state.keyword,
        onChange: debounce(async (keyword) => {
            this.setState({
                ...this.state,
                keyword
            })
        }),
        onSearch: debounce(async (keyword) => {
            try {
                const liveItems = await fetchLiveList(keyword);

                const histories = [...this.state.histories];

                if(histories.length === MAX_HISTORY_COUNT){
                    histories.shift();
                }

                // 만약 동일한 키워드가 입력된다면 그 키워드를 맨뒤로 보내주는 정도의 처리가 있는 것도 괜찮을 듯.
                if(!histories.includes(keyword)){
                    histories.push(keyword);
                }

                // histories update 시키기
                const nextState = {...this.state, liveItems};
                this.setState({
                    ...this.state,
                    histories,
                    liveItems
                });
            } catch (error) {
                alert('데이터를 가져오는데 문제가 있습니다.');
            }
        }, 500),
    });

    const searchHistory = new SearchHistory({
        $target,
        initialState: this.state.histories,
        onClick: async (keyword) => {
            // searchinput update
            // 검색이 발생될 수 있도록
            try {
                const liveItems = await fetchLiveList(keyword);

                this.setState({
                    ...this.state,
                    liveItems,
                    keyword
                })
            } catch(e) {
                console.log(e);
            }
        }
    })

    const searchResult = new SearchResult({
        $target,
        initialState: this.state.liveItems
    });

    this.setState = (nextState) => {
        this.state = nextState;
        searchInput.setState(this.state.keyword);
        searchResult.setState(this.state.liveItems);
        searchHistory.setState(this.state.histories);

        localStorage.setItem(SEARCH_HISTORY_KEY, this.state.histories);
        console.log('localStorage.getItem(SEARCH_HISTORY_KEY)', localStorage.getItem(SEARCH_HISTORY_KEY, []));
    };
}

