<template>
	<div class="outerWrap transferWrap">

    <div class="commonTitle_one">

      <span @click="$router.go(-1)">资产操作</span>/发行

    </div>




    <div class="transferInpWrap">

      <div class="inpItemWrap">
        <div>
          <span>发行地址</span>
          <el-select v-model="to_address" placeholder="请选择">
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
          <span>发行资产</span>
          <el-select v-model="params.asset_id" placeholder="请选择">
          	<el-option
          		v-for="item in allAssetsLists"
          		:key="item.value"
          		:label="item.asset_name"
          		:value="item.asset_id">
          	</el-option>
          </el-select>
        </div>
      </div>

      <div class="inpItemWrap">
        <div>
          <span>发行数量</span>
          <el-input v-model="to_amount" placeholder="请输入要发行的资产数量"></el-input>
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
           <span class="submit" @click="issue">{{isSingleSign?'提交交易':'生成签名文件'}}</span>
        </div>

      </div>


		</div>



	</div>
</template>

<script>
	import { getAddressLists, getMyAssetLists, issueMultsign, issueSinglesign } from '@/util/server.js'
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

			var query = this.$route.query;
			var asset_id = query.asset_id;
      var address_id = query.address_id;
			if(asset_id){
				this.params.asset_id = asset_id;
			}
      if(address_id){
        this.to_address = address_id
      }




			var account_id = this.getLocalAccountInfo().account_id;

			getMyAssetLists.bind(this)({account_id})
				.then(({data})=>{
					var lists = data.data.asset_list;
          if(lists){
            this.allAssetsLists.splice(0,9999,...lists)
          }else{
            this.allAssetsLists.splice(0,9999)
          }
				})
				.catch(()=>{

				})
			let account_alias = this.getLocalAccountInfo().account_alias;
			var params = {account_alias: account_alias,  page: 1,
          page_size: 999999 }

			getAddressLists.bind(this)(params)
				.then(({data})=>{
          console.log(data,111)
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

				to_address:'',
				to_amount:'',

				params:{
					password:"",
					amount:'',
					asset_name:"",
					asset_id:"",
					receive_info:[]
				},


			}
		},
		methods:{
			issue(){

        if(!this.to_address){
          this.$message.error('请选择发行地址')
          return;
        }else if(!this.params.asset_id){
          this.$message.error('请选择发行资产')
          return
        }else if(!this.to_amount){
          this.$message.error('请输入发行数量')
          return
        }else if(!this.params.password){
          this.$message.error('请输入密码')
          return
        }

				var list = this.allAssetsLists.filter((item,index)=>{
					return item.asset_id ==this.params.asset_id
				})


				this.params.asset_name = list[0].asset_name;
				var amount = this.to_amount-0||0;
				var receive_info = [{
						to_address:this.to_address,
						to_amount:this.to_amount-0||0
					}]

				let para = Object.assign({},this.params,this.getLocalAccountInfo());
				para.amount = amount;
				para.receive_info = receive_info;

				if(this.isSingleSign){
					this.issueSingle(para)
				}else{
					this.issueMutil(para);
				}



			},
			issueSingle(para){
				issueSinglesign.bind(this)(para)
					.then(({data})=>{
						console.log(data,89888)
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
			issueMutil(para){
				issueMultsign.bind(this)(para)
					.then(({data})=>{
						console.log(data,89888)
						if(data.status=='error'){
							console.log(1)

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
