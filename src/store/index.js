import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        access: '',
        refresh: '',
    },
    mutations: {
        initializeStore(state) {
            if(localStorage.getItem('access')) {
                state.access = localStorage.getItem('access')
                state.refresh = localStorage.getItem('refresh')
            }
            else {
                state.access = ''
                state.refresh = ''
            }
        },
        setAccess(state, access) {
            state.access = access
        },
        setRefresh(state, refresh) {
            state.refresh = refresh
        }
    },
    actions: {},
    modules: {},
    getters: {

    }
})

export default store