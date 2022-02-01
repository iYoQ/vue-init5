<template>
    <div class="activation">
        <div class="cont_centrar">
            <div class="cont_login">
                <form action="">
                    <div class="cont_text_inputs">
                        <input v-model="code" type="text" class="input_form_sign d_block active_inp" placeholder="Secret code" name="code" />
                    </div>
                    <div class="cont_btn">
                        <button @click="setActivation()" type="button" class="btn_sign">SIGN IN</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import { api } from "../http"
    export default {
        name: "Activation",
        data() {
            return {
                code: '',
            }
        },
        methods: {
            async setActivation(){
                await api.post('/users/activation/', {
                    secret_code: this.code
                }
                ).then(response => {
                    alert(response.data)
                    this.$router.push( {name: 'Home'} )
                }
                ).catch(error => {
                    console.log(error)
                    alert(error.response.data.error)
                })
            }
        },
    }
</script>

<style scoped>
    .activation {
        width: 100%;
        height: 50vh;
        display: flex;
        justify-content: center;
        align-items: center;
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