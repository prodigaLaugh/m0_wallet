<template>
	<div class="outerWrap createAccountWrap">

    <div class="commonTitle_one">
      <span @click="$router.push('/main/walletIndex')">钱包管理</span>/创建单签钱包

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
            v-model="params.xpub"
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

      <div class="inpItemWrap"   >
        <div>
          <span></span>
           <span class="submit" @click="create"  :class="[ !submitFlag ? 'loadingBtn' : '']">创建钱包</span>
        </div>

      </div>



    </div>





	</div>
</template>

<script>
	import { createSingleWallet, getPrivateKeyLists } from '@/util/server.js'

	import Vue from 'vue';
	import { Row, Col, Radio, Input, Select, Option, MessageBox } from 'element-ui';

	Vue.use(Row);
	Vue.use(Col);
	Vue.use(Radio);
	Vue.use(Input);
	Vue.use(Option);
	Vue.use(Select);


	export default {
		created(){

			getPrivateKeyLists.bind(this)({page:1, page_size:99999})
				.then(({data})=>{
          const { list_keys: lists } = data.data

					this.lists.splice(0,999, ...lists ? lists : []);
					if(this.$route.query.from){
						var list = JSON.parse(localStorage.privateItem);
						this.params.xpub= list.xpub
					}else{
						this.params.xpub = data.data[0].xpub
					}
				})
		},
		data(){
			return {
				submitFlag:true,
				lists:[],
				params:{
					alias: "",
					xpub: ""
				}
			}
		},
		methods:{
			create(){

        if(!this.params.alias){
          this.$message({
          	type:'error',
          	message:'请输入钱包名称'
          })
          return;
        }else if(!this.params.xpub){
          this.$message({
          	type:'error',
          	message:'请选择钱包秘钥'
          })
          return;
        }

				let para = Object.assign({},this.params);

				if(!this.submitFlag){
					return false;
				}
				this.submitFlag = false;
				createSingleWallet.bind(this)(para)
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

						console.log(data)
					})
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
      @include pointer;
		}
	}

</style>
