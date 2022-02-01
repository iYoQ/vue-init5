<template>
    <CreatePost :isNews="isNews" @send_post="sendNews"/>
</template>

<script>
import CreatePost from "../components/CreatePost"
import { api } from "../http"

export default {
    name: "CreateNews",
    components: { CreatePost },
    data() {
        return {
            isNews: true
        }
    },
    methods: {
        async sendNews(headline, content){
            const formData = {
                headline: headline,
                content: content,
            }
            await api.post('/news/', formData
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
