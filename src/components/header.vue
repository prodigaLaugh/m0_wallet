<template>
  <div  class="commonHeaderWrap">
      <div class="commonHeader">
				<div class="left">
          <img src="../assets/login/logo.png" alt="">
          <span>TK WALLET</span>
        </div>

				<!-- <div class="right hidden-xs-only"> -->
				<div class="right">

					<div class="rightContainer">
						<div @click="$router.push('/main/privatekeyManagement')">
							<img src="../assets/praviteKeyIcon.png" style="width:24px;padding-right:4px;" alt="">
							秘钥管理
						</div>
						<div @click="$router.push('/main/walletIndex')">
							<span class="el-icon-setting" style="font-size:14px;font-weight:bold;padding-right:8px;"></span>
							钱包管理
						</div>
						<div class="user">
							<img src="../assets/defaultUser.png" style="width:14px;margin-right:10px;" alt="">
							{{username}}
							<div>
								<span @click="visitcodeFlag=true"><img src="../assets/headerIconInvite.png" alt="">生成邀请码</span>
								<span @click="logout"><img src="../assets/headerIconLogout.png" alt="">登出</span>
							</div>
						</div>
					</div>

				</div>
			</div>


			<!-- 生成邀请码弹窗 -->
			<el-dialog title="生成邀请码" :visible.sync="visitcodeFlag" :center="true">

					<div class="dialogContentWrap">

						<div class="tips">⚠️邀请码用来邀请平台的新用户，使用邀请码注册的用户，被邀请者的权限将从属于邀请者，邀请码有效时间持续6小时。</div>
						<div class="visitSelectWrap">
							<el-row>
								<el-col :md="16">
									邀请码生成数量：
									<el-select v-model="amount" placeholder="请选择">
										<el-option
										  v-for="item in options"
										  :key="item.value"
										  :label="item.label"
										  :value="item.value">
										</el-option>
									 </el-select>
								</el-col>
								<el-col :md="6">
									<div
										class="visitBtn"
										@click="generate">生成邀请码</div>
								</el-col>
							</el-row>

						</div>
						<div class="visitcodeWrap" v-if="visitcodeLists.length">
							<el-row>
								<el-col
									:md="12"
									v-for="(item,index) in visitcodeLists"
									:key="index">
									<span>{{item}}</span>
									<span
										class="tag-read blue"
										:data-clipboard-text="item"
										@click="copy">复制邀请码</span>
								</el-col>

							</el-row>
						</div>

					</div>
					<div slot="footer" class="dialog-footer">
						<!-- <el-button @click="visitcodeFlag = false">复制到剪切板</el-button> -->
						<el-button type="primary" :size="'medium'" style="width:100%;" @click="visitcodeFlag = false">完成</el-button>
					</div>
			</el-dialog>

			<!-- 点击秘钥管理输入密码弹窗 -->
			<el-dialog
			  title="请输入账户密码"
			  :center="true"
			  :visible.sync="privatekeyDialogFlag"
			  width="40%">
			  <div class="dialogContentWrap">
				  <div class="tips">⚠️请输入账户对应的密码，已确认身份</div>
				  <el-input v-model="value" placeholder="输入密码"></el-input>
			  </div>
			  <span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			  </span>
			</el-dialog>

  </div>
</template>
<script>

import Vue from 'vue';
import { Row, Col, Dialog, Select, Option, Input, Button } from 'element-ui';

import { generateInviteCode } from '@/util/server.js'
import { delCookie } from '@/util/cookie'
import {getAccountLists} from '@/util/server.js'

import Clipboard from 'clipboard'

Vue.use(Row);
Vue.use(Col);
Vue.use(Input);
Vue.use(Option);
Vue.use(Select);
Vue.use(Button);
Vue.use(Dialog);

