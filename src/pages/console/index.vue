<template>
	<div class="outerWrap consoleIndexWrap">
		<div class="commonTitle_one">操作台</div>
		<div class="consoleIndexOperWrap">
			<div class="commonTitle_two">操作选项</div>
			
			<el-row  class="row-bg" :gutter="30" style="margin-right:0;">
			  <el-col 
					:lg="6" 
					v-for="(item,index) in operParams"
					:key="index">
					<div class="addAccountItem"@click="$router.push(item.route)">{{item.text}}</div>
				</el-col>
		
			</el-row>
		</div>
		
		<div class="consoleRecordsWrap">
			<div class="commonTitle_two">操作记录</div>
			<div class="contentNavWrap">
				<span :class="{active:operIndex===0}" @click="operIndex=0">转账</span>
				<span :class="{active:operIndex===1}" @click="operIndex=1">签名</span>
				<span :class="{active:operIndex===2}" @click="operIndex=2">发行</span>
				<span :class="{active:operIndex===3}" @click="operIndex=3">销毁</span>
			</div>
			
			<el-row  class="consoleInpWrap" :gutter="30" >
				<el-col :lg="18" class="consoleInpItem">
					<el-col :lg="12">
						<span>资产类型</span>
						<el-select v-model="value" placeholder="请选择">
							<el-option
								v-for="item in options"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</el-col>
					
					<el-col :lg="12">
						<span>排序方式</span>
						<el-select v-model="value" placeholder="请选择">
							<el-option
								v-for="item in options"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</el-col>
					
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
	import { Row, Col, Select, Option } from 'element-ui';
		
	Vue.use(Row);
	Vue.use(Col);
	Vue.use(Option);
	Vue.use(Select);
	
	export default {
		created(){
			
		},
		data(){
			return {
				operParams:[
					{text:'转账',route:'/main/transfer'},
					{text:'签名',route:'/main/signature'},
					{text:'发行',route:'/main/issue'},
					{text:'销毁',route:'/main/destroy'},
				],
				operIndex:0,
				
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
	.consoleIndexWrap{
		.consoleIndexOperWrap>div:nth-of-type(2){
			display:flex;
			justify-content: space-between;
			align-items: center;
			padding-bottom:10px;
			
			.addAccountItem{
				background:$blue;
				cursor:pointer;
				justify-content: center;
				align-items: center;
				line-height:80px;
				font-size:16px;
				color:#fff;
				text-align:center;
			}
		}
		
		.consoleRecordsWrap{
			padding-right:30px;
			
			.consoleInpItem{
				padding-top:20px;
				>div{
					padding-bottom:20px;
					>span{
						font-size:14px;
						padding-right:8px;
					}
				}
			}
			
			
			
		}
	}
	
</style>