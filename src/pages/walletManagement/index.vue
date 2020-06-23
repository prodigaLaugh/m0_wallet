<template>
	<div class="outerWrap accountIndexWrap">


    <div class="commonTitle_one">钱包管理</div>


    <div class="selectAccountWrap">
      <div class="commonTitle_two">
        我的钱包
        <div>
          <!-- <span @click="$router.push('/main/importBackup')">导入钱包</span> -->
          <span @click="createFlag=true">新建钱包</span>
        </div>
      </div>


      <div class="commonListsWrap">
        <div
          v-for="(item,index) in lists"
          :key="index"
          class="commonListWrap"
        >
          <div class="tit">{{item.account_alias}}
           <div @click="zairu(item)" v-if="item.status==0" >载入</div>
           <div v-else class="has">载入</div>
          </div>


          <div class="tags">
            <span>{{(item.sign_key_num-0)>1 ?'多签' :'单签'}}</span>
            <div>
              <div
                @click="$router.push({path:'/main/walletDetail',query:{id:item.account_alias }})">详情</div>
              <!-- <div >备份</div> -->
              <!-- @click="$router.push('/main/backupType')" -->
              <div @click="openDeleteModal(item, index)">删除</div>
              <!-- del(item,index) -->
            </div>
          </div>

          <div class="relation">
            <span>关联密钥:</span>
            <div>
              <div
                v-for="(list,i) in item.xpubs"
                :key="i">{{list}}</div>

            </div>
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
      title="提示"
      :visible.sync="deleteWalletModalFlag"
      width="30%">
      <span>是否确认删除钱包?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteWalletModalFlag = false">取 消</el-button>
        <el-button type="primary" @click="del">确 定</el-button>
      </span>
    </el-dialog>


		<!-- 点击秘钥管理输入密码弹窗 -->
		<el-dialog
		  title="请输入账户密码"
		  :center="true"
		  :visible.sync="openDialogFlag"
		  width="40%">
		  <div class="dialogContentWrap">
			  <div class="tips">⚠️请输入账户对应的密码，已确认身份</div>
			  <el-input v-model="value" placeholder="输入密码"></el-input>
		  </div>
		  <span slot="footer" class="dialog-footer">
			<el-button @click="openDialogFlag = false">取 消</el-button>
			<el-button type="primary" @click="openDialogFlag = false">确 定</el-button>
		  </span>
		</el-dialog>

		<!-- 点击秘钥管理输入密码弹窗 -->
		<el-dialog
		  title="请输选择创建钱包的类型"
		  :center="true"
		  :visible.sync="createFlag"
		  width="40%">
		  <div class="selectWalletWrap">
			  <el-row>
				  <el-col :md="10">
					  <div
						@click="changeWalletType(0)"
						:class="['contentWrap',{active:walletIndex===0}]">
						  <div class="title">单签钱包</div>
						  <div class="content">单签钱包内的资产由您本人所有和支配，创建单签钱包需要关联一把密钥，一把密钥只能关联一个单签钱包。</div>
					  </div>
				  </el-col>
				  <el-col :md="2">&nbsp;</el-col>
				  <el-col :md="10">
					  <div
						@click="changeWalletType(1)"
						:class="['contentWrap',{active:walletIndex===1}]">
						  <div class="title">多签钱包</div>
						  <div class="content">多签钱包内的资产由多方共同所有和支配，创建多签钱包需要关联一把密钥，一把密钥可关联多个多签钱包。</div>
					  </div>
				  </el-col>
			  </el-row>
		  </div>
		  <span slot="footer" class="dialog-footer">
			<el-button @click="createFlag = false">取 消</el-button>
			<el-button type="primary" @click="createWallet">确 定</el-button>
		  </span>
		</el-dialog>

	</div>
</template>

