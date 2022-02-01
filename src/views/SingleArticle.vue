<template>
    <section class="ab-info-main py-md-5 py-4 editContent single">
        <Single :post="article" @change_rating="changeRating" @reload_post="loadArticle"/>
    </section>
</template>

<script>
import Single from "../components/Single"
import { api } from "../http"
export default {
    name: "SingleArticle",
    props: ['id'],
    components: { Single },
    data() {
        return {
            article: {},
        };
    },
    created() {
        this.loadArticle(this.id)
    },
    methods: {
        async loadArticle(id) {
            this.article = await api.get(`articles/${id}`
            ).then(response => {
                return response.data
            }
            ).catch(error => {
                console.log(error)
            })
        },
        changeRating(id, rating) {
            api.patch(`/articles/${id}/change_rating/`, {
                rating: rating
            }
            ).then(response => {
                alert('accept')
                this.loadArticle(id)

            }
            ).catch(error => {
                alert(error.response.data)
            })

        },
    },
    beforeRouteUpdate(to, from, next) {
        this.loadArticle(to.params.id)
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
