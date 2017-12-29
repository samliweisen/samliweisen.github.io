import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    urls: [],
    message: 'Hello Vuex'
};

export default new Vuex.Store({
    state
});