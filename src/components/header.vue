<template>
  <div  class="commonHeaderWrap">
      <div class="commonHeader">
				<div class="left">logo</div>
				
				<!-- <div class="right hidden-xs-only"> -->
				<div class="right">
					<div class="title">Account1</div>
					<div class="rightContainer">
						<div @click="$router.push('/main/privatekeyManagement')">
							<img src="../assets/praviteKeyIcon.png" style="width:40px;" alt="">
							秘钥管理
						</div>
						<div @click="$router.push('/main/walletIndex')">
							<span class="el-icon-setting"></span>
							钱包管理
						</div>
						<div class="user">
							<img src="../assets/defaultUser.png" style="width:27px;margin-right:10px;" alt="">
							user001
							<div>
								<span @click="visitcodeFlag=true">生成邀请码</span>
								<span>登出</span>
							</div>
						</div>
					</div>
					
				</div>
			</div>

			<el-dialog title="生成邀请码" :visible.sync="visitcodeFlag" :center="true">
               
					<div class="dialogContentWrap">
						
							<div class="tips">⚠️邀请码用来邀请平台的新用户，使用邀请码注册的用户，被邀请者的权限将从属于邀请者，邀请码有效时间持续6小时。</div>
							<div class="visitcode">jlkjlkjlkj</div>
						
					</div>
					<div slot="footer" class="dialog-footer">
							<el-button @click="visitcodeFlag = false">复制到剪切板</el-button>
							<el-button type="primary" @click="visitcodeFlag = false">返回</el-button>
					</div>
			</el-dialog>
		
  </div>
</template>
<script>

import Vue from 'vue';
import { Dialog, Input, Button } from 'element-ui';

Vue.use(Input);
Vue.use(Button);
Vue.use(Dialog);

export default {
		data(){
			return {
				visitcodeFlag:false,
			}
		}
}
</script>

<style lang="scss" scoped>
  .commonHeaderWrap{
    height:66px;
		.commonHeader{
			position:fixed;
			left:0;
			right:0;
			top:0;
			background:$blue;
			display:flex;
			z-index:10;
			
			.left{
				width:200px;
				line-height:66px;
				color:#fff;
				font-size:24px;
				padding-left:20px;
			}
			
			.right{
				flex:1;
				display:flex;
				justify-content: space-between;
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
						font-size:14px;
						color:#fff;
						display:flex;
						align-items:center;
						padding-right:30px;
						height:66px;
						cursor:pointer;
						
						span{
							font-size:30px;
							padding-right:10px;
						}
						&.user{
							position:relative;
							
							&:hover>div{
								height:80px;
							}
							>div{
								position:absolute;
								left:0;
								right:0;
								top:66px;
								height:0;
								overflow:hidden;
								transition:height .5s;
								
								>span{
									line-height:40px;
									font-size:14px;
									color:#fff;
									background:$blue;
									display:block;
									text-align:center;
								}

							}
						}
					}
				}
				
			}
		}
    
  }
</style>

