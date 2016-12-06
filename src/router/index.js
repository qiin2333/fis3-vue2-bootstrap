/**
 * @file 路由配置
 * @author zhouqing02
 */

import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [{
        name: 'home',
        path: '/',
        component: resolve => require.async('page/home.vue', resolve)
    }, {
        name: 'feed',
        path: '/feed/:cate/:id',
        component: resolve => require.async('page/feed.vue', resolve)
    }, {
        name: 'article',
        path: '/article/:cate/:adid',
        component: resolve => require.async('page/article.vue', resolve)
    }, {
        name: 'logout',
        path: '/logout'
    }, {
        path: '*',
        redirect: '/'
    }]
});
