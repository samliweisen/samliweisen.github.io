import Vue from 'vue';
import VueSource from 'vue-resource';
import router from './router/router.js';
import store from './store/store.js';
import App from './App.vue';
import Home from './views/Home.vue';

Vue.use(VueSource);

Vue.config.productionTip = true;
new Vue({
    //router,
    store,
    // template: '<App />',
    // components: { App },
    el: '#app',
    render: h => h(Home)
})
//.$mount('#app');