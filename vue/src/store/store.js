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
        visualCheck: whatIWatched + 'api/visual/check',
        increaseEpisode: whatIWatched + 'api/visual/increase_episode',
        songList: whatIWatched + 'api/songs',
        songDetail: whatIWatched + 'api/song/',
        songSubmit: whatIWatched + 'api/song/submit'
    },
    admin: window.localStorage.getItem('admin') | false
};

const mutations = {
    loginAdmin(state) {
        state.admin = true;
    }
};

export default new Vuex.Store({
    state,
    mutations
});