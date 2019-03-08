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
						<el-col :lg="8" >
							<div class="assetSelectItemWrap">
								<span>排序方式</span>
								<el-select v-model="value" placeholder="请选择">
									<el-option
									  v-for="item in options"
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
						
						<el-col :lg="8">
							<div class="assetSelectItemWrap">
								<span>资产类型</span>
								<el-select v-model="value" placeholder="请选择">
									<el-option
									v-for="item in options"
									:key="item.value"
									:label="item.label"
									:value="item.value">
									</el-option>
								</el-select>
							</div>
						</el-col>
					</el-row>
					
					
					<div class="assetListsWrap">
						<div class="selectAccountItem " >
							<el-row :gutter="30" class="selectAccountItemTitleWrap">
								<el-col :lg="14" :md="14" class="left">
									<div>小麦2019</div>
									<div>jlkj2jkh1hjhjh</div>
								</el-col>
								<el-col :lg="6" :md="6" class="right">
									<div>当前余额:</div>
									<div>12332.9766</div>
								</el-col>
								<el-col :lg="4" :md="4" class="transactionRecordIcon">
									<div>交易记录</div>
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
							<el-row  :gutter="20" class="selectAccountItemTransactionWrap">
								<el-col :lg="9" :md="9" class="left">
									3CqBquEFMYY548fNBz8u2MBw3HKprS3Xft
								</el-col>
								<el-col :lg="8" :md="8" class="center">
									56000.03000000
								</el-col>
								<el-col :lg="7" :md="7" class="right">
									<span @click="$router.push('/main/transactionRecord')">交易记录</span>
									<span>转出资产</span>
								</el-col>
							</el-row>
							
						</div>
					</div>
					
				</div>
		
			</el-col>
		</el-row>
		
		
	</div>
</template>

<script>
	
	import Vue from 'vue';
	import { Row, Col, Select, Option } from 'element-ui';
		
	Vue.use(Row);
	Vue.use(Col);
	Vue.use(Option);
	Vue.use(Select);
	
	export default {
		created(){
			
		},
		data(){
			return {
				options: [{
				  value: '选项1',
				  label: '黄金糕'
				}, {
				  value: '选项2',
				  label: '双皮奶'
				}, {
				  value: '选项3',
				  label: '蚵仔煎'
				}, {
				  value: '选项4',
				  label: '龙须面'
				}, {
				  value: '选项5',
				  label: '北京烤鸭'
				}],
				value: ''
			}
		},
		methods:{
			
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
						color:$blue;
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
				>.transactionRecordIcon{
					width:92px;
					height:63px;
					background:#fff url(../../assets/assetwallet/transactionRecordsIcon.png) no-repeat center 5px;
					text-align:center;
					border:1px solid #333;
					border-radius:5px;
					padding-top:44px;
					
				}
			}
			
			
			.selectAccountItemTransactionWrap{
				background:#fff;
				line-height:40px;
				.right{
					text-align:center;
					>span{
						color:$blue;
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