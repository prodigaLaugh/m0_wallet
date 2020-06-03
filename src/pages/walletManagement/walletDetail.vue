<template>
	<div class="outerWrap walletDetailWrap" v-if="detail&&detail.account_alias">


    <div class="commonTitle_one">
      <span @click="$router.go(-1)">钱包管理</span>/钱包详情
    </div>

    <div class="infoListWrap">
      <div class="tit">钱包概况</div>
      <div class="infoList">
        <span>钱包名称</span>
        <span>{{detail.account_alias}}</span>
      </div>
      <div class="infoList">
        <span>钱包类型</span>
        <span>{{(detail.sign_key_num-0)>1?'多签':'单签'}}</span>
      </div>
    </div>

    <div class="infoListWrap">
      <div class="tit">包含资产</div>

      <div class="lists">
        <div class="list title">
          <span>资产名称</span>
          <span>余额</span>
        </div>

        <div
          class="list"
          v-for="(item,index) in detail.asset2amount_list"
          :key="index"
        >
          <span>{{item.asset_name}}</span>
          <span>{{item.amount}}</span>
        </div>
      </div>
    </div>


    <div class="infoListWrap">
      <div class="tit">关联密钥</div>

      <div class="lists">
        <div class="list title">
          <span>公钥</span>
          <span>相关用户</span>
        </div>

        <div
          class="list"
           v-for="(item,index) in detail.xpub2user_name_list"
          :key="index"
        >
          <span>{{item.xpub | interceptPubStr}}</span>
          <span>{{item.user_name}}</span>
        </div>
      </div>
    </div>






	</div>
</template>

<script>
	import { getAccountDetail } from '@/util/server.js'


	import Vue from 'vue';
	import { Row, Col } from 'element-ui';

	Vue.use(Row);
	Vue.use(Col);


	export default {
		created(){
			this.getDetail()
		},
		data(){
			return {
				detail:{}
			}
		},
		methods:{
			getDetail(){
				let account_alias = this.$route.query.id;
				let params = {
					account_alias:account_alias
				}
				getAccountDetail.bind(this)(params)
					.then(({data})=>{
						this.detail = data.data;
					})
			}
		},
	}
</script>

<style lang="scss">
	.walletDetailWrap{
		.walletDetaiContentWrap{
			padding:20px 0;
			.walletDetaiContentItem{
				line-height:26px;
				font-size:13px;
			}
		}


    .infoListWrap{
      border-bottom:1px solid #E4E4E4;
      padding:0 30px 20px;
      color:#425263;
      font-size:14px;

      &:last-of-type{
        border-bottom:0 none;
      }

      .tit{
        padding:30px 0;
        font-size:16px;
        color:#425263;
        font-weight:bold;
      }

      .infoList{
        display:flex;

        align-items: center;
        line-height:60px;

        >span:nth-of-type(1){
          width:120px;
        }
      }

      .lists{
        .list{
          display:flex;
          align-items: center;
          justify-content: space-between;
          line-height:60px;
          border-bottom:1px solid #E4E4E4;
          &.title{
            background:#d5e0e9;
            line-height:40px;
            border-bottom:0 none;
          }
          &:last-of-type{
            border-bottom:0 none;
          }
          >span:nth-of-type(1){
            padding-left:15px;
          }
          >span:nth-of-type(2){
            width:200px;
          }
        }
      }

    }


	}

</style>
