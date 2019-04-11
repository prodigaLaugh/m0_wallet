
<template>
	<div class="outerWrap createAssetWrap">
		<el-row>
			<el-col :lg="20" :md="22">
			
				<div class="commonTitle_one">
					资产管理
					<span>
						<i class="el-icon-arrow-right"></i>
						<span>编辑资产</span>
					</span>
				</div>
					
				<div class="commonTitle_two">创建资产</div>
				
				<div class="transferInpWrap">
					
					<el-row class="transferInpListsWrap">
						<el-col :lg="24">
							<div class="transferInpListLeft">名称</div>
							<el-input v-model="param.asset_name" placeholder=""></el-input>
						</el-col>
						<el-col :lg="24">
							<div class="transferInpListLeft">资产参数</div>
						</el-col>
					</el-row>
					
					<div class="paraWrap">
						<el-row class="top">
							<el-col :lg="11">
								参数名
							</el-col>
							<el-col :lg="11">
								参数值
							</el-col>
						</el-row>
						<el-row 
							v-for="(item, index) in param.parameters"
							:key="index"
							style="margin-bottom:20px;">
							<el-col :lg="10">
								<el-input v-model="item.key" placeholder=""></el-input>
							</el-col>
							<el-col :lg="1">&nbsp;</el-col>
							<el-col :lg="10">
								<el-input v-model="item.value" placeholder=""></el-input>
							</el-col>
							<el-col :lg="1">&nbsp;</el-col>
							<el-col :lg="2" class="btn" >
								<span @click="delPara(index)">删除</span>
							</el-col>
						</el-row>
						<el-row class="addBtn">
							<el-col>
								<span class="addBtnWrap" @click="addPara">+添加资产参数</span>
							</el-col>
						</el-row>
						
					</div>
					
					<el-row style="margin-top:20px;">
						<el-col :lg="24">
							<div class="createAssetBtn" @click="save">保存</div>
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
	
	import { getAssetInfo,editAsset } from '@/util/server.js'
	
	
	export default {
		created(){
			
			var accountInfo = this.getLocalAccountInfo()
			var account_id = accountInfo.account_id;
			var account_type = accountInfo.account_type;
			
			this.params.account_id = account_id;
			this.params.account_type = account_type;
					
			
			var id = this.$route.query.id;
			var formdata = new FormData();
			formdata.append('id',id)
			
			getAssetInfo.bind(this)(formdata)
				.then(({data})=>{
					var data = data.data;
					this.param.asset_name = data.asset_name;
					this.param.parameters = data.Parameters;
				})
 


		},
		data(){
			return {
				submitFlag:true,
				param:{
					asset_name:'',
					parameters:[{key:'',value:''}]
				},
				
			}
		},
		methods:{
			delPara(index){
				console.log(index,111)
				if(index>0){
					this.param.parameters.splice(index, 1);
				}
			},
			addPara(){
				this.param.parameters.push({key:'', value:''})
			},
			save(){
				if(!this.param.asset_name){
					this.$message ({
						message: '请输入资产名称',
						type: 'warning'
					});
					return false;
				}
				var flag = false;
				flag = this.param.parameters.some((item,index)=>{
					return !item.key||!item.value
				})
				if(flag){
					this.$message ({
						message: '请完善资产参数',
						type: 'warning'
					});
					return false;
				}
				
				let param = this.param;
				if(!this.submitFlag){
					return false;
				}
				this.submitFlag = false;
				
				editAsset.bind(this)(param)
					.then(({data})=>{
						if(data.status === 'success' ){
							this.$message ({
								message: '编辑成功',
								type: 'success'
							});
							setTimeout(()=>{
								this.$router.go(-1);
							},1500)
						}else{
							var msg = data.detail || '编辑失败'
							this.$message ({
								message: msg,
								type: 'warning'
							});
						}
						this.submitFlag = true;
						console.log(data,111)
					})
					.catch((data)=>{
						this.submitFlag = true;
						console.log(data)
					})
			}
		},
	}
</script>

