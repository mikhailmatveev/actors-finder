import ActorInfo from './components/actor-info';
import ActorSearch from './components/actor-search';

const router = new VueRouter({
    routes: [{
        path: '/',
        components: {
            default: {
                template: '<actor-search></actor-search>'
            }
        }
    }, {
        path: '/actor/:id',
        component: {
            template: '<actor-info></actor-info>'
        }
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
