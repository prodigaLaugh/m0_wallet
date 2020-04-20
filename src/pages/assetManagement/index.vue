<template>
	<div class="outerWrap consoleIndexWrap">
		<div>
			<div>


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
						<el-col :lg="20" class="consoleInpItem">
							<el-col :lg="10">
								<span>资产类型</span>
								<el-select
									v-model="params.asset_id"
									placeholder="请选择"
									@change="selectFn">
									<el-option
										v-for="item in allAssetsLists"
										:key="item.value"
										:label="item.asset_name"
										:value="item.asset_id ? item.asset_id: item.asset_name">
									</el-option>
								</el-select>
							</el-col>

							<el-col :lg="14">
								<span>选择时间</span>

                <el-date-picker
                      v-model="time"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      value-format="yyyy-MM-dd"
                      @change="selectFn"
                      end-placeholder="结束日期">
                </el-date-picker>

								<!-- <el-select
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
								</el-select> -->
							</el-col>

						</el-col>
					</el-row>



        <div
          style="overflow:auto;"
          v-infinite-scroll="getMoreLists"
          infinite-scroll-disabled="disabled"
          infinite-scroll-distance="100"
         >


					<div class="consoleListsWrap" v-if="operIndex==0" >
						<div
							class="consoleListWrap"

							v-for="(item,index) in transfterLists"
							:key="index">
							<div class="inner">


								<el-row
									class="consoleListIDWrap"
									:gutter="20">
									<el-col :md="12">
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
									<el-col :md="12">
										{{item.create_time}}
									</el-col>
								</el-row>

								<el-row
									:gutter="20"
									class="consoleList_list"
									v-for="(list,i,key) in item.from.item_info"
									:key="key">
									<el-col :md="4">
										<!-- <span class="out">支出</span> -->
									</el-col>
									<el-col :md="14">
										<span style="width:50px;">From</span>
										<span>
											<div>
												{{list.Address | interceptStr}}（{{list.account | interceptStr}}）
											</div>
										</span>
									</el-col>
									<el-col :lg="6">- {{list.amount}}</el-col>
									<el-col :lg="4">{{item.to.asset_name||'--'}}</el-col>
								</el-row>

								<el-row
									:gutter="20"
									class="consoleList_list"
									v-for="(list,i,key) in item.to.item_info"
									:key="key">
									<el-col :md="4" >
										<!-- <span>收入</span> -->
									</el-col>
									<el-col :md="14">
										<span style="width:50px;">To</span>
										<span>
											<div>{{list.Address | interceptStr}}（{{list.account | interceptStr}}）</div>

										</span>
									</el-col>
									<el-col :lg="6">+ {{list.amount}}</el-col>
									<el-col :lg="4">{{item.to.asset_name||'--'}}</el-col>
								</el-row>



							</div>

						</div>

					</div>

					<div class="consoleListsWrap" v-if="operIndex==1" style="overflow:auto">
						<div
							class="consoleListWrap"
							v-for="(item,index) in signLists"
							:key="index">
							<div class="inner">
								<el-row
									class="consoleListIDWrap"
									:gutter="20">
									<el-col :md="12">
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
									<el-col :md="12">
										{{item.create_time}}
									</el-col>
								</el-row>

								<el-row
									:gutter="20"
									class="consoleList_list">
									<el-col :md="4">
										<span class="sign">签名</span>
									</el-col>
									<el-col :md="10">
										<span>From</span>
										<span>{{item.from_user}}</span>
									</el-col>
									<el-col :md="6"> </el-col>
									<el-col :md="4">{{item.asset_name}}</el-col>
								</el-row>

							</div>

						</div>

					</div>

					<div class="consoleListsWrap" v-if="operIndex==2" >
						<div
							class="consoleListWrap"
							v-for="(item,index) in issueLists"
							:key="index">
							<div class="inner">

								<el-row
									class="consoleListIDWrap"
									:gutter="20">
									<el-col :md="12">
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
									<el-col :md="12">
										{{item.create_time}}
									</el-col>
								</el-row>

								<el-row
									:gutter="20"
									class="consoleList_list"
									v-for="(list,i,key) in item.to.item_info"
									:key="key">
									<el-col :md="4">
										<span class="issue">发行</span>
									</el-col>
									<el-col :md="10">
										<span>To</span>
										<span>
											<div>{{list.Address | interceptStr}}（{{list.account | interceptStr}}）</div>
										</span>
									</el-col>
									<el-col :md="6">+ {{list.amount}}</el-col>
									<el-col :md="4">{{item.to.asset_name||'--'}}</el-col>
								</el-row>
							</div>
						</div>

					</div>

					<div class="consoleListsWrap" v-if="operIndex==3" style="overflow:auto">

						<div
							class="consoleListWrap"
							v-for="(item,index) in retireLists"
							:key="index">
							<div class="inner">
								<el-row
									class="consoleListIDWrap"
									:gutter="20">
									<el-col :md="12">
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
									<el-col :md="12">
										{{item.create_time}}
									</el-col>
								</el-row>


								<el-row
									:gutter="20"
									class="consoleList_list"
									v-for="(list,i,key) in item.from.item_info"
									:key="key">
									<el-col :md="4">
										<span class="retire">销毁</span>
									</el-col>
									<el-col :md="10">
										<span>From</span>
										<span>
											<div>
												{{list.Address | interceptStr}}（{{list.account | interceptStr}}）
											</div>
										</span>
									</el-col>
									<el-col :md="6">- {{list.amount}}</el-col>
									<el-col :md="4">{{item.from.asset_name||'--'}}</el-col>
								</el-row>

							</div>





						</div>



					</div>

          <p v-if="loading" class="noresult">加载中...</p>

          <div class="noresult" v-else-if="!allLists.length">暂无数据</div>
          <p v-else="noMore" class="noresult">没有更多了</p>

        </div>

          <!-- <div class="paginationWrap" v-if="retireLists.length || issueLists.length || signLists.length || transfterLists.length ">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="params.total"
              :page-size="params.page_size"
              @current-change="pageChange"
             >
            </el-pagination>
          </div> -->




				</div>

			</div>
		</div>

	</div>
