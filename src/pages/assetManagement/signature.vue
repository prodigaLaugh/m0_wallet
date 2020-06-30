<template>
	<div class="outerWrap signatureWrap">


    <div class="commonTitle_one">
      <span @click="$router.go(-1)">资产操作</span>/签名
    </div>




    <div class="transferInpWrap">

      <div class="inpItemWrap">
        <div>
          <span>签名文件</span>

          <span v-if="!uploadFlag" class="uploadFileBtn" @click="bindClick">+上传签名文件</span>
          <span v-else class="uploadFileBtn" @click="bindClick">{{uploadParams.filename}}</span>
          <input type="file" ref="file" @change="selectFile" style="display:none">
        </div>
      </div>




      <div class="inpTitl" v-if="uploadFlag">交易信息</div>


      <div class="singsWrap" v-if="uploadFlag">

        <div class="signListWrap">
          <span>交易类型:</span>
          <div>{{uploadFileDetail.tx_type|transactionTextByType}}</div>
        </div>

        <div class="signListWrap">
          <span>资产类型:</span>
          <div>{{uploadFileDetail.asset_name}}</div>
        </div>

        <div class="signListWrap">
          <span>资产ID:</span>
          <div>{{uploadFileDetail.asset_id}}</div>
        </div>

        <div class="signListWrap">
          <span>从：</span>
          <div>
            <div
            	v-for="(item,index) in uploadFileDetail.from"
            	:key="index">
            	{{item.Address||'--'}}（{{item.account||'--'}})
            </div>
          </div>
        </div>

        <div class="signListWrap">
          <span>到：</span>
          <div>
            <div
            	v-for="(item,index) in uploadFileDetail.to"
            	:key="index">
            	{{item.Address||'--'}}（{{item.account||'--'}})
            </div>
          </div>
        </div>

        <div class="signListWrap">
          <span>需要签名:</span>
          <div>{{uploadFileDetail.need_signnum}}</div>
        </div>

        <div class="signListWrap">
          <span>已完成签名:</span>
          <div>{{uploadFileDetail.complete_signnum}}</div>
        </div>

      </div>


       <div class="inpItemWrap" v-if="uploadFlag">
         <div>
           <span>密码</span>
           <el-input
            v-model="uploadParams.password"
            placeholder="请输入密码"
            autocomplete="new-password"
            type="password"></el-input>
         </div>

       </div>

       <div class="inpItemWrap" v-if="uploadFlag">
         <div>
           <span></span>
            <span :class="['submit', !submitFlag ? 'loadingBtn' : '']" @click="signFn">{{isTxFlag?'提交交易':'生成签名文件'}}</span>
         </div>

       </div>

    </div>




	</div>
</template>

<script>
	import { signUpload, sign } from '@/util/server.js'

	import Vue from 'vue';
	import { Row, Col, Input } from 'element-ui';

	Vue.use(Row);
	Vue.use(Col);
	Vue.use(Input);


	export default {
		created(){
			var accountInfo = this.getLocalAccountInfo()
			var account_id = accountInfo.account_id;
			var account_type = accountInfo.account_type;
			var user_name = localStorage.USERTOKEN;

			this.uploadParams.account_id = account_id;
			this.uploadParams.account_type = account_type;
			this.uploadParams.user_name = user_name;

		},
		data(){
			return {
				uploadFlag:false,
				uploadFileDetail:{},

				isTxFlag:false,
				uploadParams:{
					filename:'',
					signfile:'',
					password:''
				},
        submitFlag:true,


			}
		},
		methods:{
      bindClick(){
        this.$refs.file.click()
      },
			selectFile(e){


				var  target= e.target
				var file = target.files[0];
				this.uploadParams.filename = file.name;
				this.uploadParams.signfile = file;

				var formdata = new FormData();
				formdata.append('signfile',this.uploadParams.signfile)
				formdata.append('user_name',this.uploadParams.user_name)
				formdata.append('account_id',this.uploadParams.account_id)
				formdata.append('account_type',this.uploadParams.account_type)



				signUpload.bind(this)(formdata)
					.then(({data})=>{

						if(data.status=='success'){

							this.uploadFileDetail = data.data;

							var nums = this.uploadFileDetail.complete_signnum ? this.uploadFileDetail.complete_signnum.split('/') :[];
							var leftNum = parseInt(nums[0]);
							var rightNum = parseInt(nums[1]) ;
							this.isTxFlag = (rightNum - leftNum)==1

              this.uploadFlag = true;
						}else{
							this.$message({
								type:'error',
								message:data.error
							})
						}

					})
			},
			signFn(){
				var formdata = new FormData();
				formdata.append('signfile',this.uploadParams.signfile)
				formdata.append('user_name',this.uploadParams.user_name)
				formdata.append('account_id',this.uploadParams.account_id)
				formdata.append('account_type',this.uploadParams.account_type)
				formdata.append('password',this.uploadParams.password)

        if(!this.submitFlag){
          return;
        }
        this.submitFlag = false;

				sign.bind(this)(formdata)
					.then(({data})=>{
             this.submitFlag = true;
            if(data.status === 'error'){
              this.$message({
              	type:'error',
              	message:data.error
              })
            }else{
              if(this.isTxFlag){

              	this.$message({
              		type:'success',
              		message:'提交交易成功'
              	})
              	setTimeout(()=>{
              		this.$router.go(-1);
              	},1500)

              }else{
                this.createSignFile(data)
              }

            }

						console.log(data,87797)
					})
          .catch(()=>{
             this.submitFlag = true;
          })
			}
		},
	}
</script>

<style lang="scss">
	.signatureWrap{

    .singsWrap{

      background: #f9f9f9;
      padding: 30px 30px 0;
      margin-bottom: 30px;
      .signListWrap{
        display:flex;
        padding-bottom:20px;
        line-height:20px;
        >span{
          width:100px;
        }
        >div{
          flex:1;
          flex-wrap: wrap;
        }
      }
    }

    .transferInpWrap{
      .uploadFileBtn{
        flex:1;
        text-align:center;
        border:2px dashed #324558;
        line-height: 40px;
        cursor: pointer;
        color: #324558;
      }
    }

		.signatureInpWrap{
			position:relative;
			>div{
				height:80px;
				border:2px dashed #888;
				text-align:center;
				line-height:80px;
				font-size:14px;
			}
			>input{
				position:absolute;
				left:0;
				right:0;
				top:0;
				bottom:0;
				opacity:0;
				width:100%;
				cursor:pointer;
			}
		}

		.signatureDetailWrap{
			.title{
				padding:30px 0 4px;
				font-size:14px;
				font-weight:bold;
			}
			.content{
				border:1px solid #888;
				padding:4px;
				>div{
					line-height:20px;
				}
			}
			.subBtn{
				margin-top:20px;
				background:$blue;
				color:#fff;
				font-size:13px;
				line-height:40px;
				border-radius:5px;
				text-align:center;
				cursor:pointer;
			}
		}
	}

</style>
