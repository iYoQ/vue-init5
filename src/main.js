import Vue, { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store"
import CKEditor from 'ckeditor4-vue';


Vue.use( CKEditor );



Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')