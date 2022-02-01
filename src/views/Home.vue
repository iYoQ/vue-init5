<template>
    <div class="home" id="home">
        <PostsList :posts="listArticles" :search="search" :page="page" :total="total" :page_size="page_size" 
                    :category="$store.state.category" @page_changed="loadListArticles" @goToSingle="goToSingle"/>
    </div>
</template>

<script>
import PostsList from "../components/PostsList"
import { api } from "../http"

export default {
    name: "Home",
    components: { PostsList },
    props: ['search', 'category'],
    data() {
        return {
            listArticles: [],
            total: 0,
            page_size: 30,
            page: 1,
        };
    },
    created() {
        this.loadListArticles(this.page, this.defaultSearch, this.defaultCategory);
    },
    computed: {
        defaultSearch() {
            if(this.search === undefined){
                return this.$store.state.search
            }
            return this.search
        },
        defaultCategory() {
            if(this.category === undefined){
                return this.$store.state.category
            }
            return this.category
        },
    },
    methods: {
        async loadListArticles(pageNumber, searchArticles, categoryID) {
            this.listArticles = await api.get(`/articles/?page=${pageNumber}&search=${searchArticles}&category=${categoryID}`
            ).then(response => {
                this.total = response.data.links.count
                return response.data.results
            }
            ).catch(error => {
                console.log(error)
            })
        },
        goToSingle(id) {
            this.$router.push({ name: "SingleArticle", params: {id: id} })
        }
    },
    mounted() {
        this.$root.$on('Home', (search, category) => {
            this.loadListArticles(this.page, search, category)
        })
    },
};
</script>

<style scoped>

</style>
