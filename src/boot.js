/**
 * @file app.js
 * @author zhouqing02
 */

/* globals __inline, __uri */
import Vue from 'vue';
import VueCookie from 'vue-cookie';
import VueResource from 'vue-resource';
import Vue2Filters from 'vue2-filters';
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
import {sync} from 'vuex-router-sync';
import router from './router';
import store from './store';
import App from './app.vue';

Vue.use(Mint);
Vue.use(VueCookie);
Vue.use(VueResource);
Vue.use(Vue2Filters);

// window.regeneratorRuntime = regeneratorRuntime;

sync(store, router);

let indexScrollTop = 0;
router.beforeEach((route, redirect, next) => {
    if (route.path !== '/') {
        indexScrollTop = document.body.scrollTop;
    }
    document.title = route.meta.title || document.title;
    next();
});

router.afterEach(route => {
    if (route.path !== '/') {
        document.body.scrollTop = 0;
    } else {
        Vue.nextTick(() => {
            document.body.scrollTop = indexScrollTop;
        });
    }
});

new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store
});
