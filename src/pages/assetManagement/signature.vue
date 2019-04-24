<template>
	<div class="outerWrap signatureWrap">
		<el-row>
			<el-col :lg="20" :md="22">
				<div class="commonTitle_one">
					资产操作
					<span>
						<i class="el-icon-arrow-right"></i>
						<span>签名</span>
					</span>
					<div>返回</div>
				</div>
			</el-col>
		</el-row>
		
			
		<div class="commonTitle_two">签名交易</div>
		
		<el-row>
			<el-col :lg="20" :md="22">
				
				<div class="signatureInpWrap">
					<input type="file" @change="selectFile">
					<div v-if="!uploadFlag">+上传签名文件</div>
					<div v-else>{{uploadParams.filename}}</div>
				</div>
				
				<div class="signatureDetailWrap" v-if="uploadFlag">
					<div class="title">交易信息</div>
					<div class="content">
						<div>交易类型：{{uploadFileDetail.tx_type|transactionTextByType}}</div>
						<div>资产类型：{{uploadFileDetail.asset_name}}</div>
						<div>资产ID：{{uploadFileDetail.asset_id}}</div>
						<div>交易金额：{{uploadFileDetail.amount }}</div>
						<div>
								从：
								<div 
									v-for="(item,index) in uploadFileDetail.from"
									:key="index">
									{{item.Address||'--'}}（{{item.account||'--'}})
								</div>
						</div>
						<div>
							到：
							<div 
								v-for="(item,index) in uploadFileDetail.to"
								:key="index">
								{{item.Address||'--'}}（{{item.account||'--'}})
							</div>
						</div>
						<div>需要签名：{{uploadFileDetail.need_signnum}}</div>
						<div>已完成签名：{{uploadFileDetail.complete_signnum}}</div>
		
					</div>
					
					
					<div class="title">请输入密码</div>
					<el-input 
						v-model="uploadParams.password" 
						placeholder="请输入密码"
						autocomplete="new-password"
						type="password"></el-input>
						
					<div class="subBtn" @click="signFn">{{isTxFlag?'提交交易':'生成签名文件'}}</div>
					
				</div>
						
			</el-col>
		</el-row>
		
	</div>
</template>

<script>
	import { signUpload, sign } from '@/util/server.js'

	import Vue from 'vue';
	import { Row, Col, Input } from 'element-ui';

	Vue.use(Row);
	Vue.use(Col);
	Vue.use(Input);

	
	export default {
		created(){
			var accountInfo = this.getLocalAccountInfo()
			var account_id = accountInfo.account_id;
			var account_type = accountInfo.account_type;
			var user_name = localStorage.USERTOKEN;
			
			this.uploadParams.account_id = account_id;
			this.uploadParams.account_type = account_type;
			this.uploadParams.user_name = user_name;
			
		},
		data(){
			return {
				uploadFlag:false,
				uploadFileDetail:{},
				
				isTxFlag:false,
				uploadParams:{
					filename:'',
					signfile:'',
					password:''
				},
				

			}
		},
		methods:{
			selectFile(e){
				
				
				var  target= e.target
				var file = target.files[0];
				this.uploadParams.filename = file.name;
				this.uploadParams.signfile = file;
				
				var formdata = new FormData();
				formdata.append('signfile',this.uploadParams.signfile)
				formdata.append('user_name',this.uploadParams.user_name)
				formdata.append('account_id',this.uploadParams.account_id)
				formdata.append('account_type',this.uploadParams.account_type)
				
		
					
				signUpload.bind(this)(formdata)
					.then(({data})=>{
						console.log(data,111)
						if(data.status=='success'){
							this.uploadFlag = true;
							this.uploadFileDetail = data.data;
							
							var nums = this.uploadFileDetail.complete_signnum ? this.uploadFileDetail.complete_signnum.split('/') :[];
							var leftNum = parseInt(nums[0]);
							var rightNum = parseInt(nums[1]) ;
							this.isTxFlag = (rightNum - leftNum)==1 
						}else{
							this.$message({
								type:'warning',
								message:data.error
							})
						}
					})
			},
			signFn(){
				var formdata = new FormData();
				formdata.append('signfile',this.uploadParams.signfile)
				formdata.append('user_name',this.uploadParams.user_name)
				formdata.append('account_id',this.uploadParams.account_id)
				formdata.append('account_type',this.uploadParams.account_type)
				formdata.append('password',this.uploadParams.password)

				
				sign.bind(this)(formdata)
					.then(({data})=>{
						if(data.status == 'success'){
							if(this.isTxFlag){
								this.$message({
									type:'success',
									message:'提交交易成功'
								})
								setTimeout(()=>{
									this.$router.go(-1);
								},1500)
							}else{
								let element = document.createElement('a')
								element.setAttribute('href', 'data:text/json;charset=utf-8,' + JSON.stringify(data) )
								element.setAttribute('download', 'data.hex')
								element.style.display = 'none'
								document.body.appendChild(element)
								element.click()
								document.body.removeChild(element)
							}
						}else{
							this.$message({
								type:'warning',
								message:data.error
							})
						}
						console.log(data,87797)
					})
			}
		},
	}
</script>

<style lang="scss">
	.signatureWrap{
		
		.signatureInpWrap{
			position:relative;
			>div{
				height:80px;
				border:2px dashed #888;
				text-align:center;
				line-height:80px;
				font-size:14px;
			}
			>input{
				position:absolute;
				left:0;
				right:0;
				top:0;
				bottom:0;
				opacity:0;
				width:100%;
				cursor:pointer;
			}
		}
		
		.signatureDetailWrap{
			.title{
				padding:30px 0 4px;
				font-size:14px;
				font-weight:bold;
			}
			.content{
				border:1px solid #888;
				padding:4px;
				>div{
					line-height:20px;
				}
			}
			.subBtn{
				margin-top:20px;
				background:$blue;
				color:#fff;
				font-size:13px;
				line-height:40px;
				border-radius:5px;
				text-align:center;
				cursor:pointer;
			}
		}
	}
	
</style>