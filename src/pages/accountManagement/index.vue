<template>
	<div class="outerWrap accountIndexWrap">
		<div class="commonTitle_one">账户管理</div>
		<div class="addAccountWrap">
			<div class="commonTitle_two">添加账户</div>
			
			<el-row  class="row-bg" :gutter="30" justify="center">
			  <el-col :lg="8" >
						<div class="addAccountItem" @click="$router.push('/main/createAccout')">新建账户</div>
				</el-col>
			  <el-col :lg="8">
						<div class="addAccountItem" @click="$router.push('/main/recoveryMnemonic')">助记词恢复</div>
				</el-col>
			  <el-col :lg="8">
						<div class="addAccountItem" @click="$router.push('/main/importBackup')">备份导入</div>
				</el-col>
			</el-row>
		</div>
		
		<div class="selectAccountWrap">
			<div class="commonTitle_two">选择账户</div>
			
			
			<el-row  class="selectAccountItem use" type="flex" justify="center">
				<div class="leftTag">
					<span>使&#10;用{{'\n'}}中</span>
				</div>
				<el-col :lg="18" class="left">
					<div class="title">
						Account01
						<span>多签</span>
					</div>
					<div class="blue leftText">公钥:jkjl32434hkjkj</div>
					<!-- <div class="leftText">主公钥:jkjl32434hkjkj</div> -->
				</el-col>
				<el-col :lg="6" class="right">
					<div>登录</div>
					<div @click="$router.push('/main/backupType')">备份</div>
					<div>删除</div>
				</el-col>
			</el-row>
			<el-row  class="selectAccountItem " type="flex" justify="center">
				<div class="leftTag">
					<span>未&#10;使{{'\n'}}用</span>
				</div>
				<el-col :lg="18" class="left">
					<div class="title">
						Account01
						<span>多签</span>
					</div>
					<div class="blue leftText">公钥:jkjl32434hkjkj</div>
					<!-- <div class="leftText">主公钥:jkjl32434hkjkj</div> -->
				</el-col>
				<el-col :lg="6" class="right">
					<div>登录</div>
					<div @click="$router.push('/main/backupType')">备份</div>
					<div>删除</div>
				</el-col>
			</el-row>
			
			
		</div>
	</div>
</template>

<script>
	
	import Vue from 'vue';
	import { Row, Col } from 'element-ui';
		
	Vue.use(Row);
	Vue.use(Col);
	
	export default {
		created(){
			
		},
		data(){
			return {
				
			}
		},
		methods:{
			
		},
	}
</script>

<style lang="scss">
	.accountIndexWrap{
		.addAccountWrap>div:nth-of-type(2){
			display:flex;
			justify-content: space-between;
			align-items: center;
			padding-bottom:10px;
			
			.addAccountItem{
				background:$blue;
				cursor:pointer;
				justify-content: center;
				align-items: center;
				line-height:80px;
				font-size:16px;
				color:#fff;
				text-align:center;
			}
		}
		
		.selectAccountWrap{
			.selectAccountItem{
				border:4px solid transparent;
				background:#eee;
				height:100px;
				align-items: center;
				position:relative;
				margin-bottom:20px;
				&.use{
					border-color:rgba(121, 121, 121, 1);
					>.leftTag{
						background:rgba(0, 0, 0, 1);
					}
					
				}
				
				>.leftTag{
					position:absolute;
					left:-4px;
					top:10px;
					bottom:10px;
					background:rgba(148, 148, 148, 1);
					border-radius:4px;
					width:18px;
					color:#fff;
					text-align:center;
					font-size:13px;
					>span{
						position:absolute;
						left:0;
						right:0;
						top:50%;
						transform: translate(0,-50%);
						line-height:18px;
					}
				}
				>.left{
					padding-left:50px;
					>.title{
						padding-bottom:16px;
						display:flex;
						align-items: center;
						font-size:18px;
						>span{
							margin-left:10px;
							padding:4px 10px;
							background:#000;
							color:#fff;
							font-size:13px;
							border-radius:5px;
						}
					}
					>.leftText{
						color:#999;
						&.blue{
							font-weight:bold;
							color:$blue;
							padding-bottom:2px;
						}
					}
				}
				>.right{
					padding-right:15px;
					display:flex;
					justify-content: flex-end;
					>div{
						padding:34px 2px 0;
						background:url(../../assets/account/accountIndex_selectIcon1.png) no-repeat center top;
						background-size:24px;
						font-size:13px;
						margin-right:20px;
						cursor:pointer;
						&:nth-of-type(1){
							background-size:28px 24px;
						}
						&:nth-of-type(2){
							color:$blue;
							background-image:url(../../assets/account/accountIndex_selectIcon2.png);
						}
						&:nth-of-type(3){
							color:red;
							background-image:url(../../assets/account/accountIndex_selectIcon3.png);
						}
					}
				}
			}
		}
	}
	
</style>