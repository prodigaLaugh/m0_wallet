
<template>
	<div class="loginWrap">
		<div class="loginContainer">

		
			<div class="loginTitle">TK中心化钱包</div>
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
					v-model="loginParams.againPassword" 
					placeholder="请再次输入密码"
					type="password"
					autocomplete="new-password"></el-input>
			</div>
			<div class="loginInpWrap">
				<span>邀请码</span>
				<el-input 
					v-model="loginParams.invite_code" 
					placeholder="请输入邀请码(必填)"></el-input>
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
	import axios from 'axios'
import SIdentify from '@/components/identify'

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
				invite_code: "",
				password: "",
				againPassword:'',
				user_name: ""
			}
    };
  },
  mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  methods: {
	login(){
		let url = `${BASEURL1}/v1/user/register`
		let params = Object.assign({},this.loginParams) ;
		

		if(!this.loginParams.user_name ||
			!this.loginParams.password ||
			!this.loginParams.againPassword ||
			!this.loginParams.invite_code
			||!this.verifycode){
				this.$message ({
					message: '请完善信息',
					type: 'warning'
				});
				return false;
		}
		if(this.verifycode.password!=this.verifycode.againPassword){
			this.$message ({
				message: '两次密码不一致',
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

		axios.post(url,params)
			.then(({data})=>{
				if(data.status =='success'){
					this.$message ({
						message: '注册成功',
						type: 'success'
					});
					setTimeout(()=>{
						this.$router.push('/login');
						this.loginFlag = true;
					},1500)
				}else{
					var msg = data.error;
					this.$message ({
						message: msg,
						type: 'warning'
					});
				}
				
				this.loginFlag = true;
				


			})
			.catch(({data})=>{
				console.log(data)
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
