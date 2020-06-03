<template>
	<div class="outerWrap assetWalletIndexWrap">


    <div class="commonTitle_one">资产钱包</div>
    <div class="addAccountWrap">

      <div class="commonNavsWrap">
        <span :class=" navIndex===0 ? 'active' : '' " @click="toggleNav(0)">我的资产</span>
        <span :class=" navIndex===1 ? 'active' : '' " @click="toggleNav(1)">历史资产</span>
      </div>

      <div class="filterWrap">
        <div>
          <div class="assetSelectItemWrap" v-if="navIndex===0">
            <span>排序方式</span>
            <el-select
              v-model="params.order_by"
              placeholder="请选择"
              @change="selectChange">
              <el-option
                v-for="item in orderOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>

          <div class="assetSelectItemWrap">
            <span>资产类型</span>
            <el-select
              v-model="params.asset_id"
              placeholder="请选择"
              @change="selectChange">
              <el-option
                v-for="item in allAssetsLists"
                :key="item.value"
                :label="item.asset_name"
                :value="item.asset_id">
              </el-option>
            </el-select>
          </div>

        </div>

        <span @click="$router.push('/main/receiveTransfer')">接受转账</span>

      </div>



        <!-- <el-col :lg="8">
          <div class="assetSelectItemWrap">
            <span>所在地址</span>
            <el-select v-model="value" placeholder="请选择">
              <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col> -->




      <div>

        <div class="commonListsWrap" >
          <div
            class="commonListWrap"
            v-for="(item,index) in lists"
            :key="index">

            <div class="tit">{{item.asset_name}}</div>
            <div class="infoWrap">
              <div>
                <span>资产ID:</span>
                <span>{{item.asset_id}}</span>
              </div>
              <div class="money">
                <span>当前总余额:</span>
                <span>{{item.amount}}</span>
              </div>
              <div>
                <a
                  href="javascript:void(0)"
                  @click="$router.push({path:'/main/transactionRecord',query:getParams(item,'','tx')})"
                  class="transactionRecordIcon">交易记录</a>
              </div>
            </div>

            <div class="lists" >
              <div class="list title" v-if="item.address_balance && item.address_balance.length">
                <span>所在地址</span>
                <span>地址余额</span>
                <span class="last">操作</span>
              </div>
              <div class="list title" v-else></div>

              <div
                class="list"
                v-for="(list,i) in item.address_balance"
                :key="i"
              >
                <span> {{list.address_id}}</span>
                <span> {{list.balance}}</span>
                <div class="last">
                  <span @click="$router.push({path:'/main/transactionRecord',query:getParams(item,list.address_id,'address')})">交易记录</span>
                  <span @click="getTransferParams(item,list.address_id)">转出资产</span>
                </div>
              </div>
            </div>


          </div>


         <!-- <div class="paginationWrap" v-if="lists.length">
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

        <p v-if="loading" class="noresult">加载中...</p>
        <div class="noresult" v-else-if="!lists.length">暂无数据</div>
        <p v-else="noMore" class="noresult">没有更多了</p>
      </div>

    </div>




	</div>
</template>

