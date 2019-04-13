<template>
	<div class="outerWrap privatekeyWrap">
		<el-row>
			<el-col :lg="20" :md="22">
				
				<div class="commonTitle_one">秘钥管理</div>
				<div class="privatekeyInnerWrap">
					<div class="commonTitle_two">
						我的秘钥
						<span @click="dialogFormVisible=true">新建秘钥</span>
					</div>
					
					
					<div class="privatekeyListsWrap">
						<div 
							v-for="(item,index) in lists"  
							class="privatekeyListWrap"
							:key="index">
							<el-row class="privatekeyListTitleWrap">
								<el-col :lg="24" class="privatekeyListTitle">
									<div>{{item.alias}} <!-- <span class="el-icon-edit-outline"></span> --></div>
									<div>
										公钥：{{item.xpub | interceptPubStr}}
										<span></span>
										<span 
											class="tag-read blue" 
											:data-clipboard-text="item.xpub" 
											@click="copy">拷贝公钥</span>
									</div>
								</el-col>
							</el-row>
							<el-row class="privatekeyListContentWrap">
								<el-col :lg="20" :md="20" class="left">
									<div>关联单签钱包：</div>
									<div>
										<span 
											v-if="list.sign_key_num == 1"
											v-for="(list,i) in item.associate_account"
											:key="i">{{list.account_alias}}</span>
									</div>
								</el-col>

								<el-col :lg="4" :md="4" class="right">
									<div 
										:class="{disable:item.is_single_used==1}"
										v-if="item.is_single_used==1">创建单签钱包</div>
									<div v-else @click="$router.push('/main/createWalletS')">创建单签钱包</div>
									
								</el-col>
							</el-row>

							<el-row class="privatekeyListContentWrap">
								<el-col :lg="20" :md="20" class="left">
									<div>关联多签钱包：</div>
									<div>
										<span 
											v-if="list.sign_key_num != 1"
											v-for="(list,i) in item.associate_account"
											:key="i">{{list.account_alias}}</span>
									</div>
								</el-col>

								<el-col :lg="4" :md="4" class="right">
									<div @click="$router.push('/main/createWalletM')">创建多签钱包</div>
								</el-col>
							</el-row>

						</div>
						<div v-if="!lists.length" class="noresult">暂无数据</div>

					</div>


					<el-dialog title="新建秘钥" :visible.sync="dialogFormVisible" :center="true">
					   
					   <div class="dialogContentWrap">
						   <div class="title">请设置密钥别称</div>
						   <div class="tips">密钥别称是用来区分密钥的标签，该信息不会在区块链上保存</div>
						   <el-input 
								v-model="params.alias" 
								placeholder="输入别称"></el-input>

						   <div class="title">请设置密钥密码</div>
						   <div class="tips">⚠️请设置至少10位字母数字混合的密码，密钥是根据你输入的密码生成的管理资产的加密凭证。请妥善保管、备份密码，忘记密码将导致钱包资产的损失。</div>
						   <el-input 
								v-model="params.password" 
								placeholder="输入密码"
								type="password"
								autocomplete="new-password"></el-input>
						   <el-input 
								v-model="params.againPassword" 
								placeholder="请再次输入密码"
								type="password"
								autocomplete="new-password"></el-input>
					   </div>
						<div slot="footer" class="dialog-footer">
							<el-button @click="dialogFormVisible = false">取 消</el-button>
							<el-button type="primary" @click="create">确 定</el-button>
						</div>
					</el-dialog>
					
				</div>
		
			</el-col>
		</el-row>
		
	</div>
</template>

<script>
	import Clipboard from 'clipboard'
	import Vue from 'vue';
	import { Row, Col, Dialog, Input, Button } from 'element-ui';
	
	import { getPrivateKeyLists, createPrivateKey } from '@/util/server.js'
		
	Vue.use(Row);
	Vue.use(Col);
    Vue.use(Input);
    Vue.use(Button);
	Vue.use(Dialog);
	
	export default {
		created(){
			this.getlist();
		},
		data(){
			return {
				lists:[],
                dialogFormVisible:false,
				
				submitFlag:true,
				params:{
					alias: "",
					password: "",
					againPassword:'',
				}
			}
		},
		methods:{
			getlist(){
				let user_name = localStorage.USERTOKEN;
				let para  = {user_name: user_name}
				
				getPrivateKeyLists.bind(this)(para)
					.then(({data})=>{
						if(data.status =='success'){
							if(data.data){
								this.lists.splice(0,999,...data.data);
							}
							
						}
						
					})
			},
			copy() {
		        var clipboard = new Clipboard('.tag-read')
		        clipboard.on('success', e => {
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
			create(){
				let para  = Object.assign({},this.params)
				if(!this.submitFlag){
					return false;
				}
				this.submitFlag = false;
				
				createPrivateKey.bind(this)(para)
					.then(({data})=>{
						if(data.status == 'success'){
							this.$message({
								type:'success',
								message:'创建成功'
							})
							this.getlist();
							setTimeout(()=>{
								this.submitFlag = true;
								this.dialogFormVisible = false;
								this.params.alias  = '';
								this.params.password  = '';
								this.params.againPassword  = '';
									
							},1500)
						}else{
							var msg = data.detail
							this.$message({
								type:'warning',
								message:msg
							})
							this.submitFlag = true;
						}
						console.log(data,111)
					})
				
			}
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
				margin-bottom:8px;
                .privatekeyListTitle{
                    >div{
                        font-size:17px;
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
						&.disable{
							background:#999;
							color:#555;
							
						}
                    }
                }
            }


        }
        

    }
</style>