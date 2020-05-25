<template>
	<div class="left_outerWrap hidden-xs-only">
		<div class="left_wrap">
        <div class="logWrap">
          <img src="../assets/leftIcon.png" alt="">
          <div>WALLET</div>
        </div>
        <div class="leftTitle">{{accountAlias}}</div>

				<router-link to="/main/assetWalletIndex">资产钱包</router-link>
				<router-link to="/main/assetManagementIndex">资产操作</router-link>
				<router-link to="/main/createAssetIndex">创建资产</router-link>
				<router-link to="/main/addressManagementIndex">地址管理</router-link>
        <router-link to="/main/chainDeposit">可信存证</router-link>
				
				
		</div>
	</div>


</template>
<script>
	import Vue from 'vue';
	import {Progress} from 'element-ui';

	Vue.use(Progress);

	export default{
		data(){
			return {
				listeningLength:0,
			}
		},
//
		computed: {
      accountAlias () {
        return this.$store.state.accountAlias
        // 或者 return this.$store.getter.count2
      }
		},



	}
</script>

<style lang="scss" scoped>
.left_outerWrap{
	width:200px;
	min-height:500px;
	overflow-y:auto;
}
.left_wrap{
    width:200px;
    background:$blackBg;
    position:fixed;
    left:0;
    top:69px;
    bottom:0;
    z-index:10;
    transition:all .5s;
		padding-top:8px;
		min-height:400px;
    text-align:center;
    overflow-y:auto;
    &:before{
      content:'';
      position:absolute;
      right:10px;
      top:300px;
      background:url(../assets/leftNavBg.png) no-repeat center;
      width:150px;
      height:150px;
      background-size:cover;
      transform: rotate(-30deg);
      opacity:.8;
    }

    .logWrap{
      padding:26px 0 0;
      img{
        height:24px;
      }
      >div{
        color:#fff;
        font-size:12px;
        opacity:.8;
        padding-top:4px;
      }
    }
    .leftTitle{
      padding:30px 0 40px;
      color:#fff;
      font-size:24px;
      line-height:24px;
      overflow:hidden;
    }
    >a{
			display: block;
			text-align: center;
			font-size:12px;
			color:#fff;
			line-height:60px;
			position:relative;
			transition:color .5s;
    }
    >a.Aactive{
      position:relative;
      font-size:16px;
      &:after{
        content:'';
        position:absolute;
        left:50%;
        transform: translate(-50%,0);
        width:42px;
        bottom:10px;
        height:2px;
        background:#fff;
      }
    }

		>.left_progressWrap{
			position:absolute;
			left:0;
			right:0;
			padding:0 30px;
			bottom:40px;
			color:#333;
			.left_progressTextWrap{
				padding-bottom:15px;
				div:nth-of-type(1){
					padding-bottom:6px;
				}
			}
			.left_progress{
				.left_progressP{
					padding-top:15px;
				}
			}
		}
}
</style>