<script>

	import Vue from 'vue';
	import { Row, Col, Input, Button, Dialog, Pagination } from 'element-ui';

	import { getAccountLists, loadWallet, deleteWallet } from '@/util/server.js'

	Vue.use(Row);
	Vue.use(Col);
	Vue.use(Button);
	Vue.use(Input);
	Vue.use(Dialog);
  Vue.use(Pagination);

	export default {
		created(){
			this.getLists()

		},
		data(){
			return {
				submitFlag:true,
				createFlag:false,
				walletIndex:0,

				openDialogFlag:false,
				value:'',
        params:{
          page: 1,
          page_size: 10,
          total: 0,
        },

				lists:[],

        deleteWalletModalFlag:false,
        deleteParams:{}
			}
		},
		methods:{
      openDeleteModal(item, index){
        this.deleteWalletModalFlag = true;
        this.deleteParams = {
          account_alias:item.account_alias,
          index
        }
      },
			del(){
				var account_alias =  this.deleteParams.account_alias;
				let para = {
					account_alias:account_alias
				}
				if(!this.submitFlag){
					return false;
				}
				this.submitFlag = false;
				deleteWallet.bind(this)(para)
					.then(({data})=>{
						if(data.status =='success'){
							this.$message({
								type:'success',
								message:'删除成功'
							})
							this.lists.splice(this.deleteParams.index,1);
							this.getLists();
              this.deleteWalletModalFlag = false;
						}else{
							this.$message({
								type:"error",
								message:data.error||'载入失败'
							})
						}
						setTimeout(()=>{
							this.submitFlag = true;
						},200)
						console.log(data)
					})
			},
			zairu(item){
				var account_alias = item.account_alias;
				var pre_account_alias = this.getLocalAccountInfo().account_alias||'';
				let para = {
					account_alias: account_alias,
					pre_account_alias: pre_account_alias,
				}
				if(!this.submitFlag){
					return false;
				}
				this.submitFlag = false;
				loadWallet.bind(this)(para)
					.then(({data})=>{
						console.log(data,111)
						if(data.status =='success'){
							this.$message({
								type:'success',
								message:'载入成功'
							})

              localStorage.accountInfo  = JSON.stringify(item);

              this.$store.commit('changeAccountAlias', item.account_alias)

							this.getLists();
							setTimeout(()=>{
								this.$router.push('/main/assetWalletIndex')
								this.submitFlag = true;
							},1000)

						}else{
							this.$message({
								type:"error",
								message:data.error||'载入失败'
							})
						}


					})
			},
			changeWalletType(num){
				this.walletIndex = num;
			},
			createWallet(){
				var url = this.walletIndex ===0
						?'/main/createWalletS'
						:'/main/createWalletM';
				this.$router.push(url)
			},
      pageChange(currentPage){
        this.params.page = currentPage;
        this.getLists()
      },
			getLists(){
// 				let user_name = localStorage.USERTOKEN
// 				let params = {user_name:'user1'||user_name}
				getAccountLists.bind(this)(this.params)
					.then(({data})=>{


						if(data.status=='success'){
							this.$store.commit('changeAccountAlias','');
							if(data.data){

								var lists = data.data.list_accounts;
                const total_item = data.data.total_item;
                this.params.total = total_item

								lists.map((item, index)=>{
									if(item.status==1){
										localStorage.accountInfo  = JSON.stringify(item);
										this.$store.commit('changeAccountAlias',item.account_alias);
									}

								})
								this.lists.splice(0,999,...lists);
							}


						}else{
							this.lists.splice(0,999);
               this.params.total = 0;
						}

					})
			}
		},
	}
</script>

<style lang="scss">
	.accountIndexWrap{
    .commonListsWrap{
      .commonListWrap{
        .tit{
          display:flex;
          justify-content: space-between;
          align-items: center;
          >div{
            font-size:15px;
             padding-left:30px;
             background:url(../../assets/walletManagement/icon.png) no-repeat left center;
             background-size:25px;
             cursor:pointer;
             &.has{
               background-image:url(../../assets/walletManagement/icon_checked.png);
             }
          }
        }

        .tags{
          display:flex;
          align-items: center;
          justify-content: space-between;
          padding:20px 0 16px;
          border-bottom:1px solid #d5e5f2;
          >span{
            width:58px;
            line-height:28px;
            border-radius:3px;
            color:$color-333;
            background:#d6e0e9;
            text-align:center;
          }
          >div{
            display:flex;
            >div{
              width:85px;
              line-height:32px;
              background:#3d5265;
              color:#fff;
              text-align:center;
              cursor:pointer;
              margin-left:13px;
              border-radius:3px;
              &.disabled{
                cursor:not-allowed
              }
            }
          }
        }

        .relation{
          position:relative;
          padding:15px 0 0;
          >span{
            width:68px;
            position:absolute;
            left:0;
            top:15px;
            font-size:14px;
            color:#60697a;
          }
          >div{
            margin-left:68px;
            >div{
              margin-bottom:13px;
              font-size:13px;
              color:#43515c;
              line-height:14px;
              word-break: break-all;
            }
          }
        }

      }
    }

    .el-dialog__wrapper{
      .contentWrap{
        border:1px solid #DCDFE6;
        cursor:pointer;
        padding:15px;

        &.active{
          border:2px solid #324558;
           background:#f1f1f1;
        }

        .title{
          font-size:16px;
          color:$color-333;
          padding-bottom:20px;
          text-align:center;
        }
        .content{
          line-height:20px;
          font-size:12px;
        }


      }
    }

  }

</style>
