<template>
	<div class="app-content" v-cloak>
		<router-view />
	</div>
</template>

<style lang="scss">
	@import url("../css/reset.css");
	@import url("../css/common.css");
  .paginationWrap{
    text-align:right;
  }
	.noresult{
		padding-left:15px;
		line-height:50px;
		font-size:14px;
	}
	//弹窗内容样式
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
	// 一级标题样式
	.commonTitle_one{
		font-size:24px;
		font-weight:bold;
		color:#333;
		padding:40px 0 20px;
		display:flex;
		align-items:flex-end;
		position:relative;
		>span{
			display:flex;
			align-items: flex-end;
			i{
				font-size:16px;
				font-weight:bold;
			}
			span{
				font-size:16px;
				font-weight:normal;
			}
		}
		>div{
			position:absolute;
			right:0;
			bottom:0;
			line-height:32px;
			padding:0 30px;
			background:#5c6ac4;
			border-radius:5px;
			color:#fff;
			font-size:13px;
			cursor:pointer;
		}
	}
	// 二级标题
	.commonTitle_two{
		font-size:18px;
		padding:20px 0;
		display:flex;
		justify-content: space-between;
		align-items: center;
		>span,
		>div>span{
			line-height:32px;
			padding:0 30px;
			background:#5c6ac4;
			border-radius:5px;
			color:#fff;
			font-size:13px;
			cursor:pointer;
		}
		>div{
			display:flex;
			justify-content: flex-end;
			>span{
				margin-left:20px;
			}
		}
	}

	// 导航样式
	.contentNavWrap{
		border-bottom:1px solid #333;
		padding-bottom:8px;
		
		>span{
			font-size:16px;
			font-weight:650;
			margin-right:30px;
			cursor:pointer;
			padding-top:10px;
			position:relative;
			transition:all .5s;
			&.active{
				color:$blue;
				&:after{
					background-color:$blue;
				}
			}
			&:after{
				content:'';
				position:absolute;
				left:0;
				right:0;
				bottom:-6px;
				height:4px;
				background:none;
			}
		}
	}
	
	
	// 地址管理列表
	.addressManagementIndexListWrap{
		background:#ddd;
		padding:20px 30px 30px;
		margin-bottom:20px;
		>div{
			height:80px;
			display:flex;
			&.addressManagementIndexListLeft{
				flex-direction: column;
				justify-content: space-between;
				>div{
					&:nth-of-type(1){
						font-size:18px;
					}
					&:nth-of-type(2){
						display:flex;
						align-items:center;
						>span{
							font-size:16px;
							color:#888;
						}
						>div{
							>span{
								border-radius:5px;
								padding:4px 10px;
								background:#888;
								color:#fff;
								margin-right:4px;
							}
						}
					}
				}
			}
			
			&.addressManagementIndexListRight{
				align-items: center;
				justify-content: flex-end;
				>div{
					display:flex;
					align-items: center;
					>span{
						padding-top:50px;
						background:url(../assets/address/addressIcon1.png) no-repeat center top;
						background-size:36px;
						margin-left:20px;
						color:$blue;
						font-size:13px;
						&:nth-of-type(2){
							background-image:url(../assets/address/addressIcon2.png);
						}
						&:nth-of-type(3){
							background-image:url(../assets/address/addressIcon3.png);
						}
					}
				}
			}
			
		}
		
	}
	
	// 交易记录样式
	.consoleListsWrap{
		.consoleListWrap{
			margin-bottom:30px;
			.inner>div{
				border:1px solid #ddd;
				margin-top:-1px;
				padding:0 10px;
				font-size:13px;
				
				&.consoleListIDWrap{
					>div{
						&:nth-of-type(1){
							display:flex;
							align-items: center;
							height:44px;
							>span{
								&:nth-of-type(1){
									font-weight:bold;
								}
								&:nth-of-type(2){
									margin-left:4px;
									margin-right:30px;
									border:1px solid #ddd;
									width:200px;
									line-height:18px;
									border-radius:4px;
									overflow:hidden;
									white-space: nowrap;
									text-overflow: ellipsis;
									padding:0 10px;
								}
								&:nth-of-type(3){
									&.error,
									&.going{
										background:none;
										padding-right:4px;
										i{
											font-size: 14px;
											font-weight: bold;
										}
									}
									&.error{
										i{
											color:red;
										}
									}
									&.going{
										i{
											color:green;
										}
									}
									background:url(../assets/console/confirmIcon.png) no-repeat right center;
									padding-right:20px;
									line-height:16px;
									opacity: .5;
								}
							}
						}
						&:nth-of-type(2){
							line-height:44px;
						}
					}
					
				}
				
				&.consoleList_list{
					>div{
						line-height:44px;
						&:nth-of-type(1){
							>span{
								padding-left:25px;
								background:url(../assets/console/transferIcon1.png) no-repeat left center;
								background-size:17px 20px;
								&.out{
									background-image:url(../assets/console/transferIcon2.png);
									background-size:24px 25px;
								}
								&.sign{
									background-image:url(../assets/console/transferIcon3.png);
									background-size:16px;
								}
								&.issue{
									background-image:url(../assets/console/transferIcon4.png);
									background-size:16px;
								}
								&.retire{
									background-image:url(../assets/console/transferIcon5.png);
									background-size:16px 17px;
								}
							}
						}
						&:nth-of-type(2){
							display:flex;
							align-items: center;
							>span{
								&:nth-of-type(1){
									width:100px;
									color:#999;
									text-align:right;
									padding-right:20px;
								}
							}
						}
					}
				}
			}
		}
	}
	
	// 转账 发行列表样式
	.transferInpListsWrap{
		>div{
			padding-bottom:20px;
			.transferInpListLeft{
				font-size:13px;
				padding-bottom:4px;
			}
			.transferInpListRadioWrap{
				padding-top:10px;
			}
			.el-select{
				width:100%;
			}
			.transferAccoutItem{
				color:#999;
				font-size:13px;
			}
			.transferAccoutItemBtn{
				color:#fff;
				background:$blue;
				height:40px;
				text-align:center;
				line-height:40px;
				border-radius:5px;
				font-size:13px;
			}
			
			.signaturedAccountWrap{
				border:1px solid #ddd;
				height:400px;
				overflow-y:auto;
				background:#f1f1f1;
				font-size:13px;
				.signaturedAccountAdd,
				.signaturedAccountListWrap{
					height:48px;
				}
				.signaturedAccountListsWrap{
					.signaturedAccountListWrap{
						display:flex;
						border:3px solid #888;
						align-items:center;
						padding:0 20px;
						justify-content: space-between;
						margin-top:-3px;
						&:nth-of-type(1){
							margin-top:0;
						}
						// background:#fff;
						>div:nth-of-type(2){
							display:flex;
							>span{
								margin-left:20px;
								cursor:pointer;
								&:nth-of-type(1){
									color:$blue;
								}
								&:nth-of-type(2){
									color:red;
								}
							}
						}
					}
				}
				.signaturedAccountAdd{
					border:3px dashed #888;
					line-height:48px;
					text-align:center;
					cursor:pointer;
				}
			}
		}
		
	}

	// 登录注册样式
	.loginWrap{
		width:100%;
		height:100%;
		display:flex;
		justify-content: center;
		align-items: center;

		.loginContainer{
			border:1px solid #666;
			background:#fff;
			display:flex;
			flex-direction: column;
			align-items: center;
			width:500px;

			.loginTitle{
				font-size:20px;
				padding:20px 0 10px;
			}

			.loginDescription{
				color:#333;
				padding-bottom:20px;
			}

			.loginInpWrap{
				width:400px;
				display:flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom:10px;
				>span{
					width:80px;
					font-size:14px;
				}
				input{
					flex:1;
					border:1px solid #ddd;
					padding-left:8px;
				}
				label{
					flex:1;
					display:flex;
					align-items: center;
					
				}
				>div{
					display:flex;
					flex:1;
					align-items: center;
					>input{
						margin-right:10px;
					}
					>div div{
						width:114px;
						@include pointer;
					}
				}
			}

		}
		.loginBtnWrap{
			display:flex;
			justify-content: space-between;
			width:400px;
			>div{
				width:140px;
				height:40px;
				background:rgba(22, 155, 213, 1);
				text-align:center;
				line-height:40px;
				color:#fff;
				margin-bottom:20px;
				font-size:16px;
				margin-top:20px;
				border-radius:5px;
				@include pointer;
			}
		}
		
	}


	//头部
	.commonHeaderWrap{
		.dialogContentWrap{
			.title{
				line-height:20px;
			}
			.visitSelectWrap{
				.visitBtn{
					padding:12px 20px;
					line-height:14px;
					font-size:14px;
					border:1px solid #666;
					@include pointer;
					text-align:center;
					border-radius:5px;
				}
			}
			.visitcodeWrap{
				background:#eee;
				padding:10px 15px;
				line-height:30px;
				margin-top:20px;
				.tag-read{
					margin-left:30px;
				}
			}
			
		}
	}
	// 创建 编辑资产样式
	.createAssetWrap,.transferWrap{
		.createAssetBtn{
			width:264px;
			height:40p;
			line-height:40px;
			text-align:center;
			border-radius:5px;
			background:$blue;
			margin:0 auto;
			color:#fff;
			font-size:13px;
		}
		.paraWrap{
			background:#eee;
			margin-top:-20px;
			padding:20px;
			.top{
				padding-bottom:8px;
			}
			.btn{
				line-height:40px;
				color:red;
			}
			.addBtn{
				>div{
					text-align:center;
					.addBtnWrap{
						border:1px solid #999;
						border-radius:5px;
						line-height:30px;
						text-align:center;
						width:240px;
						margin: 20px auto 0;
						display:inline-block;
						font-size:14px;
						@include pointer;
					}
				}
				
			}
		}
	}
	

	
</style>



