<template>
	<div class="outerWrap addressManagementIndexWrap">

    <div class="commonTitle_one">地址管理</div>

    <div class="commonTitle_two">
      账户地址
      <!-- <span @click="dialogVisible=true">创建地址</span> -->
      <span @click="create" :class="[ !submitFlag ? 'loadingBtn' : '']">创建地址</span>

    </div>

    <div class="commonListsWrap">
      <div
        v-for="(item,index) in lists"
        :key="index"
        class="commonListWrap"
      >
        <div class="infoBtnWrap" style="border-bottom:0 none;">
          <div class="des">
             <span>
              {{item.address_id}}
             </span>
             <!-- <img src="../assets/leftNavBg.png" alt=""> -->
             <span
             	class="tag-read blue"
             	:data-clipboard-text="item.address_id"
             	@click="copy"
             	style="font-size:18px;margin-left:10px;"></span>
          </div>
        </div>

        <div class="assets">
          <div>
            <span>包含资产</span>
            <div>
              <span
                v-for="(list,i) in item.asset_names"
                :key="i">{{list}}</span>

            </div>
          </div>
          <div>
            <span @click="$router.push({path: '/main/transfer', query:{ address_id: item.address_id } })">发起转账</span>
            <span @click="$router.push({path: '/main/issue', query:{  address_id: item.address_id  } })">发行资产</span>
          </div>
        </div>




      </div>

      <div class="paginationWrap" v-if="lists.length">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="params.total"
          :page-size="params.page_size"
          @current-change="pageChange"
         >
        </el-pagination>
      </div>

      <div class="noresult" v-if="!lists.length">暂无数据</div>


    </div>




		<el-dialog
		  title="请输入账户密码"
		  :center="true"
		  :visible.sync="dialogVisible"
		  width="40%">
		  <div class="dialogContentWrap">
			  <div class="tips">⚠️请输入账户对应的密码，已确认身份</div>
			  <el-input v-model="value" placeholder="输入密码"></el-input>
		  </div>
		  <span slot="footer" class="dialog-footer">
			<el-button @click="dialogVisible = false">取 消</el-button>
			<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
		  </span>
		</el-dialog>



	</div>
</template>

<script>
	import { getAddressLists, createAddress } from '@/util/server.js'

	import Vue from 'vue';
	import { Row, Col, Button, Pagination } from 'element-ui';

	import Clipboard from 'clipboard'

	Vue.use(Row);
	Vue.use(Col);
	Vue.use(Button);
  Vue.use(Pagination);



	export default {
		created(){
			this.accountInfo = this.getLocalAccountInfo();
      var account_alias = this.accountInfo.account_alias;
      this.params.account_alias = account_alias;

			this.getLists();
		},
		data(){
			return {
				accountInfo:'',
				lists:[],
				dialogVisible:false,
				value:'',

        params:{
          page: 1,
          page_size: 10,
          total: 0,
          account_alias:''
        },

        submitFlag:true
			}
		},
		methods:{
      pageChange(currentPage){
        this.params.page = currentPage;
        this.getLists()
      },
			getLists(){

				getAddressLists.bind(this)(this.params)
					.then(({data})=>{
						const { list_address: lists, total_item: total } = data.data
						if(lists){
						  this.lists.splice(0,999, ...lists)
						  this.params.total = total
						}else{
						  this.lists.splice(0,999);
             }

					})
			},
			create(){

				var account_alias = this.accountInfo.account_alias;
				var account_id = this.accountInfo.account_id;
				let para = {
					account_alias:account_alias,
					account_id:account_id
				};

        if(!this.submitFlag){
          return;
        }
        this.submitFlag = false

				createAddress.bind(this)(para)
					.then(({data})=>{
						console.log(data,666)
						if(data.status =='success'){
							this.$message({
								type:'success',
								message:'创建成功'
							})
							this.getLists()
						}else{
							var msg  = data.error
							this.$message({
								type:'error',
								message:msg
							})
						}
            this.submitFlag = true
					})
			},
			copy() {
		        var clipboard = new Clipboard('.tag-read')
		        clipboard.on('success', e => {
		          	console.log('复制成功')
					this.$message({
						type:'success',
						message:'复制成功'
					})
		          	// 释放内存
		          	clipboard.destroy()
		        })
		        clipboard.on('error', e => {
		          // 不支持复制
		          console.log('该浏览器不支持自动复制')
		          // 释放内存
		          clipboard.destroy()
		        })
		     },
		},
	}
</script>

<style lang="scss">
	.addressManagementIndexWrap{
    .commonListWrap{
      padding-bottom:20px;

      .des{
         padding: 20px 0 30px 0;
        >span:nth-of-type(1){

          font-size: 16px;
          line-height: 16px;
        }
      }

      }

	}

</style>