</template>

<script>
	import {
		getAssetLists,
    getAssetTypes,
    getAssetSignTypes,
		transferRecord,
		signRecord,
		issueRecord,
		retireRecord
	} from '@/util/server.js'

	import Vue from 'vue';
	import { Row, Col, Select, Option, DatePicker, Pagination, InfiniteScroll  } from 'element-ui';


	Vue.use(Row);
	Vue.use(Col);
	Vue.use(Option);
	Vue.use(Select);
  Vue.use(DatePicker);
  Vue.use(Pagination);
Vue.use(InfiniteScroll);

	export default {
		created(){

			var accountInfo = this.getLocalAccountInfo()
			var account_id = accountInfo.account_id;
			var account_type = accountInfo.account_type;

			this.params.account_id = account_id;
			this.params.account_type = account_type;
      this.toggleNav(0)

		},
		data(){
			return {
        time:'',
				operParams:[
					{text:'转账',route:'/main/transfer'},
					{text:'签名',route:'/main/signature'},
					{text:'发行',route:'/main/issue'},
					{text:'销毁',route:'/main/destroy'},
				],

				operIndex:0,

				allAssetsLists:[{asset_id: "",asset_name: "全部"}],

        loading: false,
        noMoreData: false,

				transfterLists:[],
				signLists:[],
				issueLists:[],
				retireLists:[],


				params:{
          page:1,
          page_size:1,
					asset_name:'',
					asset_id:'',
					order_by:'time_desc',
          start_time:'',
          end_time:''
				},

				signOrder_by:'time_desc',

				orderOptions: [{
					value: 'time_desc',
					label: '按时间排序（新到旧）'
				}, {
					value: 'time_asc',
					label: '按时间排序（旧到新）'
				}, {
					value: 'amount_desc',
					label: '按金额排序（大到小）'
				}, {
					value: 'amount_asc',
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
    computed:{
      noMore(){

        var obj = {
          0: 'transfterLists',
          1: 'signLists',
          2: 'issueLists',
          3: 'retireLists'
        }
        var flag = this[obj[this.operIndex]].length;

        return this.noMoreData
      },
      disabled() {
        return this.loading || this.noMore;
      },
      allLists(){
        var obj = {
          0: 'transfterLists',
          1: 'signLists',
          2: 'issueLists',
          3: 'retireLists'
        }
        return this[obj[this.operIndex]]
      },
    },
		methods:{
			toggleNav(index){
				if(index>-1){
					this.operIndex = index||0;
				}
        this.params.asset_name = '全部';
        this.params.asset_id = ''
        this.params.page = 1;

        this.noMoreData = false;

        this.getLists();
        this.getAssetTypes()
			},
      getMoreLists(){
        this.params.page ++;
        this.getLists();
      },
      selectFn(){
        var list = this.allAssetsLists.filter((item,index)=>{
        	return item.asset_id ==this.params.asset_id
        })

        var asset_name = list[0].asset_name;
        this.params.asset_name = asset_name;
        if(!this.params.asset_id){
        	this.params.asset_name = '';
          this.params.asset_id = ''
        }
        this.params.page = 1;
        this.noMoreData = false;
         this.getLists();
      },
      pageChange(currentPage){
        this.params.page = currentPage;
        this.getLists()
      },
      getLists(){
        this.loading = true;
        if(!!this.time.length){
          this.params.start_time = this.time[0]
          this.params.end_time = this.time[1]
        }else{
          var y = new Date().getFullYear();
          var m = new Date().getMonth() + 1
          var d = new Date().getDate();
          m = m < 10 ? '0' + m : m;
          d = d < 10 ? '0'+ d : d;
          var end_time = y+'-'+m+'-'+d;
          var start_time = m==='01' ? ((y-1)+'-12-'+d) : (y+'-'+ '0'+(m-1)+'-'+d);
          this.params.start_time = start_time
          // this.params.start_time = '2020-03-04'
          this.params.end_time = end_time
        }
         
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
      getAssetTypes(){
        if(this.operIndex===2){
          this.getAssetLists()
        }else{
          this.getAssetTypes()
        }
      },
      getAssetTypes(){
        const account_id = this.params.account_id;
        const params = { account_id }
        const fn = this.operIndex===1 ? getAssetSignTypes: getAssetTypes;

        fn.bind(this)(params)
          .then(({data})=>{
            const { data: lists, total_item: total } = data;

            if(lists){
              this.allAssetsLists.splice(0,999, {asset_id: "",asset_name: "全部"},...lists)
            }else{
              this.allAssetsLists.splice(0,999,{asset_id: "",asset_name: "全部"});
            }
          })
      },

      getAssetLists(){
        var account_id = this.getLocalAccountInfo().account_id;

        getAssetLists.bind(this)({
          account_id,
          is_issue:1,
          page: 1,
          page_size: 999999,
          total: 0,
         })
        	.then(({data})=>{
            const { asset_issue: lists, total_item: total } = data.data;

            if(lists){
              this.allAssetsLists.splice(0,999, {asset_id: "",asset_name: "全部"},...lists)
            }else{
              this.allAssetsLists.splice(0,999,{asset_id: "",asset_name: "全部"});
            }

        	})
        	.catch(()=>{

        	})
      },
			getTransfer(){
				transferRecord.bind(this)(this.params)
					.then(({data})=>{

            const { record_list: lists, total_item: total } = data.data
            if(data.status=='success'){
              if(lists){
                if(this.params.page === 1){
                  this.transfterLists.splice(0,999,...lists);
                }else{
                  this.transfterLists.push(...lists);
                }

                this.params.total = total
              }else{
                this.noMoreData = true;
              }


            }

            this.loading = false;

					})
			},
			getSsign(){
				let para = Object.assign({}, this.params, {order_by:this.signOrder_by})
				signRecord.bind(this)(para)
					.then(({data})=>{
						const { record_list: lists, total_item: total } = data.data
						if(data.status=='success'){

              if(lists){
                if(this.params.page === 1){
                  this.signLists.splice(0,999,...lists);
                }else{
                  this.signLists.push(...lists);
                }

                this.params.total = total
              }else{
                this.noMoreData = true;
              }


						}

            this.loading = false;

					})
			},
			getIssue(){
				issueRecord.bind(this)(this.params)
					.then(({data})=>{
            const { record_list: lists, total_item: total } = data.data
            if(data.status=='success'){
              if(lists){
                if(this.params.page === 1){
                  this.issueLists.splice(0,999,...lists);
                }else{
                  this.issueLists.push(...lists);
                }

                this.params.total = total
              }else{
                this.noMoreData = true;
              }

            }

            this.loading = false;

					})
			},
			getRetire(){
				retireRecord.bind(this)(this.params)
					.then(({data})=>{

            const { record_list: lists, total_item: total } = data.data
            if(data.status=='success'){

              if(lists){
                if(this.params.page === 1){
                  this.retireLists.splice(0,999,...lists);
                }else{
                  this.retireLists.push(...lists);
                }

                this.params.total = total
              }else{
                this.noMoreData = true;
              }

            }

            this.loading = false;

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
