<template>
	<div class="higherWrapSelectTemplateWrap">
		<div
			v-for="(item,index) in selectLists"
			:key="index">
			<div class="templateWrap" v-if="item.type=='issue'">
				<div class="templateTitleWrap">
					<span>Issue</span>
					<span @click="delList(item.ID)">删除</span>
				</div>
				<div class="tempateList">
					<div class="tempaleSelectTitle">资产</div>
					<div class="templateInpWrap templateInpMixWrap">
						<el-select  
							v-model="item.selfkey"
							placeholder="请选择">
							
							<el-option
								v-for="list in options1"
								:key="list.value"
								:label="list.label"
								:value="list.value">
							</el-option>
						</el-select><el-input v-model="item.selfvalue" placeholder="请输入内容"></el-input>
					</div>
				</div>
				<div class="tempateList">
					<div class="tempaleSelectTitle">数量</div>
					<div class="templateInpWrap">
						<el-input v-model="item.amount" placeholder="请输入内容"></el-input>
					</div>
				</div>
			</div>
			
			<div class="templateWrap" v-if="item.type=='spend_account'">
				<div class="templateTitleWrap">
					<span>Spend from account</span>
					<span @click="delList(item.ID)">删除</span>
				</div>
				<div class="tempateList">
					<div class="tempaleSelectTitle">账户</div>
					<div class="templateInpWrap templateInpMixWrap">
						<el-select  
							v-model="item.selfkey"
							placeholder="请选择">
							
							<el-option
								v-for="item in options21"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select><el-input v-model="item.selfvalue" placeholder="请输入内容"></el-input>
					</div>
				</div>
				<div class="tempateList">
					<div class="tempaleSelectTitle">资产</div>
					<div class="templateInpWrap templateInpMixWrap">
						<el-select  
							v-model="item.selfkey1"
							placeholder="请选择">
							
							<el-option
								v-for="item in options22"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select><el-input v-model="item.selfvalue1" placeholder="请输入内容"></el-input>
					</div>
				</div>
				<div class="tempateList">
					<div class="tempaleSelectTitle">数量</div>
					<div class="templateInpWrap">
						<el-input v-model="item.amount" placeholder="请输入内容"></el-input>
					</div>
				</div>
			</div>
			
			<div class="templateWrap" v-if="item.type=='control_address'">
				<div class="templateTitleWrap">
					<span>Control width address</span>
					<span @click="delList(item.ID)">删除</span>
				</div>
				<div class="tempateList">
					<div class="tempaleSelectTitle">地址</div>
					<div class="templateInpWrap">
						<el-input v-model="item.address" placeholder="请输入内容"></el-input>
					</div>
				</div>
				<div class="tempateList">
					<div class="tempaleSelectTitle">资产</div>
					<div class="templateInpWrap templateInpMixWrap">
						<el-select  
							v-model="item.selfkey"
							placeholder="请选择">
							
							<el-option
								v-for="item in options3"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select><el-input v-model="item.selfvalue" placeholder="请输入内容"></el-input>
					</div>
				</div>
				<div class="tempateList">
					<div class="tempaleSelectTitle">数量</div>
					<div class="templateInpWrap">
						<el-input v-model="item.amount" placeholder="请输入内容"></el-input>
					</div>
				</div>
			</div>
			
			<div class="templateWrap" v-if="item.type=='retire'">
				<div class="templateTitleWrap">
					<span>Retire</span>
					<span @click="delList(item.ID)">删除</span>
				</div>
				<div class="tempateList">
					<div class="tempaleSelectTitle">资产</div>
					<div class="templateInpWrap templateInpMixWrap">
						<el-select  
							v-model="item.selfkey"
							placeholder="请选择">
							
							<el-option
								v-for="item in options4"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select><el-input v-model="item.selfvalue" placeholder="请输入内容"></el-input>
					</div>
				</div>
				<div class="tempateList">
					<div class="tempaleSelectTitle">数量</div>
					<div class="templateInpWrap">
						<el-input v-model="item.amount" placeholder="请输入内容"></el-input>
					</div>
				</div>
			</div>
			
			
		</div>
		

			
	</div>
</template>

<script>
	export default {
		created(){
	
		
			
		},
		destroyed(){
			
		},
		props:['selectLists','saveAddlistData'],
		data(){
			return {
				password:"",
				
				options1:[
					{value:'asset_alias',label:'别名'},
					{value:'asset_id',label:'ID'},
				],
				options21:[
					{value:'account_alias',label:'别名'},
					{value:'account_id',label:'ID'},
				],
				options22:[
					{value:'asset_alias',label:'别名'},
					{value:'asset_id',label:'ID'},
				],
				options3:[
					{value:'asset_alias',label:'别名'},
					{value:'asset_id',label:'ID'},
				],
				options4:[
					{value:'asset_alias',label:'别名'},
					{value:'asset_id',label:'ID'},
				]
			}
		},
		methods:{
			delList(id){
				this.$emit('changeData',id)
			},
			
				
		},
		watch:{
			selectLists:{
				handler: function (val, oldVal) { 
					console.log('child11111')
				},
				deep: true
			}
		}
	}
</script>

<style lang="scss">
.higherWrapSelectTemplateWrap{
	.templateWrap{
		border: 1px solid #dadee2;
		padding: 30px;
		margin-bottom: 30px;
		.templateTitleWrap{
			display:flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom:30px;
			>span:nth-of-type(1){
				color: #20252d;
				font-size: 14px;
				font-weight: 600;
			}
			>span:nth-of-type(2){
				color: #fff;
				background-color: #ffffff;
				border:1px solid #f2f2f2;
				padding: 5px 10px;
				font-size: 12px;
				line-height: 1.5;
				border-radius: 3px;
				@include pointer;
				&:hover{
					color:#fff;
					background:#ddd;
				}
			}
		}
		
		.tempateList{
			margin-bottom: 30px;
			.tempaleSelectTitle{
				font-size: 12px;
				text-transform: uppercase;
				font-weight: 500;
				margin-bottom: 5px;
			}
			.templateInpWrap{
				display:flex;
				&.templateInpMixWrap{
					>div:nth-of-type(1){
						input{
							border-radius:4px 0 0 4px;
						}
					}
					>div:nth-of-type(2){
						input{
							border-radius:0px 4px 0 4px;
							margin-left:-1px;
						}
					}
				}
			}
		}    
		
		
	}
	
	

	
	
}
</style>