<template>
	<div class="outerWrap depositDetailWrap">
		<el-row>
			<el-col :lg="20" :md="22">
			
				<div class="commonTitle_one">
					链上存证
					<span>
						<i class="el-icon-arrow-right"></i>
						<span>存证详情</span>
					</span>
					<div @click="$router.go(-1)">返回</div>
				</div>
					
				<div class="commonTitle_two">
					存证概况
				</div>
				
				<div class="systemStatusIndexContentWrap">
					<el-row class="systemStatusIndexContentItem">
						<el-col :lg="6">存证名称</el-col>
						<el-col :lg="18">
							<span>{{detail.evidence_name}}</span>
						</el-col>
					</el-row>
					<el-row class="systemStatusIndexContentItem">
						<el-col :lg="6">上链交易hash</el-col>
						<el-col :lg="18">
							<span>{{detail.tx_id}}</span>
						</el-col>
					</el-row>
					<el-row class="systemStatusIndexContentItem">
						<el-col :lg="6">备注信息</el-col>
						<el-col :lg="18">
							<span style="width:auto;">{{detail.describe}}</span>
						</el-col>
					</el-row>
				</div>
				
				<div class="commonTitle_two">存证文件</div>
				
				<div class="systemStatusIndexContentWrap">
					<el-row class="systemStatusIndexContentItem">
						<el-col :lg="8">文件名</el-col>
						<el-col :lg="6">
							<span>文件大小</span>
						</el-col>
						<el-col :lg="10">操作</el-col>
					</el-row>
					<el-row class="systemStatusIndexContentItem">
						<el-col :lg="8">{{detail.file_name||'--'}}</el-col>
						<el-col :lg="6">
							<span>{{detail.file_size||'--'}}</span>
						</el-col>
						<el-col :lg="10" v-if="detail.file_name">
							<span 
								@click="download(detail.uuid, detail.file_name)"
								class="blue">下载链上文件</span>
							<span class="blue" @click="uploadfileDialFlag=true">校验我的文件</span>

						</el-col>
						
					</el-row>
					
					
				</div>


				<div class="commonTitle_two">存证数据</div>

				<div class="depositDataContent">
					{{detail.evidence_data}}
				</div>
				
				<el-dialog
					title="文件校验"
					:visible.sync="uploadfileDialFlag"
					width="600px"
					custom-class="uploadFileWrap"
					:center="true">
					<div class="fileWrap">
						<div class="tips">⚠️系统将用上传的文件与链上存证文件进行比对校验，验证两个文件是否完全一致</div>
						<div class="inputWrap">
							<input type="file" @change="fileSelect">
							<span>+选择文件上传校验</span>
						</div>
						<div v-if="fileName" class="filename">{{fileName}}</div>
					</div>
					<span slot="footer" class="dialog-footer">
						<el-button type="primary" @click="verifyFile">上传文件</el-button>
					</span>
				</el-dialog>
				
				<el-dialog
					title="文件校验"
					:visible.sync="uploadfileCompleteFlag"
					width="600px"
					custom-class="uploadFileCompleteWrap"
					:center="true">
					<div>
						
						<div class="contentWrap" v-if="uploadSuccess">
							<div class="green">
								<span class="el-icon-success"></span>
							</div>
							<div>校验通过<br>上传的文件与链上存证文件完全一致</div>
						</div>
						<div class="contentWrap" v-else>
							<div class="red">
								<span class="el-icon-warning"></span>
							</div>
							<div>校验未通过<br>上传文件与链上存证不文件一致</div>
						</div>
						
					</div>
					
					<span slot="footer" class="dialog-footer" v-if="uploadSuccess">
						<el-button type="primary" @click="uploadfileCompleteFlag=false">返回</el-button>
					</span>
					<span slot="footer" class="dialog-footer" v-else>
						<el-button type="primary" @click="uploadfileCompleteFlag=false">返回</el-button>
						<el-button type="primary" @click="uploadfileCompleteFlag=false;uploadfileDialFlag=true;fileName=''">重新上传</el-button>
					</span>
				</el-dialog>
				
		
			
			</el-col>
		</el-row>
		
	</div>
