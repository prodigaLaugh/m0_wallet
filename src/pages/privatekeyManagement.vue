<template>
	<div class="outerWrap privatekeyWrap">
		<div class="commonTitle_one">秘钥管理</div>
		<div class="privatekeyInnerWrap">
			<div class="commonTitle_two">
				我的秘钥
				<span @click="dialogFormVisible=true">新建秘钥</span>
			</div>
			
			
			<div class="privatekeyListsWrap">
                <div v-for="item in 3"  class="privatekeyListWrap" >
					<el-row class="privatekeyListTitleWrap">
						<el-col :lg="24" class="privatekeyListTitle">
							<div>mykey001 <span class="el-icon-edit-outline"></span></div>
                            <div>
                                公钥：3D2oetdNuZUqQHPJmcMDDHYoqkyNVsFk9r 
                                <span>拷贝公钥</span>
                            </div>
						</el-col>
					</el-row>
                    <el-row class="privatekeyListContentWrap">
                        <el-col :lg="20" :md="20" class="left">
                            <div>关联单签钱包：</div>
                            <div>
                                <span v-for="item in 7">wallet001</span>
                            </div>
                        </el-col>

                        <el-col :lg="4" :md="4" class="right">
                            <div>创建单签钱包</div>
                        </el-col>
                    </el-row>

                    <el-row class="privatekeyListContentWrap">
                        <el-col :lg="20" :md="20" class="left">
                            <div>关联多签钱包：</div>
                            <div>
                                <span v-for="item in 10">wallet001</span>
                            </div>
                        </el-col>

                        <el-col :lg="4" :md="4" class="right">
                            <div>创建多签钱包</div>
                        </el-col>
                    </el-row>

				</div>

			</div>


            <el-dialog title="新建秘钥" :visible.sync="dialogFormVisible" :center="true">
               
               <div class="dialogContentWrap">
                   <div class="title">请设置密钥别称</div>
                   <div class="tips">密钥别称是用来区分密钥的标签，该信息不会在区块链上保存</div>
                   <el-input v-model="value" placeholder="输入别称"></el-input>

                   <div class="title">请设置密钥密码</div>
                   <div class="tips">⚠️请设置至少10位字母数字混合的密码，密钥是根据你输入的密码生成的管理资产的加密凭证。请妥善保管、备份密码，忘记密码将导致钱包资产的损失。</div>
                   <el-input v-model="value" placeholder="输入密码"></el-input>
                   <el-input v-model="value" placeholder="请再次输入密码"></el-input>
               </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                </div>
            </el-dialog>
			
		</div>
		
		
	</div>
</template>

<script>
	
	import Vue from 'vue';
	import { Row, Col, Dialog, Input, Button } from 'element-ui';
		
	Vue.use(Row);
	Vue.use(Col);
    Vue.use(Input);
    Vue.use(Button);
	Vue.use(Dialog);
	
	export default {
		created(){
			
		},
		data(){
			return {
                dialogFormVisible:false,
				value: ''
			}
		},
		methods:{
			
		},
	}
</script>

<style lang="scss">
	
	.privatekeyWrap{
        .privatekeyListWrap{
            background:#eee;
            padding:15px 30px;
            margin-bottom:20px;
            .privatekeyListTitleWrap{
                border-bottom:1px solid #333;
                .privatekeyListTitle{
                    >div{
                        font-size:18px;
                    }
                    >div:nth-of-type(1){
                        display:flex;
                        align-items: center;
                        padding-bottom:10px;
                        >span{
                            font-size:30px;
                            margin-left:10px;
                            cursor:pointer;
                        }
                    }
                    >div:nth-of-type(2){
                        color:#999;
                        padding-bottom:10px;
                        display:flex;
                        align-items: center;
                        >span{
                            color:$blue;
                            cursor:pointer;
                            margin-left:15px;
                            font-size:13px;
                        }
                    }
                }
            }

            .privatekeyListContentWrap{
                padding-top:10px;
                line-height:22px;
                >.left{
                    display:flex;
                    >div:nth-of-type(1){
                        width:120px;
                        color:#999;
                        font-size:16px;
                    }
                    >div:nth-of-type(2){
                        flex:1;
                        display: flex;
                        flex-wrap: wrap;
                        >span{
                            background:rgba(134, 134, 134, 1);
                            color:#fff;
                            margin-right:10px;
                            border-radius:5px;
                            padding:0 10px;
                            height:22px;
                            margin-bottom:10px;
                        }
                    }
                }

                >.right{
                    text-align:right;
                    >div{
                        display:inline-block;
                        height:22px;
                        line-height:22px;
                        border-radius:5px;
                        background:$blue;
                        color:#fff;
                        text-align:center;
                        font-size:12px;
                        padding:0 20px;
                        cursor:pointer;
                    }
                }
            }


        }
        .dialogContentWrap{
            .title{
                padding:20px 0 10px;
                color:#333;
            }
            .tips{
                font-size:13px;
                color:#999;
                line-height:18px;
                padding-bottom:4px;
            }
            >.el-input{
                margin-bottom:10px;
            }
        }

    }
</style>