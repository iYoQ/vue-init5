<template>
    <div class="cols">
        <div class="single-form-left">
            <div class="contact-single">
                <h3 class="editContent">Оставить комментарий</h3>
                <form action="#" method="get" class="mt-4" id="formComment">
                    <div class="form-group editContent">
                        <label for="contactcomment" class="editContent" >Ваш комментарий *</label>
                        <textarea class="form-control border" rows="5" id="contactcomment" required="" 
                        v-model="content"></textarea>
                    </div>
                    <button type="button" class="mt-3 btn btn-success btn-block py-3" @click="sendComment()">Отправить</button>
                </form>
            </div>
        </div>
        <RecComment :comment="comment" v-for="comment in comments" :key="comment.id" @addParent="addParent"/>
    </div>
</template>

<script>
import RecComment from "./RecComment";
export default {
    name: "RootComment",
    props: ['comments', 'article'],
    components: {
        RecComment
    },
    data() {
        return {
            content: '',
            parent: null,
        }
    },
    methods: {
        async sendComment() {
            let data = {
                content: this.content,
                parent: this.parent
            }
            await fetch(`${this.$store.getters.getServerUrl}/articles/${this.article}/comments/`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
                },
                body: JSON.stringify(data)
            }
            ).then((response) => {
                this.clearForm()
                this.$emit('reload_page')
            })
        },
        clearForm() {
            this.content = ''
            this.parent = null
        },
        addParent(data) {
            this.parent = data
        }
    }
    
};
</script>

<style scoped>
   
</style>
