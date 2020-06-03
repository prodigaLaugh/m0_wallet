<template>
	<div class="outerWrap assetDetailWrap">


    <div class="commonTitle_one">
      <span @click="$router.go(-1)">创建资产</span>/资产详情
    </div>

    <div class="detailInfoListsWrap itemWrap">
      <div class="tit">资产详情</div>

      <div class="infoW">
        <div class="list">
          <span>资产名称</span>
          <span>{{detail.asset_name}}</span>
        </div>

        <div class="list">
          <span>资产ID</span>
          <span>{{detail.asset_id}}</span>
        </div>

        <div class="list">
          <span>首次发行地址</span>
          <span>{{detail.first_issue_addressid}}</span>
        </div>

        <div class="list">
          <span>首次发行总量</span>
          <span>{{detail.first_issue_amount}}</span>
        </div>

        <div class="list">
          <span>首次发行时间</span>
          <span>{{detail.first_issue_time}}</span>
        </div>

        <div
          class="list"
          v-for="(item, index) in detail.parameters||[]"
          :key="index"
        >
          <span>{{item.key}}</span>
          <span>{{item.value}}</span>
        </div>

      </div>

    </div>

    <div class="detailInfoListsWrap itemWrap">
      <div class="tit">增发历史</div>

      <div class="lists">
        <div class="list title">
          <span>增发时间</span>
          <span>增发数量</span>
          <span>增发地址</span>
        </div>
        <div class="list" v-for="(item, index) in detail.addIssue_records" :key="index">
          <span>{{item.issue_time}}</span>
          <span>{{item.issue_amount}}</span>
          <span>{{item.issue_addressid}}</span>
        </div>
      </div>

    </div>



	</div>
</template>

<script>

	import Vue from 'vue';
	import { Row, Col, Table, TableColumn } from 'element-ui';

	Vue.use(Row);
	Vue.use(Col);
	Vue.use(Table);
	Vue.use(TableColumn);


	import { getAssetInfo } from '@/util/server.js'


	export default {
		created(){
			var id = this.$route.query.id;
			var formdata = new FormData();
			formdata.append('id',id)

			getAssetInfo.bind(this)(formdata)
				.then(({data})=>{
					this.detail = data.data
				})
		},
		data(){
			return {
				detail:{}
			}
		},
		methods:{

		},
	}
</script>

<style lang="scss">
	.assetDetailWrap{
    padding-bottom:60px;

		.assetDetaiContentWrap{
			padding:20px 0;
			.assetDetaiContentItem{
				line-height:26px;
				font-size:13px;
			}
		}


	}

</style>
