<template>
    <div class="login-container">        
        <Particles/>
        <div class="title-container">
            <img
                src="../../assets/images/light1.png"
                style="width: 400px"
            >   
            <img class="bg"
                src="../../assets/images/2.webp"
            >          
        </div>
        <div class="login-bg">
            <p class="title">
                <span>雷电防护装置检测业务管理服务平台</span>
                <img
                    src="../../assets/images/2.webp"
                >   
            </p>
            <div class="formDiv">
                <!-- <img
                    src="../../assets/logo2.png"
                    id="logoImg"
                > -->
                <h3>用户登录</h3>
                <el-form
                    ref="loginForm"
                    :model="loginForm"
                
                    class="login-form"
                    auto-complete="on"
                    label-position="left"
                ><!--  :rules="loginRules" -->
                    <el-form-item prop="userName">
                        <span class="svg-container">
                            <svg-icon icon-class="user" />
                        </span>
                        <el-input
                            ref="userName"
                            v-model="loginForm.userName"
                            placeholder="用户名"
                            name="userName"
                            type="text"
                            tabindex="1"
                            auto-complete="on"
                        />
                    </el-form-item>

                    <el-form-item prop="password">
                        <span class="svg-container">
                            <svg-icon icon-class="password" />
                        </span>
                        <el-input
                            :key="passwordType"
                            ref="password"
                            v-model="loginForm.password"
                            :type="passwordType"
                            placeholder="密码"
                            name="password"
                            tabindex="2"
                            auto-complete="on"
                            @keyup.enter.native="handleLogin"
                        />
                        <span
                            class="show-pwd"
                            @click="showPwd"
                        >
                            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                        </span>
                    </el-form-item>
                    <div style="text-align:center">
                        <el-button
                            :loading="loading"
                            type="primary"
                            style="width:80%;margin-top:30px;"
                            @click.native.prevent.enter="handleLogin"
                        >登 录</el-button>
                    </div>                    
                </el-form>
            </div>
        </div>
        <div class="login-footer">
            <p>版权所有：云南省气象灾害防御技术中心</p>
        </div>
    </div>
</template>

<script>
import { validUsername } from "@/utils/validate";
import particlesJs from "../../components/Particles/Particles"
export default {
    name: "Login",
    components:{
		Particles: particlesJs
    },
    data() {
        const validateUsername = (rule, value, callback) => {
            if (!validUsername(value)) {
                callback(new Error("Please enter the correct user name"));
            } else {
                callback();
            }
        };
        const validatePassword = (rule, value, callback) => {
            if (value.length < 6) {
                callback(
                    new Error("The password can not be less than 6 digits")
                );
            } else {
                callback();
            }
        };
        return {
            loginForm: {
                userName: "",
                password: "",
            },
          /*   loginRules: {
                userName: [
                    {
                        required: true,
                        trigger: "blur",
                        validator: validateUsername,
                    },
                ],
                password: [
                    {
                        required: true,
                        trigger: "blur",
                        validator: validatePassword,
                    },
                ],
            }, */
            loading: false,
            passwordType: "password",
            redirect: undefined,
        };
    },
    watch: {
        $route: {
            handler: function (route) {
                this.redirect = route.query && route.query.redirect;
            },
            immediate: true,
        },
    },
    methods: {
        showPwd() {
            if (this.passwordType === "password") {
                this.passwordType = "";
            } else {
                this.passwordType = "password";
            }
            this.$nextTick(() => {
                this.$refs.password.focus();
            });
        },
        handleLogin() {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.loading = true;
                    this.$store
                        .dispatch("user/login", this.loginForm)
                        .then(() => {
                            this.$router.push({ path:'/HomePage'});
                            this.loading = false;
                        })
                        .catch(() => {
                            this.loading = false;
                        });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
    },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

/* @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
        color: $cursor;
    }
} */

/* reset element-ui css */
.login-container {
    background-image: url("../../assets/images/loginBg.png");
    background-size: 100% 100%;
    position: relative;
    .el-input {
        display: inline-block;
        height: 47px;
        width: 300px;

        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            height: 47px;
            padding: 0;

           /*  &:-webkit-autofill {
                box-shadow: 0 0 0px 1000px $bg inset !important;
                -webkit-text-fill-color: $cursor !important;
            } */
        }
    }

    .el-form-item {
        background: #fff;
        border-radius: 5px;
        color: #454545;
    }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #1084FA;
$light_gray: #eee;

.login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form {
        
    }

    .tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 10px;

        span {
            &:first-of-type {
                margin-right: 16px;
            }
        }
    }

    .svg-container {
        padding: 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        display: inline-block;
        font-size: 20px;
    }

    .title-container {
        position: absolute;
        left: 10%;
        top: 50%;
        transform: translateY(-50%);
        .bg{
           position: absolute;
            bottom: -130px;
            left: -130px;
        }
    }
    .login-bg {
        position: absolute;
        top: 50%;
        right: 10%;
        transform: translateY(-50%);
        .title {
            text-align: center;
            width: 100%;
            margin: 0;
            height: 70px;
            line-height: 70px;
            position: relative;
            span{
                font-size: 35px;
                font-weight: bold;
                background: linear-gradient(to bottom, #0E82FA, #6EEAF9);
                background-clip: text;
                -webkit-background-clip: text;
                color: transparent;
                letter-spacing: 3px;
            }
            img{
                position: absolute;
                bottom: -180px;
                left: -50px;
                z-index: -1;
            }
        }
        .formDiv{
            width: 588px;
            height: 418px;
            margin: 50px auto 0;
            background-image: url("../../assets/images/loginBox.png");
            background-size: 100%;
            padding: 20px 100px;
            h3{
                text-align: center;
                color: #fff;
                letter-spacing: 3px;
                font-size: 30px;
                font-weight: 500;

            }
        }
    }
    .login-footer {
        position: absolute;
        bottom: 8%;
        left: 0;
        width: 100%;
        text-align: center;
        p {
            color: #fff;
            font-size: 18px;
            letter-spacing: 4px;
        }
    }
    .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
    }
}
</style>
