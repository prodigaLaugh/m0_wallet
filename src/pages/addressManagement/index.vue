<template>
	<div class="outerWrap addressManagementIndexWrap">
		<el-row>
			<el-col :lg="20" :md="22">
				<div class="commonTitle_one">地址管理</div>
					
				<div class="commonTitle_two">
					账户地址
					<!-- <span @click="dialogVisible=true">创建地址</span> -->
					<span @click="create">创建地址</span>
					
				</div>
				
				<div class="addressManagementIndexListsWrap">
					
					<el-row 
						v-for="(item, index) in lists"
						:key="index"
						class="addressManagementIndexListWrap">
						<el-col :lg="12" class="addressManagementIndexListLeft">
							<div>{{item.address_id}}</div>
							<div>
								<span>包含资产：</span>
								<div>
									<span  
										v-for="(list,i) in item.asset_names"
										:key="i">{{list}}</span>
								</div>
							</div>
						</el-col>
						<el-col :lg="12" class="addressManagementIndexListRight">
							<div>
								<span 
									class="tag-read blue" 
									:data-clipboard-text="item.address_id" 
									@click="copy">拷贝地址</span>
								<span @click="$router.push('/main/transfer')">发起转账</span>
								<span @click="$router.push('/main/issue')">发行资产</span>
							</div>
						</el-col>
					</el-row>
					
					<div class="noresult" v-if="!lists.length">暂无数据</div>
					
					
					
				</div>
		
			</el-col>
		</el-row>
		
		
		<el-dialog
		  title="请输入账户密码"
		  :center="true"
		  :visible.sync="dialogVisible"
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
	import { getAddressLists, createAddress } from '@/util/server.js'

	import Vue from 'vue';
	import { Row, Col, Button } from 'element-ui';
	
	import Clipboard from 'clipboard'
		
	Vue.use(Row);
	Vue.use(Col);
	Vue.use(Button);
	
	
	
	export default {
		created(){
			this.accountInfo = this.getLocalAccountInfo();
			this.getLists();
		},
		data(){
			return {
				accountInfo:'',
				lists:[],
				dialogVisible:false,
				value:''
			}
		},
		methods:{
			getLists(){
				var account_alias = this.accountInfo.account_alias
				
				var params = {account_alias:account_alias}
				getAddressLists.bind(this)(params)
					.then(({data})=>{
						if(data.status=='success'){
							this.lists = data.data;
						}else{
							this.lists.splice(0,999);
						}
						
						console.log(data,111)
					})
			},
			create(){
				
				var account_alias = this.accountInfo.account_alias;
				var account_id = this.accountInfo.account_id;
				let para = {
					account_alias:account_alias,
					account_id:account_id
				};
				
				createAddress.bind(this)(para)
					.then(({data})=>{
						console.log(data,666)
						if(data.status =='success'){
							this.$message({
								type:'success',
								message:'创建成功'
							})
							this.getLists()
						}else{
							var msg  = data.error
							this.$message({
								type:'warning',
								message:msg
							})
						}
					})
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
		},
	}
</script>

<style lang="scss">
	.addressManagementIndexWrap{
		
		
	}
	
</style>