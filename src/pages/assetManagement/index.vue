<template>
	<div class="outerWrap consoleIndexWrap">
		<el-row>
			<el-col>
				
			
				<div class="commonTitle_one">资产操作</div>
				<div class="consoleIndexOperWrap">
					<div class="commonTitle_two">操作选项</div>
					
					<el-row  class="row-bg" :gutter="30" style="margin-right:0;">
					  <el-col 
							:lg="6" 
							v-for="(item,index) in operParams"
							:key="index">
							<div class="addAccountItem" @click="$router.push(item.route)">{{item.text}}</div>
						</el-col>
				
					</el-row>
				</div>
				
				<div class="consoleRecordsWrap">
					<div class="commonTitle_two">操作记录</div>
					<div class="contentNavWrap">
						<span 
							:class="{active:operIndex===0}" 
							@click="toggleNav(0)">转账</span>
						<span 
							:class="{active:operIndex===1}" 
							@click="toggleNav(1)">签名</span>
						<span 
							:class="{active:operIndex===2}" 
							@click="toggleNav(2)">发行</span>
						<span 
							:class="{active:operIndex===3}" 
							@click="toggleNav(3)">销毁</span>
					</div>
					
					<el-row  class="consoleInpWrap" :gutter="30" >
						<el-col :lg="18" class="consoleInpItem">
							<el-col :lg="12">
								<span>资产类型</span>
								<el-select 
									v-model="params.asset_id" 
									placeholder="请选择"
									@change="toggleNav">
									<el-option
										v-for="item in allAssetsLists"
										:key="item.value"
										:label="item.asset_name"
										:value="item.asset_id">
									</el-option>
								</el-select>
							</el-col>
							
							<el-col :lg="12">
								<span>排序方式</span>
								
								<el-select 
									v-if="operIndex==1"
									v-model="signOrder_by" 
									placeholder="请选择"
									@change="toggleNav">
									<el-option
										v-for="item in signOptions"
										:key="item.value"
										:label="item.label"
										:value="item.value">
									</el-option>
								</el-select>
								<el-select 
									v-else
									v-model="params.order_by" 
									placeholder="请选择"
									@change="toggleNav">
									<el-option
										v-for="item in orderOptions"
										:key="item.value"
										:label="item.label"
										:value="item.value">
									</el-option>
								</el-select>
							</el-col>
							
						</el-col>
					</el-row>
					
					<div class="consoleListsWrap" v-if="operIndex==0">
						<div class="noresult" v-if="!transfterLists.length">暂无数据</div>
						<div 
							class="consoleListWrap" 
							v-for="(item,index) in transfterLists"
							:key="index">
							<el-row 
								class="consoleListIDWrap" 
								:gutter="20">
								<el-col :lg="12">
									<span>交易ID</span>
									<span>{{item.tx_id}}</span>
									
									<span 
										:class="{error:item.status==2,going:item.status==3}">
										{{item.status | recordTextByType}}
										<i 
											class="el-icon-warning" 
											v-if="item.status==2"></i>
										<i 
											class="el-icon-refresh"
											v-if="item.status==3"></i>
									</span>
								</el-col>
								<el-col :lg="12">
									{{item.create_time}}
								</el-col>
							</el-row>
							
							
							
							<el-row 
								:gutter="20"
								class="consoleList_list"
								v-if="item.to.address_account.length">
								<el-col 
									:style="{lineHeight:45*item.to.address_account.length +'px'}"
									:lg="4" >
									<span>收入</span>
								</el-col>
								<el-col :lg="10">
									<span>To</span>
									<span>
										<div 
											v-for="(list,i) in item.to.address_account"
											:key="i">{{list.Address | interceptStr}}（{{list.account | interceptStr}}）</div>
										
									</span>
								</el-col>
								<el-col 
									:style="{lineHeight:45*item.to.address_account.length +'px'}"
									:lg="6">+ {{item.to.amount}}</el-col>
								<el-col 
									:style="{lineHeight:45*item.to.address_account.length +'px'}"
									:lg="4">{{item.to.asset_name||'--'}}</el-col>
							</el-row>
							
							<el-row 
								:gutter="20"
								class="consoleList_list"
								v-if="item.from.address_account.length">
								<el-col 
									:style="{lineHeight:45*item.from.address_account.length +'px'}"
									:lg="4">
									<span class="out">支出</span>
								</el-col>
								<el-col :lg="10">
									<span>From</span>
									<span>
										<div 
											v-for="(list,i) in item.from.address_account"
											:key="i">
											{{list.Address | interceptStr}}（{{list.account | interceptStr}}）
										</div>
									</span>
								</el-col>
								<el-col 
									:style="{lineHeight:45*item.from.address_account.length +'px'}"
									:lg="6">- {{item.from.amount}}</el-col>
								<el-col 
									:style="{lineHeight:45*item.from.address_account.length +'px'}"
									:lg="4">{{item.to.asset_name||'--'}}</el-col>
							</el-row>
							
						</div>
						
					</div>
					
					<div class="consoleListsWrap" v-if="operIndex==1">
						<div class="noresult" v-if="!signLists.length">暂无数据</div>
						<div 
							class="consoleListWrap" 
							v-for="(item,index) in signLists"
							:key="index">
							<el-row 
								class="consoleListIDWrap" 
								:gutter="20">
								<el-col :lg="12">
									<span>交易ID</span>
									<span>{{item.tx_id}}</span>
									
									<span 
										:class="{error:item.status==2,going:item.status==3}">
										{{item.status | recordTextByType}}
										<i 
											class="el-icon-warning" 
											v-if="item.status==2"></i>
										<i 
											class="el-icon-refresh"
											v-if="item.status==3"></i>
									</span>
								</el-col>
								<el-col :lg="12">
									{{item.create_time}}
								</el-col>
							</el-row>
							
							<el-row 
								:gutter="20"
								class="consoleList_list">
								<el-col :lg="4">
									<span class="sign">签名</span>
								</el-col>
								<el-col :lg="10">
									<span>From</span>
									<span>{{item.from_user}}</span>
								</el-col>
								<el-col :lg="6"> </el-col>
								<el-col :lg="4">{{item.asset_name}}</el-col>
							</el-row>
							
							
						</div>
						
					</div>
					
					<div class="consoleListsWrap" v-if="operIndex==2">
						<div class="noresult" v-if="!issueLists.length">暂无数据</div>
						<div 
							class="consoleListWrap" 
							v-for="(item,index) in issueLists"
							:key="index">
							<el-row 
								class="consoleListIDWrap" 
								:gutter="20">
								<el-col :lg="12">
									<span>交易ID</span>
									<span>{{item.tx_id}}</span>
									
									<span 
										:class="{error:item.status==2,going:item.status==3}">
										{{item.status | recordTextByType}}
										<i 
											class="el-icon-warning" 
											v-if="item.status==2"></i>
										<i 
											class="el-icon-refresh"
											v-if="item.status==3"></i>
									</span>
								</el-col>
								<el-col :lg="12">
									{{item.create_time}}
								</el-col>
							</el-row>
							
							<el-row 
								:gutter="20"
								class="consoleList_list"
								v-if="item.to.address_account.length">
								<el-col 
									:style="{lineHeight:45*item.to.address_account.length +'px'}"
									:lg="4">
									<span class="issue">发行</span>
								</el-col>
								<el-col :lg="10">
									<span>To</span>
									<span>
										<div
											v-for="(list,i) in item.to.address_account"
											:key="i">{{list.Address | interceptStr}}（{{list.account | interceptStr}}）</div>
									</span>
								</el-col>
								<el-col 
									:style="{lineHeight:45*item.to.address_account.length +'px'}"
									:lg="6">+ {{item.to.amount}}</el-col>
								<el-col 
									:style="{lineHeight:45*item.to.address_account.length +'px'}"
									:lg="4">{{item.to.asset_name||'--'}}</el-col>
							</el-row>
						</div>
						
					</div>
					
					<div class="consoleListsWrap" v-if="operIndex==3">
						<div class="noresult" v-if="!retireLists.length">暂无数据</div>
						<div 
							class="consoleListWrap" 
							v-for="(item,index) in retireLists"
							:key="index">
							<el-row 
								class="consoleListIDWrap" 
								:gutter="20">
								<el-col :lg="12">
									<span>交易ID</span>
									<span>{{item.tx_id}}</span>
									
									<span 
										:class="{error:item.status==2,going:item.status==3}">
										{{item.status | recordTextByType}}
										<i 
											class="el-icon-warning" 
											v-if="item.status==2"></i>
										<i 
											class="el-icon-refresh"
											v-if="item.status==3"></i>
									</span>
								</el-col>
								<el-col :lg="12">
									{{item.create_time}}
								</el-col>
							</el-row>
							
							
							<el-row 
								:gutter="20"
								class="consoleList_list"
								v-if="item.from.address_account.length">
								<el-col 
									:style="{lineHeight:45*item.from.address_account.length +'px'}"

									:lg="4">
									<span class="retire">销毁</span>
								</el-col>
								<el-col :lg="10">
									<span>From</span>
									<span>
										<div 
											v-for="(list,i) in item.from.address_account"
											:key="i">
											{{list.Address | interceptStr}}（{{list.account | interceptStr}}）
										</div>
									</span>
								</el-col>
								<el-col 
									:style="{lineHeight:45*item.from.address_account.length +'px'}"
									:lg="6">- {{item.from.amount}}</el-col>
								<el-col 
									:style="{lineHeight:45*item.from.address_account.length +'px'}"
									:lg="4">{{item.from.asset_name||'--'}}</el-col>
							</el-row>
							
						</div>
						
					</div>
					
					
					
					
				</div>
		
			</el-col>
		</el-row>
		
	</div>
