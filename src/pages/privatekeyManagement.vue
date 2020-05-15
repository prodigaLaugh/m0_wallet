<template>
	<div class="outerWrap privatekeyWrap">


    <div class="commonTitle_one">秘钥管理</div>
    <div class="privatekeyInnerWrap">
      <div class="commonTitle_two">
        我的秘钥
        <span @click="dialogFormVisible=true">新建秘钥</span>
      </div>



      <div class="commonListsWrap">
        <div
          v-for="(item,index) in lists"
          class="commonListWrap"
          :key="index"
        >
          <div class="tit">{{item.alias}}</div>

          <div class="infoBtnWrap">
            <div class="des">
               <span>
                 公钥：{{item.xpub | interceptPubStr}}
               </span>
               <!-- <img src="../assets/leftNavBg.png" alt=""> -->
               <span
                 class="tag-read blue"
                 :data-clipboard-text="item.xpub"
                 @click="copy"></span>

            </div>

            <div class="btn">
              <div
                :class="{disable:item.is_single_used==1}"
                v-if="item.is_single_used==1">创建单签钱包</div>
              <div v-else @click="createWallet(item,'/main/createWalletS')">创建单签钱包</div>

              <div @click="createWallet(item,'/main/createWalletM')">创建多签钱包</div>
            </div>
          </div>

          <div class="listsWrap">
            <div class="listWrap">
              <span>关联单签钱包：</span>
              <div>
                <span
                  v-if="list.sign_key_num == 1"
                  v-for="(list,i) in item.associate_account"
                  :key="i">{{list.account_alias}}</span>
              </div>
            </div>

            <div class="listWrap">
              <span>关联多签钱包：</span>
              <div>
                <span
                  v-if="list.sign_key_num != 1"
                  v-for="(list,i) in item.associate_account"
                  :key="i">{{list.account_alias}}</span>
              </div>
            </div>

          </div>


        </div>
        <div v-if="!lists.length" class="noresult">暂无数据</div>

      </div>


      <el-dialog title="新建秘钥" :visible.sync="dialogFormVisible" :center="true">

         <div class="dialogContentWrap">
           <div class="title">请设置密钥别称</div>
           <div class="tips">密钥别称是用来区分密钥的标签，该信息不会在区块链上保存</div>
           <el-input
            v-model="params.alias"
            placeholder="输入别称"></el-input>

           <div class="title">请设置密钥密码</div>
           <div class="tips">⚠️请设置至少10位字母数字混合的密码，密钥是根据你输入的密码生成的管理资产的加密凭证。请妥善保管、备份密码，忘记密码将导致钱包资产的损失。</div>
           <el-input
            v-model="params.password"
            placeholder="输入密码"
            type="password"
            autocomplete="new-password"></el-input>
           <el-input
            v-model="params.againPassword"
            placeholder="请再次输入密码"
            type="password"
            autocomplete="new-password"></el-input>
         </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="create">确 定</el-button>
        </div>
      </el-dialog>

    </div>



	</div>
</template>

<script>
	import Clipboard from 'clipboard'
	import Vue from 'vue';
	import { Row, Col, Dialog, Input, Button } from 'element-ui';

	import { getPrivateKeyLists, createPrivateKey } from '@/util/server.js'

  Vue.use(Row);
	Vue.use(Col);
    Vue.use(Input);
    Vue.use(Button);
	Vue.use(Dialog);

	export default {
		created(){
			this.getlist();
		},
		data(){
			return {
				lists:[],
                dialogFormVisible:false,

				submitFlag:true,
				params:{
					alias: "",
					password: "",
					againPassword:'',
				},


			}
		},

		methods:{
			createWallet(item,url){
				localStorage.privateItem = JSON.stringify(item);
				this.$router.push({path:url,query:{from:'privatekey'}})
			},
			getlist(){
				let user_name = localStorage.USERTOKEN;
				let para  = {user_name: user_name}

				getPrivateKeyLists.bind(this)(para)
					.then(({data})=>{
            console.log(data,111)
						if(data.status =='success'){
							if(data.data){
								this.lists.splice(0,999,...data.data.list_keys);
							}

						}

					})
			},
			copy() {
		        var clipboard = new Clipboard('.tag-read')
		        clipboard.on('success', e => {
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
			create(){
				let para  = Object.assign({},this.params)
        const { alias, password, againPassword } = this.params;

        if(!alias){
          this.$message({
          	type:'error',
          	message:'请输入密钥别称'
          })
          return;
        }else if(
          !/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z\d]{10,}$/.test(password) ||
          !/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z\d]{10,}$/.test(againPassword)
        ){
          this.$message({
          	type:'error',
          	message:'请输入正确格式的密码'
          })
          return;
        }else if(password !== againPassword ){
          this.$message({
          	type:'error',
          	message:'两次密码不一致'
          })
          return;
        }


				if(!this.submitFlag){
					return false;
				}
				this.submitFlag = false;

				createPrivateKey.bind(this)(para)
					.then(({data})=>{
						if(data.status == 'success'){
							this.$message({
								type:'success',
								message:'创建成功'
							})
							this.getlist();
							setTimeout(()=>{
								this.submitFlag = true;
								this.dialogFormVisible = false;
								this.params.alias  = '';
								this.params.password  = '';
								this.params.againPassword  = '';

							},1500)
						}else{
							var msg = data.error
							this.$message({
								type:'error',
								message:msg
							})
							this.submitFlag = true;
						}
						console.log(data,111)
					})

			}
		},
	}
</script>

<style lang="scss" scoped>

	.privatekeyWrap{

      .commonListsWrap{
        .commonListWrap{
          .listsWrap{
            padding:23px 0 28px;
            .listWrap{

              position:relative;
              min-height:28px;

              >span{
                width:118px;
                position:absolute;
                left:0;
                top:0;
                line-height:28px;
                color:$color-333;
              }
              >div{
                margin-left:118px;
                overflow:hidden;
                >span{
                  float:left;
                  width:130px;
                  height:28px;
                  line-height:28px;
                  borer-radius:3px;
                  background:#d6e0e9;
                  color:#27334b;
                  margin-right:13px;
                  margin-bottom:15px;
                  border-radius:3px;
                  text-align:center;
                  font-size:12px;
                }
              }
            }
          }

        }
      }

  }
</style>
