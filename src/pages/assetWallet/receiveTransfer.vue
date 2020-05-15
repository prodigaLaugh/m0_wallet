<template>
	<div class="outerWrap addressManagementIndexWrap">

    <div class="commonTitle_one">
      <span @click="$router.go(-1)">资产钱包</span>/接收转账
      <!-- <span>
        <i class="el-icon-arrow-right"></i>
        <span>转账</span>
      </span> -->
      <!-- <div>返回</div> -->
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
             	@click="copy"></span>
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

          </div>
        </div>


      </div>
    </div>






<!--    <div class="commonTitle_two">
      接收地址
    </div>

    <div class="addressManagementIndexListsWrap">

      <el-row
        class="addressManagementIndexListWrap"
        v-for="(item,index) in lists"
        :key="index">
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
          </div>
        </el-col>
      </el-row>



    </div>

 -->


	</div>
</template>

<script>
	import { getAddressLists } from '@/util/server.js'
	import Clipboard from 'clipboard'


	import Vue from 'vue';
	import { Row, Col } from 'element-ui';

	Vue.use(Row);
	Vue.use(Col);


	export default {
		created(){
			this.getLists();
		},
		data(){
			return {
				lists:[],
			}
		},
		methods:{
			getLists(){
				var accountInfo = this.getLocalAccountInfo();
				var account_alias = accountInfo.account_alias
				var params = {account_alias:account_alias, page: 1,
				    page_size: 999999}
				getAddressLists.bind(this)(params)
					.then(({data})=>{
            console.log(data,1119)
						const lists = data.data.list_address;
            if(lists){
              this.lists.splice(0,99999, ...lists) ;
            }else{
              this.lists.splice(0,99999) ;
            }


						console.log(data,111)
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
      
      }

	}

</style>
