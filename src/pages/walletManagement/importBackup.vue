<template>
	<div class="outerWrap importBackupWrap">
		<el-row>
			<el-col :lg="20" :md="22">
			
				<div class="commonTitle_one">
					账户管理
					<span>
						<i class="el-icon-arrow-right"></i>
						<span>备份导入</span>
					</span>
					<div>返回</div>
				</div>
					
				<div class="commonTitle_two">备份导入</div>
				
				<div class="transferInpWrap">
					
					<el-row class="transferInpListsWrap">
						<el-col :lg="24">
							<!-- <div class="transferInpListLeft">账户名称</div> -->
							<div class="importBackupFile">
								<input type="file">
								<div>+ 上传备份文件</div>
							</div>
						</el-col>
						
						
						<el-col :lg="24">
							<div class="createAccountBtn">导入钱包</div>
						</el-col>
					</el-row>
						
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
	.importBackupWrap{
		.createAccountBtn{
			height:40px;
			line-height:40px;
			text-align:center;
			border-radius:5px;
			background:$blue;
			color:#fff;
			font-size:13px;
		}
		.importBackupFile{
			position:relative;
			>input{
				position:absolute;
				left:0;
				width:100%;
				top:0;
				bottom:0;
				opacity:0;
				z-index:2;
				cursor:pointer;
			}
			>div{
				height:80px;
				border:2px solid #888;
				text-align:center;
				line-height:80px;
				font-size:13px;
			}
		}
	}
	
</style>