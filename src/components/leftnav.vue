<template>
	<div class="left_outerWrap hidden-xs-only">
		<div class="left_wrap">
				<router-link to="/main/assetWalletIndex">资产钱包</router-link>
				<router-link to="/main/consoleIndex">资产操作</router-link>
				<router-link to="/main/createAssetIndex">创建资产</router-link>
				<router-link to="/main/chainDeposit">链上存证</router-link>
				<router-link to="/main/addressManagementIndex">地址管理</router-link>
				<router-link to="/main/systemStatusIndex">系统状态</router-link>
				<div class="left_progressWrap">
					<div class="left_progressTextWrap">
						<div>区块同步中...</div>
						<div>连接数：14</div>
					</div>
					<div  class="left_progress">
						<el-progress :text-inside="true" :show-text="false" :stroke-width="18" :percentage="70"></el-progress>
						<div class="left_progressP">897898/2323 （70%）</div>
					</div>
				</div>
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
				
			}
		},
		created(){
			
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
    background:#f4f6f8;
    position:fixed;
    left:0;
    top:66px;
    bottom:0;
    z-index:10;
    transition:all .5s;
		padding-top:8px;
		min-height:400px;
    >a{
			display: block;
			text-align: center;
			font-size:14px;
			color:#222;
			line-height:40px;
			position:relative;
			transition:color .5s;
    }
    >a.Aactive{
      color:#5c6ac4;
    }
		
		>div{
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



