<template>
	<div class="outerWrap accountIndexWrap">
		<el-row>
			<el-col :lg="20" :md="22">
			
				<div class="commonTitle_one">钱包管理</div>
				<!-- <div class="addAccountWrap">
					<div class="commonTitle_two">添加账户</div>
					
					<el-row  class="row-bg" :gutter="30" justify="center" style="margin-right:0;">
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
				</div> -->
				
				<div class="selectAccountWrap">
					<div class="commonTitle_two">
						我的钱包
						<div>
							<!-- <span @click="$router.push('/main/importBackup')">导入钱包</span> -->
							<span @click="createFlag=true">创建钱包</span>
						</div>
					</div>
					
					
					<el-row  
						v-for="(item,index) in lists"
						:key="index"
						:class="['selectAccountItem',{use:item.status!=0}]" 
						type="flex" 
						justify="center">
						<div class="leftTag">
							<span v-if="item.status==0">未&#10;使{{'\n'}}用</span>
							<span v-else>使&#10;用{{'\n'}}中</span>
						</div>
						<el-col :lg="18" class="left">
							<div class="title">
								{{item.account_alias}}
								<span>{{(item.sign_key_num-0)>1 ?'多签' :'单签'}}</span>
							</div>
							<div class="blue leftText">
								<span>关联密钥:</span>
								<div>
									<div  
										v-for="(list,i) in item.xpubs"
										:key="i">{{list}}</div>
								</div>
							</div>
							<!-- <div class="leftText">主公钥:jkjl32434hkjkj</div> -->
						</el-col>
						<el-col :lg="6" class="right">
							<div @click="zairu(item)">载入</div>
							<div 
								@click="$router.push({path:'/main/walletDetail',query:{id:item.account_alias }})">详情</div>
							<div @click="$router.push('/main/backupType')">备份</div>
							<div @click="del(item,index)">删除</div>
						</el-col>
					</el-row>
					
					<div class="noresult" v-if="!lists.length">暂无数据</div>
				
					
					
				</div>
		
			</el-col>
		</el-row>
		
		
		<!-- 点击秘钥管理输入密码弹窗 -->
		<el-dialog
		  title="请输入账户密码"
		  :center="true"
		  :visible.sync="openDialogFlag"
		  width="40%">
		  <div class="dialogContentWrap">
			  <div class="tips">⚠️请输入账户对应的密码，已确认身份</div>
			  <el-input v-model="value" placeholder="输入密码"></el-input>
		  </div>
		  <span slot="footer" class="dialog-footer">
			<el-button @click="openDialogFlag = false">取 消</el-button>
			<el-button type="primary" @click="openDialogFlag = false">确 定</el-button>
		  </span>
		</el-dialog>
		
		<!-- 点击秘钥管理输入密码弹窗 -->
		<el-dialog
		  title="请输选择创建钱包的类型"
		  :center="true"
		  :visible.sync="createFlag"
		  width="40%">
		  <div class="selectWalletWrap">
			  <el-row>
				  <el-col :md="10">
					  <div 
						@click="changeWalletType(0)"
						:class="['contentWrap',{active:walletIndex===0}]">
						  <div class="title">单签钱包</div>
						  <div class="content">单签钱包内的资产由您本人所有和支配，创建单签钱包需要关联一把密钥，一把密钥只能关联一个单签钱包。</div>
					  </div>
				  </el-col>
				  <el-col :md="2">&nbsp;</el-col>
				  <el-col :md="10">
					  <div
						@click="changeWalletType(1)"
						:class="['contentWrap',{active:walletIndex===1}]">
						  <div class="title">多签钱包</div>
						  <div class="content">多签钱包内的资产由多方共同所有和支配，创建多签钱包需要关联一把密钥，一把密钥可关联多个多签钱包。</div>
					  </div>
				  </el-col>
			  </el-row>
		  </div>
		  <span slot="footer" class="dialog-footer">
			<el-button @click="createFlag = false">取 消</el-button>
			<el-button type="primary" @click="createWallet">确 定</el-button>
		  </span>
		</el-dialog>
		
	</div>
