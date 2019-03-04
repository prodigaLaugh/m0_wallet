<template>
	<div class="outerWrap verifyMnemonicWrap">
		<div class="commonTitle_one">
			账户管理
			<span>
				<i class="el-icon-arrow-right"></i>
				<span>备份账户</span>
			</span>
		</div>
			
		<div class="commonTitle_two">
			备份Account1
			<span>返回</span>
		</div>
		
		
		<el-row>
			<el-col :lg="20" :md="20">
				<el-row class="recordMnemonicContentWrap">
					<el-col :lg="24" class="title">⚠️请根据你记下的助记词，按顺序点击，验证你备份的助记词正确无误</el-col>
					<el-col  :lg="24" class="recordMnemonicContent">
						<span v-for="item in 12">word</span>
					</el-col >
					<el-col  :lg="24" class="recordMnemonicContent" style="background:none;">
						<span v-for="item in 12">word</span>
					</el-col >
					<el-col  :lg="24" class="recordMnemonicNextStepBtn">
						<div @click="verify">确认</div>
					</el-col>
				</el-row>
			</el-col>
		</el-row>
			
		
		
	</div>
</template>

<script>
	import Vue from 'vue';
	import { Row, Col, MessageBox } from 'element-ui';
	
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
			verify(){
				let title = '验证通过';
				let tip = '助记词顺序验证未通过，请检查后重试';
				
				let imgUrl = require("../../assets/account/verifyIcon1.png");
				
				MessageBox.alert(`<div>
					<img src="${imgUrl}" alt="">
					<div>助记词顺序验证通过，请妥善保管助记词</div>
				</div>`, title, {
					dangerouslyUseHTMLString: true,
					closeOnClickModal:true,
					showCancelButton:true,
					showCancelButton:false,
					showClose:false,
					center:true,
// 					beforeClose:(action, instance, done)=>{
// 						var dom_pass1 = document.getElementById('pass1');
// 						var pass1 = dom_pass1.value;
// 						
// 						instance.confirmButtonText = '执行中...';
// 						done();
// 						instance.confirmButtonLoading = false;
// 						
// 						
// 					}
				}).then((action)=>{
					
				}).catch((action)=>{
					
				});
	
			}
	
		},
	}
</script>

<style lang="scss" scoped>
	.verifyMnemonicWrap{
		.recordMnemonicContentWrap{
			.recordMnemonicContent{
				background:rgba(201, 201, 201, 1);
				padding:30px 0 10px 30px;
				display:flex;
				border-radius:10px;
				flex-wrap:wrap;
				margin-top:10px;
				margin-bottom:20px;
				>span{
					width:120px;
					line-height:64px;
					margin-right:30px;
					margin-bottom:20px;
					border:1px solid #666;
					text-align:center;
					border-radius:5px;
					background:#fff;
					font-size:18px;
				}
			}
			.recordMnemonicNextStepBtn{
				background:$blue;
				color:#fff;
				line-height:40px;
				border-radius:5px;
				text-align:center;
				cursor:pointer;
			}
		}
	}
	
	
</style>