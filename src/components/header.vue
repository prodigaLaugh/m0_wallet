<template>
  <div  class="commonHeaderWrap">
      <div class="commonHeader">
				<div class="left">logo</div>
				
				<div class="right hidden-xs-only">
					<div class="title">Account1</div>
					<div 
						class="set"
						@click="$router.push('/main/accountIndex')">
						<span class="el-icon-setting"></span>
						账户管理
					</div>
				</div>
				
			</div>
		
  </div>
</template>
<script>
export default {
		data(){
			return {
				
			}
		}
}
</script>

<style lang="scss" scoped>
  .commonHeaderWrap{
    height:66px;
		.commonHeader{
			position:fixed;
			left:0;
			right:0;
			top:0;
			background:$blue;
			display:flex;
			z-index:10;
			
			.left{
				width:200px;
				line-height:66px;
				color:#fff;
				font-size:24px;
				padding-left:20px;
			}
			
			.right{
				flex:1;
				display:flex;
				justify-content: space-between;
				align-items:center;
				.title{
					padding-left:40px;
					color:#fff;
					font-size:24px;
				}
				.set{
					font-size:14px;
					color:#fff;
					display:flex;
					align-items:center;
					padding-right:30px;
					height:66px;
					cursor:pointer;
					
					span{
						font-size:30px;
						padding-right:10px;
					}
				}
			}
		}
    
  }
</style>

