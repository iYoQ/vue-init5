<template>
    <section class="ab-info-main py-md-5 py-4 editContent single">
        <div class="container py-md-4">
            <div class="d-flex justify-content-center">
                <div class="left-ads-display col-lg-10">
                    <div class="row justify-content-around">
                        <div class="media py-5" v-for="user in users" :key="user.id">
                            <div class="row ">
                                <img @click="goToUser(user.username)" :src="user.avatar" class="mr-2" alt="" height="70" width="70"/>
                                <div class="align-self-center ">
                                        <h5 class="wrapped">{{ user.username }}</h5>
                                        <li class="li-article pb-3 font-italic li-user"><span><mark>{{ user.role }}</mark></span></li>
                                    <ul class="">
                                        <li class="li-user"><span class="span-user">Заходил:</span> {{ new Date(user.last_login).toDateString() }}</li>
                                        <li class="li-user"><span class="span-user">Рейтинг:</span> {{ user.rating }}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="container py-md-4">
                            <Pagination :total="total" :page_size="page_size" @page-changed="loadUsers"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Pagination from "../components/Pagination"
import { api } from "../http"
export default {
    name: "UsersList",
    components: { Pagination },
    data() {
        return {
            users: [],
            page: 1,
            total: 0,
            page_size: 20,
        }
    },
    created() {
        this.loadUsers(this.page)
    },
    methods: {
        async loadUsers(pageNumber) {
            this.users = await api.get(`/users/?page=${pageNumber}`
            ).then(response => {
                this.total = response.data.links.count
                return response.data.results
            }
            ).catch(error => {
                console.log(error)
            })
        },
        goToUser(username) {
            this.$router.push({name: 'Profile', params: {username: username} })
        },
    },
}
    
</script>

<style scoped>
    .li-user {
        list-style: none;
    }
    .span-user {
        font-weight:bold;
    }
</style>
