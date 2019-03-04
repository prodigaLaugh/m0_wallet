<template>
	<div class="outerWrap recordMnemonicWrap">
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
					<el-col :lg="24" class="title">⚠️有了助记词就可以完全控制账户资产，因此，强烈建议你做好备份，正确记录以下单词和他们的出现顺序，将助记词保存到安全的地方。本应用不储存用户助记词，无法提供找回功能。</el-col>
					<el-col  :lg="24" class="recordMnemonicContent">
						<span v-for="item in 12">word</span>
						
					</el-col >
					<el-col :lg="24" class="recordMnemonicNextStepBtn">
						<div @click="$router.push('/main/verifyMnemonic')">下一步</div>
					</el-col >
				</el-row>
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

<style lang="scss" scoped>
	.recordMnemonicWrap{
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
				>div{
					background:$blue;
					color:#fff;
					line-height:40px;
					border-radius:5px;
					text-align:center;
					cursor:pointer;
				}
				
			}
		}
	}
	
	
</style>