import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';

Vue.use(VueResource);
Vue.use(VueRouter);

new Vue({
    el: '#app',
    router: new VueRouter({
        routes: [{
            path: '/',
            component: resolve => { require(['../../components/actor-search/actor-search.vue'], resolve); }
        }, {
            path: '/actor/:id',
            component: resolve => { require(['../../components/actor-info/actor-info.vue'], resolve); }
        }, {
            path: '/404',
            name: '404',
            component: {
                template: '<h1>Not found (404)</h1>'
            }
        }, {
            path: '*',
            redirect: '404'
        }]
    })
});
