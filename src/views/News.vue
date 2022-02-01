<template>
    <div class="news" id="news">
        <PostsList :posts="listNews" :page="page" :total="total" :page_size="page_size" @page_changed="loadListNews" @goToSingle="goToSingle"/>
    </div>
</template>

<script>
import PostsList from "../components/PostsList"
import { api } from "../http"

export default {
    name: "News",
    components: { PostsList },
    data() {
        return {
            listNews: [],
            total: 0,
            page_size: 30,
            page: 1,
            search: ''
        };
    },
    created() {
        this.loadListNews(this.page, this.search)
    },
    methods: {
        async loadListNews(pageNumber, searchNews) {
            this.listNews = await api.get(`/news/?page=${pageNumber}&search=${searchNews}`,
            ).then(response => {
                this.total = response.data.links.count
                return response.data.results
            }
            ).catch(error => {
                console.log(error)
            })
        },
        goToSingle(id) {
            this.$router.push({ name: "SingleNews", params: {id: id} })
        },
    }
}
</script>

<style scoped>

</style>
