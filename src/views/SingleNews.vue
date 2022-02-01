<template>
    <section class="ab-info-main py-md-5 py-4 editContent single">
        <Single :post="news" @reload_post="loadNews"/>
    </section>
</template>

<script>
import Single from "../components/Single"
import { api } from "../http"
export default {
    name: "SingleNews",
    props: ['id'],
    components: { Single },
    data() {
        return {
            news: {},
        };
    },
    created() {
        this.loadNews(this.id)
    },
    methods: {
        async loadNews(id) {
            this.news = await api.get(`news/${id}`
            ).then(response => {
                return response.data
            }
            ).catch(error => {
                console.log(error)
            })
        },
    },
    beforeRouteUpdate(to, from, next) {
        this.loadNews(to.params.id)
        next()
    }
};
</script>

<style scoped>
.single {
    outline: none;
    outline-offset: -2px;
    cursor: inherit;
    color: rgb(33, 37, 41);
    font-size: 16px;
    background-color: rgba(0, 0, 0, 0);
    font-family: Lato, sans-serif;
}
.li-article {
    list-style: none;
}
.side {
    position: sticky;
    top: 11%;
}
svg {
    cursor: pointer;
}

</style>
