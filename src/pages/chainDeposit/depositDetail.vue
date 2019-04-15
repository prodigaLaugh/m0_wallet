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
						<el-col :lg="10">
							<span 
								@click="download(detail.uuid, detail.file_name)"
								class="blue">下载链上文件</span>
							<span class="blue">校验我的文件</span>

						</el-col>
					</el-row>
					
					
				</div>


				<div class="commonTitle_two">存证数据</div>

				<div class="depositDataContent">
					description
				</div>
				
		
			
			</el-col>
		</el-row>
		
	</div>
</template>

<script>
	import { getEvidenceDetail, evidenceDownload } from '@/util/server.js'

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
						
				})
		},
		data(){
			return {
				downloadUrl:'',
				detail:{
					
				}
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
						var blob = new Blob([data],{type: 'application/octet-stream'})
						var a = document.createElement('a');
						a.download = file_name;
						a.href=window.URL.createObjectURL(blob)
						a.click()
						
						
						
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
							
		
	}
	
</style>