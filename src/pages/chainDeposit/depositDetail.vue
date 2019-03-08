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
					<div>返回</div>
				</div>
					
				<div class="commonTitle_two">
					存证概况
				</div>
				
				<div class="systemStatusIndexContentWrap">
					<el-row class="systemStatusIndexContentItem">
						<el-col :lg="6">存证名称</el-col>
						<el-col :lg="18">
							<span>存证0020193</span>
						</el-col>
					</el-row>
					<el-row class="systemStatusIndexContentItem">
						<el-col :lg="6">上链交易hash</el-col>
						<el-col :lg="18">
							<span>3GTXRviDFhp2G6kETXZuG2hZ5H3AA1yPf8</span>
						</el-col>
					</el-row>
					<el-row class="systemStatusIndexContentItem">
						<el-col :lg="6">备注信息</el-col>
						<el-col :lg="18">
							<span style="width:auto;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed</span>
						</el-col>
					</el-row>
				</div>
				
				<div class="commonTitle_two">存证文件</div>
				
				<div class="systemStatusIndexContentWrap">
					<el-row class="systemStatusIndexContentItem">
						<el-col :lg="6">文件名</el-col>
						<el-col :lg="4">
							<span>文件大小</span>
						</el-col>
					</el-row>
					<el-row class="systemStatusIndexContentItem">
						<el-col :lg="6">fileName00102</el-col>
						<el-col :lg="4">
							<span>45mb</span>
						</el-col>
					</el-row>
					
					
				</div>


				<div class="commonTitle_two">存证数据</div>

				<div class="depositDataContent">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.
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
	.depositDetailWrap{
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