<template>
    <section class="ab-info-main py-md-5 py-4 editContent single">
        <div class="container py-md-5">
            <div class="container py-md-5">
                <form @submit.prevent="submitForm">
                    <div class="form-group">
                        <label for="headline">Заголовок:</label>
                        <input v-model="headline" type="text" class="form-control" placeholder="Введите название">
                    </div>
                    <div v-if="!isNews" class="form-group">
                        <label for="category">Категория:</label>
                        <select v-model="category" class="form-control">
                            <option hidden disabled selected value>Выберите категорию</option>
                            <option v-for="category in categorys" :key="category.id">{{ category.name }}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="category">Текст:</label>
                        <ckeditor v-model="content" :config="editorConfig" tag-name="textarea" value=""></ckeditor>
                    </div>
                    <button type="submit" class="btn customBtn btn-block">Отправить</button>
                </form>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "CreatePost",
    props: ['categorys', 'isNews'],
    created() {
        if(sessionStorage.getItem('categorys')) {
            this.categorys = JSON.parse(sessionStorage.getItem('categorys'))
            sessionStorage.removeItem('categorys')
        }

        window.addEventListener('beforeunload', () => {
            sessionStorage.setItem('categorys', JSON.stringify(this.categorys))
        })
    },
    data() {
        return {
            headline: null,
            category: "",
            content: null,
            editorConfig : {
               
            },
        }
    },
    methods: {
        submitForm(e) {
            this.$emit('send_post', this.headline, this.content, this.category)
        }
    }
};
</script>
    
<style scoped>
    
</style>
