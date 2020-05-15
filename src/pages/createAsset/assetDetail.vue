<template>
	<div class="outerWrap assetDetailWrap">


    <div class="commonTitle_one">
      <span @click="$router.go(-1)">创建资产</span>/资产详情
      <!-- <span>
        <i class="el-icon-arrow-right"></i>
        <span>转账</span>
      </span> -->
      <!-- <div>返回</div> -->
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




		<!-- <el-row>
			<el-col :lg="20" :md="22">

				<div class="commonTitle_two">
					资产详情
				</div>

				<div class="assetDetaiContentWrap">
					<el-row class="assetDetaiContentItem">
						<el-col :lg="6">资产名称</el-col>
						<el-col :lg="18">
							<span>{{detail.asset_name}}</span>
						</el-col>
					</el-row>
					<el-row class="assetDetaiContentItem">
						<el-col :lg="6">资产ID</el-col>
						<el-col :lg="18">
							<span>{{detail.asset_id}}</span>
						</el-col>
					</el-row>
					<el-row class="assetDetaiContentItem">zhushi
						<el-col :lg="6">资产发行账户</el-col>
						<el-col :lg="18">
							<span>{{detail.account_id}}</span>
						</el-col>
					</el-row>
					<el-row class="assetDetaiContentItem">
						<el-col :lg="6">首次发行地址</el-col>
						<el-col :lg="18">
							<span>{{detail.first_issue_addressid}}</span>
						</el-col>
					</el-row>
					<el-row class="assetDetaiContentItem">
						<el-col :lg="6">首次发行总量</el-col>
						<el-col :lg="18">
							<span>{{detail.first_issue_amount}}</span>
						</el-col>
					</el-row>
					<el-row class="assetDetaiContentItem">
						<el-col :lg="6">首次发行时间</el-col>
						<el-col :lg="18">
							<span>{{detail.first_issue_time}}</span>
						</el-col>
					</el-row>
					<el-row
						class="assetDetaiContentItem"
						v-for="(item, index) in detail.parameters||[]"
						:key="index">
						<el-col :lg="6">{{item.key}}</el-col>
						<el-col :lg="18">
							<span>{{item.value}}</span>
						</el-col>
					</el-row>

				</div>

				<div class="commonTitle_two">
					增发历史
				</div>
				<div>
					<el-table
					  :data="detail.addIssue_records"
					  style="width: 100%">
					  <el-table-column
						prop="issue_time"
						label="增发时间"
						width="180">
					  </el-table-column>
					  <el-table-column
						prop="issue_amount"
						label="增发数量"
						width="180">
					  </el-table-column>
					  <el-table-column
						prop="issue_addressid"
						label="增发地址">
					  </el-table-column>
					</el-table>
				</div>

			</el-col>
		</el-row>
 -->
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
