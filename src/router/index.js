
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

import {setCookie, getCookie, delCookie } from '@/util/cookie'


//login
import Login from '@/pages/login'


let token = getCookie('USERTOKEN');
let autoLogin = getCookie('autoLogin');
var redirectUrl = '/login'
if(token){
	redirectUrl = '/main'
}

//路由配置
const router=new VueRouter({
	mode:'history',
	linkActiveClass:'Aactive',
	routes:[
		{
			path:'/login',//登录
			component:resolve => require(['@/pages/login'], resolve),
		},
		{
			path:'/regiser',//注册
			component:resolve => require(['@/pages/regiser'], resolve),
		},
		{
			path:'/main',
			component: resolve => require(['@/pages/main'], resolve),
			meta: {
				// requiresAuth: true
			},
			children:[
				// 秘钥管理
				{
					path:'privatekeyManagement',
					component:resolve => require(['@/pages/privatekeyManagement'], resolve),
					meta: {requiresAuth: true},
				},

				// 账户管理
				{//列表
					path:'walletIndex',
					component:resolve => require(['@/pages/walletManagement'], resolve),
					meta: {requiresAuth: true},
				},

				{
					path:'createWalletM',//创建多签钱包
					component:resolve => require(['@/pages/walletManagement/createMoresignWallet'], resolve),
					meta: {requiresAuth: true},
				},
				{
					path:'createWalletS',//创建单签钱包
					component:resolve => require(['@/pages/walletManagement/createSinglesignWallet'], resolve),
					meta: {requiresAuth: true},
				},
				{//钱包详情
					path:'walletDetail',
					component:resolve => require(['@/pages/walletManagement/walletDetail'], resolve),
					meta: {requiresAuth: true},
				},

				// 资产钱包
				{//列表
					path:'assetWalletIndex',
					component:resolve => require(['@/pages/assetWallet'], resolve),
					meta: {requiresAuth: true},
				},
				{//接收转账
					path:'receiveTransfer',
					component:resolve => require(['@/pages/assetWallet/receiveTransfer'], resolve),
					meta: {requiresAuth: true},
				},
				{//交易记录
					path:'transactionRecord',
					component:resolve => require(['@/pages/assetWallet/transactionRecord'], resolve),
					meta: {requiresAuth: true},
				},

				// 资产操作
				{//列表
					path:'assetManagementIndex',
					component:resolve => require(['@/pages/assetManagement'], resolve),
					meta: {requiresAuth: true},
				},
				{//转账
					path:'transfer',
					component:resolve => require(['@/pages/assetManagement/transfer'], resolve),
					meta: {requiresAuth: true},
				},
				{//签名
					path:'signature',
					component:resolve => require(['@/pages/assetManagement/signature'], resolve),
					meta: {requiresAuth: true},
				},
				{//发行
					path:'issue',
					component:resolve => require(['@/pages/assetManagement/issue'], resolve),
					meta: {requiresAuth: true},
				},
				{//销毁
					path:'destroy',
					component:resolve => require(['@/pages/assetManagement/destroy'], resolve),
					meta: {requiresAuth: true},
				},

				//资产管理
				{//资产列表
					path:'createAssetIndex',
					component:resolve => require(['@/pages/createAsset'], resolve),
					meta: {requiresAuth: true},
				},
				{//创建资产
					path:'createAsset',
					component:resolve => require(['@/pages/createAsset/createAsset'], resolve),
					meta: {requiresAuth: true},
				},
				{//资产详情
					path:'assetDetail',
					component:resolve => require(['@/pages/createAsset/assetDetail'], resolve),
					meta: {requiresAuth: true},
				},

				// 可信存证
				{//存证列表
					path:'chainDeposit',
					component:resolve => require(['@/pages/chainDeposit'], resolve),
					meta: {requiresAuth: true},
				},
				{//上传存证
					path:'uploadDeposit',
					component:resolve => require(['@/pages/chainDeposit/uploadDeposit'], resolve),
					meta: {requiresAuth: true},
				},
				{//存证详情
					path:'depositDetail',
					component:resolve => require(['@/pages/chainDeposit/depositDetail'], resolve),
					meta: {requiresAuth: true},
				},


				// 地址管理
				{
					path:'addressManagementIndex',
					component:resolve => require(['@/pages/addressManagement'], resolve),
					meta: {requiresAuth: true},
				},



				{
					path:'',
					redirect:'assetWalletIndex'
				}

			]
		},

		{
			path:'',
			redirect:redirectUrl
		}

	],
	scrollBehavior (to, from, savedPosition) {
	  if (savedPosition) {
	    return savedPosition
	  } else {
	    return { x: 0, y: 0 }
	  }
	},
})



router.beforeEach((to, from, next) => {
	const USERTOKEN=getCookie('USERTOKEN');
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (!USERTOKEN) {
			next({
				path: '/login',
				query: { redirect: to.fullPath }
			})
	    } else {
	      	next()
		}

	} else {
	    next() // 确保一定要调用 next()
	}
})

export default router;
