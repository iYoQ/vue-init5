<template>
    <section class="ab-info-main py-md-5 py-4 editContent single">
        <div class="container py-md-4">
            <div class="d-flex">
                <div class="left-ads-display col-lg-10">
                    <div class="row">
                        <div class="desc1-right col-md-11 pl-lg-4">
                            <h5 class="editContent wrapped">{{ article.headline }}</h5>
                            <ul class="pl-3 pt-3">
                                <li class="li-article pb-3 font-italic "><span><mark>{{ article.category }}</mark></span></li>
                                <li class="li-article"><span>{{ article.author }}</span></li>
                                <li class="li-article"><span>{{ new Date(article.date_create).toDateString() }}</span></li>
                                <div class="row pl-3">
                                    <li class="li-article">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-circle pt-1" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/></svg> 
                                        <span class="text-success"> {{ article.rating }} </span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill pt-1" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/></svg>
                                    </li>
                                    <img src="" alt=""> <li class="li-article pl-5"><span>Views: {{ article.view_count }}</span></li>
                                    <img src="" alt=""> <li class="li-article pl-5"><span>Comments: {{ article.comments_count }}</span></li>
                                </div>
                                <div class="share-desc">
                                    <div class="share">
                                        <h4 class="editContent">Share:</h4>
                                        <ul class="w3layouts_social_list list-unstyled">
                                            <li>
                                                <a href="#" class="w3pvt_facebook editContent"><span class="fa fa-facebook-f"></span></a>
                                            </li>
                                            <li>
                                                <a href="#" class="w3pvt_twitter editContent"><span class="fa fa-twitter"></span> </a>
                                            </li>
                                            <li>
                                                <a href="#" class="w3pvt_dribble editContent"><span class="fa fa-dribbble"></span></a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="clearfix"></div>
                                </div>
                            </ul>
                        </div>
                    </div>
                    <div class="row sub-para-w3layouts mt-5">
                        <p class="editContent">
                            {{ article.content }}
                        </p>
                    </div>
                    <hr />
                    <Comment />
                </div>
                <div class="container-fluid py-md-4">
                        <SideBar />
                </div> 
            </div>
        </div>
    </section>
</template>

<script>
import Comment from "../components/Comment";
import SideBar from "../components/SideBar"
export default {
    name: "Single",
    props: ['id'],
    components: {Comment, SideBar},
    data() {
        return {
            article: {},
        };
    },
    created() {
        this.loadArticle()
    },
    methods: {
        async loadArticle() {
            this.article = await fetch(
                `${this.$store.getters.getServerUrl}/articles/${this.id}`
            ).then((response) => response.json())
        },
    },
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
    top: 5%;
}
</style>