</template>

<script>
	import { getEvidenceDetail, evidenceDownload, evidenceVerifyFile } from '@/util/server.js'

	import Vue from 'vue';
	import { Row, Col, Dialog } from 'element-ui';
		
	Vue.use(Row);
	Vue.use(Col);
	Vue.use(Dialog);
	
	
	export default {
		created(){
			let id = this.$route.query.id;
			getEvidenceDetail.bind(this)(id)
				.then(({data})=>{
					console.log(data,111)
					var data = data.data;
					this.detail = data;
					this.params.file_hash = data.tx_id;
						
				})
		},
		data(){
			return {
				downloadUrl:'',
				detail:{
					
				},
				
				uploadfileDialFlag:false,
				params:{
					myfile:'',
					file_hash:'',
				},
				
				fileName:'',
				
				uploadfileCompleteFlag:false,
				uploadSuccess:false,
			}
		},
		methods:{
			download(uuid, file_name){
				var formdata = new FormData();
				formdata.append('uuid',uuid);
				formdata.append('file_name',file_name)
				
				evidenceDownload.bind(this)(formdata)
					.then(({data})=>{
						console.log(data,4444)
						var blob = data;
						var reader = new FileReader();
						reader.readAsDataURL(blob); // 转换为base64，可以直接放入a标签href
						reader.onload = function (e) {
						// 转换完成，创建一个a标签用于下载
							var a = document.createElement('a');
							a.download = file_name;
							a.href = e.target.result;
							document.body.appendChild(a)
							a.click()
							
							document.body.removeChild(a)
						}
						
						
						
					})
			},
			fileSelect(e){
				var  target= e.target
				var file = target.files[0];
				
				this.fileName = target.value;
				this.params.myfile = file;
				
			},
			verifyFile(){
				
				var formdata = new FormData();
				formdata.append('myfile',this.params.myfile);
				formdata.append('tx_id',this.params.file_hash);
				this.uploadfileDialFlag = false;
				evidenceVerifyFile.bind(this)(formdata)
					.then(({data})=>{
						this.uploadfileCompleteFlag = true;
						if(data.status ==='success'){
							this.uploadSuccess = true
						}else{
							this.uploadSuccess = false
						}
					})
			}
			
		},
	}
</script>

<style lang="scss">
	.depositDetailWrap{
		padding-bottom:80px;
		.systemStatusIndexContentWrap{
			padding:20px 0;
			.systemStatusIndexContentItem{
				>div{
					line-height:28px;
					>span{
						display:inline-block;
						width:200px;
						// text-align:center;
					}
				}
			}
        }
        .depositDataContent{
            border:1px solid #333;
            line-height:20px;
            padding:10px;
        }
							
		.uploadFileWrap{
			.fileWrap{
				.tips{
					text-align:center;
					border:1px solid #666;
					line-height:46px;
				}
				.inputWrap{
					position:relative;
					margin:15px auto 0;
					text-align:center;
					border:1px solid #666;
					>input{
						position:absolute;
						left:0;
						top:0;
						z-index:2;
						opacity: 0;
						width:100%;
						height:100%;
						cursor:pointer;
					}
					>span{
						display:inline-block;
						line-height:146px;
						
					}
					
				}
				.filename{
					font-size:12px;
					padding-top:4px;
				}
			}
		}
		
		.uploadFileCompleteWrap{
			.contentWrap{
				text-align:center;
				.green{
					color:#33cc66;
				}
				.red{
					color:#ff0000;
				}
				>div:nth-of-type(1){
					font-size:70px;
				}
				>div:nth-of-type(2){
					padding-top:20px;
					line-height:24px;
					font-size:18px;
				}
			}
		}
	}
	
</style>