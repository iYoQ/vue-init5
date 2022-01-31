<template>
    <div class="category" id="category">
        <PostsList :posts="listArticles" :category="category" :page="page" :total="total" :page_size="page_size" @page_changed="loadListArticles"/>
    </div>
</template>

<script>
import PostsList from "../components/PostsList";
import { api } from "../http"

export default {
    name: "Category",
    components: { PostsList },
    props: ['category'],
    data() {
        return {
            listArticles: [],
            page: 1,
            total: 0,
            page_size: 30,
        };
    },
    created() {
        this.loadListArticles(this.page, this.category);
    },
    beforeRouteUpdate(to, from, next) {
        this.loadListArticles(this.page, to.params.category)
        next()
    },
    methods: {
        async loadListArticles(pageNumber, categoryId) {
            this.listArticles = await api.get(`/articles/?page=${pageNumber}&category=${categoryId}`
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
