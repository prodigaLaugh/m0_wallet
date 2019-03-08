<template>
	<div class="outerWrap signatureWrap">
		<el-row>
			<el-col :lg="20" :md="22">
				<div class="commonTitle_one">
					资产操作
					<span>
						<i class="el-icon-arrow-right"></i>
						<span>签名</span>
					</span>
					<div>返回</div>
				</div>
			</el-col>
		</el-row>
		
			
		<div class="commonTitle_two">签名交易</div>
		
		<el-row>
			<el-col :lg="20" :md="22">
				
				<div class="signatureInpWrap">
					<input type="file">
					<div>+上传签名文件</div>
				</div>
				
				<div class="signatureDetailWrap">
					<div class="title">交易信息</div>
					<div class="content">
						<div>交易类型：转账</div>
						<div>资产类型：asset001</div>
						<div>资产ID：1cxh8b7812998dbc9af7bbff7281c5</div>
						<div>交易金额：940.3413</div>
						<div>从：9cbd0a503b9dfcb655e4f4b1b47b3296（account008）</div>
						<div>到：2cd08b7812998dbc9af7bbff7280b43d1（account002)</div>
						<div>需要签名：4/5</div>
		
					</div>
					
					
					<div class="title">请输入密码</div>
					<el-input v-model="input" placeholder="请输入密码"></el-input>
					<div class="subBtn">提交交易</div>
				</div>
						
			</el-col>
		</el-row>
		
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

<style lang="scss">
	.signatureWrap{
		
		.signatureInpWrap{
			position:relative;
			>div{
				height:80px;
				border:2px dashed #888;
				text-align:center;
				line-height:80px;
				font-size:14px;
			}
			>input{
				position:absolute;
				left:0;
				right:0;
				top:0;
				bottom:0;
				opacity:0;
				width:100%;
				cursor:pointer;
			}
		}
		
		.signatureDetailWrap{
			.title{
				padding:30px 0 4px;
				font-size:14px;
				font-weight:bold;
			}
			.content{
				border:1px solid #888;
				padding:4px;
				>div{
					line-height:20px;
				}
			}
			.subBtn{
				margin-top:20px;
				background:$blue;
				color:#fff;
				font-size:13px;
				line-height:40px;
				border-radius:5px;
				text-align:center;
				cursor:pointer;
			}
		}
	}
	
</style>