</template>

<script>
	import { 
		getAddressLists, 
		getAssetLists, 
		transferRecord, 
		signRecord, 
		issueRecord,
		retireRecord
	} from '@/util/server.js'
	
	import Vue from 'vue';
	import { Row, Col, Select, Option } from 'element-ui';
		
	Vue.use(Row);
	Vue.use(Col);
	Vue.use(Option);
	Vue.use(Select);
	
	export default {
		created(){
			
			var accountInfo = this.getLocalAccountInfo()
			var account_id = accountInfo.account_id;
			var account_type = accountInfo.account_type;
			
			this.params.account_id = account_id;
			this.params.account_type = account_type;
		
			var formdata = new FormData();
			formdata.append('account_id',account_id)
			getAssetLists.bind(this)(formdata)
				.then(({data})=>{
					var data = data.data;
					var asset_unissue = data.asset_unissue || [];
					var asset_issue = data.asset_issue || [];
					this.allAssetsLists = [{asset_id: "",asset_name: "全部"},...asset_unissue,...asset_issue]
					
					this.toggleNav(0)
				})
				
		},
		data(){
			return {
				
				operParams:[
					{text:'转账',route:'/main/transfer'},
					{text:'签名',route:'/main/signature'},
					{text:'发行',route:'/main/issue'},
					{text:'销毁',route:'/main/destroy'},
				],
			
				operIndex:0,
				
				allAssetsLists:[],
				
				transfterLists:[],
				signLists:[],
				issueLists:[],
				retireLists:[],
				
				params:{
					asset_name:'',
					asset_id:'',
					order_by:'time_desc',
				},
				
				signOrder_by:'time_desc',
				
				orderOptions: [{
					value: 'time_desc',
					label: '按时间排序（新到旧）'
				}, {
					value: 'time_asc',
					label: '按时间排序（旧到新）'
				}, {
					value: 'amount_asc',
					label: '按金额排序（大到小）'
				}, {
					value: 'amount_desc',
					label: '按金额排序（小到大）'
				}],
				
				signOptions: [{
					value: 'time_desc',
					label: '按时间排序（新到旧）'
				}, {
					value: 'time_asc',
					label: '按时间排序（旧到新）'
				}],
				
			}
		},
		methods:{
			toggleNav(index){
				if(index>-1){
					this.operIndex = index||0;
				}
				
				var list = this.allAssetsLists.filter((item,index)=>{
					return item.asset_id ==this.params.asset_id
				})
				var asset_name = list[0].asset_name;
				this.params.asset_name = asset_name;
				if(!this.params.asset_id){
					this.params.asset_name = '';
				}
				console.log(this.operIndex,888)
				if(this.operIndex===0){
					this.getTransfer();
				}else if(this.operIndex===1){
					this.getSsign();
				}else if(this.operIndex===2){
					this.getIssue();
				}else{
					this.getRetire()
				}
				
			
				
			},
			getTransfer(){
				transferRecord.bind(this)(this.params)
					.then(({data})=>{
						console.log(data,111)
						var lists = [];
						if(data.status=='success'){
							lists = data.data;
						}
						this.transfterLists.splice(0,999,...lists)
					})
			},
			getSsign(){
				let para = Object.assign({}, this.params, {order_by:this.signOrder_by})
				signRecord.bind(this)(para)
					.then(({data})=>{
						console.log(data,222)
						var lists = [];
						if(data.status=='success'){
							lists = data.data;
						}
						this.signLists.splice(0,999,...lists)
					})
			},
			getIssue(){
				issueRecord.bind(this)(this.params)
					.then(({data})=>{
						console.log(data,333)
						var lists = [];
						if(data.status=='success'){
							lists = data.data;
						}
						this.issueLists.splice(0,999,...lists)
					})
			},
			getRetire(){
				retireRecord.bind(this)(this.params)
					.then(({data})=>{
						console.log(data,444)
						var lists = [];
						if(data.status=='success'){
							lists = data.data;
						}
						this.retireLists.splice(0,999,...lists)
					})
			}
		},
	}
</script>

<style lang="scss">
	.consoleIndexWrap{
		.consoleIndexOperWrap>div:nth-of-type(2){
			display:flex;
			justify-content: space-between;
			align-items: center;
			padding-bottom:10px;
			
			.addAccountItem{
				background:$blue;
				cursor:pointer;
				justify-content: center;
				align-items: center;
				line-height:80px;
				font-size:16px;
				color:#fff;
				text-align:center;
			}
		}
		
		.consoleRecordsWrap{
			padding-right:30px;
			
			.consoleInpItem{
				padding-top:20px;
				>div{
					padding-bottom:20px;
					>span{
						font-size:14px;
						padding-right:8px;
					}
				}
			}
			
			
			
		}
	}
	
</style>