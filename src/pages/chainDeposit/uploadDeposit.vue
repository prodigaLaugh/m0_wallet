<template>
	<div class="outerWrap uploadDepositWrap">
		<el-row>
			<el-col :lg="20" :md="22">
			
				<div class="commonTitle_one">
					链上存证
					<span>
						<i class="el-icon-arrow-right"></i>
						<span>上传存证</span>
					</span>
					<div>返回</div>
				</div>
					
				<div class="commonTitle_two">上传存证</div>
				
				<div class="transferInpWrap">
					
					<el-row class="transferInpListsWrap">
						<el-col :lg="24">
							<div class="transferInpListLeft">存证名称</div>
							<el-input 
								v-model="params.evidence_name" 
								autocomplete="off"
								placeholder="请输入上传存证的名称"></el-input>
						</el-col>
						<el-col :lg="24">
							<div class="transferInpListLeft">关联存证</div>
							<el-input 
								v-model="params.associate_evidence" 
								autocomplete="off"
								placeholder="请输入关联的存证hash"></el-input>
						</el-col>

						<el-col :lg="24">
							<div class="transferInpListLeft">存证文件</div>
							<div class="uploadFile">
								<input type="file" @change="fileSelect">
								<div>+选择上传文件</div>
							</div>
							<div>{{fileName}}</div>
						</el-col>

						<el-col :lg="24">
							<div class="transferInpListLeft">存证数据</div>
							<el-input 
								v-model="params.evidence_data" 
								type="textarea"
								:rows="5" placeholder=""></el-input>
						</el-col>
						<el-col :lg="24">
							<div class="transferInpListLeft">备注信息</div>
							<el-input 
								v-model="params.tx_info" 
								type="textarea"
								:rows="5" placeholder=""></el-input>
						</el-col>
						
						<el-col :lg="24">
							<div class="transferInpListLeft">输入密码</div>
							<el-input 
								type="password"
								v-model="params.password" 
								autocomplete="new-password"
								placeholder=""></el-input>
						</el-col>
						
						
						<el-col :lg="24">
							<div class="createAccountBtn" @click="save">提交上链</div>
						</el-col>
					</el-row>
						
				</div>
		
			</el-col>
		</el-row>
		
		<el-dialog
		  title="文件校验"
		  :visible.sync="dialogVisible"
		  :center="true"
		  width="40%">
		  
		  <div style="text-align:center;line-height:24px;font-size:16px;font-weight:500">
			  <div style="color:red;font-size:60px;">
				  <span class="el-icon-warning"></span>
			  </div>
			  <p style="padding-top:10px;">需至少上传一种存证信息</p>
			  <p>请填写存证数据或上传存证文件</p>

		  </div>
		  <span slot="footer" class="dialog-footer">
			<el-button 
				type="primary" 
				@click="dialogVisible = false"
				style="width:100%">确 认</el-button>
		  </span>
		</el-dialog>
		
	</div>
</template>

<script>
	import { uploadEvidence } from '@/util/server.js'
	import Vue from 'vue';
	import { Row, Col, Radio, Input, Select, Option, Button, MessageBox } from 'element-ui';
		
	Vue.use(Row);
	Vue.use(Col);
	Vue.use(Radio);
	Vue.use(Input);
	Vue.use(Option);
	Vue.use(Select);
	Vue.use(Button);
	
	
	export default {
		created(){
			var accountInfo = this.getLocalAccountInfo()
			var account_id = accountInfo.account_id;
			var account_type = accountInfo.account_type;
			
			this.params.account_id = account_id;
			this.params.account_type = account_type;
		},
		data(){
			return {
				submitFlag:true,
				params:{
					myfile:'',
					password:'',
					evidence_name:'',
					associate_evidence:'',
					evidence_data:'',
					tx_info:'',

				},
				fileName:'',
				file:'',
				
				dialogVisible:false,
			}
		},
		methods:{
			save(){
				var para = this.params;
				var formdata = new FormData();
				
				formdata.append('myfile',this.file);
				
				formdata.append('account_id', para.account_id);
				formdata.append('account_type',para.account_id);
				
				formdata.append('password',para.password);
				formdata.append('evidence_name',para.evidence_name);
				formdata.append('associate_evidence',para.associate_evidence);
				formdata.append('tx_info',para.tx_info);
				formdata.append('evidence_data',para.evidence_data);
				
				if(!this.submitFlag){
					return false;
				}
				this.submitFlag = false;
				uploadEvidence.bind(this)(formdata)
					.then(({data})=>{
						if(data.status =='success'){
							this.$message ({
								message: '上传成功',
								type: 'success'
							});
							setTimeout(()=>{
								this.$router.go(-1);
							},1500)
						}else{
							var msg = data.error
							this.$message ({
								message: msg,
								type: 'warning'
							});
						}
						this.submitFlag = true;
						console.log(data,1111)
					})
			},
			fileSelect(e){
				var  target= e.target
				var file = target.files[0];
				
				this.fileName = target.value;
				this.file = file;
				
			}
		},
		watch:{
			file:{
				handler: function (val, oldVal) {
					// console.log(val,oldVal,11)
				},
				deep: true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.uploadDepositWrap{
		.transferInpListsWrap{
            .uploadFile{
                position:relative;
                >input{
                    position:absolute;
                    z-index:2;
                    left:0;
                    width:100%;
                    top:0;
                    bottom:0;
                    opacity: 0;
					cursor:pointer;
                }
                >div{
                    line-height:40px;
                    border:1px solid #333;
                    text-align:center;
                }
            }
        }
        .createAccountBtn{
			height:40px;
			line-height:40px;
			text-align:center;
			border-radius:5px;
			background:$blue;
			color:#fff;
			font-size:13px;
		}
	}
	
</style>