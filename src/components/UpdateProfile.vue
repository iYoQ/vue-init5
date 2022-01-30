<template>
    <div class="desc1-right col-md-11 pl-lg-4">
        <div class="d-flex">
            <div class="d-flex flex-column">
                <img :src="new_image" class="mr-3 img-fluid" alt="" height="150" width="150"/>
                <br>
                <input @change="onFileChange" type="file" accept="image/*">
            </div>
            <div class="align-self-center">
                <h5 class="wrapped">{{ user.username }}</h5>
                <li class="li-article pb-3 font-italic li-user"><span><mark>{{ user.role }}</mark></span></li>
                <li class="li-article pb-3 font-italic li-user"><mark><span>Email: </span>{{ user.email }}</mark></li>
            </div>
        </div>
        <div class="pl-3 pt-3 d-flex flex-column">
            <span class="span-user">День рождения:</span><input v-model="new_birth" class="li-user">
            <span class="span-user">Пол:</span><input v-model="new_gender" class="li-user">
            <span class="span-user">Описание:</span><input v-model="new_description" class="li-user">
            <button type="button" class="mt-3 btn btn-block py-3" @click="sendUpdate()">Обновить</button>
            <button type="button" class="mt-3 btn btn-block py-3" @click="$emit('back')">Отмена</button>
        </div>
        
    </div>
</template>

<script>

export default {
    name: "UpdateProfile",
    props: ['user'],
    data() {
        return {
            new_image: this.user.avatar,
            new_birth: this.user.birth_date,
            new_gender: this.user.gender,
            new_description: this.user.description
        }
    },
    methods: {
        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            this.createImage(files[0]);
            },
        createImage(file) {
            var image = new Image();
            var reader = new FileReader();
            var vm = this;

            reader.onload = (e) => {
                vm.new_image = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        async sendUpdate() {
            let data = {
                avatar: this.new_image,
                description: this.new_description,
                birth_date: this.new_birth,
                gender: this.new_gender
            }
            await fetch(`${this.$store.getters.getServerUrl}/users/${this.user.username}/`,
            {
                credentials: 'include',
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
                },
                body: JSON.stringify(data)
            }
            ).then(response => response.ok ? response.json() : Promise.reject(response)
            ).then(response => {
                this.$emit('reload_page')
                this.$emit('back')
            }
            ).catch(err => alert(err.statusText))
        },
    },
};
</script>

<style scoped>
    .li-user {
        list-style: none;
    }
    .span-user {
        font-weight:bold;
    }
</style>
