<template>
	<div class="outerWrap transactionRecordWrap">
		
		<div class="commonTitle_one">
			资产钱包
			<span>
				<i class="el-icon-arrow-right"></i>
				<span>交易记录</span>
			</span>
		</div>
		
		
		<div class="consoleRecordsWrap">
			<div class="commonTitle_two">交易记录</div>
			
			<el-row class="transactionRecordContentWrap">
				<el-col :lg="24">
					<span>所在地址</span>
					<span>37x6JnDNhbsBw95bvEreB7WHWA74gGR17y</span>
				</el-col>
				<el-col :lg="24">
					<span>资产类型</span>
					<span>37x6JnDNhbsBw95bvEreB7WHWA74gGR17y</span>
				</el-col>
			</el-row>
			
			<div class="consoleListsWrap">
				<div class="consoleListWrap" v-for="item in 3">
					<el-row 
						class="consoleListIDWrap" 
						:gutter="20">
						<el-col :lg="12">
							<span>交易ID</span>
							<span>34g435tg0wf431231ace30d0915fe7</span>
							<span>已确认</span>
						</el-col>
						<el-col :lg="12">
							2019-01-02 10:12:25
						</el-col>
					</el-row>
					
					<el-row 
						:gutter="20"
						class="consoleList_list">
						<el-col :lg="4">
							<span>收入</span>
						</el-col>
						<el-col :lg="10">
							<span>To</span>
							<span>37x6JnDNhbsBw95bvEreB7WHWA74gGR17y（account001</span>
						</el-col>
						<el-col :lg="6">+ 0.006782700</el-col>
						<el-col :lg="4">M0COIN</el-col>
					</el-row>
				</div>
				
			</div>
			
			
			
			
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
				options: [{
					value: '选项1',
					label: '黄金糕'
				}, {
					value: '选项2',
					label: '双皮奶'
				}, {
					value: '选项3',
					label: '蚵仔煎'
				}, {
					value: '选项4',
					label: '龙须面'
				}, {
					value: '选项5',
					label: '北京烤鸭'
				}],
				value: ''
			}
		},
		methods:{
			
		},
	}
</script>

<style lang="scss">
	.transactionRecordWrap{
		
		.consoleRecordsWrap{
			padding-right:30px;
		}
		
		.transactionRecordContentWrap{
			padding-bottom:20px;
			>div{
				line-height:36px;
				font-size:13px;
				>span:nth-of-type(2){
					margin-left:40px;
				}
			}
		}
	}
	
</style>