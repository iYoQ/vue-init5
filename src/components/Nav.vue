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
                            <li><a @click="goToNews()" href="">Новости</a></li>
                            <li><a @click="goToUsers()" href="">Пользователи</a></li>
                            <li>
                                <label for="drop-2" class="toggle">Категории <span class="fa fa-angle-down" aria-hidden="true" ></span></label>
                                <a class="nav-menu">Категории <span class="fa fa-angle-down" aria-hidden="true"></span></a>
                                <input type="checkbox" id="drop-2">
                                <ul>
                                    <li v-for="category in categorys" :key="category.id">
                                        <a @click="goToCategory(category.id)">{{ category.name }}</a>
                                    </li>
                                </ul>
                            </li>
                            <li v-if="$store.state.access" @click="goToCreateArticle()" class="pl-3 border border-bottom-0"><a class="nav-menu">Добавить статью</a></li>
                            <li v-if="user.is_newsmaker" @click="goToCreateNews()" class="pl-3 border border-bottom-0"><a class="nav-menu">Добавить новость</a></li>
                        </ul>
                        <div v-if="$store.state.access" class="mt-3">
                            <a @click="goProfile()" class="profile">{{ user.username }} </a>
                            <a @click="logout()" class="logout">Выход</a>
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
import { api } from "../http"
    export default {
        name: "Nav",
        components: { Login },
        props: ["render-key", "categorys"],
        data() {
            return {
                user: {},
                loginView: false,
            }
        },
        created() {
            if(this.$store.state.access) {
                this.setUser()
            }
        },
        methods: {
            async setUser() {
                this.user = await api.get('/users/me/',
                ).then(response => {
                    localStorage.setItem('username', response.data.username)
                    this.$store.commit('setIsAdmin', response.data.is_staff)
                    return response.data
                }
                ).catch(error => {
                    console.log(error)
                })
            },
            goLogin() {
                this.loginView = this.loginView == false ? true : false
            },
            goProfile() {
                this.$router.push({name: 'Profile', params: {username: this.user.username} })
            },
            goToUsers() {
                this.$router.push( {name: 'UsersList'} )
            },
            logout() {
                ['access', 'refresh', 'username'].forEach((item) => localStorage.removeItem(item));
                this.$router.go()
            },
            goToCategory(categoryID) {
                this.$store.commit('setCategory', categoryID)
                this.$router.push( {name: 'Home'} )
                this.$root.$emit('Home', this.$store.state.search, categoryID)
            },
            goToCreateArticle() {
                this.$router.push( {name: 'CreateArticle', params: {categorys: this.categorys}} )
            },
            goToCreateNews() {
                this.$router.push( {name: 'CreateNews'} )
            },
            goToNews() {
                this.$router.push( {name: 'News'} )
            },
            forceRerender() {
                this.$emit('component-reload')
            },
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
        font-weight: 700;
        text-decoration: none;
        color: white !important;
        position: relative;
        padding: 5px 10px;
        border: 1px solid;
        border-image: linear-gradient(180deg, #ff3000, #ed0200, #ff096c, #d50082);
        border-image-slice: 1;
        overflow: hidden;
        letter-spacing: 2px;
        transition: .8s cubic-bezier(.165, .84, .44, 1);
    }
    .profile:before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        height: 0;
        width: 100%;
        z-index: -1;
        color: white;
        background: linear-gradient(180deg, #ff3000, #ed0200, #ff096c, #d50082);
        transition: .8s cubic-bezier(.165, .84, .44, 1);
    }
    .profile:hover {
        background: rgba(255, 255, 255, 0);
    }
    .profile:hover:before {
        bottom: 0%;
        top: auto;
        height: 100%;
    }
    .logout {
        cursor: pointer;
        font-weight: 700;
        padding: 5px 10px;
        border: 1px solid;
        border-image: linear-gradient(180deg, #ff3000, #ed0200, #ff096c, #d50082);
        border-image-slice: 1;
        text-transform: uppercase;
        background-color: #1e272e;
        color: white !important;
    }
    .nav-menu {
        color:white !important;
        font-weight: bold !important;
        border-image: linear-gradient(180deg, #ff3000, #ed0200, #ff096c, #d50082);
        border-image-slice: 1;
    }
</style>