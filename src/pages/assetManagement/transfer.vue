<template>
	<div class="outerWrap transferWrap">

    <div class="commonTitle_one">
      <span @click="$router.go(-1)">资产操作</span>/转账

    </div>





		<div class="transferInpWrap">

      <div class="inpItemWrap">
        <div>
          <span>转出地址</span>
          <el-select
          	v-model="params.from_address"
          	 @change="adressChangeQueryAmount"
          	placeholder="请选择">
          	<el-option
          	  v-for="item in address"
          	  :key="item.address_id"
          	  :label="item.address_id?item.address_id:'全部'"
          	  :value="item.address_id">
          	</el-option>
            </el-select>
        </div>
      </div>

      <div class="inpItemWrap">
        <div>
          <span>转出资产</span>
          <el-select
          	v-model="params.asset_id"
          	@change="adressChangeQueryAmount"
          	placeholder="请选择">
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
          <span>当前资产余额</span>
          <span>{{amount}}</span>
        </div>
      </div>

      <div class="inpTitl">转账详情</div>

      <div class="transferInfoWrap">

        <div
          class="inpItemWrap"
          v-for="(item, index) in params.receive_info"
					:key="index"
        >
          <div>
            <span>目标地址</span>
            <el-input v-model="item.to_address" placeholder="请输入目标地址"></el-input>
          </div>
          <div>
            <span>转出数量</span>
            <el-input v-model="item.to_amount" placeholder="请输入转出数量"></el-input>
          </div>
          <span @click="delPara(index)">删除</span>
        </div>


        <div class="inpItemWrap btnWrap">
          <div>
            <span></span>
            <span class="btn"  @click="addPara">+ 添加转账地址</span>
          </div>
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


      <div class="inpItemWrap">
        <div>
          <span></span>
           <span class="submit" @click="transfer">{{isSingleSign?'提交交易':'生成签名文件'}}</span>
        </div>

      </div>




    </div>



	</div>
</template>

<script>
	import {
		getAddressLists,
		getAssetWalletLists,
		transferMultsign,
		transferSinglesign,
		queryAssetAmount
	} from '@/util/server.js'

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

			var query = this.$route.query;
			var address_id = query.address_id;
			if(address_id){
				var asset_id = query.asset_id;
				var asset_name = query.asset_name;

				this.params.from_address = address_id;
				this.params.asset_name = asset_name;
				this.params.asset_id = asset_id;

        if(asset_id){
          this.adressChangeQueryAmount()
        }
			}




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
           this.address.splice(0,99999, {address_id:''},...lists) ;
         }else{
           this.address.splice(0,99999, {address_id:''}) ;
         }
				})
		},
		data(){
			return {
				isSingleSign:false,//是否是单签

				allAssetsLists:[],
				address:[],

				to_address:'',
				amount:'',


				params:{
					password:"",
					amount:'',
					asset_name:"",
					asset_id:"",
					from_address:'',
					receive_info:[{to_address:'',to_amount:''}]
				},


			}
		},
		methods:{
			delPara(index){
				console.log(index,111)
				if(index>0){
					this.params.receive_info.splice(index, 1);
				}
			},
			addPara(){
				this.params.receive_info.push({to_address:'', to_amount:''})
			},
			adressChangeQueryAmount(){
				var list = this.allAssetsLists.filter((item,index)=>{
					return item.asset_id ==this.params.asset_id
				})

				if(!list.length && !this.params.asset_id){
					return;
				}

				var asset_name = (list.length && list[0].asset_name)||'';
        if(asset_name){
          this.params.asset_name = asset_name
        }


				var para = Object.assign({},this.params)
				para.address_id = this.params.from_address;
				queryAssetAmount.bind(this)(para)
					.then(({data})=>{
						console.log(data,9898)
						this.amount = data.data;
					})
			},
			transfer(){

        var has_to_address = this.params.receive_info.every(item=>item.to_address)
        var correct_to_address = this.params.receive_info.every(item=> item.to_address.length === 42 ||  item.to_address.length === 62)
        var has_to_amount = this.params.receive_info.every(item=>item.to_amount)
        var not0_to_amount = this.params.receive_info.every(item=> item.to_amount === '0')
        var int_to_amount = this.params.receive_info.every(item=> {
          var to_amount = '' + item.to_amount
          return to_amount && to_amount.indexOf('.') > -1
        } )

        if(!this.params.from_address){
          this.$message.error('请选择转出地址')
          return;
        }else if(!this.params.asset_name){
          this.$message.error('请选择转出资产')
          return;
        }else if(!has_to_address){
          this.$message.error('请输入目标地址')
          return
        }else if(!correct_to_address){
          this.$message.error('请输入正确格式的目标地址')
          return
        }else if(!has_to_amount){
          this.$message.error('请输入转出数量')
          return
        }else if(not0_to_amount){
          this.$message.error('转出数量不能为0')
          return
        }else if(int_to_amount){
          this.$message.error('转出数量需为整数位数字')
          return
        }else if(!this.params.password){
          this.$message.error('请输入密码')
          return
        }


        let para = Object.assign({},this.params);
        para.receive_info.map((item,index)=>{
        	var to_amount = item.to_amount - 0;
        	para.receive_info[index].to_amount = to_amount;})

        para.amount = para.receive_info.reduce((pre,cur)=>{
        	return (pre-0) + (cur.to_amount-0)
        },0)



        if(this.amount < para.amount){
          this.$message.error('转出数量不能大于当前资产余额')
          return
        }





				if(this.isSingleSign){
					this.signleSignFn(para)
				}else{
					this.mutiSignFn(para);
				}





			},
			signleSignFn(para){
				transferSinglesign.bind(this)(para)
					.then(({data})=>{
						console.log(data,111)
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
								message:data.error,
							})
						}
					})
			},
			mutiSignFn(para){
				transferMultsign.bind(this)(para)
					.then(({data})=>{
						console.log(data,222)
						if(data.status=='error'){
							this.$message({
								type:'error',
								message:data.error
							})
						}else{
              this.createSignFile(data)
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
