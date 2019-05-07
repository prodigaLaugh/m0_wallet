<template>
	<div class="outerWrap transactionRecordWrap">
		<el-row>
			<el-col >
				
				<div class="commonTitle_one">
					资产钱包
					<span>
						<i class="el-icon-arrow-right"></i>
						<span>交易记录</span>
					</span>
				</div>
				
				
				<div class="consoleRecordsWrap">
					<div class="commonTitle_two">交易记录</div>
					
					<el-row class="transactionRecordContentWrap">
						<el-col :lg="24">
							<span>资产类型</span>
							<span>{{asset_name}}</span>
						</el-col>
						<el-col :lg="24" v-if="address_id">
							<span>所在地址</span>
							<span>{{address_id}}</span>
						</el-col>
						
					</el-row>
					
					<div class="consoleListsWrap">
						<div 
							class="consoleListWrap" 
							v-for="(item,index) in lists"
							:key="index">
							
							<div v-if="item.tx_type==1">
								<transfer :item="item" :asset_name="asset_name"/>
							</div>
							<div v-if="item.tx_type==2">
								<issue :item="item" :asset_name="asset_name"/>
							</div>
							<div v-if="item.tx_type==3">
								<retire :item="item" :asset_name="asset_name"/>
							</div>
							
						</div>
						
					</div>
					
					
				</div>
		
			</el-col>
		</el-row>
		
	</div>
</template>

<script>
	
	import { getAssetRecords, getAssetRecordsByAddress } from '@/util/server.js'
	import Vue from 'vue';
	import { Row, Col } from 'element-ui';
	import Transfer from '@/components/transactionRecords/transfer.vue'
	import Issue from '@/components/transactionRecords/issue.vue'
	import Retire from '@/components/transactionRecords/retire.vue'
		
	Vue.use(Row);
	Vue.use(Col);
	
	export default {
		components:{
			Transfer,
			Issue,
			Retire
		},
		created(){
			var accountInfo = this.getLocalAccountInfo()
			var account_id = accountInfo.account_id;
			var query =  this.$route.query;
			this.asset_name = query.asset_name;
			this.address_id = query.address_id;
			
			
			var para = Object.assign({},accountInfo,query)
			if(query.type==='address'){
				this.getLists2(para)
			}else{
				this.getLists1(para)
			}
		},
		data(){
			return {
				asset_name:'',
				address_id:"",
				lists:[]
			}
		},
		methods:{
			getLists1(para){
				getAssetRecords.bind(this)(para)
					.then(({data})=>{
						console.log(data,111)
						this.lists = data.data.tx_list
					})
			},
			getLists2(para){
				getAssetRecordsByAddress.bind(this)(para)
					.then(({data})=>{
						console.log(data,222)
						this.lists = data.data.tx_list
					})
			}
		},
	}
</script>

<style lang="scss">
	.transactionRecordWrap{
		
		.consoleRecordsWrap{
			padding-right:30px;
		}
		
		.transactionRecordContentWrap{
			padding-bottom:20px;
			>div{
				line-height:36px;
				font-size:13px;
				>span:nth-of-type(2){
					margin-left:40px;
				}
			}
		}
		.inner{
			margin-bottom:30px;
			border:0!important;
		}
	}
	
</style>