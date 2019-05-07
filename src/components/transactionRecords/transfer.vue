<template>
	<div class="inner">
		<el-row 
			class="consoleListIDWrap" 
			:gutter="20">
			<el-col :md="12">
				<span>交易ID</span>
				<span>{{item.tx_id}}</span>
				
				<span>已确认</span>
			</el-col>
			<el-col :md="12">
				{{item.to_time}}
			</el-col>
		</el-row>
		
		
		<el-row 
			:gutter="20"
			class="consoleList_list"
			v-for="(list,i,key) in item.from"
			:key="key">
			<el-col :md="1">
				<!-- <span class="out">支出</span> -->
			</el-col>
			<el-col :md="14">
				<span style="width:50px;">From</span>
				<span>
					<div>
						{{list.Address | interceptStr}}（{{list.account | interceptStr}}）
					</div>
				</span>
			</el-col>
			<el-col :md="6">- {{list.amount}}</el-col>
			<el-col :md="4">{{asset_name||'--'}}</el-col>
		</el-row>
		
		<el-row 
			:gutter="20"
			class="consoleList_list"
			v-for="(list,i,key) in item.to"
			:key="key">
			<el-col :md="1" style="width:0;">
				<!-- <span>收入</span> -->
			</el-col>
			<el-col :md="14">
				<span style="width:50px;">To</span>
				<span>
					<div>{{list.Address | interceptStr}}（{{list.account | interceptStr}}）</div>
					
				</span>
			</el-col>
			<el-col :md="6">+ {{list.amount}}</el-col>
			<el-col :md="4">{{asset_name||'--'}}</el-col>
		</el-row>
	</div>
</template>

<script>
	export default{
		props:['item','asset_name'],
		data(){
			return {
				
			}
		}
	}
</script>


