<template>
	<div class="outerWrap createAccountWrap">
		<div class="commonTitle_one">
			钱包管理
			<span>
				<i class="el-icon-arrow-right"></i>
				<span>创建单签钱包</span>
			</span>
		</div>
			
		<div class="commonTitle_two">
			创建单签钱包
			<span>返回</span>
		</div>
		
		<div class="transferInpWrap">
			<el-row>
				<el-col :lg="16" md="12">
					<el-row class="transferInpListsWrap">
						<el-col :lg="24">
							<div class="transferInpListLeft">钱包名称</div>
							<el-input v-model="input" placeholder=""></el-input>
						</el-col>
						<el-col :lg="24">
							<div class="transferInpListLeft">钱包秘钥</div>
							<el-select v-model="value" placeholder="请选择钱包所使用的密钥">
								<el-option
									v-for="item in options"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</el-col>
					
						
						
						
						<el-col :lg="24">
							<div class="createAccountBtn">创建账户</div>
						</el-col>
					</el-row>
				</el-col>
			</el-row>
		</div>
		
		
		
	</div>
</template>

<script>
	
	import Vue from 'vue';
	import { Row, Col, Radio, Input, Select, Option, MessageBox } from 'element-ui';
		
	Vue.use(Row);
	Vue.use(Col);
	Vue.use(Radio);
	Vue.use(Input);
	Vue.use(Option);
	Vue.use(Select);
	
	
	export default {
		created(){
			
		},
		data(){
			return {
				value: ''
			}
		},
		methods:{
			
		},
	}
</script>

<style lang="scss" scoped>
	.createAccountWrap{
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