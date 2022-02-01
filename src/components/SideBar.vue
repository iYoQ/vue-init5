<template>
    <div class="side-bar d-flex flex-column side">
        <div class="search-bar w3layouts-newsletter">
            <h3 class="sear-head editContent">Поиск</h3>
            <div class="d-flex">
                <input v-model="search" type="search" placeholder="Поиск..." name="search" class="form-control" required=""/>
                <button @click="searching()" class="btn1 btn"><span class="fa fa-search" aria-hidden="true"></span></button>
            </div>
        </div>
        <div class="deal-leftmk left-side mt-5">
            <h3 class="sear-head editContent">Top</h3>
            <div v-for="article in listTopArticles" :key="article.id" class="mt-3">
                <h6><a href="#" @click="goToSingle(article.id)" class="wrapped" style="color: black">{{ article.headline }}</a></h6>
                    <div class="">Date: {{ new Date(article.date_create).toDateString() }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { api } from "../http"
export default {
    name: "SideBar",
    props: ['page'],
    data() {
        return {
            listTopArticles: [],
            search: '',
        };
    },
    created() {
        this.loadTopListArticles();
    },
    methods: {
        async loadTopListArticles() {
            this.listTopArticles = await api.get('/articles/top'
            ).then(response => {
                return response.data
            }
            ).catch(error => {
                console.log(error)
            })
        },
        goToSingle(id) {
            this.$router.push({ name: "SingleArticle", params: {id: id} })
        },

        searching(){
            this.$store.commit('setSearch', this.search)
            this.$emit('page-changed', this.page, this.search, this.$store.state.category)
        }
    },
};
</script>

<style scoped>
    .side {
        position: sticky;
        right: 0;
        top: 10%;
    }

</style>
