<template>
	<div class="outerWrap createAccountWrap">

        <div class="commonTitle_one">
          <span @click="$router.push('/main/walletIndex')">钱包管理</span>/创建多签钱包
          <!-- <span>
            <i class="el-icon-arrow-right"></i>
            <span>转账</span>
          </span> -->
          <!-- <div>返回</div> -->
        </div>





				<div class="transferInpWrap">

          <div class="inpItemWrap">
            <div>
              <span>钱包名称</span>
              <el-input v-model="params.alias" placeholder=""></el-input>
            </div>
          </div>

          <div class="inpItemWrap">
            <div>
              <span>钱包秘钥</span>
              <el-select
              	v-model="privatekey"
              	@change="selectChange"
              	placeholder="请选择钱包所使用的密钥">
              	<el-option
              		v-for="item in lists"
              		:key="item.xpub"
              		:label="item.alias"
              		:value="item.xpub">
              	</el-option>
              </el-select>
            </div>
          </div>

          <div class="inpTitl">可签名秘钥</div>

          <div class="transferInfoWrap">
            <div
            	class="signaturedAccountListWrap"
            	v-for="(item,index) in xpubs"
            	:key="index">
              <span>
                秘钥：
              </span>
              <div>
                <span>{{item}}</span>
                <div>
                	<span @click="openDialog(item,index)" class="green" style="margin-right:20px;">编辑</span>
                	<span @click="del(index)" class="red">删除</span>
                </div>
              </div>

            </div>

            <div class="inpItemWrap btnWrap" style="margin-top:30px;">
              <div>
                <span style="width:86px;"></span>
                <span class="btn"  @click="addAccount">+ 添加可签名账户</span>
              </div>
            </div>
          </div>




          <div class="inpItemWrap" >
            <div>
              <span>所需签名数</span>
              <el-select v-model="params.quorum" placeholder="请选择">
              	<el-option
              	  v-for="item in signNums"
              	  :key="item"
              	  :label="item"
              	  :value="item">
              	</el-option>
              </el-select>
            </div>

          </div>




          <div class="inpItemWrap"   >
            <div>
              <span></span>
               <span class="submit" @click="create">创建账户</span>
            </div>

          </div>



					<!-- <el-row>
						<el-col >
							<el-row class="transferInpListsWrap">
								<el-col :md="24">
									<div class="transferInpListLeft">钱包名称</div>
									<el-input v-model="params.alias" placeholder=""></el-input>
								</el-col>
								<el-col :md="24">
									<div class="transferInpListLeft">钱包秘钥</div>
									<el-select
										v-model="privatekey"
										@change="selectChange"
										placeholder="请选择钱包所使用的密钥">
										<el-option
											v-for="item in lists"
											:key="item.xpub"
											:label="item.alias"
											:value="item.xpub">
										</el-option>
									</el-select>
								</el-col>

								<el-col :md="24">
									<div class="transferInpListLeft">可签名秘钥</div>
									<div class="signaturedAccountWrap">
										<div class="signaturedAccountListsWrap">
											<div
												class="signaturedAccountListWrap"
												v-for="(item,index) in xpubs"
												:key="index">
												<div>{{item}}</div>
												<div>
													<span @click="openDialog(item,index)">编辑</span>
													<span @click="del(index)">删除</span>
												</div>
											</div>

										</div>
										<div
											class="signaturedAccountAdd"
											@click="addAccount">+添加可签名账户</div>
									</div>
								</el-col>
								<el-col :md="24">
									<div class="transferInpListLeft">所需签名数</div>
									<el-select v-model="params.quorum" placeholder="请选择">
										<el-option
										  v-for="item in signNums"
										  :key="item"
										  :label="item"
										  :value="item">
										</el-option>
									</el-select>
								</el-col>


								<el-col :lg="24">
									<div
										@click="create"
										class="createAccountBtn">创建账户</div>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
				 -->
        </div>




		<el-dialog
		  title="请输入账户密码"
		  :center="true"
		  :visible.sync="addPrivatekeyFlag"
		  width="40%">
		  <div class="1">
			  <div style="padding:20px 0 10px;text-align:left;">⚠️请在下方通过输入公钥添加可签名的钱包，钱包所有者可在密钥管理中查看自己密钥的公钥。</div>
			  	<el-input
					v-model="addPrivateKey"
					placeholder="请输入可签名公钥"
					@change="queryPerson"
          @input="queryPerson"
          ></el-input>
			  	<div style="text-align:left;padding-top:10px;">秘钥创建人：{{createPerson}}</div>

		  </div>
		  <span slot="footer" class="dialog-footer">
			<el-button @click="addPrivatekeyFlag = false">取 消</el-button>
			<el-button type="primary" @click="add">确 定</el-button>
		  </span>
		</el-dialog>

	</div>
