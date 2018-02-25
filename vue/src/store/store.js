import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const whatIWatched = 'https://what-i-watched.herokuapp.com/';

const state = {
    urls: [],
    message: 'Hello Vuex',
    api: {
        visualList: whatIWatched + 'api/visuals',
        visualDetail: whatIWatched + 'api/visual/',
        visualSubmit: whatIWatched + 'api/visual/submit',
        visualImdb: whatIWatched + 'api/get_imdb_id',
        songList: whatIWatched + 'api/songs',
        songSubmit: whatIWatched + 'api/song/submit'
    },
    admin: false
};

export default new Vuex.Store({
    state
});