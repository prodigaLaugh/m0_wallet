<template>
	<div class="outerWrap transactionRecordWrap">
		<el-row>
			<el-col >

				<div class="commonTitle_one">
					资产钱包
					<span>
						<i class="el-icon-arrow-right"></i>
						<span>交易记录</span>
					</span>
				</div>


				<div class="consoleRecordsWrap">
					<div class="commonTitle_two">交易记录</div>

					<el-row class="transactionRecordContentWrap">
						<el-col :lg="24">
							<span>资产类型</span>
							<span>{{asset_name}}</span>
						</el-col>
						<el-col :lg="24" v-if="address_id">
							<span>所在地址</span>
							<span>{{address_id}}</span>
						</el-col>

					</el-row>

					<div
            style="overflow-y:auto;height:500px;padding:2px 10px"
          >
            <div
              class="consoleListsWrap"
              v-infinite-scroll="getMoreLists"
              infinite-scroll-disabled="disabled"
            >

              <div
                class="consoleListWrap"
                v-for="(item,index) in lists"
                :key="index">

                <div v-if="item.tx_type==1">
                  <transfer :item="item" :asset_name="asset_name"/>
                </div>
                <div v-if="item.tx_type==2">
                  <issue :item="item" :asset_name="asset_name"/>
                </div>
                <div v-if="item.tx_type==3">
                  <retire :item="item" :asset_name="asset_name"/>
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


              <p v-if="loading" class="noresult">加载中...</p>
              <div class="noresult" v-else-if="!lists.length">暂无数据</div>
              <p v-else="noMore" class="noresult">没有更多了</p>
            </div>

					</div>


				</div>

			</el-col>
		</el-row>

	</div>
</template>

<script>

	import { getAssetRecords, getAssetRecordsByAddress } from '@/util/server.js'
	import Vue from 'vue';
	import { Row, Col, InfiniteScroll } from 'element-ui';
	import Transfer from '@/components/transactionRecords/transfer.vue'
	import Issue from '@/components/transactionRecords/issue.vue'
	import Retire from '@/components/transactionRecords/retire.vue'

	Vue.use(Row);
	Vue.use(Col);
  Vue.use(InfiniteScroll);

	export default {
		components:{
			Transfer,
			Issue,
			Retire
		},
		created(){
			var accountInfo = this.getLocalAccountInfo()
			var account_id = accountInfo.account_id;
			var query =  this.$route.query;
			this.asset_name = query.asset_name;
			this.address_id = query.address_id;
			this.type = query.type;

      this.params = { ...this.params, ...accountInfo, ...query }

		},

		data(){
			return {
				asset_name:'',
				address_id:"",
				lists:[],
        type:'',

        loading: false,

        params:{
          page: 1,
          page_size: 10,
          total: 1,
        }
			}
		},
    computed:{
      noMore(){
        return this.lists.length >= this.params.total;
      },

      disabled() {
        return this.loading || this.noMore;
      },
    },
		methods:{
      pageChange(currentPage){
        this.params.page = currentPage;
        this.getLists()
      },
      getMoreLists(){

        this.loading = true
        this.getLists();
        this.params.page ++;

      },
      getLists(){
        var fn = getAssetRecords;
        if(this.type==='address'){
          fn = getAssetRecordsByAddress
        }
        fn.bind(this)(this.params)
        	.then(({data})=>{

            const { tx_list: lists, total_item: total } = data.data

            if(data.status=='success'){
              if(lists){
                if(this.params.page === 1){
                  this.lists.splice(0,999,...lists);
                }else{
                  this.lists.push(...lists);
                }
              }
              this.params.total = total
            }
            
            this.loading = false;


        	})

      },

		},
	}
</script>

<style lang="scss">
	.transactionRecordWrap{

		.consoleRecordsWrap{
			padding-right:30px;
		}

		.transactionRecordContentWrap{
			padding-bottom:20px;
			>div{
				line-height:36px;
				font-size:13px;
				>span:nth-of-type(2){
					margin-left:40px;
				}
			}
		}
		.inner{
			margin-bottom:30px;
			border:0!important;
		}
	}

</style>
