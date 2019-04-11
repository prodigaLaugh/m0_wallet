<template>
	<div class="outerWrap createAccountWrap">
		<div class="commonTitle_one">
			钱包管理
			<span>
				<i class="el-icon-arrow-right"></i>
				<span>创建单签钱包</span>
			</span>
		</div>
			
		<div class="commonTitle_two">
			创建单签钱包
			<span>返回</span>
		</div>
		
		<div class="transferInpWrap">
			<el-row>
				<el-col :lg="16" :md="12">
					<el-row class="transferInpListsWrap">
						<el-col :md="24">
							<div class="transferInpListLeft">钱包名称</div>
							<el-input v-model="params.alias" placeholder=""></el-input>
						</el-col>
						<el-col :md="24">
							<div class="transferInpListLeft">钱包秘钥</div>
							<el-select v-model="params.xpub" placeholder="请选择钱包所使用的密钥">
								<el-option
									v-for="item in lists"
									:key="item.xpub"
									:label="item.alias"
									:value="item.xpub">
								</el-option>
							</el-select>
						</el-col>
					
						
						
						
						<el-col :md="24">
							<div 
								@click="create"
								class="createAccountBtn">创建账户</div>
						</el-col>
					</el-row>
				</el-col>
			</el-row>
		</div>
		
		
		
	</div>
</template>

<script>
	import { createSingleWallet, getPrivateKeyLists } from '@/util/server.js'

	import Vue from 'vue';
	import { Row, Col, Radio, Input, Select, Option, MessageBox } from 'element-ui';
		
	Vue.use(Row);
	Vue.use(Col);
	Vue.use(Radio);
	Vue.use(Input);
	Vue.use(Option);
	Vue.use(Select);
	
	
	export default {
		created(){
			let user_name = localStorage.USERTOKEN;
			this.params.user_name = user_name;
			let para  = {user_name: 'user1'}
			getPrivateKeyLists.bind(this)(para)
				.then(({data})=>{
					console.log(data,8887)
					this.lists = data.data;
				})
		},
		data(){
			return {
				submitFlag:true,
				lists:[],
				params:{
					alias: "",
					user_name: "",
					xpub: ""
				}
			}
		},
		methods:{
			create(){
				let para = Object.assign({},this.params);
				if(!this.submitFlag){
					return false;
				}
				this.submitFlag = false;
				createSingleWallet.bind(this)(para)
					.then(({data})=>{
						if(data.status=='success'){
							this.$message({
								type:'success',
								message:'创建成功'
							})
						}else{
							var msg = data.detail;
							this.$message({
								type:'warning',
								message:msg
							})
						}
						this.submitFlag = true;
						console.log(data)
					})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.createAccountWrap{
		.createAccountBtn{
			height:40px;
			line-height:40px;
			text-align:center;
			border-radius:5px;
			background:$blue;
			color:#fff;
			font-size:13px;
		}
	}
	
</style>