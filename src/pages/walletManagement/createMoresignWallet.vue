<template>
	<div class="outerWrap createAccountWrap">
		<div class="commonTitle_one">
			钱包管理
			<span>
				<i class="el-icon-arrow-right"></i>
				<span>创建多签钱包</span>
			</span>
		</div>
			
		<div class="commonTitle_two">
			创建多签钱包
			<span>返回</span>
		</div>
		
		<div class="transferInpWrap">
			<el-row>
				<el-col :lg="16" md="12">
					<el-row class="transferInpListsWrap">
						<el-col :lg="24">
							<div class="transferInpListLeft">钱包名称</div>
							<el-input v-model="input" placeholder=""></el-input>
						</el-col>
						<el-col :lg="24">
							<div class="transferInpListLeft">钱包秘钥</div>
							<el-select v-model="value" placeholder="请选择钱包所使用的密钥">
								<el-option
									v-for="item in options"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</el-col>
					
						<el-col :lg="24">
							<div class="transferInpListLeft">可签名秘钥</div>
							<div class="signaturedAccountWrap">
								<div class="signaturedAccountListsWrap">
									<div class="signaturedAccountListWrap" v-for="item in 4">
										<div>3QaTfNSuBo9PEHnhQKFNspEHvQXwib5g63</div>
										<div>
											<span>编辑</span>
											<span>删除</span>
										</div>
									</div>
									
								</div>
								<div 
									class="signaturedAccountAdd"
									@click="addAccount">+添加可签名账户</div>
							</div>
						</el-col>
						<el-col :lg="24">
							<div class="transferInpListLeft">所需签名数</div>
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
							<div class="createAccountBtn">创建账户</div>
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
				radio: '1',
				options: [{
				  value: '选项1',
				  label: '1'
				}, {
				  value: '选项2',
				  label: '2'
				}, {
				  value: '选项3',
				  label: '3'
				}, {
				  value: '选项4',
				  label: '4'
				}, {
				  value: '选项5',
				  label: '4'
				}],
				value: ''
			}
		},
		methods:{
			addAccount(){
				MessageBox.alert(`<div>
					<div style="padding:20px 0 10px;text-align:left;">⚠️请在下方通过输入公钥添加可签名的钱包，钱包所有者可在密钥管理中查看自己密钥的公钥。</div>
					<input autocomplete="new-password" type="password" id="pass1" placeholder="请输入可签名公钥" style="width:100%;height:40px;border:1px solid #ddd;padding-left:10px;"/>
					<div style="text-align:left;padding-top:10px;">秘钥创建人：dd</div>
				</div>`, '输入可签名密钥的公钥', {
					dangerouslyUseHTMLString: true,
					closeOnClickModal:true,
					showCancelButton:true,
					showClose:false,
					center:true,
// 					beforeClose:(action, instance, done)=>{
// 						var dom_pass1 = document.getElementById('pass1');
// 						var pass1 = dom_pass1.value;
// 						
// 						instance.confirmButtonText = '执行中...';
// 						done();
// 						instance.confirmButtonLoading = false;
// 						
// 						
// 					}
				}).then((action)=>{
					
				}).catch((action)=>{
					
				});
	
			}
		},
	}
</script>

<style lang="scss" scoped>
	.createAccountWrap{
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