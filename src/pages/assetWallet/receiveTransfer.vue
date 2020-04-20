<template>
	<div class="outerWrap addressManagementIndexWrap">
		<el-row>
			<el-col :lg="20" :md="22">
			
				<div class="commonTitle_one">
					资产钱包
					<span>
						<i class="el-icon-arrow-right"></i>
						<span>接收转账</span>
					</span>
				</div>
					
				<div class="commonTitle_two">
					接收地址
				</div>
				
				<div class="addressManagementIndexListsWrap">
					
					<el-row 
						class="addressManagementIndexListWrap" 
						v-for="(item,index) in lists"
						:key="index">
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
							</div>
						</el-col>
					</el-row>
					
					
					
				</div>
		
			</el-col>
		</el-row>
		
	</div>
</template>

<script>
	import { getAddressLists } from '@/util/server.js'
	import Clipboard from 'clipboard'

	
	import Vue from 'vue';
	import { Row, Col } from 'element-ui';
		
	Vue.use(Row);
	Vue.use(Col);
	
	
	export default {
		created(){
			this.getLists();
		},
		data(){
			return {
				lists:[],
			}
		},
		methods:{
			getLists(){
				var accountInfo = this.getLocalAccountInfo();
				var account_alias = accountInfo.account_alias
				var params = {account_alias:account_alias, page: 1,
				    page_size: 999999}
				getAddressLists.bind(this)(params)
					.then(({data})=>{
						const lists = data.data.list_address;
            if(lists){
              this.address.splice(0,99999, {address_id:''},...lists) ;
            }else{
              this.address.splice(0,99999, {address_id:''}) ;
            }
            
						
						console.log(data,111)
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