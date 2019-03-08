<template>
	<div class="outerWrap walletDetailWrap">
		<el-row>
			<el-col :lg="20" :md="22">
			
				<div class="commonTitle_one">
					钱包管理
					<span>
						<i class="el-icon-arrow-right"></i>
						<span>钱包详情</span>
					</span>
					<div>返回</div>
				</div>
					
				<div class="commonTitle_two">
					钱包概况
				</div>
				
				<div class="walletDetaiContentWrap">
					<el-row class="walletDetaiContentItem">
						<el-col :lg="4" :md="4" :sm="4">钱包名称</el-col>
						<el-col :lg="20" :md="20" :sm="20">
							<span>大米2019</span>
						</el-col>
					</el-row>
					<el-row class="walletDetaiContentItem">
						<el-col :lg="4" :md="4" :sm="4">钱包类型</el-col>
						<el-col :lg="20" :md="20" :sm="20">
							<span>多签</span>
						</el-col>
					</el-row>
				</div>

				<div class="commonTitle_two">
					包含资产
				</div>
				
				<div class="walletDetaiContentWrap">
					<el-row class="walletDetaiContentItem">
						<el-col :lg="4" :md="4" :sm="4">资产名称</el-col>
						<el-col :lg="20" :md="20" :sm="20">
							<span>余额</span>
						</el-col>
					</el-row>
					<el-row class="walletDetaiContentItem">
						<el-col :lg="4" :md="4" :sm="4">asset001</el-col>
						<el-col :lg="20" :md="20" :sm="20">
							<span>32435.8987</span>
						</el-col>
					</el-row>
					<el-row class="walletDetaiContentItem">
						<el-col :lg="4" :md="4" :sm="4">asset002</el-col>
						<el-col :lg="20" :md="20" :sm="20">
							<span>32435.8987</span>
						</el-col>
					</el-row>
				</div>



				<div class="commonTitle_two">
					关联密钥
				</div>
				
				<div class="walletDetaiContentWrap">
					<el-row class="walletDetaiContentItem">
						<el-col :lg="4" :md="4" :sm="4">相关用户</el-col>
						<el-col :lg="4" :md="4" :sm="4">相关钱包</el-col>
						<el-col :lg="16" :md="16" :sm="16">
							<span>密钥公钥</span>
						</el-col>
					</el-row>

					<el-row class="walletDetaiContentItem">
						<el-col :lg="4" :md="4" :sm="4">user001</el-col>
						<el-col :lg="4" :md="4" :sm="4">wallet001</el-col>
						<el-col :lg="16" :md="16" :sm="16">
							<span>3AweAnU1qYSUCJ5Hvy9DFEB</span>
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
	.walletDetailWrap{
		.walletDetaiContentWrap{
			padding:20px 0;
			.walletDetaiContentItem{
				line-height:26px;
				font-size:13px;
			}
		}
							
		
	}
	
</style>