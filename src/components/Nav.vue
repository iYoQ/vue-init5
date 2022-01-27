<template>
    <div class="" id="nav">
            <header class="header">
                <div class="container-fluid px-lg-5">
                    <nav class="py-1 nav">
                        <div id="logo">
                            <h1> <a href="#" class="editContent">Init5</a></h1>
                        </div>
                        <!-- <label for="drop" class="toggle">Menu</label>
                        <input type="checkbox" id="drop"> -->
                        <ul class="menu mt-3">
                            <li class="active"><a href="#">Главная</a></li>
                            <li class="news"><a href="#">Новости</a></li>
                            <li>
                                <label for="drop-2" class="toggle">Категории <span class="fa fa-angle-down" aria-hidden="true" ></span></label>
                                <a href="#">Категории <span class="fa fa-angle-down" aria-hidden="true"></span></a>
                                <input type="checkbox" id="drop-2">
                                <ul>
                                    <li><a href="#">Разработка</a></li>
                                    <li><a href="#">Дизайн</a></li>
                                </ul>
                            </li>
                        </ul>
                        <div class="mt-3"><a href="#" class="login">Вход</a></div>
                    </nav>
                </div>
            </header>
        </div>
</template>

<script>
    export default {
        name: "Nav"
    }
</script>

<style scoped>
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

    .login {
        color: rgb(255, 255, 255); 
        font-weight: 700; 
        text-transform: uppercase;
    }

</style>