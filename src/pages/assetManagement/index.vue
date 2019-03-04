<template>
	<div class="outerWrap assetManagementIndexWrap">
		<div class="commonTitle_one">资产管理</div>
			
		<div class="commonTitle_two">
			我的资产
			<span @click="$router.push('/main/createAsset')">创建资产</span>
		</div>
		<div class="contentNavWrap">
			<span class="active">未发行资产</span>
			<span>已发行资产</span>
		</div>	
		
		<div class="assetManagementIndexListsWrap">
			<el-row class="assetManagementIndexListWrap">
				<el-col :lg="7" >名称</el-col>
				<el-col :lg="10">资产ID</el-col>
				<el-col :lg="3">发行状态</el-col>
				<el-col :lg="4">操作</el-col>
			</el-row>
			<el-row 
				v-for="item in 3" 
				class="assetManagementIndexListWrap">
				<el-col :lg="7">
					<div @click="$router.push('/main/assetDetail')">
						小麦2019
					</div>
				</el-col>
				<el-col :lg="10">6eb5d30b24810823e28089e03</el-col>
				<el-col :lg="3">未发行</el-col>
				<el-col :lg="4">
					<span @click.stop="$router.push('/main/editAsset')">编辑</span>
					<span>发行</span>
					<span>删除</span>
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
	.assetManagementIndexWrap{
		
		.assetManagementIndexListsWrap{
			padding-right:30px;
			padding-top:20px;
			.assetManagementIndexListWrap{
				font-size:13px;
				>div{
					border:1px solid #aaa;
					margin-left:-1px;
					margin-top:-1px;
					text-align:center;
					line-height:36px;
					>span{
						cursor:pointer;
						line-height:36px;
						display:inline-block;
						padding:0 4px;
					}
				}
			}
			
			
		}
	}
	
</style>