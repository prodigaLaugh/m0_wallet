<template>
	<div class="outerWrap assetWalletIndexWrap">
		<el-row>
			<el-col :lg="20" :md="22">
				
			
				<div class="commonTitle_one">资产钱包</div>
				<div class="addAccountWrap">
					<div class="commonTitle_two">
						我的资产
						<span @click="$router.push('/main/receiveTransfer')">接受转账</span>
					</div>
					<el-row  class="row-bg" :gutter="30" justify="center">
						<el-col :lg="12" >
							<div class="assetSelectItemWrap">
								<span>排序方式</span>
								<el-select 
									v-model="params.order_by" 
									placeholder="请选择"
									@change="getLists">
									<el-option
									  v-for="item in orderOptions"
									  :key="item.value"
									  :label="item.label"
									  :value="item.value">
									</el-option>
								</el-select>
							</div>
						</el-col>
						
						<!-- <el-col :lg="8">
							<div class="assetSelectItemWrap">
								<span>所在地址</span>
								<el-select v-model="value" placeholder="请选择">
									<el-option
									v-for="item in options"
									:key="item.value"
									:label="item.label"
									:value="item.value">
									</el-option>
								</el-select>
							</div>
						</el-col> -->
						
						<el-col :lg="12">
							<div class="assetSelectItemWrap">
								<span>资产类型</span>
								<el-select 
									v-model="params.asset_id" 
									placeholder="请选择"
									@change="getLists">
									<el-option
										v-for="item in allAssetsLists"
										:key="item.value"
										:label="item.asset_name"
										:value="item.asset_id">
									</el-option>
								</el-select>
							</div>
						</el-col>
					</el-row>
					
					
					<div class="assetListsWrap">
						<div 
							class="selectAccountItem"
							v-for="(item,index) in lists"
							:key="index">
							<el-row :gutter="30" class="selectAccountItemTitleWrap">
								<el-col :lg="14" :md="14" class="left">
									<div>{{item.asset_name}}</div>
									<div>
										资产ID:&nbsp;&nbsp;{{item.asset_id | interceptStr}}
									</div>
								</el-col>
								<el-col :lg="6" :md="6" class="right">
									<div>当前余额:</div>
									<div>{{item.amount}}</div>
								</el-col>
								<el-col :lg="4" :md="4" >
									<div 
										@click="$router.push({path:'/main/transactionRecord',query:getParams(item,'','tx')})"
										class="transactionRecordIcon">交易记录</div>
								</el-col>
							</el-row>
							
							<!-- <el-row  :gutter="20" class="selectAccountItemTransactionWrap">
								<el-col :lg="16" class="left">
									<div>所在地址：jlkj23234jkh2j4n21mk</div>
								</el-col>
								<el-col :lg="8" class="right">
									<span @click="$router.push('/main/transactionRecord')">交易记录</span>
									<span>转账</span>
									<span>销毁</span>
								</el-col>
							</el-row> -->
							<div style="margin-top:20px;"></div>
							<el-row  :gutter="20" class="selectAccountItemTransactionWrap">
								<el-col :lg="9" :md="9" class="left">
									所在地址
								</el-col>
								<el-col :lg="8" :md="8" class="center">
									地址余额
								</el-col>
								<el-col :lg="7" :md="7" class="right">
									操作
								</el-col>
							</el-row>
							<el-row  
								:gutter="20" 
								class="selectAccountItemTransactionWrap"
								v-for="(list,i) in item.address_balance"
								:key="i">
								<el-col :lg="9" :md="9" class="left">
									{{list.address_id | interceptPubStr}}
								</el-col>
								<el-col :lg="8" :md="8" class="center">
									{{list.balance}}
								</el-col>
								<el-col :lg="7" :md="7" class="right">
									<span @click="$router.push({path:'/main/transactionRecord',query:getParams(item,list.address_id,'address')})">交易记录</span>
									<span @click="getTransferParams(item,list.address_id)">转出资产</span>
								</el-col>
							</el-row>
							
						</div>
						<div class="noresult" v-if="!lists.length">暂无数据</div>
					</div>
					
				</div>
		
			</el-col>
		</el-row>
		
		
	</div>
</template>

