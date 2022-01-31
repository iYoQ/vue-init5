<template>
    <CreatePost :categorys="categorys" @send_post="sendArticle"/>
</template>

<script>
import CreatePost from "../components/CreatePost"
import { api } from "../http"

export default {
    name: "CreateArticle",
    components: { CreatePost },
    props: ['categorys'],
    methods: {
        async sendArticle(headline, content, category){
            const formData = {
                headline: headline,
                category: category,
                content: content
            }
            await api.post('/articles/', formData
            ).then(response => {
                this.$router.push( {name: "Home"} )
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
