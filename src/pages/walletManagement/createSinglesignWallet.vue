<template>
	<div class="outerWrap createAccountWrap">
		<el-row>
			<el-col :lg="20" :md="22">
				<div class="commonTitle_one">
					钱包管理
					<span>
						<i class="el-icon-arrow-right"></i>
						<span>创建单签钱包</span>
					</span>
				</div>

				<div class="commonTitle_two">
					创建单签钱包
					<span @click="$router.go(-1)">返回</span>
				</div>

				<div class="transferInpWrap">
					<el-row>
						<el-col>
							<el-row class="transferInpListsWrap">
								<el-col :md="24">
									<div class="transferInpListLeft">钱包名称</div>
									<el-input v-model="params.alias" placeholder=""></el-input>
								</el-col>
								<el-col :md="24">
									<div class="transferInpListLeft">钱包秘钥</div>
									<el-select v-model="params.xpub" placeholder="请选择钱包所使用的密钥">
										<el-option
											v-for="item in lists"
											:key="item.xpub"
											:label="item.alias"
											:value="item.xpub">
										</el-option>
									</el-select>
								</el-col>




								<el-col :md="24">
									<div
										@click="create"
										class="createAccountBtn">创建账户</div>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
				</div>

			</el-col>
		</el-row>



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