<script>
	
	import { getAssetWalletLists, getAssetLists } from '@/util/server.js'
	import Vue from 'vue';
	import { Row, Col, Select, Option } from 'element-ui';
		
	Vue.use(Row);
	Vue.use(Col);
	Vue.use(Option);
	Vue.use(Select);
	
	export default {
		created(){
			var accountInfo = this.getLocalAccountInfo()
			var account_id = accountInfo.account_id;
			var account_type = accountInfo.account_type;
			
			this.params.account_id = account_id;
					
			var formdata = new FormData();
			formdata.append('account_id',account_id)
			getAssetLists.bind(this)(formdata)
				.then(({data})=>{
					var data = data.data;
					var asset_unissue = data.asset_unissue || [];
					var asset_issue = data.asset_issue || [];
					this.allAssetsLists = [{asset_id: "",asset_name: "全部"},...asset_unissue,...asset_issue]
					
					
				})
			this.getLists();
		},
		data(){
			return {
				allAssetsLists:[],
				
				params:{
					account_id:'',
					asset_name:'',
					asset_id:'',
					order_by:'time_desc',
					
// 					user_name:"123",
// 					"account_id":"0R031M6800A02",
// 					"asset_name":"zcj1",
// 					"asset_id":"ce8c9a975056cb6e5f951c8223a3cdf1f15e0918a0943005701660c1a63975b9",
// 					"order_by":"amount_asc"

				},
				
				orderOptions: [{
					value: 'time_desc',
					label: '按时间排序（新到旧）'
				}, {
					value: 'time_asc',
					label: '按时间排序（旧到新）'
				}, {
					value: 'amount_asc',
					label: '按金额排序（大到小）'
				}, {
					value: 'amount_desc',
					label: '按金额排序（小到大）'
				}],
				lists:[]
			}
		},
		methods:{
			getTransferParams(item,id){
				var obj = {
					address_id:id,
					amount:item.amount,
					asset_id:item.asset_id,
					asset_name:item.asset_name
				}
				this.$router.push({path:'/main/transfer',query: obj })
			},
			getParams(item,id,type){
				return {
					asset_name:item.asset_name,
					asset_id:item.asset_id,
					type:type,
					address_id:id
				}
			},
			getLists(){
				getAssetWalletLists.bind(this)(this.params)
					.then(({data})=>{
						console.log(data,8887)
						if(data.status=='success'){
							this.lists = data.data;
						}
					})
			}
		},
	}
</script>

<style lang="scss">
	.assetWalletIndexWrap{
		.assetSelectItemWrap{
			padding-bottom:20px;
			>span{
				padding-right:10px;
				font-size:13px;
			}
		}
		
		.selectAccountItem{
			background:#eee;
			padding:20px 30px 40px;
			margin-bottom:30px;
			.selectAccountItemTitleWrap{
				border-bottom:1px solid #333;
				padding-bottom:20px;
				>.left,>.right{
					display:flex;
					flex-direction: column;
					justify-content: space-between;
					height:54px;
				}
				>.left{
					>div:nth-of-type(1){
						font-size:18px;
						font-weight:bold;
						color:#000;
					}
					>div:nth-of-type(2){
						font-size:14px;
					}
					
				}
				>.right{
					>div:nth-of-type(1){
						color:#888;
						font-size:14px;
						text-align:center;
					}
					>div:nth-of-type(2){
						text-align:center;
						font-size:18px;
						font-weight:bold;
					}
				}
				.transactionRecordIcon{
					width:92px;
					height:63px;
					background:#fff url(../../assets/assetwallet/transactionRecordsIcon.png) no-repeat center 5px;
					text-align:center;
					border:1px solid #333;
					border-radius:5px;
					padding-top:44px;
					@include pointer;
					
				}
			}
			
			
			.selectAccountItemTransactionWrap{
				background:#fff;
				line-height:40px;
				.right{
					text-align:center;
					>span{
						@include pointer;
						margin:0 6px;
					}
				}
				// >.left,>.right{
					
				// 	height:54px;
				// }
				// >.left{
				// 	display:flex;
				// 	align-items: flex-end;
				// 	color:#888;
				// 	font-size:13px;
				// }
				// >.right{
				// 	display:flex;
				// 	align-items: flex-end;
				// 	justify-content: center;
				// 	>span{
				// 		padding-top:30px;
				// 		background:url(../../assets/assetwallet/operIcon1.png) no-repeat center top;
				// 		background-size:24px 18px;
				// 		margin-right:20px;
				// 		min-width:26px;
				// 		text-align:center;
				// 		cursor:pointer;
				// 		&:nth-of-type(2){
				// 			background-image:url(../../assets/assetwallet/operIcon2.png);
				// 			background-size:26px 20px;
				// 		}
				// 		&:nth-of-type(3){
				// 			background-image:url(../../assets/assetwallet/operIcon3.png);
				// 			color:red;
				// 			background-size:24px 26px;
				// 			margin-right:0;
				// 		}
				// 	}
				// }
			}
			
		}
	}
	
</style>