<script>

	import { getAssetWalletLists, getAssetLists, getAssetHistoryWalletLists } from '@/util/server.js'
	import Vue from 'vue';
	import { Row, Col, Select, Option, Pagination } from 'element-ui';

	Vue.use(Row);
	Vue.use(Col);
	Vue.use(Option);
	Vue.use(Select);
  Vue.use(Pagination);

	export default {
		created(){
			var accountInfo = this.getLocalAccountInfo()
			var account_id = accountInfo.account_id;
			var account_type = accountInfo.account_type;

      this.navIndex = this.$route.query.navIndex?(this.$route.query.navIndex-0) : 0;

			this.params.account_id = account_id;
      this.getLists()
      this.getAlllists()
		},
		data(){
			return {
				allAssetsLists:[],
        navIndex:0,

				params:{
          page: 1,
          page_size: 10,
          total: 1,

					account_id:'',
					asset_name:'',
					asset_id:'',
					order_by:'time_desc',

// 					user_name:"123",
// 					"account_id":"0R031M6800A02",
// 					"asset_name":"zcj1",
// 					"asset_id":"ce8c9a975056cb6e5f951c8223a3cdf1f15e0918a0943005701660c1a63975b9",
// 					"order_by":"amount_asc"

				},

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
				lists:[],

        loading: false,
        noMoreData:false
			}
		},
    mounted(){

      var _this = this;
      window.onscroll = function(){
          // scrollTop 滚动条滚动时，距离顶部的距离
          var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
          // windowHeight 可视区的高度
          var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
          // scrollHeight 滚动条的总高度
          var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
          // 滚动条到底部的条件
          
           let distance = 50;

          if(scrollTop + windowHeight == (scrollHeight-distance) ){
            // 加载数据
            if(!_this.noMoreData){
               _this.getMoreLists()
            }


          }
        }
    },
		methods:{
      selectChange(){
         this.params.page = 1;
         this.noMoreData = false;
         this.getLists()
      },
      toggleNav(index){
        this.navIndex = index;
        this.params.page = 1;
        this.noMoreData = false;
        this.$router.replace({path:'/main/assetWalletIndex', query:{navIndex:index } })

        this.getLists()
        this.getAlllists()
      },

      getMoreLists(){

        this.loading = true
        this.getLists();


      },
			getTransferParams(item,id){
				var obj = {
					address_id:id,
					amount:item.amount,
					asset_id:item.asset_id,
					asset_name:item.asset_name
				}
				this.$router.push({path:'/main/transfer',query: obj })
			},
			getParams(item,id,type){
				return {
					asset_name:item.asset_name,
					asset_id:item.asset_id,
					type:type,
					address_id:id
				}
			},
      getAlllists(){
        const fn = this.navIndex === 0 ? getAssetWalletLists : getAssetHistoryWalletLists;
        const parmas = { ...this.params, page: 1, page_size: 9999 }
        fn.bind(this)(parmas)
        	.then(({data})=>{
            const { list_asset: lists, total_item: total } = data.data

        		if(data.status=='success'){
              if(lists){
                this.allAssetsLists.splice(0,999,{asset_id: "",asset_name: "全部"}, ...lists);

              }else{
                this.allAssetsLists.splice(0,999, {asset_id: "",asset_name: "全部"});

              }

        		}

        	})
      },
			getLists(){

        const fn = this.navIndex === 0 ? getAssetWalletLists : getAssetHistoryWalletLists;
        if(this.noMoreData){
          return
        }

        this.noMoreData = true;

				fn.bind(this)(this.params)
					.then(({data})=>{

            const { list_asset: lists, total_item: total } = data.data


            if(data.status=='success'){
              if(lists){
                if(this.params.page === 1){
                  this.lists.splice(0,999,...lists);
                }else{
                  this.lists.push(...lists);
                }
                this.noMoreData = false;
              }else{
                if(this.params.page === 1){
                  this.lists.splice(0,999);
                }
                this.noMoreData = true;
              }
              this.params.page ++;

              this.params.total = total
              this.loading = false;

            }

					})
			}
		},
	}
</script>

<style lang="scss">
	.assetWalletIndexWrap{
    .commonTitle_two{
      border-bottom:1px solid #ddd;
      margin-bottom:30px;
      >div>div{
        span{
          color:#666;
          cursor:pointer;
          &:nth-of-type(2){
            margin-left:20px;
          }
          &.active{
            color:#5c6ac4;
          }
        }
      }
    }



    .commonListsWrap{

      .commonListWrap{

        .infoWrap{
          display:flex;
          align-items: center;
          justify-content: space-between;
          >div{
            display:flex;
            align-items: center;
            font-size:14px;
            color:$color-333;
            &:nth-of-type(1){
              width:300px;
            }
            &:first-of-type{
              width:500px;
              overflow:hidden;
              display:flex;
              >span:nth-of-type(2){
                width:300px;
                overflow:hidden;
                white-space: nowrap;
                text-overflow: ellipsis;

              }
            }
            &:nth-of-type(2){
              padding-left:15px;
              flex:1;
            }

            >span:nth-of-type(1){
              padding-right:14px;
            }
            >a{
              background:#3D5265;
              color:#fff;
              line-height:34px;
              width:120px;
              text-align:center;
              border-radius:3px;
              cursor:pointer;
              font-size:12px;
            }

            &.money{
              >span:nth-of-type(1){
                color:$color-2;
              }
              >span:nth-of-type(2){
                font-weight:bold;

              }
            }

          }
        }

        .lists{
          .list{
            display:flex;
            justify-content: space-between;
            align-items: center;
            font-size:12px;
            border-bottom:1px solid #DAE6EF;
            &.title,
            &:last-of-type{
              border-bottom:0 none;
            }
            &.title{
              background:#F6F7FB;
              margin-top:18px;
              font-weight:bold;
              >span{
                line-height:40px;

              }
            }

            >span{
              line-height:60px;

              &:first-of-type{
                padding-left:15px;
                width:500px;
              }
              &:nth-of-type(2){
                padding-left:15px;
                flex:1;
              }
            }
            .last{
              width:200px;
              flex:inherit;
              >span{
                color:$green;
                cursor:pointer;
                &:first-of-type{
                  margin-right:15px;
                }
              }
            }
            >div{
              display:flex;
            }
          }

        }


      }
    }

	}

</style>
