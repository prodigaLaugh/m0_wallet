<template>
	<div class="outerWrap createAssetWrap">

    <div class="commonTitle_one">
      <span @click="$router.go(-1)">创建资产</span>/创建资产
    </div>


    <div class="transferInpWrap">

      <div class="inpItemWrap">
        <div>
          <span>名称</span>
          <el-input v-model="param.asset_name" placeholder="资产名称格式为字母"></el-input>
        </div>
      </div>



      <div class="inpTitl">资产参数</div>

      <div class="transferInfoWrap">

        <div
          class="inpItemWrap"
          v-for="(item, index) in param.parameters"
      		:key="index"
        >
          <div>
            <span>参数名</span>
           <el-input v-model="item.key" placeholder=""></el-input>
          </div>
          <div>
            <span>参数值</span>
            <el-input v-model="item.value" placeholder=""></el-input>
          </div>
          <span @click="delPara(index)">删除</span>
        </div>


        <div class="inpItemWrap btnWrap">
          <div>
            <span></span>
            <span class="btn"  @click="addPara">+ 添加资产参数</span>
          </div>
        </div>




       </div>

       <div class="inpItemWrap">
         <div>
           <span></span>
            <span class="submit" @click="save">保存</span>
         </div>

       </div>

    </div>




				

	</div>
</template>

<script>
	import { createAsset } from '@/util/server.js'

	import Vue from 'vue';
	import { Row, Col, Input } from 'element-ui';

	Vue.use(Row);
	Vue.use(Col);
	Vue.use(Input);



	export default {
		created(){


		},
		data(){
			return {
				submitFlag:true,
				param:{
					asset_name:'',
					parameters:[{key:'',value:''}]
				},

			}
		},
		methods:{
			delPara(index){
				console.log(index,111)
				if(index>0){
					this.param.parameters.splice(index, 1);
				}
			},
			addPara(){
				this.param.parameters.push({key:'', value:''})
			},
			save(){
        var reg = /^[a-zA-Z]+/

				if(!this.param.asset_name){
					this.$message ({
						message: '请输入资产名称',
						type: 'error'
					});
					return;
				}else if(!reg.test(this.param.asset_name)){
          this.$message ({
          	message: '请输入正确格式的名称',
          	type: 'error'
          });
          return;
        }


        var flag = this.param.parameters.some((item)=>{
          return reg.test(item.key) || reg.test(item.value)
        })

        if(flag){
          this.$message ({
          	message: '资产参数不支持中文',
          	type: 'error'
          });
          return;
        }




// 				var flag = false;
// 				flag = this.param.parameters.some((item,index)=>{
// 					return !item.key||!item.value
// 				})
// 				if(flag){
// 					this.$message ({
// 						message: '请完善资产参数',
// 						type: 'warning'
// 					});
// 					return false;
// 				}
				let accountInfo = this.getLocalAccountInfo();
				let param = Object.assign({},accountInfo,this.param) ;
				if(!this.submitFlag){
					return false;
				}
				this.submitFlag = false;

				createAsset.bind(this)(param)
					.then(({data})=>{
						if(data.status === 'success' ){
							this.$message ({
								message: '创建成功',
								type: 'success'
							});
							this.param = {
								asset_name:'',
								"account_id":"0R031M6800A02",
								"account_type":1,
								parameters:[{key:'',value:''}]
							}
							this.$router.go(-1);
						}else{
							var msg = data.error || '创建失败'
							this.$message ({
								message: msg,
								type: 'error'
							});
						}
						this.submitFlag = true;
						console.log(data,111)
					})
					.catch((data)=>{
						this.submitFlag = true;
						console.log(data)
					})
			}
		},
	}
</script>
