import axios from 'axios';

export default Vue.component('actor-search', {
    template: `<div class="component-wrapper">
        <form>
            <input v-model="q" v-on:keyup="keyUp" type="text" class="form-control" placeholder="Кого искать?" aria-label="Кого искать?">
        </form>
        <ul class="media-list">
            <li v-cloak v-for="actor in actors" class="media">
                <div class="media-left">
                    <router-link :to="{ path: '/actor/' + actor.id }">
                        <img :src="actor.avatars[0]" :alt="actor.name" class="media-object img-thumbnail"/>
                    </router-link>
                </div>
                <div class="media-body">
                    <h4 class="media-heading">{{actor.name}}</h4>
                    <p v-if="hasAliases(actor)">{{getAliases(actor)}}</p>
                </div>
            </li>
        </ul>
    </div>`,
    created() {
        axios.get('/api/actors').then(response => {
            this.processData(response.data);
        });
    },
    data() {
        return {
            actors: [],
            q: ''
        };
    },
    methods: {
        hasAliases(actor) {
            return actor.aliases.length > 0;
        },
        hasAvatars(actor) {
            return actor.avatars.length > 0;
        },
        processData(data) {
            this.actors = data.map(item => {
                if (item.avatars.length === 0) {
                    // Placeholder for image
                    item.avatars.push('../../img/camera.svg');
                }
                return item;
            });
        },
        keyUp() {
            axios.get('/api/actors', {
                params: {
                    q: this.q
                }
            }).then(response => {
                this.processData(response.data);
            });
        },
        getAliases(actor) {
            if (this.hasAliases(actor)) {
                return actor.aliases.join(', ');
            }
            return '';
        }
    },
});
