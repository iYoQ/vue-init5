<template>
    <div id="app">
        <Nav :render-key="this.renderKey" :categorys="categorys" @change_category="change_category" :key="renderKey" @component-reload="forceRerender"/>
        <router-view :category="category"/>
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

    export default {
        components: {Nav, Footer},
        data() {
            return {
                renderKey: 0,
                categorys: [],
                category: "",
            }
        },
        created() {
            this.loadCategorys()
        },
        methods: {
            forceRerender() {
                this.renderKey++
            },
            async loadCategorys() {
                this.categorys = await fetch(`${this.$store.getters.getServerUrl}/category/`
                ).then(response => response.json())
            },
            change_category(categoryName) {
                this.category = categoryName
            },
        },
    }
</script>
