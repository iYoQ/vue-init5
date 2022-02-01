<template>
    <div class="cols" id="flag">
        <div v-if="$store.state.access" class="single-form-left">
            <div class="contact-single">
                <h3 class="editContent">Оставить комментарий</h3>
                <form action="#" method="get" class="mt-4" id="formComment">
                    <div class="form-group editContent">
                        <label for="contactcomment" class="editContent" >Ваш комментарий *</label>
                        <textarea class="form-control border" rows="5" id="contactcomment" required="" 
                        v-model="content"></textarea>
                    </div>
                    <button type="button" class="mt-3 btn customBtn btn-block py-3" @click="sendComment()">Отправить</button>
                </form>
            </div>
        </div>
        <RecComment :comment="comment" v-for="comment in comments" :key="comment.id" @addParent="addParent"/>
    </div>
</template>

<script>
import RecComment from "./RecComment";
import { api } from "../http"
export default {
    name: "RootComment",
    props: ['comments', 'post_id', 'path'],
    components: { RecComment },
    data() {
        return {
            content: '',
            parent: null,
        }
    },
    methods: {
        async sendComment() {
            await api.post(`/${this.path}/${this.post_id}/comments/`, {
                content: this.content,
                parent: this.parent
            }
            ).then(response => {
                this.clearForm()
                this.$emit('reload_page', this.post)
            }
            ).catch(error => {
                console.log(error)
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
