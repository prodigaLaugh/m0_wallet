<template>
	<div class="outerWrap createAssetWrap">
		<div class="commonTitle_one">
			资产管理
			<span>
				<i class="el-icon-arrow-right"></i>
				<span>创建资产</span>
			</span>
		</div>
			
		<div class="commonTitle_two">创建资产</div>
		
		<div class="transferInpWrap">
			<el-row>
				<el-col :lg="16" md="12">
					<el-row class="transferInpListsWrap">
						<el-col :lg="24">
							<div class="transferInpListLeft">名称</div>
							<el-input v-model="input" placeholder=""></el-input>
						</el-col>
						<el-col :lg="24">
							<div class="transferInpListLeft">描述</div>
							<el-input 
								type="textarea"
								placeholder=""
								:rows="3"></el-input>
						</el-col>
						
						<el-col :lg="24">
							<div class="createAssetBtn">保存</div>
						</el-col>
					</el-row>
				</el-col>
			</el-row>
		</div>
		
		
		
	</div>
</template>

<script>
	
	import Vue from 'vue';
	import { Row, Col, Input } from 'element-ui';
		
	Vue.use(Row);
	Vue.use(Col);
	Vue.use(Input);

	
	
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

<style lang="scss" scoped>
	.createAssetWrap{
		.createAssetBtn{
			width:264px;
			height:40p;
			line-height:40px;
			text-align:center;
			border-radius:5px;
			background:$blue;
			margin:0 auto;
			color:#fff;
			font-size:13px;
		}
	}
	
</style>