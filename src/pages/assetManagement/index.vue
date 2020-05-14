<template>
	<div class="outerWrap consoleIndexWrap assetManagementWrap">
		<div>
			<div>


				<div class="commonTitle_one">资产操作</div>

        <div class="commonNavsWrap">
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



        <div class="filterWrap">
          <div>
            <div class="assetSelectItemWrap">
              <span>资产类型</span>
              <el-select
              	v-model="params.asset_id"
              	placeholder="请选择"
              	@change="selectFn">
              	<el-option
              		v-for="item in allAssetsLists"
              		:key="item.value"
              		:label="item.asset_name"
              		:value="item.asset_id ? item.asset_id: item.asset_name ">
              	</el-option>
              </el-select>
            </div>

            <div class="assetSelectItemWrap">
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
            </div>

          </div>


          <span
            v-for="(item,index) in operParams"
            :key="index"
            @click="$router.push(item.route)"
            v-if="operIndex===index"
           >{{item.text}}</span>

        </div>


        <div class="commonListsWrap" v-if="operIndex==0">
          <div
            class="commonListWrap"
            v-for="(item,index) in transfterLists"
            :key="index">


            <div class="recordInfo">
              <div>
                <span>操作ID：</span>
                <span>{{item.transfer_id}}</span>
              </div>
              <div>
               <span>交易ID：</span>
               <span>{{item.tx_id}}</span>
              </div>

              <div class="last">
                <span class="icon"> {{item.status | recordTextByType}}</span>
                <span>{{item.create_time}}</span>
              </div>
            </div>

            <div class="recordLists">
              <div
                class="recordList"
                v-for="(list,i,key) in item.from.item_info"
                :key="key"
              >
                <div>
                  From:  {{list.Address | interceptStr}}（{{list.account | interceptStr}}）
                </div>
                <div>- {{list.amount}}</div>
                <div>{{item.to.asset_name||'--'}}</div>
              </div>

              <div
                class="recordList"
                v-for="(list,i,key) in item.to.item_info"
                :key="key"
              >
                <div>
                  To:  {{list.Address | interceptStr}}（{{list.account | interceptStr}}）
                </div>
                <div>+ {{list.amount}}</div>
                <div>{{item.to.asset_name||'--'}}</div>
              </div>



            </div>

          </div>
        </div>


        <div class="commonListsWrap" v-if="operIndex==1">
          <div
            class="commonListWrap"
            v-for="(item,index) in signLists"
            :key="index">


            <div class="recordInfo">
              <div>
                <span>操作ID：</span>
                <span>{{item.transfer_id}}</span>
              </div>
              <div>
               <span>交易ID：</span>
               <span>{{item.tx_id}}</span>
              </div>

              <div class="last">
                <span class="icon"> {{item.status | recordTextByType}}</span>
                <span>{{item.create_time}}</span>
              </div>
            </div>

            <div class="recordLists">
              <div
                class="recordList"

              >
                <div>
                  From:  {{item.from_user}}
                </div>
                <div></div>
                <div>{{item.asset_name}}</div>
              </div>
            </div>

          </div>
        </div>


        <div class="commonListsWrap" v-if="operIndex==2">
          <div
            class="commonListWrap"
            v-for="(item,index) in issueLists"
            :key="index">


            <div class="recordInfo">
              <div>
                <span>操作ID：</span>
                <span>{{item.transfer_id}}</span>
              </div>
              <div>
               <span>交易ID：</span>
               <span>{{item.tx_id}}</span>
              </div>

              <div class="last">
                <span class="icon"> {{item.status | recordTextByType}}</span>
                <span>{{item.create_time}}</span>
              </div>
            </div>

            <div class="recordLists">
              <div
                class="recordList"
                v-for="(list,i,key) in item.to.item_info"
                :key="key"
              >
                <div>
                  To:  {{list.Address | interceptStr}}（{{list.account | interceptStr}}）
                </div>
                <div>+ {{list.amount}}</div>
                <div>{{item.to.asset_name||'--'}}</div>
              </div>
            </div>

          </div>
        </div>



        <div class="commonListsWrap" v-if="operIndex==3">
          <div
            class="commonListWrap"
            v-for="(item,index) in retireLists"
            :key="index">


            <div class="recordInfo">
              <div>
                <span>操作ID：</span>
                <span>{{item.transfer_id}}</span>
              </div>
              <div>
               <span>交易ID：</span>
               <span>{{item.tx_id}}</span>
              </div>

              <div class="last">
                <span class="icon"> {{item.status | recordTextByType}}</span>
                <span>{{item.create_time}}</span>
              </div>
            </div>

            <div class="recordLists">
              <div
                class="recordList"
                v-for="(list,i,key) in item.from.item_info"
                :key="key"
              >
                <div>
                  From: {{list.Address | interceptStr}}（{{list.account | interceptStr}}
                </div>
                <div>- {{list.amount}}</div>
                <div>{{item.from.asset_name||'--'}}</div>
              </div>
            </div>

          </div>
        </div>





          <div >
            <div class="consoleListsWrap" v-if="false" >
              <!-- operIndex==0 -->
              <div
                class="consoleListWrap"

                v-for="(item,index) in transfterLists"
                :key="index">
                <div class="inner">


                  <el-row
                    class="consoleListIDWrap"
                    :gutter="20">
                    <el-col :md="18">

                      <div class="listWrap">
                        <span>操作ID</span>
                        <span>{{item.transfer_id}}</span>
                      </div>

                      <div class="listWrap">
                        <span>交易ID</span>
                        <span>{{item.tx_id}}</span>
                      </div>



                      <span
                        :class="{error:item.status==2,going:item.status==3,'statusSpan':true } ">
                        {{item.status | recordTextByType}}
                        <i
                          class="el-icon-warning"
                          v-if="item.status==2"></i>
                        <i
                          class="el-icon-refresh"
                          v-if="item.status==3"></i>
                      </span>
                    </el-col>
                    <el-col :md="6">
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

            <div class="consoleListsWrap" v-if="false" style="overflow:auto">
              <div
                class="consoleListWrap"
                v-for="(item,index) in signLists"
                :key="index">
                <div class="inner">
                  <el-row
                    class="consoleListIDWrap"
                    :gutter="20">
                    <el-col :md="12">
                      <div class="listWrap">
                        <span>操作ID</span>
                        <span>{{item.transfer_id}}</span>
                      </div>

                      <div class="listWrap">
                        <span>交易ID</span>
                        <span>{{item.tx_id}}</span>
                      </div>

                      <span
                        :class="{error:item.status==2,going:item.status==3, 'statusSpan':true}">
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

            <div class="consoleListsWrap" v-if="false" >
              <div
                class="consoleListWrap"
                v-for="(item,index) in issueLists"
                :key="index">
                <div class="inner">

                  <el-row
                    class="consoleListIDWrap"
                    :gutter="20">
                    <el-col :md="12">
                     <div class="listWrap">
                       <span>操作ID</span>
                       <span>{{item.transfer_id}}</span>
                     </div>

                     <div class="listWrap">
                       <span>交易ID</span>
                       <span>{{item.tx_id}}</span>
                     </div>

                      <span
                        :class="{error:item.status==2,going:item.status==3, 'statusSpan':true}">
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

            <div class="consoleListsWrap" v-if="false" style="overflow:auto">

              <div
                class="consoleListWrap"
                v-for="(item,index) in retireLists"
                :key="index">
                <div class="inner">
                  <el-row
                    class="consoleListIDWrap"
                    :gutter="20">
                    <el-col :md="12">
                      <div class="listWrap">
                        <span>操作ID</span>
                        <span>{{item.transfer_id}}</span>
                      </div>

                      <div class="listWrap">
                        <span>交易ID</span>
                        <span>{{item.tx_id}}</span>
                      </div>

                      <span
                        :class="{error:item.status==2,going:item.status==3, 'statusSpan':true}">
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
            <p v-else-if="noMoreData" class="noresult">没有更多了</p>

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
	import { Row, Col, Select, Option, DatePicker, Pagination  } from 'element-ui';


	Vue.use(Row);
	Vue.use(Col);
	Vue.use(Option);
	Vue.use(Select);
  Vue.use(DatePicker);
  Vue.use(Pagination);

	export default {
		created(){

			var accountInfo = this.getLocalAccountInfo()
			var account_id = accountInfo.account_id;
			var account_type = accountInfo.account_type;

			this.params.account_id = account_id;
			this.params.account_type = account_type;




      var y = new Date().getFullYear();
      var m = new Date().getMonth() + 1
      var d = new Date().getDate();
      m = m < 10 ? '0' + m : m;
      d = d < 10 ? '0'+ d : d;
      var end_time = y+'-'+m+'-'+d;
      var start_time = m==='01' ? ((y-1)+'-12-'+d) : (y+'-'+ '0'+(m-1)+'-'+d);


      this.time = [start_time, end_time]

      this.toggleNav(0)

      var _this = this;
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      // windowHeight 可视区的高度
      var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
      // scrollHeight 滚动条的总高度
      var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      // 滚动条到底部的条件
      this.getMoreLists()

      window.onscroll = function(){
          // scrollTop 滚动条滚动时，距离顶部的距离
          var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
          // windowHeight 可视区的高度
          var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
          // scrollHeight 滚动条的总高度
          var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
          // 滚动条到底部的条件
          if(scrollTop + windowHeight == scrollHeight){
            // 加载数据
            _this.getMoreLists()
          }
        }

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
          total: 1,
          page_size:5,
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

      disabled() {
        return this.loading;
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
      loadLists(){

      },
			toggleNav(index){
				if(index>-1){
					this.operIndex = index||0;
				}
        this.params.asset_name = '全部';
        this.params.asset_id = ''

        this.setLoadingParams()

        this.getLists();
        this.getAssetTypes()
			},
      getMoreLists(){
        this.params.page ++;
        this.getLists();
      },
      selectFn(){
        this.setLoadingParams();
        this.getLists();
      },
      setLoadingParams(){
        this.noMoreData = false;
        this.params.page = 1;
      },
      getLists(){
        this.loading = true;

        this.params.start_time = this.time[0]+' 23:59'
        this.params.end_time = this.time[1]+' 23:59'

        var fnObj = {
          0: transferRecord,
          1: signRecord,
          2: issueRecord,
          3: retireRecord
        }

        var listObj = {
          0: 'transfterLists',
          1: 'signLists',
          2: 'issueLists',
          3: 'retireLists'
        }

        const params = {
          ...this.getParams(),
          ...this.operIndex ===2 ? { order_by:this.signOrder_by } : {},
        }

        fnObj[this.operIndex].bind(this)(params)
          .then(({data})=>{
            const listkey = this.operIndex ===1 ? 'signrecord_list': 'record_list';
            const { [listkey]: lists, total_item: total } = data.data

            if(data.status=='success'){

              if(lists){
                this[ listObj[this.operIndex] ].splice(this.params.page_size*(this.params.page-1),this.params.page_size,...lists);
              }else{
                if(this.params.page === 1){
                  this[listObj[this.operIndex]].splice(0,999);
                }
                this.noMoreData = true;
              }

              this.params.total = total
              this.loading = false;

            }


          })
          .catch(()=>{

          })
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
              this.allAssetsLists.splice(0,999, {asset_id: "#",asset_name: "全部"},...lists)

            }else{
              this.allAssetsLists.splice(0,999,{asset_id: "#",asset_name: "全部"});
            }
            this.params.asset_id = '#'
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
              this.allAssetsLists.splice(0,999, {asset_id: "#",asset_name: "全部"},...lists)

            }else{
              this.allAssetsLists.splice(0,999,{asset_id: "#",asset_name: "全部"});
            }
            this.params.asset_id = '#'

        	})
        	.catch(()=>{

        	})
      },
      getParams(){
        const list = this.allAssetsLists.filter(item => item.asset_id === this.params.asset_id )
        var asset  = {}

        if(this.params.asset_id === '#'){
          asset.asset_name = '';
          asset.asset_id = ''
        }else{
          if(list.length){
            asset.asset_name = list[0].asset_name==='全部'?'':list[0].asset_name;
            asset.asset_id =  list[0].asset_id;
          }else{
            asset.asset_name = '';
            asset.asset_id = ''
          }

        }

        const params  = { ...this.params, ...asset };

        return params

      },





		},
	}
</script>

<style lang="scss">
  .assetManagementWrap{
    .commonListsWrap{
      .commonListWrap{
        color:#4a5662;

      }
    }

    .consoleListsWrap .consoleListWrap .inner > div.consoleListIDWrap .listWrap{
      width:230px;
      display:flex;
      align-items: center;
      overflow:hidden;
      span:nth-of-type(2){
        margin-left: 4px;
        margin-right: 30px;
        border: 1px solid #ddd;
        width: 150px;
        line-height: 18px;
        border-radius: 4px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 0 10px;
      }
    }
  }
	.consoleIndexWrap{
    .consoleListsWrap{
      padding:2px 10px;
    }
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