</template>

<script>
	
	import Vue from 'vue';
	import { Row, Col, Input, Button, Dialog } from 'element-ui';
	
	import { getAccountLists, loadWallet, deleteWallet } from '@/util/server.js'
		
	Vue.use(Row);
	Vue.use(Col);
	Vue.use(Button);
	Vue.use(Input);
	Vue.use(Dialog);
	
	export default {
		created(){
			this.getLists()
		
		},
		data(){
			return {
				submitFlag:true,
				createFlag:false,
				walletIndex:0,
				
				openDialogFlag:false,
				value:'',
				
				lists:[],
			}
		},
		methods:{
			del(item,index){
				var account_alias =  item.account_alias;
				let para = {
					account_alias:account_alias
				}
				if(!this.submitFlag){
					return false;
				}
				this.submitFlag = false;
				deleteWallet.bind(this)(para)
					.then(({data})=>{
						if(data.status =='success'){
							this.$message({
								type:'success',
								message:'删除成功'
							})
							this.lists.splice(index,1);
							this.getLists();
						}else{
							this.$message({
								type:"warning",
								message:data.detail||'载入失败'
							})
						}
						setTimeout(()=>{
							this.submitFlag = true;
						},200)
						console.log(data)
					})
			},
			zairu(item){
				var account_alias = item.account_alias; 
				var pre_account_alias = this.getLocalAccountInfo().account_alias||'';
				let para = {
					account_alias: account_alias,
					pre_account_alias: pre_account_alias,
				}
				if(!this.submitFlag){
					return false;
				}
				this.submitFlag = false;
				loadWallet.bind(this)(para)
					.then(({data})=>{
						console.log(data,111)
						if(data.status =='success'){
							this.$message({
								type:'success',
								message:'载入成功'
							})
							
							this.getLists();
							
							setTimeout(()=>{
								this.submitFlag = true;
							},200)
							
						}else{
							this.$message({
								type:"warning",
								message:data.detail||'载入失败'
							})
						}
						
						
					})
			},
			changeWalletType(num){
				this.walletIndex = num;
			},
			createWallet(){
				var url = this.walletIndex ===0
						?'/main/createWalletS'
						:'/main/createWalletM';
				this.$router.push(url)
			},
			getLists(){
// 				let user_name = localStorage.USERTOKEN
// 				let params = {user_name:'user1'||user_name}
				getAccountLists.bind(this)()
					.then(({data})=>{
						console.log(data,11)
						
						localStorage.accountInfo = JSON.stringify({})
						if(data.status=='success'){
							this.$store.commit('changeAccountAlias','');
							if(data.data){
								var lists = data.data;
								
								lists.map((item, index)=>{
									if(item.status==1){
										localStorage.accountInfo  = JSON.stringify(item);
										this.$store.commit('changeAccountAlias',item.account_alias);
									}
									
								})
								this.lists.splice(0,999,...lists);
							}
							
							
						}else{
							this.lists.splice(0,999);
						}
						
					})
			}
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
						display:flex;
						>span{
							width:100px;
						}
						>div{
							width:300px;
							>div{
								white-space: nowrap;
								text-overflow: ellipsis;
								overflow:hidden;
							}
							
						}
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
							color:$blue;
							background-image:url(../../assets/account/accountIndex_selectIcon3.png);
						}
						&:nth-of-type(4){
							color:red;
							background-image:url(../../assets/account/accountIndex_selectIcon4.png);
						}
					}
				}
			}
		}
		.selectWalletWrap{
			.contentWrap{
				text-align:center;
				padding:15px 10px;
				cursor:pointer;
				border:1px solid #999;
				.title{
					padding-bottom:20px;
					font-size:16px;
				}
				&.active{
					color:#409EFF;
					border-color:#409EFF;
				}
			}
		}
	}
	
</style>