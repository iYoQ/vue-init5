<template>
    <div class="login container-fluid">
        <div class="cont_centrar">
            <div class="cont_login">
                <form action="">
                    <div class="cont_tabs_login">
                        <ul class='ul_tabs'>
                            <li :class="{active: signIn===true}"><a @click="showSignIn()">SIGN IN</a><span class="linea_bajo_nom"></span></li>
                            <li :class="{active: signUp===true}"><a @click="showSignUp()">SIGN UP</a><span class="linea_bajo_nom"></span></li>
                        </ul>
                    </div>
                    <div class="cont_text_inputs">
                        <input type="text" class="input_form_sign active_inp" :class="{d_block: signUp===true}" v-model="username" placeholder="Username" />
                        <input type="text" class="input_form_sign d_block active_inp" v-model="email" placeholder="Email" name="email" />
                        <button @click="restorePassword()" v-if="restorePass" class="btn_restore">RESTORE</button>
                        <input type="password" class="input_form_sign active_inp" :class="{d_block: restorePass===false}" v-model="password" placeholder="Password" name="pass" />  
                        <a @click="showRestorePassword()" class="link_forgot_pass" :class="{d_block: signIn===true}">Forgot Password ?</a> 
                        <div class="terms_and_cons d_none" :class="{d_block: signUp===true}">
                            <p><input type="checkbox" name="terms_and_cons" /> <label for="terms_and_cons">Accept  Terms and Conditions.</label></p>
                        </div>
                    </div>
                    <div class="cont_btn">
                        <button v-if="signIn" type="button" class="btn_sign" @click="setLogin()">SIGN IN</button>
                        <button v-if="signUp" type="button" class="btn_sign" @click="setRegistration()">SIGN UP</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import { api } from "../http"

    export default {
        name: "Login",
        data() {
            return {
                email: null,
                password: null,
                username: null,
                signIn: true,
                signUp: false,
                restorePass: false,
            }
        },
        methods: {
            
            showSignIn() {
                this.signIn = true
                this.signUp = false
                this.restorePass = false
                this.clearForm()
            },
            showSignUp() {
                this.signIn = false
                this.signUp = true
                this.restorePass = false
                this.clearForm()
            },
            showRestorePassword() {
                this.restorePass = true
                this.signIn = false
                this.clearForm()
            },
            async setLogin() {
                api.defaults.headers.common['Authorization'] = ''

                await api.post(`/auth/jwt-create/`, {
                    email: this.email,
                    password: this.password
                }
                ).then(response => {
                    const access = response.data.access
                    const refresh = response.data.refresh

                    this.$store.commit('setAccess', access)
                    this.$store.commit('setRefresh', refresh)

                    localStorage.setItem('access', access)
                    localStorage.setItem('refresh', refresh)

                    api.defaults.headers.common['Authorization'] = 'Bearer ' + access
                    this.$router.go()
                }
                ).catch(error => {
                    console.log(error)
                    alert('invalid input')
                })
            },
            async setRegistration() {
                await api.post('/users/registration/', {
                    username: this.username,
                    email: this.email,
                    password: this.password
                }
                ).then(response => {
                    alert(response.data)
                    this.$emit("show_login")
                    this.$router.push( {name: "Activation"} )
                }
                ).catch(error => {
                    var key = Object.keys(error.response.data)
                    alert(error.response.data[key])
                    this.clearForm()
                    return
                })
            },
            async restorePassword() {
                await api.post('/users/restore_password/', {
                    email: this.email
                }
                ).then(response => {
                    alert(response.data)
                    this.$emit("show_login")
                })
            },
            clearForm() {
                this.email = null
                this.password = null
            }
        },
        
    }
</script>

<style scoped>
    .login {
        width: 100%;
        height: 50vh;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
    }

    * {
        margin: 0px auto;
        padding: 0px;
        font-family: 'Open Sans', sans-serif;
    }
    .cont_centrar {
        position: relative;
        width: 320px;
        float: left;
        border-radius: 8px;
        transition: all 0.5s;
        background-color: rgba(255, 255, 255, 0.945);
        border: 2px solid #ff8383b2;
    }
    .cont_tabs_login {
        position: relative;
        float: left;
        width: 100%;
        cursor: pointer;
    }

    .ul_tabs > li { 
        position: relative;
        float: left;
        width: 50%;
        list-style: none;
        text-align: center;

    }
    .ul_tabs > li > a  {  
        text-decoration: none;
        font-family: Helvetica;
        font-size: 16px;
        color: #999;
        line-height: 14px;
        padding: 20px ;
        display: block;
        transition: all 0.5s;
    }

    .ul_tabs > .active > a  {  
        color: #FF8383;

    }
    .linea_bajo_nom {
        position: relative;
        width: 100%;
        float: left;
        background-color: #999;
        height: 2px;
    }

    .active .linea_bajo_nom {
        position: relative;
        width: 100%;
        float: left;
        background-color: #FF8383;
        height: 2px;
    }

    .cont_text_inputs {
        position: relative;
        float: left;
        width: 100%;
        margin-top: 20px;
    }
    .input_form_sign {
        position: relative;
        float: left;
        width: 90%;
        border: none;
        border-bottom: 1px solid #B0BEC5 ;
        background-color: transparent;
        font-size: 14px;
        outline: none;
        transition: all 0.5s;
        height: 0px;
        margin: 0px;
        padding: 0px;  
        opacity: 0;
        display: none;
    }

    .active_inp {
        margin: 5% 5% ;  
        padding: 10px 0px;
        opacity: 1;
        height: 5px;
    }
    .input_form_sign:focus {
        border-bottom: 1px solid #FF8383 ;}

    .link_forgot_pass {
        position: relative;
        margin-top: 0px;
        margin-left: 30%;
        text-decoration: none;
        color: #999;
        font-size: 13px;
        display: none;
        float: left;
        transition: all 0.5s;
    }
    .cont_btn {
        position: relative;
        float: left;
    }
    .btn_sign {
        background: rgba(255,64,88,0.74);
        box-shadow: 0px 2px 20px 2px rgba(255,114,132,0.50);
        border-radius: 8px;
        padding: 15px 30px;
        border: none;
        color: #fff;
        font-size: 14px;
        position: relative;  
        float: left;
        margin-left: 100px;
        margin-top: 20px;
        margin-bottom: 20px;
        cursor: pointer;
    }
    .btn_restore {
        background: rgba(255,64,88,0.74);
        box-shadow: 0px 2px 20px 2px rgba(255,114,132,0.50);
        border-radius: 8px;
        padding: 15px 30px;
        border: none;
        color: #fff;
        font-size: 14px;
        position: relative;  
        float: left;
        margin-left: 100px;
        margin-top: 20px;
        margin-bottom: 20px;
        cursor: pointer;
    }
    .terms_and_cons {
        width: 70%;  
        color: #999;
        font-size: 13px;
        transition: all 0.5s;
    }
    .d_none {
        display: none;
    }
    .d_block {
        display: block;
    }
    .cont_text_inputs > input:nth-child(1){
        transition-delay: 0.2s;
    }
    .cont_text_inputs > input:nth-child(2){
        transition-delay: 0.4s;
    }
    .cont_text_inputs > input:nth-child(3){
        transition-delay: 0.6s;
    }
    .cont_text_inputs > input:nth-child(4){
        transition-delay: 0.8s;
    }

</style>