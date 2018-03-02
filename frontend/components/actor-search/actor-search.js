export default {
    created() {
        this.$http.get('/api/actors').then(response => {
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
            this.$http.get('/api/actors', { params: { q: this.q } }).then(response => {
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
};
