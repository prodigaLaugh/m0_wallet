<template>
	<div class="outerWrap chainDepositWrap">


				<div class="commonTitle_one">可信存证</div>

				<div class="commonTitle_two">
					我的存证
					<span @click="$router.push('/main/uploadDeposit')">上传存证</span>
				</div>


        <div class="commonListsWrap">
          <div
            v-for="(item,index) in lists"
            :key="index"
            class="commonListWrap"
          >
            <div class="tit">{{item.evidence_name}}
             <i>{{item.file_size}}</i>
            </div>

            <div class="infoBtnWrap" style="border-bottom:0 none;">
              <div class="des">
                 <span>
                   交易hash：{{item.tx_hash | interceptPubStr}}
                 </span>
                 <!-- <img src="../assets/leftNavBg.png" alt=""> -->
                 <span
                 	class="tag-read blue "
                 	:data-clipboard-text="item.tx_hash"
                 	@click="copy"
                 	style="font-size:18px;margin-left:10px;"></span>

              </div>

              <div class="btn">
                <div @click="$router.push({path:'/main/depositDetail',query:{id:item.id}})">查看存证</div>
              </div>
            </div>

            <div class="des2">
              <span>描述</span>
              <div>{{item.describe||'--'}}</div>
            </div>

          </div>




        </div>

				<div class="chainDepositListsWrap">
					<div
						v-for="(item,index) in []"
						:key="index"
						class="chainDepositItem" >
						<el-row :gutter="30" class="chainDepositItemTitleWrap">
							<el-col :lg="20" :md="20" class="left">
								<div>{{item.evidence_name}}</div>
								<div>
									<span >{{item.file_size}}</span>
								</div>
							</el-col>
							<el-col :lg="4" :md="4" class="right">
								<span @click="$router.push({path:'/main/depositDetail',query:{id:item.id}})">查看存证</span>
							</el-col>
						</el-row>
						<el-row>
							<el-col>
								<div class="hashWrap">
									交易hash：{{item.tx_hash | interceptPubStr}}
									<span
										class="tag-read blue el-icon-document "
										:data-clipboard-text="item.tx_hash"
										@click="copy"
										style="font-size:18px;margin-left:10px;"></span>

								</div>
							</el-col>
						</el-row>

						<el-row  :gutter="20" class="chainDepositItemContent">
							<el-col :lg="24" :md="22" class="center">
								{{item.describe||'--'}}
							</el-col>
						</el-row>


					</div>

					<div class="noresult" v-if="!lists.length">暂无数据</div>


				</div>




	</div>
</template>

<script>
	import Clipboard from 'clipboard'
	import { getEvidenceLists } from '@/util/server.js'

	import Vue from 'vue';
	import { Row, Col } from 'element-ui';

	Vue.use(Row);
	Vue.use(Col);


	export default {
		created(){
			var accountInfo = this.getLocalAccountInfo()
			var account_id = accountInfo.account_id;
			getEvidenceLists.bind(this)(account_id)
				.then(({data})=>{
					console.log(data,333)
					if(data.status =='success'){
						this.lists = data.data
					}

				})
		},
		data(){
			return {
				lists:[]
			}
		},
		methods:{
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

<style lang="scss" scoped>
	.chainDepositWrap{
    .commonListsWrap{
      .des2{
        margin-bottom:30px;
        background:#f9f9f9;
        line-height:20px;
        font-size:14px;
        display:flex;
        padding:15px;
        >span{
          word-break: break-all;
          &:nth-of-type(1){
            width:80px;
          }

        }
        >div{
           flex:1;
           word-break: break-all;
        }
      }
    }

        .chainDepositItem{
            margin-bottom:20px;
            background:#eee;
            padding:20px 30px;
            .chainDepositItemTitleWrap{
                display:flex;
                justify-content: space-between;
                >.left{
                    display:flex;
                    line-height:22px;
                    >div:nth-of-type(1){
                        font-size:18px;
                    }
                    >div:nth-of-type(2){
                        display:flex;
                        flex-wrap:wrap;
                        align-items: center;
                        margin-left:10px;
                        flex:1;
                        >span{
                            line-height:22px;
                            padding:0 10px;
                            background:rgba(107, 107, 107, 1);
                            color:#fff;
                            border-radius:5px;
                            margin-right:10px;
                            margin-bottom:10px;
                        }
                    }
                }
                >.right{
                    text-align:right;
                    font-size:18px;
                    color:$blue;
                    >span{
                        cursor:pointer;
                    }
                }
            }
			.hashWrap{
				font-size:14px;
				padding:4px 0 10px;
			}
            .chainDepositItemContent{
                background:#fff;
                font-size:12px;
                line-height:18px;
                padding:10px;
            }


        }
    }

</style>
