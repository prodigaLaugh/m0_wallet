<template>


  <div class="commonListWrap">


    <div class="recordInfo">
      <div>
        <span>交易ID：</span>
        <span>{{item.tx_id}}</span>
      </div>
      <div>
        <span>交易类型：</span>
        <span>转账</span>
       <!-- <span>{{item.tx_id}}</span> -->
      </div>

      <div class="last">
        <span class="icon"> 已确认</span>
        <span>{{item.to_time}}</span>
      </div>
    </div>

    <div class="recordLists">
      <div
        class="recordList"
        v-for="(list,i,key) in item.from"
        :key="key"
      >
        <div>
          From:  {{list.Address }}（{{list.account | interceptStr}}）
        </div>
        <div>- {{list.amount}}</div>
        <div>{{asset_name||'--'}}</div>
      </div>

      <div
        class="recordList"
        v-for="(list,i,key) in item.to"
        :key="key"
      >
        <div>
          To: {{list.Address }}（{{list.account | interceptStr}}）
        </div>
        <div>+ {{list.amount}}</div>
        <div>{{asset_name||'--'}}</div>
      </div>



    </div>

  </div>

	<!-- <div class="inner">
		<el-row
			class="consoleListIDWrap"
			:gutter="20">
			<el-col :md="12">
				<span>交易ID</span>
				<span>{{item.tx_id}}</span>

				<span>已确认</span>
			</el-col>
			<el-col :md="12">
				{{item.to_time}}
			</el-col>
		</el-row>


		<el-row
			:gutter="20"
			class="consoleList_list"
			v-for="(list,i,key) in item.from"
			:key="key">
			<el-col :md="1">
			</el-col>
			<el-col :md="14">
				<span style="width:50px;">From</span>
				<span>
					<div>
						{{list.Address | interceptStr}}（{{list.account | interceptStr}}）
					</div>
				</span>
			</el-col>
			<el-col :md="6">- {{list.amount}}</el-col>
			<el-col :md="4">{{asset_name||'--'}}</el-col>
		</el-row>

		<el-row
			:gutter="20"
			class="consoleList_list"
			v-for="(list,i,key) in item.to"
			:key="key">
			<el-col :md="1" style="width:0;">
			</el-col>
			<el-col :md="14">
				<span style="width:50px;">To</span>
				<span>
					<div>{{list.Address | interceptStr}}（{{list.account | interceptStr}}）</div>

				</span>
			</el-col>
			<el-col :md="6">+ {{list.amount}}</el-col>
			<el-col :md="4">{{asset_name||'--'}}</el-col>
		</el-row>
	</div> -->
</template>

<script>
	export default{
		props:['item','asset_name'],
		data(){
			return {

			}
		}
	}
</script>
