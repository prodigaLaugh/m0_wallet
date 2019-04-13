
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
				{
					path:'walletIndex',
					component:resolve => require(['@/pages/walletManagement'], resolve),
					meta: {requiresAuth: true},
				},
				{
					path:'createAccount',
					component:resolve => require(['@/pages/walletManagement/createAccout'], resolve),
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
				{
					path:'recoveryMnemonic',
					component:resolve => require(['@/pages/walletManagement/recoveryMnemonic'], resolve),
					meta: {requiresAuth: true},
				},
				{
					path:'importBackup',
					component:resolve => require(['@/pages/walletManagement/importBackup'], resolve),
					meta: {requiresAuth: true},
				},
				{
					path:'backupType',
					component:resolve => require(['@/pages/walletManagement/backupType'], resolve),
					meta: {requiresAuth: true},
				},
				{
					path:'recordMnemonic',
					component:resolve => require(['@/pages/walletManagement/recordMnemonic'], resolve),
					meta: {requiresAuth: true},
				},
				{
					path:'verifyMnemonic',
					component:resolve => require(['@/pages/walletManagement/verifyMnemonic'], resolve),
					meta: {requiresAuth: true},
				},
				{
					path:'walletDetail',
					component:resolve => require(['@/pages/walletManagement/walletDetail'], resolve),
					meta: {requiresAuth: true},
				},
				
				// 资产钱包
				{
					path:'assetWalletIndex',
					component:resolve => require(['@/pages/assetWallet'], resolve),
					meta: {requiresAuth: true},
				},
				{
					path:'receiveTransfer',
					component:resolve => require(['@/pages/assetWallet/receiveTransfer'], resolve),
					meta: {requiresAuth: true},
				},
				{
					path:'transactionRecord',
					component:resolve => require(['@/pages/assetWallet/transactionRecord'], resolve),
					meta: {requiresAuth: true},
				},
				
				// 控制台
				{
					path:'assetManagementIndex',
					component:resolve => require(['@/pages/assetManagement'], resolve),
					meta: {requiresAuth: true},
				},
				{
					path:'transfer',
					component:resolve => require(['@/pages/assetManagement/transfer'], resolve),
					meta: {requiresAuth: true},
				},
				{
					path:'signature',
					component:resolve => require(['@/pages/assetManagement/signature'], resolve),
					meta: {requiresAuth: true},
				},
				{
					path:'issue',
					component:resolve => require(['@/pages/assetManagement/issue'], resolve),
					meta: {requiresAuth: true},
				},
				{
					path:'destroy',
					component:resolve => require(['@/pages/assetManagement/destroy'], resolve),
					meta: {requiresAuth: true},
				},
				
				//资产管理
				{
					path:'createAssetIndex',
					component:resolve => require(['@/pages/createAsset'], resolve),
					meta: {requiresAuth: true},
				},
				{
					path:'createAsset',
					component:resolve => require(['@/pages/createAsset/createAsset'], resolve),
					meta: {requiresAuth: true},
				},
				{
					path:'editAsset',
					component:resolve => require(['@/pages/createAsset/editAsset'], resolve),
					meta: {requiresAuth: true},
				},
				{
					path:'assetDetail',
					component:resolve => require(['@/pages/createAsset/assetDetail'], resolve),
					meta: {requiresAuth: true},
				},

				// 链上存证
				{
					path:'chainDeposit',
					component:resolve => require(['@/pages/chainDeposit'], resolve),
					meta: {requiresAuth: true},
				},
				{
					path:'uploadDeposit',
					component:resolve => require(['@/pages/chainDeposit/uploadDeposit'], resolve),
					meta: {requiresAuth: true},
				},
				{
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
				// 系统状态
				{
					path:'systemStatusIndex',
					component:resolve => require(['@/pages/systemStatus'], resolve),
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