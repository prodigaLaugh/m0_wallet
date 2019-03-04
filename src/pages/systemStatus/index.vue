<template>
	<div class="outerWrap systemStatusIndexWrap">
		<div class="commonTitle_one">系统状态</div>
			
		<div class="commonTitle_two">
			配置
		</div>
		
		<div class="systemStatusIndexContentWrap">
			<el-row class="systemStatusIndexContentItem">
				<el-col :lg="6">版本号</el-col>
				<el-col :lg="4">
					<span>1.0.1</span>
				</el-col>
			</el-row>
			<el-row class="systemStatusIndexContentItem">
				<el-col :lg="6">语言</el-col>
				<el-col :lg="4">
					<span>中文</span>
				</el-col>
			</el-row>
		</div>
		
		<div class="commonTitle_two">
			网络状态
		</div>
		
		<div class="systemStatusIndexContentWrap">
			<el-row class="systemStatusIndexContentItem">
				<el-col :lg="6">节点监听</el-col>
				<el-col :lg="4">
					<span>链接</span>
				</el-col>
			</el-row>
			<el-row class="systemStatusIndexContentItem">
				<el-col :lg="6">网络同步</el-col>
				<el-col :lg="4">
					<span>同步中</span>
				</el-col>
			</el-row>
			<el-row class="systemStatusIndexContentItem">
				<el-col :lg="6">连接数</el-col>
				<el-col :lg="4">
					<span>12</span>
				</el-col>
			</el-row>
			<el-row class="systemStatusIndexContentItem">
				<el-col :lg="6">当前高度</el-col>
				<el-col :lg="4">
					<span>1111</span>
				</el-col>
			</el-row>
			<el-row class="systemStatusIndexContentItem">
				<el-col :lg="6">最高高度</el-col>
				<el-col :lg="4">
					<span>1111</span>
				</el-col>
			</el-row>
			<el-row class="systemStatusIndexContentItem">
				<el-col :lg="6">同步时长</el-col>
				<el-col :lg="4">
					<span>324小时</span>
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
	.systemStatusIndexWrap{
		.systemStatusIndexContentWrap{
			padding:20px 0;
			.systemStatusIndexContentItem{
				>div{
					line-height:28px;
					>span{
						display:inline-block;
						width:200px;
						text-align:center;
					}
				}
			}
		}
							
		
	}
	
</style>