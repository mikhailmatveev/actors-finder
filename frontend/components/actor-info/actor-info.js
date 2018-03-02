export default {
    components: {
        color: resolve => { require(['../color/color.vue'], resolve); }
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
            this.$http.get(`/api/actor/${id}`).then(response => {
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
};
