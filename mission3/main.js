import * as localStorage from './localStorage.js';
import App from "./App.js";
import { APP_STORED_KEY } from './constants.js';

const $app = document.querySelector('#app');

new App({
    $target: $app,
    initialState: localStorage.getItem(APP_STORED_KEY, {
        keyword: '',
        liveItems: [],
        histories: [],
    })
})