export default {
	created(){
		this.username = localStorage.USERTOKEN;
		var accountInfo = this.getLocalAccountInfo()

		getAccountLists.bind(this)()
			.then(({data})=>{

				if(data.status=='success'){

					var lists = data.data.list_accounts;
					if(lists&&lists.length){
						lists.map((item, index)=>{
							if(item.status==1){
								localStorage.accountInfo  = JSON.stringify(item);
								this.accountname = accountInfo.account_alias;
								this.$store.commit('changeAccountAlias', accountInfo.account_alias)
							}

						})
					}else{
            localStorage.removeItem('accountInfo');
          }

				}



			})
	},
	data(){
		return {

			username:'',
			submitFlag:true,
			visitcodeFlag:false,
			privatekeyDialogFlag:false,//进入秘钥管理 输入密码弹窗
			options: [{
				  value: 1,
				  label: 1
				}, {
				  value: 2,
				  label: 2
				}, {
				  value: 3,
				  label: 3
				}, {
				  value: 4,
				  label: 4
				}, {
				  value: 5,
				  label: 5
				}, {
				  value: 6,
				  label: 6
			}],
			value:'',

			amount:'',
			visitcodeLists:[],
		}
	},
	methods:{
		logout(){
			delCookie('USERTOKEN')
			delCookie('autoLogin')
			this.$router.push('/login')
		},
		copy() {
	        var clipboard = new Clipboard('.tag-read')
	        clipboard.on('success', e => {
				console.log('复制成功')
				this.$message({
					type:'success',
					message:'复制成功'
				})
		        // 释放内存
		        clipboard.destroy()
	        })
	        clipboard.on('error', e => {
	          // 不支持复制
	          console.log('该浏览器不支持自动复制')
	          // 释放内存
	          clipboard.destroy()
	        })
	    },
		generate(){

			let params = {
				amount: this.amount,
			}
			if(!this.submitFlag){
				return false;
			}
			this.submitFlag = false;
			generateInviteCode.bind(this)(params)
				.then(({data})=>{
					console.log(data,111)
					if(data.status == 'success'){
						this.visitcodeLists = data.data.codes;
					}else{
						this.$message({
							type:'error',
							message:data.detail
						})
					}
					setTimeout(()=>{
						this.submitFlag = true;
					},100)


				})
		}

	},

}
</script>

<style lang="scss" scoped>
  .commonHeaderWrap{
    height:54px;
		.commonHeader{
			position:fixed;
			left:0;
			right:0;
			top:0;
			background:$blackBg;
			display:flex;
			z-index:10;

			.left{
				width:200px;
				line-height:54px;
				color:#fff;
				font-size:14px;
				padding-left:40px;
        display:flex;
        align-items: center;
        img{
          height:24px;
        }
        >span{
          margin-left:10px;
        }
			}

			.right{
				flex:1;
				display:flex;
				justify-content:flex-end;
				align-items:center;
				.title{
					padding-left:40px;
					color:#fff;
					font-size:24px;
				}
				.rightContainer{
					display:flex;
					align-items:center;
					>div{
						font-size:12px;
						color:#fff;
						display:flex;
						align-items:center;
						padding-right:40px;
						height:54px;
						cursor:pointer;

						span{
							font-size:30px;
							padding-right:10px;
						}
						&.user{
							position:relative;
							min-width:100px;
							&:hover>div{
								height:88px;
							}
							>div{
								position:absolute;
								right:10px;
								top:56px;
								height:0;
								overflow:hidden;
								transition:height .5s;
                padding-right:14px;
                padding-left:18px;
                width:182px;
                background:$blackBg;

								>span{
                  height:44px;
									font-size:12px;
									color:#fff;
                  display:flex;
                  align-items: center;
                  border-bottom:1px solid #525858;
                  &:last-of-type{
                    border-bottom:0 none;
                    img{
                      width:15px;
                    }
                  }

                  img{
                    margin-right:16px;
                    width:17px;
                  }
								}

							}
						}
					}
				}

			}
		}

  }
</style>
