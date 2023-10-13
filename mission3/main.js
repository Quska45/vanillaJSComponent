import * as localStorage from './localStorage.js';
import App from "./App.js";
import { SEARCH_HISTORY_KEY } from './constants.js';

const $app = document.querySelector('#app');

new App({
    $target: $app,
    initialState:
        {
            keyword: '',
            liveItems: [],
            histories: localStorage.getItem( SEARCH_HISTORY_KEY, [] ),
        }
})