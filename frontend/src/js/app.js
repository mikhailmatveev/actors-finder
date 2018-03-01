const router = new VueRouter({
    routes: [{
        path: '/',
        component: resolve => { require(['./components/actor-search'], resolve); }
    }, {
        path: '/actor/:id',
        component: resolve => { require(['./components/actor-info'], resolve); }
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
});

new Vue({
    el: '#app',
    router
});
