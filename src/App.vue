<template>
    <div id="app">
        <Nav :render-key="this.renderKey" :categorys="categorys" :key="renderKey" @component-reload="forceRerender"/>
        <router-view />
        <Footer />
    </div>
</template>

<style>
    @import "assets/css/bootstrap.css";
    @import "assets/css/font-awesome.css";
    @import "assets/css/style.css";
</style>

<script>
    import Nav from "./components/Nav";
    import Footer from "./components/Footer"
    import { api } from "./http"

    export default {
        components: {Nav, Footer},
        data() {
            return {
                renderKey: 0,
                categorys: [],
            }
        },
        beforeCreate() {
            this.$store.commit('initializeStore')

            const access = this.$store.state.access

            if(access) {
                api.defaults.headers.common['Authorization'] = 'Bearer ' + access
            }
            else {
                api.defaults.headers.common['Authorization'] = ''
            }
        },
        mounted() {

        },
        created() {
            this.loadCategorys()
        },
        methods: {
            forceRerender() {
                this.renderKey++
            },
            async loadCategorys() {
                this.categorys = await api.get('/category/'
                ).then(response => {
                    return response.data
                }
                ).catch(error => {
                    console.log(error)
                })
            },
        },
    }
</script>
