<template>
	<div class="outerWrap transferWrap">
		<div class="commonTitle_one">
			资产操作
			<span>
				<i class="el-icon-arrow-right"></i>
				<span>销毁</span>
			</span>
		</div>
			
		<div class="commonTitle_two">销毁</div>
		
		<div class="transferInpWrap">
			<el-row>
				<el-col :lg="16" md="12">
					<el-row class="transferInpListsWrap">
						<el-col :lg="24">
							<div class="transferInpListLeft">所在地址</div>
							<el-select v-model="value" placeholder="请选择">
								<el-option
								  v-for="item in options"
								  :key="item.value"
								  :label="item.label"
								  :value="item.value">
								</el-option>
							  </el-select>
						</el-col>
						
						<el-col :lg="24">
							<div class="transferInpListLeft">销毁资产类型</div>
							<el-select v-model="value" placeholder="请选择">
								<el-option
								v-for="item in options"
								:key="item.value"
								:label="item.label"
								:value="item.value">
								</el-option>
							</el-select>
						</el-col>
						<el-col :lg="24">
							<div class="transferInpListLeft">销毁数量</div>
							<el-input v-model="input" placeholder="请输入目标地址"></el-input>
						</el-col>
						
						<el-col :lg="24">
							<div class="transferAccoutItemBtn">生成签名文件</div>
						</el-col>
					</el-row>
				</el-col>
			</el-row>
		</div>
		
		
		
	</div>
</template>

<script>
	
	import Vue from 'vue';
	import { Row, Col, Input, Select, Option } from 'element-ui';
		
	Vue.use(Row);
	Vue.use(Col);
	Vue.use(Input);
	Vue.use(Option);
	Vue.use(Select);
	
	
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
	.transferWrap{
		
	}
	
</style>