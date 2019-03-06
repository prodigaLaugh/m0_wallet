<template>
	<div class="outerWrap chainDepositWrap">
		<div class="commonTitle_one">链上存证</div>

		<div class="commonTitle_two">
            我的存证
            <span @click="$router.push('/main/uploadDeposit')">上传存证</span>
        </div>
			

        <div class="chainDepositListsWrap">
            <div v-for="item in 3"  class="chainDepositItem" >
                <el-row :gutter="30" class="chainDepositItemTitleWrap">
                    <el-col :lg="20" :md="20" class="left">
                        <div>我的存证00001</div>
                        <div>
                            <span v-for="item in 10">832kb</span>
                        </div>
                    </el-col>
                    <el-col :lg="4" :md="4" class="right">
                        <span @click="$router.push('/main/depositDetail')">查看存证</span>
                    </el-col>
                </el-row>
                
                <el-row  :gutter="20" class="chainDepositItemContent">
                    <el-col :lg="24" :md="24" class="center">
                        此处展示备注信息。。此处展示备注信息此处展示备注信息此处展示备注信息此处展示备注信息此处展示备注信息此处展示备注信息此处展示备注信息此处展示备注信息此处展示备注信息此处展示备注信息此处展示备注信息此处展示备注信息此处展示备注信息此处展示备注信息此处展示备注信息此处展示备注信息此处展示备注信息此处展示备注信息此处展示备注信息此处展示备注信息此处展示备注信息此处展示备注信息此处展示备注信息此处展示备注信息
                    </el-col>
                </el-row>
               
                
            </div>
        </div>
	
		
		
	
	</div>
</template>

<script>
	
	import Vue from 'vue';
	import { Row, Col } from 'element-ui';
		
	Vue.use(Row);
	Vue.use(Col);

	
	export default {
		created(){
			
		},
		data(){
			return {
			
			}
		},
		methods:{
			
		},
	}
</script>

<style lang="scss">
	.chainDepositWrap{
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

            .chainDepositItemContent{
                background:#fff;
                font-size:12px;
                line-height:18px;
                padding:10px;
            }


        }
    }
	
</style>