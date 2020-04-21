<template>
	<div class="outerWrap assetManagementIndexWrap">
		<el-row>
			<el-col :lg="20" :md="22">

				<div class="commonTitle_one">资产管理</div>

				<div class="commonTitle_two">
					我创建的资产
					<span @click="$router.push('/main/createAsset')">创建资产</span>
				</div>
				<div class="contentNavWrap">
					<span
						:class="{active:navIndex===0}"
						@click="changeNav(0)">未发行资产</span>
					<span
						:class="{active:navIndex===1}"
						@click="changeNav(1)">已发行资产</span>
				</div>

				<div class="assetManagementIndexListsWrap">
					<el-row class="assetManagementIndexListWrap">
						<el-col :lg="7" >名称</el-col>
						<el-col :lg="10">资产ID</el-col>
						<el-col :lg="3">发行状态</el-col>
						<el-col :lg="4">操作</el-col>
					</el-row>
					<el-row
						class="assetManagementIndexListWrap"
						v-for="(item, index) in lists"
						:key="item.id">
						<el-col :lg="7">
							<div
								@click="$router.push({path:'/main/assetDetail',query:{id:item.id}})"
								class="blue">
								{{item.asset_name}}
							</div>
						</el-col>
						<el-col :lg="10">{{item.asset_id}}</el-col>
						<el-col :lg="3">{{navIndex===0?'未发行':'已发行'}}</el-col>
						<el-col :lg="4" v-if="navIndex===0">
							<!-- <span
								class="blue"
								@click.stop="$router.push({path:'/main/editAsset',query:{id:item.id}})">编辑</span> -->
							<span
								@click="$router.push({path:'/main/issue',query:{asset_id:item.asset_id,asset_name:item.asset_name}})"
								class="blue">发行</span>
							<span
								@click="delAsset(item.id)"
								style="color:red">删除</span>
						</el-col>
						<el-col :lg="4" v-else>
							<span
								@click="$router.push({path:'/main/assetDetail',query:{id:item.id}})"
								class="blue">详情</span>
							<span
								@click="$router.push({path:'/main/issue',query:{asset_id:item.asset_id,asset_name:item.asset_name}})"
								class="blue">增发</span>
							<span style="display:none;">删除</span>
						</el-col>
					</el-row>

          <div class="paginationWrap" v-if="lists.length">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="params.total"
              :page-size="params.page_size"
              @current-change="pageChange"
             >
            </el-pagination>
          </div>

					<el-row v-if="!lists.length">
						<el-col>
							<div class="noresult">暂无数据</div>
						</el-col>
					</el-row>

				</div>

			</el-col>
		</el-row>

	</div>
</template>

<script>
	import { getAssetLists, deleteAsset } from '@/util/server.js'


	import Vue from 'vue';
	import { Row, Col } from 'element-ui';

	Vue.use(Row);
	Vue.use(Col);


	export default {
		created(){
        var accountInfo = this.getLocalAccountInfo()
        var account_id = accountInfo.account_id;
        this.params.account_id = account_id;
			 this.getLists()


		},
		data(){
			return {
				navIndex:0,

				lists:[],

        params:{
          account_id:'',
          is_issue:0,
          page: 1,
          page_size: 2,
          total: 0,
        }


			}
		},
		methods:{
      pageChange(currentPage){
        this.params.page = currentPage;
        this.getLists()
      },
			getLists(){
				var formdata = new FormData();

				getAssetLists.bind(this)(this.params)
					.then(({data})=>{

            const { total_item: total } = data.data

            const lists  = this.navIndex === 0 ? data.data.asset_unissue :data.data.asset_issue

            if(lists){
              this.lists.splice(0,999, ...lists)
              this.params.total = total
            }else{
              this.lists.splice(0,999);
              this.params.total = 0
            }

					})
					.catch(()=>{

					})
			},

			changeNav(index){
				this.navIndex = index;
				this.params.is_issue = index;
        this.params.page = 1;
        this.getLists()

			},
			delAsset(id){
				deleteAsset.bind(this)(id)
					.then(({data})=>{
						if(data=='OK'){
							this.$message ({
								message: '删除成功',
								type: 'success'
							});
							this.getLists();
						}else{
							this.$message ({
								message: data,
								type: 'warning'
							});
						}
						console.log(data,122)
					})
					.catch(()=>{

					})
			}
		},
	}
</script>

<style lang="scss">
	.assetManagementIndexWrap{

		.assetManagementIndexListsWrap{
			padding-right:30px;
			padding-top:20px;
			.assetManagementIndexListWrap{
				font-size:13px;
				>div{
					border:1px solid #aaa;
					margin-left:-1px;
					margin-top:-1px;
					text-align:center;
					line-height:36px;
					overflow:hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					padding:0 10px;
					>span{
						cursor:pointer;
						line-height:36px;
						display:inline-block;
						padding:0 4px;
					}
				}
			}


		}
	}

</style>
