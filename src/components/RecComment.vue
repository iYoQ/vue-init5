<template>
    <div class="media py-5 comments">
        <img :src="comment.avatar" class="mr-3 img-fluid" alt="" height="75" width="75"/>
        <div class="media-body mt-4">
            <div class="d-flex">
                <h5 class="mt-0 editContent">{{ comment.author }}</h5>
                <span class="pl-2 date-comment">{{ new Date(comment.date_create).toDateString()  }}</span>
            </div>
            <p class="mt-2 editContent">{{ comment.content }}</p>
            <a href="#flag" @click="addParent(comment.id)">Ответить</a>
            <RecComment v-for="child in comment.children" v-bind:comment="child" :key="child.id" @addParent="addParent"/>
        </div>
    </div>
</template>

<script>
export default {
    name: "RecComment",
    props: ['comment'],
    data() {
        return {
            content: null,
            parent: null,
        };
    },
    methods: {
        addParent(id) {
            this.$emit('addParent', id)
        },
    },
};
</script>

<style scoped>
    .comments {
            width: 100%;
        }
    .date-comment {
        opacity: 50%;
    }
</style>
