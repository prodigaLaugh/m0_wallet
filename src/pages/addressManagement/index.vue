<template>
	<div class="outerWrap addressManagementIndexWrap">

    <div class="commonTitle_one">地址管理</div>

    <div class="commonTitle_two">
      账户地址
      <!-- <span @click="dialogVisible=true">创建地址</span> -->
      <span @click="create">创建地址</span>

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
            <span @click="$router.push('/main/transfer')">发起转账</span>
            <span @click="$router.push('/main/issue')">发行资产</span>
          </div>
        </div>


      </div>
    </div>


    <!-- <div class="addressManagementIndexListsWrap">

      <el-row
        v-for="(item, index) in lists"
        :key="index"
        class="addressManagementIndexListWrap">
        <el-col :lg="12" class="addressManagementIndexListLeft">
          <div>{{item.address_id}}</div>
          <div>
            <span>包含资产：</span>
            <div>
              <span
                v-for="(list,i) in item.asset_names"
                :key="i">{{list}}</span>
            </div>
          </div>
        </el-col>
        <el-col :lg="12" class="addressManagementIndexListRight">
          <div>
            <span
              class="tag-read blue"
              :data-clipboard-text="item.address_id"
              @click="copy">拷贝地址</span>
            <span @click="$router.push('/main/transfer')">发起转账</span>
            <span @click="$router.push('/main/issue')">发行资产</span>
          </div>
        </el-col>
      </el-row>

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

 -->


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
	import { Row, Col, Button } from 'element-ui';

	import Clipboard from 'clipboard'

	Vue.use(Row);
	Vue.use(Col);
	Vue.use(Button);



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
        }
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

      .assets{
        display:flex;
        justify-content: space-between;
        align-items: flex-start;
        >div:nth-of-type(1){
          flex:1;
          display:flex;
          >span{
            width:100px;
            line-height:28px;
          }
          >div{
            display:flex;
            flex:1;
            flex-wrap: wrap;
            >span{
                  float: left;
                  padding:0 30px;
                  height: 28px;
                  line-height: 28px;
                  borer-radius: 3px;
                  background: #d6e0e9;
                  color: #27334b;
                  margin-right: 13px;
                  margin-bottom: 15px;
                  border-radius: 3px;
                  text-align: center;
                  font-size: 12px;
            }
          }
        }
        >div:nth-of-type(2){
          width:200px;
          display:flex;
          >span{
            font-size: 12px;
                cursor: pointer;
                background: #3d5265;
                color: #fff;
                line-height: 32px;
                margin-left: 10px;
                width: 120px;
                text-align: center;
                border-radius: 5px;
          }
        }
      }

    }

	}

</style>
