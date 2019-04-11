<template>
	<div class="outerWrap createAssetWrap">
		<el-row>
			<el-col :lg="20" :md="22">
			
				<div class="commonTitle_one">
					资产管理
					<span>
						<i class="el-icon-arrow-right"></i>
						<span>创建资产</span>
					</span>
					<div @click="$router.go(-1)">返回</div>
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
	import { createAsset } from '@/util/server.js'
	
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
				let accountInfo = this.getLocalAccountInfo();
				let param = Object.assign({},accountInfo,this.param) ;
				if(!this.submitFlag){
					return false;
				}
				this.submitFlag = false;
				
				createAsset.bind(this)(param)
					.then(({data})=>{
						if(data.status === 'success' ){
							this.$message ({
								message: '创建成功',
								type: 'success'
							});
							this.param = {
								asset_name:'',
								"account_id":"0R031M6800A02",
								"account_type":1,
								parameters:[{key:'',value:''}]
							}
							this.$router.go(-1);
						}else{
							var msg = data.detail || '创建失败'
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

