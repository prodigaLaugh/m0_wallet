<template>
	<div class="outerWrap assetDetailWrap">
		<div class="commonTitle_one">
			资产管理
			<span>
				<i class="el-icon-arrow-right"></i>
				<span>资产详情</span>
			</span>
		</div>
			
		<div class="commonTitle_two">
			资产详情
		</div>
		
		<div class="assetDetaiContentWrap">
			<el-row class="assetDetaiContentItem">
				<el-col :lg="6">资产名称</el-col>
				<el-col :lg="18">
					<span>大米2019</span>
				</el-col>
			</el-row>
			<el-row class="assetDetaiContentItem">
				<el-col :lg="6">资产ID</el-col>
				<el-col :lg="18">
					<span>df5e4b9e588ea920e6d8de7d99c2ac0f058</span>
				</el-col>
			</el-row>
			<el-row class="assetDetaiContentItem">
				<el-col :lg="6">资产发行账户</el-col>
				<el-col :lg="18">
					<span>account009</span>
				</el-col>
			</el-row>
			<el-row class="assetDetaiContentItem">
				<el-col :lg="6">资产发行地址</el-col>
				<el-col :lg="18">
					<span>db0e31accdcb507e65cf95efc45f755227</span>
				</el-col>
			</el-row>
			<el-row class="assetDetaiContentItem">
				<el-col :lg="6">资产发行总量</el-col>
				<el-col :lg="18">
					<span>43454</span>
				</el-col>
			</el-row>
			<el-row class="assetDetaiContentItem">
				<el-col :lg="6">资产发行时间</el-col>
				<el-col :lg="18">
					<span>Dec-27-2018 07:08:24 AM +UTC</span>
				</el-col>
			</el-row>
			<el-row class="assetDetaiContentItem">
				<el-col :lg="6">资产描述</el-col>
				<el-col :lg="18">
					<span>此处是资产的描述，内容不超过400字</span>
				</el-col>
			</el-row>
			
		</div>
		
		
			
		
		
	</div>
</template>

<script>
	
	import Vue from 'vue';
	import { Row, Col } from 'element-ui';
		
	Vue.use(Row);
	Vue.use(Col);
	
	
	export default {
		created(){
			
		},
		data(){
			return {
				
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