<template>
	<div class="dashboardWrap mainRightWrap">
		<div class="contentTitle">仪表盘</div>
		<div class="dashboard_quickEntryWrap">
			<div class="dashboard_title">快速入口</div>
			<div class="dashboard_quickEntryContent">
				<div 
					v-for="(item,index) in ['快速交易','发行资产','新建账户','区块链浏览器','备份/恢复']" 
					:key="index"
					style="justify-content: center;font-size:18px;padding-top:40px;padding-bottom:40px;">
						<span> </span>
						<div>{{item}}</div>
				</div>
				
			</div>
		</div>
		
		<div class="dashboard_addressWrap">
			<div class="dashboard_title">常用地址</div>
			<div class="dashboard_addressListsWrap">
				<div 
					v-for="(item,index) in addressLists"
					:key="index"
					class="dashboard_addressListWrap">
					<div>{{item.address | interceptStr}}</div>
					<div>{{'account'+index}}</div>
					<span>发起交易</span>
				</div>
			</div>
		</div>
		
		<div class="dashboard_latestTrasactionWrap">
			<div class="dashboard_title">最近交易</div>
			<div class="dashboard_latestTrasactionListsWrap">
				<div 
					v-for="(item,index) in transactionLists.slice(0,5)"
					:key="index"
					style="margin-bottom:30px;"
					class="dashboard_latestTrasactionListWrap">
					
					<div class="dashboard_latestTrasactionListTopWrap">
						<div>
							交易ID：<span>{{item.tx_id | interceptStr}}</span>
						</div>
						<div>{{item.block_time | timestampToTime}}</div>
						<div class="dashboard_latestTrasactionLookupDetail">查看详情</div>
					</div>
					
					<div class="dashboard_latestTrasactionListCenterWrap" v-if="item.inputs[0].type==='issue'">
						<div>
							<span>创建资产</span>
						</div>
						
						<div>
							<span>To:</span>
							<span
								class="blue"
								@click="$router.push({path:'/main/accountManagementInfo',query:{id:item.outputs[1].account_id}})">{{item.outputs[1].account_alias}}</span>
						</div>
						<div>+ &nbsp; {{item.outputs[1].amount | filterMoney}}</div>
						<span
							class="blue"
							@click="$router.push({path:'/main/assetManagementInfo',query:{id:item.outputs[1].asset_id}})">{{item.outputs[1].asset_alias}}</span>
						
					</div>
					
					<div class="dashboard_latestTrasactionListCenterWrap" v-if="item.inputs[0].type==='spend'">
						<div>
							<span>收入</span>
						</div>
						
						<div>
							<span>To:</span>
							<span
								class="blue"
								@click="$router.push({path:'/main/accountManagementInfo',query:{id:item.outputs[2].account_id}})">{{item.outputs[2].account_alias}}</span>
						</div>
						<span>+ &nbsp; {{item.outputs[2].amount | filterMoney}}</span>
						<span
							class="blue"
							@click="$router.push({path:'/main/assetManagementInfo',query:{id:item.outputs[2].asset_id}})">{{item.outputs[2].asset_alias}}</span>
						
					</div>
					
					<div class="dashboard_latestTrasactionListCenterWrap" v-if="item.inputs[0].type==='spend'">
						<div>
							<span>支出</span>
						</div>
						
						<div>
							<span>FROM:</span>
							<span
								class="blue"
								@click="$router.push({path:'/main/accountManagementInfo',query:{id:item.outputs[1].account_id}})">{{item.outputs[1].account_alias}}</span>
						</div>
						<span>- &nbsp; {{item.outputs[1].amount | filterMoney}}</span>
						<span
							class="blue"
							@click="$router.push({path:'/main/assetManagementInfo',query:{id:item.outputs[1].asset_id}})">{{item.outputs[1].asset_alias}}</span>
						
					</div>
					
					
				</div>
			</div>
		</div>
		
		
	</div>
</template>	

<script>


import myHeader from '@/components/header';

export default{
	created(){
		this.getAddressLists()
		this.getTransationLists()
	},
	components: {  
		myHeader
    },
    data(){
        return {
			addressLists:[],
			transactionLists:[]
        }
    },
    methods:{
		aa(){
			console.log(111)
		},
		getAddressLists(){
			let url = `/list_addresses`;
			let params = {
				account_id:'0N5TFQLUG0A02'
			}
			this.$http.post(url,params)
				.then(({data})=>{
					this.addressLists = data.data.slice(0,6);
					
				})
				.catch(()=>{
					
				})
		},
		getTransationLists(){
				let url = `/list_transactions`;
				
				this.$http.post(url,{})
					.then(({data})=>{
						this.transactionLists = data.data;
					})
					.catch((data)=>{
						
					})
				
		}
    }
}

</script>
<style lang="scss" >
 
	.dashboardWrap{
		.dashboard_quickEntryContent{
			display:flex;
			justify-content: space-between;
			
			>div{
				background:$blue;
				padding:20px 0 20px 10px;
				border-radius: 5px;
				flex:1;
				margin-right:10px;
				display:flex;
				color:#fff;
				>span{
					align-self: center;
				}
				>div{
					align-self: flex-end;
				}
				
				&:last-of-type{
					margin-right:0;
				}
			}
		}
		
		.dashboard_addressListsWrap{
			display:flex;
			justify-content: space-between;
			.dashboard_addressListWrap{
				padding:20px 10px;
				background:#f2f2f2;
				flex:1;
				margin-right:10px;
				>div:nth-of-type(2){
					padding:10px 0 20px 0;
				}
				>span{
					text-align:right;
					display:block;
					color:$blue;
				}
			}
		}
		
		.dashboard_latestTrasactionListWrap{
			border:1px solid #ddd;
			.dashboard_latestTrasactionListTopWrap,
			.dashboard_latestTrasactionListCenterWrap{
				display:flex;
				align-items: center;
				justify-content: space-between;
				padding:10px 20px;
			}
			.dashboard_latestTrasactionListTopWrap{
				
			}
			.dashboard_latestTrasactionListCenterWrap{
				border-top:1px solid #ddd;
				
			}
		}
		
		
	}

</style>

