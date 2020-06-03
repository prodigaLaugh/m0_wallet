
<template>
	<div class="loginWrap">
		<div class="loginContainer">


      <div class="logoWrap">
        <img src="../assets/login/logo.png" alt="">
        <div class="logoTitle">TK中心化钱包</div>
      </div>

      <div class="content">
        <div class="loginTitle">登录</div>
        <div class="loginInpWrap">
        	<span>用户名</span>
        	<el-input
        		v-model="loginParams.user_name"
        		placeholder="请输入用户名"
        		autocomplete="off"></el-input>

        </div>

        <div class="loginInpWrap">
        	<span>密码</span>
        	<el-input
        		v-model="loginParams.password"
        		placeholder="请输入密码"
        		type="password"
        		autocomplete="new-password"></el-input>
        </div>


        <div class="loginInpWrap yzm">
        	<span>验证码</span>
        	<div>
        		<el-input
        			v-model="verifycode"
        			placeholder="请输入右侧的验证码"
        			type="text"></el-input>
        		<div @click="refreshCode" class="verifyCode">
        			<s-identify :identifyCode="identifyCode" ></s-identify>
        		</div>

        	</div>
        </div>

        <div class="loginInpWrap loginBtnWrap">
          <span></span>
        	<div @click="login" class="btn">登录</div>
        </div>

        <div class="loginInpWrap registerWrap">
        	<span></span>
          <div>
            <label>
            	<el-checkbox v-model="autoLogin">3天内自动登录</el-checkbox>
            	<!-- <span>3天内自动登录</span> -->
            </label>
            <div @click="$router.push('/regiser')" class="regBtn">立即注册</div>
          </div>
        </div>

      </div>







		</div>
	</div>
</template>

<script>
import SIdentify from '@/components/identify'
import {setCookie, getCookie } from '@/util/cookie'
import { login } from '@/util/server.js'

import Vue from 'vue'
import { Input, Checkbox } from 'element-ui';
Vue.use(Input)
Vue.use(Checkbox)

export default {
	components:{
		SIdentify
	},
	data() {
		return {
			identifyCodes: "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ",
			identifyCode: "",
			verifycode:"",

			autoLogin:false,
			loginFlag:true,

			loginParams:{
				user_name:'',
				password:'',
			}
		}
	},
	mounted() {
		this.identifyCode = "";
		this.makeCode(this.identifyCodes, 4);
	},
	methods: {
		login(){
			let params = this.loginParams;

			if(!this.loginParams.user_name ||
				!this.loginParams.password ||
				!this.verifycode){
					this.$message ({
							message: '请完善信息',
							type: 'error'
					});
					return false;
			}

			if(this.verifycode.toLocaleLowerCase() !== this.identifyCode.toLocaleLowerCase()){
				this.$message ({
					message: '验证码不正确',
					type: 'error'
				});
				return false;
			}




			if(!this.loginFlag){
				return false;
			}
			this.loginFlag = false;

			login.bind(this)(params)
				.then(({data})=>{

					let hour = 1,
						autoLogin = 'false';
					if(data.status === 'success'){
							if(this.autoLogin){
								hour = 24 * 3;
								autoLogin = 'true';
							}
							setCookie('USERTOKEN',this.loginParams.user_name,hour)
							setCookie('autoLogin',autoLogin,hour)
							localStorage.USERTOKEN = this.loginParams.user_name
							setTimeout(()=>{
								location.href  = '/main/privatekeyManagement';
							},1500)
							this.$message ({
								message: '登录成功',
								type: 'success'
							});

					}else{
						var msg = data.error;
						this.$message ({
							message: msg,
							type: 'error'
						});
					}


					setTimeout(()=>{
						this.loginFlag = true;
					},1500)


				})
				.catch(({data})=>{
					console.log(data)
					this.loginFlag = true;
				})
	},
    randomNum(min, max) {
		return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
		this.identifyCode = "";
		this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
		for (let i = 0; i < l; i++) {
			this.identifyCode += this.identifyCodes[
			  this.randomNum(0, this.identifyCodes.length)
			];
	  	}
    }
  }
};

</script>

<style lang="scss" scoped>


</style>
