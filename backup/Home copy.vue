<template>
    <div class="home" id="home">
        <section class="ab-info-main py-md-5 py-4 editContent">
            <div class="container-fluid py-md-4">
                <div class="d-flex">
                    <div class="left-ads-display col-lg-9">
                        <div class="d-flex flex-column align-items-center">
                            <div v-for="article in listArticles" :key="article.id" class="col-md-7 product-men">
                                <div class="product-shoe-info editContent mt-lg-4">
                                    <div class="item-info-product">
                                        <h4 class="">
                                            <a href="" @click="goTo(article.id)" class=" wrapped">{{ article.headline }}</a>
                                        </h4>
                                        <small class="mark">{{ article.category }}</small>
                                        <div class="product_price">
                                            <div class="grid-price">
                                                <span class="content">{{ article.content }}</span>
                                            </div>
                                        </div>
                                        <div class="row pt-4">
                                            <div class="pl-2">Rating: {{ article.rating }}</div>
                                            <div class="pl-2">Views: {{ article.view_count }}</div>
                                            <div class="pl-2">Comments: {{ article.comments_count }}</div>
                                            <div class="pl-2">Date: {{ new Date(article.date_create).toDateString() }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="container-fluid py-md-4">
                        <SideBar />
                    </div> 
                </div>
                <div class="container py-md-4">
                    <Pagination :total="total" :page_size="page_size" @page-changed="loadListArticles"/>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import SideBar from "../components/SideBar"
import Pagination from "../components/Pagination"
import PostsList from "../components/PostsList"
import { api } from "../http"

export default {
    name: "Home",
    components: {SideBar, Pagination},
    data() {
        return {
            listArticles: [],
            page: 1,
            total: 0,
            page_size: 10,
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
        goTo(id) {
            this.$router.push({ name: "Single", params: {id: id} })
        },
    },
};
</script>

<style scoped>
    .editContent {
        padding-left: 3rem;
        padding-right: 3rem;
    }
    .content {
        word-wrap: break-word;
    }
</style>
