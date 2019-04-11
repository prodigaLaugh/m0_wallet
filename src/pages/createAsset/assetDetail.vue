<template>
	<div class="outerWrap assetDetailWrap">
		<el-row>
			<el-col :lg="20" :md="22">
				
				<div class="commonTitle_one">
					资产管理
					<span>
						<i class="el-icon-arrow-right"></i>
						<span>资产详情</span>
					</span>
					<div @click="$router.go(-1)">返回</div>
				</div>
					
				<div class="commonTitle_two">
					资产详情
				</div>
				
				<div class="assetDetaiContentWrap">
					<el-row class="assetDetaiContentItem">
						<el-col :lg="6">资产名称</el-col>
						<el-col :lg="18">
							<span>{{detail.asset_name}}</span>
						</el-col>
					</el-row>
					<el-row class="assetDetaiContentItem">
						<el-col :lg="6">资产ID</el-col>
						<el-col :lg="18">
							<span>{{detail.asset_id}}</span>
						</el-col>
					</el-row>
					<el-row class="assetDetaiContentItem">
						<el-col :lg="6">资产发行账户</el-col>
						<el-col :lg="18">
							<span>{{detail.account_id}}</span>
						</el-col>
					</el-row>
					<el-row class="assetDetaiContentItem">
						<el-col :lg="6">资产发行地址</el-col>
						<el-col :lg="18">
							<span>{{detail.address_id}}</span>
						</el-col>
					</el-row>
					<el-row class="assetDetaiContentItem">
						<el-col :lg="6">资产发行总量</el-col>
						<el-col :lg="18">
							<span>{{detail.amount}}</span>
						</el-col>
					</el-row>
					<el-row class="assetDetaiContentItem">
						<el-col :lg="6">资产发行时间</el-col>
						<el-col :lg="18">
							<span>{{detail.issue_time}}</span>
						</el-col>
					</el-row>
					<el-row 
						class="assetDetaiContentItem" 
						v-for="(item, index) in detail.Parameters||[]"
						:key="index">
						<el-col :lg="6">{{item.key}}</el-col>
						<el-col :lg="18">
							<span>{{item.value}}字</span>
						</el-col>
					</el-row>
					
				</div>
		
			</el-col>
		</el-row>
		
	</div>
</template>

<script>
	
	import Vue from 'vue';
	import { Row, Col } from 'element-ui';
		
	Vue.use(Row);
	Vue.use(Col);
	
	import { getAssetInfo } from '@/util/server.js'

	
	export default {
		created(){
			var id = this.$route.query.id;
			var formdata = new FormData();
			formdata.append('id',id)
			
			getAssetInfo.bind(this)(formdata)
				.then(({data})=>{
					this.detail = data.data
				})
		},
		data(){
			return {
				detail:{}
			}
		},
		methods:{
			
		},
	}
</script>

<style lang="scss">
	.assetDetailWrap{
		.assetDetaiContentWrap{
			padding:20px 0;
			.assetDetaiContentItem{
				line-height:26px;
				font-size:13px;
			}
		}
							
		
	}
	
</style>