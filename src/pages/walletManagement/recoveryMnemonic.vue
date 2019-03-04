<template>
	<div class="outerWrap recoveryMnemonicWrap">
		<div class="commonTitle_one">
			账户管理
			<span>
				<i class="el-icon-arrow-right"></i>
				<span>助记词恢复</span>
			</span>
		</div>
			
		<div class="commonTitle_two">
			助记词恢复
			<span>返回</span>
		</div>
		
		<div class="transferInpWrap">
			<el-row>
				<el-col :lg="16" md="12">
					<el-row class="transferInpListsWrap">
						<el-col :lg="24">
							<!-- <div class="transferInpListLeft">账户名称</div> -->
							<el-input v-model="input" type="textarea" :rows="3"></el-input>
						</el-col>
						
						
						<el-col :lg="24">
							<div class="createAccountBtn">恢复</div>
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
	.recoveryMnemonicWrap{
		.createAccountBtn{
			height:40px;
			line-height:40px;
			text-align:center;
			border-radius:5px;
			background:$blue;
			color:#fff;
			font-size:13px;
		}
	}
	
</style>