</template>

<script>
	import { createMultiWallet, getPrivateKeyLists, queryPersonByxPub } from '@/util/server.js'

	import Vue from 'vue';
	import { Row, Col, Input, Select, Option, Dialog, MessageBox } from 'element-ui';

	Vue.use(Row);
	Vue.use(Col);
	Vue.use(Input);
	Vue.use(Option);
	Vue.use(Select);
	Vue.use(Dialog);



	export default {
		created(){
			getPrivateKeyLists.bind(this)()
				.then(({data})=>{
          const { list_keys: lists } = data.data

          this.lists.splice(0,999, ...lists ? lists : []);

					if(this.$route.query.from){
						var list = JSON.parse(localStorage.privateItem);
						this.privatekey = list.xpub
					}else{
						this.privatekey = data[0].xpub
					}


				})

		},
		data(){
			return {
				createPerson:'',
				addPrivateKey:'',//要添加的公钥
				addPrivatekeyFlag:false,//添加公钥弹窗

				submitFlag:true,
				editIndex:-1,
				params:{
					alias: "",
					quorum: 1,
					xpubs: []
				},
				xpubs:[],//已经添加的公钥
				privatekey:'',//钱包秘钥
				lists:[],//秘钥列表
				signNums: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
			}
		},
		methods:{
			queryPerson(){

				let para = {
					xpub:this.addPrivateKey
				}
				queryPersonByxPub.bind(this)(para)
					.then(({data})=>{
						if(data.status =='success'){
							this.createPerson  = data.data.user_name
						}else{
							this.createPerson ='';
						}
						console.log(data)
					})
			},
			selectChange(){
				// this.xpubs.splice(0,9999);
			},
			openDialog(item,index){
				this.addPrivateKey = item;
				this.editIndex = index;
				this.addPrivatekeyFlag = true;
			},
			del(index){
				this.xpubs.splice(index,1)
			},
			add(){
				var msg = this.editIndex > -1
						?'编辑成功'
						:'添加成功'
				this.$message({
					type:'success',
					message:msg
				})
				this.editIndex > -1
				var index = this.editIndex > -1
						?this.editIndex
						: this.xpubs.length ? this.xpubs.length : 0;
				var num = this.editIndex > -1 ? 1 : 0;

				this.xpubs.splice(index,num,this.addPrivateKey);

				this.addPrivatekeyFlag = false;
				this.addPrivateKey = '';

			},
			create(){
				if(this.xpubs.length < (this.params.quorum-1)){
					this.$message({
						type:'error',
						message:'秘钥总数不能大于所需签名数'
					})
					return;
				}

				let para = Object.assign({},this.params);
				let xpubs = [this.privatekey,...this.xpubs];
				para.xpubs = xpubs
				if(!this.submitFlag){
					return false;
				}
				this.submitFlag = false;
				createMultiWallet.bind(this)(para)
					.then(({data})=>{
						if(data.status=='success'){
							this.$message({
								type:'success',
								message:'创建成功'
							})
							setTimeout(()=>{
								this.$router.go(-1);
								this.submitFlag = true;
							},1500)
						}else{
							var msg = data.error;
							this.$message({
								type:'error',
								message:msg
							})
							setTimeout(()=>{
								this.submitFlag = true;
							},200)
						}

						console.log(data,111)
					})
			},
			addAccount(){


				this.addPrivatekeyFlag = true;
				this.addPrivateKey = '';
				this.editIndex = -1;
			}
		},
	}
</script>

<style lang="scss" scoped>
	.createAccountWrap{
		.createAccountBtn{
			height:40px;
			line-height:40px;
			text-align:center;
			border-radius:5px;
			background:$blue;
			color:#fff;
			font-size:13px;
		}

    .signaturedAccountListWrap{
      display:flex;
      >span{
        width:86px;
      }
      >div{
        flex:1;
        position:relative;
        word-break: break-all;
        font-size:14px;
        color:#5a6877;
        >span{
          display:block;
          padding-right:200px;
          word-break: break-all;
          line-height:20px;
        }
        >div{
          position:absolute;
          right:0;
          top:0;
          >span{
            cursor:pointer;
          }
        }
      }



    }
	}

</style>
