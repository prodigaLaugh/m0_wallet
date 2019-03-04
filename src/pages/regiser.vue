
<template>
	<div class="loginWrap">
		<div class="loginContainer">

		
			<div class="loginTitle">M0资产存证管理平台</div>
			<div class="loginDescription">注册/sign up</div>

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
			<div class="loginInpWrap">
				<span>确认密码</span>
				<el-input 
					v-model="loginParams.password" 
					placeholder="请再次输入密码"
					type="password"
					autocomplete="new-password"></el-input>
			</div>
			<div class="loginInpWrap">
				<span>邀请码</span>
				<el-input 
					v-model="loginParams.password" 
					placeholder="请输入邀请码(必填)"
					type="password"
					autocomplete="new-password"></el-input>
			</div>

	
			<div class="loginInpWrap">
				<span>校验码</span>
				<div>
					<el-input 
						v-model="verifycode" 
						placeholder="请输入右侧的验证码"
						type="text"></el-input>
					<div @click="refreshCode">
						<s-identify :identifyCode="identifyCode" ></s-identify>
					</div>
					 
				</div>
			</div>

			<div class="loginBtnWrap">
				<div @click="$router.push('/login')">去登录</div>
				<div @click="login">注册</div>
			</div>

		</div>
	</div>
</template>

<script>
import SIdentify from '@/components/identify'
import {setCookie, getCookie } from '@/util/cookie'

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
				password:''
			}
    };
  },
  mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  methods: {
		login(){
			let url = `/deploy_user/login`
			let params = this.loginParams;

			if(!this.loginParams.user_name ||
				!this.loginParams.password ||
				!this.verifycode){
					this.$message ({
							message: '请完善信息',
							type: 'warning'
					});
					return false;
			}

			if(this.verifycode.toLocaleLowerCase() !== this.identifyCode.toLocaleLowerCase()){
					this.$message ({
							message: '验证码不正确',
							type: 'warning'
					});
					return false;
			}
		
			


			if(!this.loginFlag){
					return false;
			}
			this.loginFlag = false;

			this.$http.post(url,params)
					.then(({data})=>{
						this.addUserFlag = false;
						let type = 'warning',
							message = '登录成功',
							hour = 1,
							autoLogin = 'false';
						if(data.code === '0'){
								type = 'success';
								if(this.autoLogin){
									hour = 24 * 3;
									autoLogin = 'true';
								}
								setCookie('USERTOKEN',data.data.token,hour)
								setCookie('autoLogin',autoLogin,hour)
								setTimeout(()=>{
									location.href  = '/main';
								},1500)
								
						}else{
							message = data.msg
						}
						this.$message ({
								message: message,
								type: type
						});
						
						setTimeout(()=>{
							this.loginFlag = true;
						},1500)


					})
					.catch(({data})=>{
						console.log(data)
						this.$message ({
								message: data && data.data,
								type: 'warning'
						});
						this.loginFlag = true;
					})
			// USERTOKEN
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
