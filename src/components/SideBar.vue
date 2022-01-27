<template>
    <div class="side-bar col-lg-3 side">
        <div class="search-bar w3layouts-newsletter">
            <h3 class="sear-head editContent">Поиск</h3>
            <form action="#" method="post" class="d-flex">
                <input type="search" placeholder="Поиск..." name="search" class="form-control" required=""/>
                <button class="btn1 btn"><span class="fa fa-search" aria-hidden="true"></span></button>
            </form>
        </div>
        <div class="deal-leftmk left-side mt-5">
            <h3 class="sear-head editContent">Top</h3>
            <div v-for="article in listTopArticles" :key="article.id" class="mt-3">
                <h6><a href="#" @click="goTo(article.id)" class="wrapped" style="color: black">{{ article.headline }}</a></h6>
                    <div class="">Date: {{ new Date(article.date_create).toDateString() }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SideBar",
    data() {
        return {
            listTopArticles: [],
        };
    },
    created() {
        this.loadTopListArticles();
    },
    watch: {
        '$route'(to, from){
            console.log(to)
            console.log(from)
            }
        },
    methods: {
        async loadListArticles() {
            this.listArticles = await fetch(
                `${this.$store.getters.getServerUrl}/articles`
            ).then((response) => response.json());
        },
        async loadTopListArticles() {
            this.listTopArticles = await fetch(
                `${this.$store.getters.getServerUrl}/articles/top`
            ).then((response) => response.json());
        },
        
        goTo(id) {
            this.$router.push({ name: "Single", params: {id: id} })
        },
    }
};
</script>

<style scoped>
    .side {
        position: sticky;
        right: 0;
    }

</style>
