<template>
    <section class="ab-info-main py-md-5 py-4 editContent">
        <div class="container-fluid py-md-4">
            <div class="d-flex">
                <div class="left-ads-display col-lg-9">
                    <div class="d-flex flex-column align-items-center">
                        <div v-for="post in posts" :key="post.id" class="col-md-7 product-men">
                            <div class="product-shoe-info editContent mt-lg-4">
                                <div class="item-info-product">
                                    <h4 class="">
                                        <a href="" @click="goToSingle(post.id)" class=" wrapped">{{ post.headline }}</a>
                                    </h4>
                                    <small v-if="'category' in post" class="mark">{{ post.category }}</small>
                                    <div class="product_price">
                                        <div class="grid-price">
                                            <span v-html="post.content" class="content"></span>
                                        </div>
                                    </div>
                                    <div class="row pt-4">
                                        <div class="pl-2">Рейтинг: {{ post.rating }}</div>
                                        <div class="pl-2">Просмотров: {{ post.view_count }}</div>
                                        <div class="pl-2">Комментариев: {{ post.comments_count }}</div>
                                        <div class="pl-2">Дата: {{ new Date(post.date_create).toDateString() }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container-fluid py-md-4">
                    <SideBar :page="page" @page-changed="changePage"/>
                </div> 
            </div>
            <div class="container py-md-4">
                <Pagination :page="page" :search="search" :total="total" :page_size="page_size" @page-changed="changePage"/>
            </div>
        </div>
    </section>
</template>

<script>
import SideBar from "../components/SideBar"
import Pagination from "../components/Pagination"

export default {
    name: "PostsList",
    components: {SideBar, Pagination},
    props: ['posts', 'page', 'total', 'page_size', 'category', 'search'],
    data() {
        return {

        };
    },
    methods: {
        goToSingle(id) {
            this.$emit('goToSingle', id)
        },
        changePage(pageNumber, searchArticles) {
            this.$emit('page_changed', pageNumber, searchArticles, this.category)
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
