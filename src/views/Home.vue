<template>
    <div class="home" id="home">
        <PostsList :posts="listArticles" :page="page" :total="total" :page_size="page_size" @page_changed="loadListArticles"/>
    </div>
</template>

<script>
import PostsList from "../components/PostsList"
import { api } from "../http"

export default {
    name: "Home",
    components: { PostsList },
    data() {
        return {
            listArticles: [],
            page: 1,
            total: 0,
            page_size: 30,
        };
    },
    created() {
        this.loadListArticles(this.page);
    },
    methods: {
        async loadListArticles(pageNumber) {
            this.listArticles = await api.get(`/articles/?page=${pageNumber}`
            ).then(response => {
                this.total = response.data.links.count
                return response.data.results
            }
            ).catch(error => {
                console.log(error)
            })
        },
    },
};
</script>

<style scoped>

</style>
