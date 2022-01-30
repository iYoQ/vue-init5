<template>
    <div class="" id="nav">
            <header class="header">
                <div class="container-fluid px-lg-5">
                    <nav class="py-1 nav">
                        <div id="logo">
                            <h1> <a href="/" class="editContent">Init5</a></h1>
                        </div>
                        <ul class="menu mt-3">
                            <li class="active"><a href="/">Главная</a></li>
                            <li class="news"><a href="">Новости</a></li>
                            <li><a @click="goToUsers()" href="">Пользователи</a></li>
                            <li>
                                <label for="drop-2" class="toggle">Категории <span class="fa fa-angle-down" aria-hidden="true" ></span></label>
                                <a class="category">Категории <span class="fa fa-angle-down" aria-hidden="true"></span></a>
                                <input type="checkbox" id="drop-2">
                                <ul>
                                    <li v-for="category in categorys" :key="category.id">
                                        <a @click="updateCategory(category.id)">{{ category.name }}</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <div v-if="jwt" class="mt-3">
                            <a @click="goProfile()" class="profile">{{ this.username }} </a>
                            <a @click="logout()" class="profile">Выход</a>
                        </div>
                        <div v-else class="mt-3"><a class="loginBtn" @click="goLogin()">Вход</a></div>
                    </nav>
                </div>
            </header>
            <Login v-if="loginView" @component-reload="forceRerender" @show_login="goLogin"/>
        </div>
</template>

<script>
import Login from "./Login"
    export default {
        name: "Nav",
        components: { Login },
        props: ["render-key", "categorys"],
        data() {
            return {
            jwt: localStorage.getItem('jwt'),
            username : null,
            loginView: false,
            }
        },
        created() {
            if(this.jwt) {
                this.setUser()
            }
        },
        methods: {
            async setUser() {
                this.username = await fetch(`${this.$store.getters.getServerUrl}/users/me/`,
                {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
                        
                    },
                }
                ).then(response => response.json()
                ).then(response => {
                    localStorage.setItem("username", response.username)
                    return response.username
                })
            },
            goLogin() {
                this.loginView = this.loginView == false ? true : false
            },
            goProfile() {
                this.$router.push({name: "Profile", params: {username: this.username} })
            },
            goToUsers() {
                this.$router.push( {name: 'UsersList'} )
            },
            logout() {
                ['jwt', 'username'].forEach((item) => localStorage.removeItem(item));
                this.$router.go()
            },
            forceRerender() {
                this.$emit('component-reload')
            },
            updateCategory(id) {
                this.$emit('change_category', id)
            }
        },
    }
</script>

<style scoped>
    #logo {
        cursor: pointer;
    }
    #nav {
        background-color: rgba(0, 0, 0, 0); 
        margin-top: 0px;
        position: sticky;      
        width:100%;
        left:0;
        top:0;
        z-index:200;
    }
    .nav {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }

    .editContent {
        outline: none; 
        outline-offset: -2px; 
        cursor: inherit; 
        color: rgb(255, 255, 255); 
        font-size: 40px; 
        background-color: rgba(0, 0, 0, 0); 
        font-family: Source Sans Pro, sans-serif;
    }

    .loginBtn {
        color: rgb(255, 255, 255); 
        font-weight: 700; 
        text-transform: uppercase;
        cursor: pointer;
    }
    .profile {
        cursor: pointer;
    }
    .category {
        color:white !important;
        font-weight: bold !important;
    }

</style>