<template>
	<div class="outerWrap uploadDepositWrap">
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
			<el-row>
				<el-col :lg="16" md="12">
					<el-row class="transferInpListsWrap">
						<el-col :lg="24">
							<div class="transferInpListLeft">存证名称</div>
							<el-input v-model="value" placeholder=""></el-input>
						</el-col>

                        <el-col :lg="24">
							<div class="transferInpListLeft">存证文件</div>
							<div class="uploadFile">
                                <input type="file">
                                <div>+选择上传文件</div>
                            </div>
						</el-col>

						<el-col :lg="24">
							<div class="transferInpListLeft">存证数据</div>
							<el-input 
                                v-model="value" 
                                type="textarea"
                                :rows="5" placeholder=""></el-input>
						</el-col>
						<el-col :lg="24">
							<div class="transferInpListLeft">备注信息</div>
							<el-input 
                                v-model="value" 
                                type="textarea"
                                :rows="5" placeholder=""></el-input>
						</el-col>
						
						
						<el-col :lg="24">
							<div class="createAccountBtn">提交上链</div>
						</el-col>
					</el-row>
				</el-col>
			</el-row>
		</div>
		
		
		
	</div>
</template>

<script>
	
	import Vue from 'vue';
	import { Row, Col, Radio, Input, Select, Option, MessageBox } from 'element-ui';
		
	Vue.use(Row);
	Vue.use(Col);
	Vue.use(Radio);
	Vue.use(Input);
	Vue.use(Option);
	Vue.use(Select);
	
	
	export default {
		created(){
			
		},
		data(){
			return {
				
				value: ''
			}
		},
		methods:{
			
		},
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