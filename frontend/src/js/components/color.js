export default Vue.component('color', {
    props: ['color'],
    template: `<span :class="['color', 'color-' + color]"></span>`
});
