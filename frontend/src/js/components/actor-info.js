import axios from 'axios';

export default Vue.component('actor-info', {
    template: `<div class="component-wrapper">
        <div class="card">
            <div class="card-body">
                <div class="avatar">
                    <img :src="actor.avatars[0]" :alt="actor.name" class="img-responsive img-thumbnail"/>
                </div>
                <div class="info">
                    <h4>{{actor.name}}</h4>
                    <ul>
                        <li v-if="hasAliases()">
                            <span class="text-muted">Так же известен как</span>
                            <span>{{getAliases()}}</span>
                        </li>
                        <li><span class="text-muted">Страна</span><span>{{actor.country}}</span></li>
                        <li><span class="text-muted">Дата рождения</span><span>{{actor.birthDate}}</span></li>
                        <li><span class="text-muted">Место рождения</span><span>{{actor.birthPlace}}</span>
                        </li>
                        <li v-if="actor.status">
                            <span class="text-muted">Карьерный статус</span>
                            <span>{{actor.status}}</span>
                        </li>
                        <li><span class="text-muted">Рост</span><span>{{actor.height}}</span></li>
                        <li v-if="actor.color">
                            <span class="text-muted">Цвет глаз</span>
                            <color :color="actor.color"></color>
                        </li>
                        <li v-if="hasLinks()">
                            <span class="text-muted">Страницы</span>
                            <ul class="links">
                                <li v-for="link in actor.links"><a :href="link">{{link}}</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>`,
    components: {
        color: resolve => { require(['./color'], resolve); }
    },
    created() {
        this.doRequest(this.$route.params.id);
    },
    data() {
        return {
            actor: {
                aliases: [],
                avatars: [],
                birthDate: '',
                birthPlace: '',
                status: '',
                color: '',
                country: '',
                height: 0,
                id: 0,
                links: [],
                name: ''
            }
        };
    },
    methods: {
        doRequest(id) {
            axios.get(`/api/actor/${id}`).then(response => {
                var data = response.data;
                // Placeholder for image
                if (data.avatars.length === 0) {
                    data.avatars.push('../../img/camera.svg');
                }
                this.actor = Object.assign({}, this.actor, data);
            });
        },
        hasAliases() {
            return this.actor.aliases.length > 0;
        },
        hasLinks() {
            return this.actor.links.length > 0;
        },
        getAliases() {
            if (this.hasAliases()) {
                return this.actor.aliases.join(', ');
            }
            return '';
        },
        getLinks() {
            if (this.hasLinks()) {
                return this.actor.links.join(', ');
            }
            return '';
        }
    },
    watch: {
        $route(to, from) {
            this.doRequest(to.params.id);
        }
    }
});
