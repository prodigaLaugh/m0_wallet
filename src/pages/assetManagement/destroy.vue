<template>
	<div class="outerWrap transferWrap">

    <div class="commonTitle_one">

      <span @click="$router.go(-1)">资产操作</span>/销毁
      <!-- <span>
        <i class="el-icon-arrow-right"></i>
        <span>发行</span>
      </span>
      <div>返回</div> -->
    </div>



		<!-- <div class="commonTitle_two">销毁</div> -->

		<div class="transferInpWrap">

      <div class="inpItemWrap">
        <div>
          <span>所在地址</span>
          <el-select v-model="params.from_address" placeholder="请选择">
          	<el-option
          	  v-for="item in address"
          	  :key="item.address_id"
          	  :label="item.address_id"
          	  :value="item.address_id">
          	</el-option>
          </el-select>
        </div>
      </div>

      <div class="inpItemWrap">
        <div>
          <span>销毁资产类型</span>
          <el-select
            v-model="params.asset_id"
            placeholder="请选择"
            @change="adressChangeQueryAmount"
           >
          	<el-option
          		v-for="item in allAssetsLists"
          		:key="item.value"
          		:label="item.asset_name"
          		:value="item.asset_id">
          	</el-option>
          </el-select>
        </div>
      </div>

      <div class="inpItemWrap"  v-if="amount || amount ===0">
        <div>
          <span>当前资产余额：</span>
          <span>{{amount}}</span>
        </div>
      </div>


      <div class="inpItemWrap">
        <div>
          <span>销毁数量</span>
          <el-input v-model="params.amount" placeholder="请输入目标地址"></el-input>
        </div>
      </div>

      <div class="inpItemWrap">
        <div>
          <span>密码</span>
          <el-input
          	v-model="params.password"
          	placeholder="请输入密码"
          	autocomplete="new-password"
          	type="password"></el-input>
        </div>
      </div>


      <div class="inpItemWrap"   >
        <div>
          <span></span>
           <span class="submit" @click="retire">{{isSingleSign?'提交交易':'生成签名文件'}}</span>
        </div>

      </div>





			<el-row>
				<el-col :lg="20" :md="22">
					<el-row class="transferInpListsWrap">
						<!-- <el-col :lg="24">
							<div class="transferInpListLeft">所在地址</div>
							<el-select v-model="params.from_address" placeholder="请选择">
								<el-option
								  v-for="item in address"
								  :key="item.address_id"
								  :label="item.address_id"
								  :value="item.address_id">
								</el-option>
							  </el-select>
						</el-col> -->

						<!-- <el-col :lg="24">
							<div class="transferInpListLeft">销毁资产类型</div>
							<el-select
                v-model="params.asset_id"
                placeholder="请选择"
                @change="adressChangeQueryAmount"
               >
								<el-option
									v-for="item in allAssetsLists"
									:key="item.value"
									:label="item.asset_name"
									:value="item.asset_id">
								</el-option>
							</el-select>
						</el-col> -->
            <!-- <el-col
            	:md="24"
            	v-if="amount || amount ===0"
            	style="margin-top:-10px">当前资产余额：{{amount}}</el-col> -->

						<!-- <el-col :lg="24">
							<div class="transferInpListLeft">销毁数量</div>
							<el-input v-model="params.amount" placeholder="请输入目标地址"></el-input>
						</el-col> -->
						<!-- <el-col :lg="24">
							<div class="transferInpListLeft">请输入密码</div>
							<el-input
								v-model="params.password"
								placeholder="请输入密码"
								autocomplete="new-password"
								type="password"></el-input>
						</el-col> -->

						<!-- <el-col :lg="24">
							<div
								class="transferAccoutItemBtn"
								@click="retire">{{isSingleSign?'提交交易':'生成签名文件'}}</div>
						</el-col> -->
					</el-row>
				</el-col>
			</el-row>
		</div>



	</div>
</template>

<script>
	import { queryAssetAmount, getAddressLists, getAssetWalletLists, retireMultsign, retireSinglesign } from '@/util/server.js'
	import Vue from 'vue';
	import { Row, Col, Input, Select, Option } from 'element-ui';

	Vue.use(Row);
	Vue.use(Col);
	Vue.use(Input);
	Vue.use(Option);
	Vue.use(Select);


	export default {
		created(){
			this.isSingleSign = this.judgeIsSingleSign();


			var accountInfo = this.getLocalAccountInfo()
			var account_id = accountInfo.account_id;
			var account_type = accountInfo.account_type;
			var account_alias = accountInfo.account_alias

			this.params.account_id = account_id;
			this.params.account_type = account_type;

      let para ={account_id:account_id, page: 1, page_size: 9999}
			getAssetWalletLists.bind(this)(para)
				.then(({data})=>{
					const { list_asset: lists, total_item: total } = data.data

					if(data.status=='success'){
					  if(lists){
					    this.allAssetsLists.splice(0,999, ...lists);

					  }else{
					    this.allAssetsLists.splice(0,999);

					  }

					}
				})
				.catch(()=>{

				})

			var params = {account_alias:account_alias, page: 1,
			    page_size: 999999}
			getAddressLists.bind(this)(params)
				.then(({data})=>{
					 const lists = data.data.list_address;
					 if(lists){
					   this.address.splice(0,99999, ...lists) ;
					 }else{
					   this.address.splice(0,99999) ;
					 }
				})
		},
		data(){
			return {
				isSingleSign:false,//是否是单签

				allAssetsLists:[],
				address:[],

        amount:'',



				params:{
					password:"",
					amount:'',
					asset_name:"",
					asset_id:"",
					from_address:'',
				},
			}
		},
		methods:{
      adressChangeQueryAmount(){
      	var list = this.allAssetsLists.filter((item,index)=>{
      		return item.asset_id ==this.params.asset_id
      	})
      	if(!list.length){
      		return;
      	}
      	var asset_name = list[0].asset_name||'test';
      	this.params.asset_name = asset_name;

      	var para = Object.assign({},this.params)
      	para.address_id = this.params.from_address;
      	queryAssetAmount.bind(this)(para)
      		.then(({data})=>{
      			console.log(data,9898)
      			this.amount = data.data;
      		})
      },
			retire(){
				var list = this.allAssetsLists.filter((item,index)=>{
					return item.asset_id ==this.params.asset_id
				})

				this.params.asset_name = list[0].asset_name;

				let para = Object.assign({},this.params);
				para.amount-=0;


				if(this.isSingleSign){
					this.retireSingle(para)
				}else{
					this.retireMutil(para);
				}




			},
			retireSingle(para){
				retireSinglesign.bind(this)(para)
					.then(({data})=>{
						if(data.status=='success'){
							this.$message({
								type:'success',
								message:'提交成功'
							})
							setTimeout(()=>{
								this.$router.go(-1);
							},1500)
						}else{
							this.$message({
								type:'error',
								message:data.error
							})
						}
					})
			},
			retireMutil(para){
				retireMultsign.bind(this)(para)
					.then(({data})=>{
						if(data.status=='error'){
							this.$message({
								type:'error',
								message:data.error
							})
						}else{
							let element = document.createElement('a')
							element.setAttribute('href', 'data:text/json;charset=utf-8,' + JSON.stringify(data) )
							element.setAttribute('download', 'data.hex')
							element.style.display = 'none'
							document.body.appendChild(element)
							element.click()
							document.body.removeChild(element)
						}

					})
			}
		},
	}
</script>

<style lang="scss">
	.transferWrap{

	}

</style>
