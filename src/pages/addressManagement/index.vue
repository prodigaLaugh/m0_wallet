<template>
	<div class="outerWrap addressManagementIndexWrap">
		<el-row>
			<el-col :lg="20" :md="22">
				<div class="commonTitle_one">地址管理</div>
					
				<div class="commonTitle_two">
					账户地址
					<span>创建地址</span>
				</div>
				
				<div class="addressManagementIndexListsWrap">
					
					<el-row class="addressManagementIndexListWrap">
						<el-col :lg="12" class="addressManagementIndexListLeft">
							<div>3D2oetdNuZUqQHPJmcMDDHYoqkyNVsFk9r</div>
							<div>
								<span>包含资产：</span>
								<div>
									<span>asset0001</span>
									<span>asset0002</span>
									<span>asset0003</span>
								</div>
							</div>
						</el-col>
						<el-col :lg="12" class="addressManagementIndexListRight">
							<div>
								<span>拷贝地址</span>
								<span>发起转账</span>
								<span>发行资产</span>
							</div>
						</el-col>
					</el-row>
					
					
					
				</div>
		
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

<style lang="scss">
	.addressManagementIndexWrap{
		
		
	}
	
</style>