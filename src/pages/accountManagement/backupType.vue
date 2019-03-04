<template>
	<div class="outerWrap backupTypeWrap">
		<div class="commonTitle_one">
			账户管理
			<span>
				<i class="el-icon-arrow-right"></i>
				<span>备份账户</span>
			</span>
		</div>
			
		<div class="commonTitle_two">
			备份Account1
			<span>返回</span>
		</div>
		
		<div class="backupTypeContentWrap">
			<div class="title">请选择备份方式</div>
			<div class="backupTypeContent">
				<div @click="$router.push('/main/recordMnemonic')">
					<span>助记词备份</span>
				</div>
				<div>
					<span>文件备份</span>
				</div>
			</div>
		</div>
		
		
	</div>
</template>

<script>
	
	

	
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

<style lang="scss" scoped>
	.backupTypeWrap{
		.backupTypeContentWrap{
			.backupTypeContent{
				display:flex;
				padding-top:10px;
				>div{
					background:rgba(215, 215, 215, 1);
					height:163px;
					text-align:center;
					flex:1;
					cursor:pointer;
					>span{
						background:url(../../assets/account/backupTypeIcon1.png) no-repeat left center;
						line-height:163px;
						display:inline-block;
						font-size:18px;
					}
					&:nth-of-type(1){
						margin-right:30px;
						>span{
							background-size:50px 41px;
							padding-left:70px;
						}
					}
					&:nth-of-type(2){
						>span{
							background-image:url(../../assets/account/backupTypeIcon2.png);
							background-size:43px 44px;
							padding-left:63px;
						}
					}
				}
			}
			
		}
	}
	
	
</style>