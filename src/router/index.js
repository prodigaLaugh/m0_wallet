
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

import {setCookie, getCookie, delCookie } from '@/util/cookie'


//login
import Login from '@/pages/login'


let token = getCookie('USERTOKEN');
let autoLogin = getCookie('autoLogin');
if(token){
	let hour = autoLogin == 'true' ? 24*3 : 24;
	delCookie('USERTOKEN')
	setCookie('USERTOKEN',token,hour)

	delCookie('autoLogin')
	setCookie('autoLogin',autoLogin,hour)
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
					meta: {},
				},
				
				// 账户管理
				{
					path:'walletIndex',
					component:resolve => require(['@/pages/walletManagement'], resolve),
					meta: {},
				},
				{
					path:'createAccount',
					component:resolve => require(['@/pages/walletManagement/createAccout'], resolve),
					meta: {},
				},
				{
					path:'createWalletM',//创建多签钱包
					component:resolve => require(['@/pages/walletManagement/createMoresignWallet'], resolve),
					meta: {},
				},
				{
					path:'createWalletS',//创建单签钱包
					component:resolve => require(['@/pages/walletManagement/createSinglesignWallet'], resolve),
					meta: {},
				},
				{
					path:'recoveryMnemonic',
					component:resolve => require(['@/pages/walletManagement/recoveryMnemonic'], resolve),
					meta: {},
				},
				{
					path:'importBackup',
					component:resolve => require(['@/pages/walletManagement/importBackup'], resolve),
					meta: {},
				},
				{
					path:'backupType',
					component:resolve => require(['@/pages/walletManagement/backupType'], resolve),
					meta: {},
				},
				{
					path:'recordMnemonic',
					component:resolve => require(['@/pages/walletManagement/recordMnemonic'], resolve),
					meta: {},
				},
				{
					path:'verifyMnemonic',
					component:resolve => require(['@/pages/walletManagement/verifyMnemonic'], resolve),
					meta: {},
				},
				{
					path:'walletDetail',
					component:resolve => require(['@/pages/walletManagement/walletDetail'], resolve),
					meta: {},
				},
				
				// 资产钱包
				{
					path:'assetWalletIndex',
					component:resolve => require(['@/pages/assetWallet'], resolve),
					meta: {},
				},
				{
					path:'receiveTransfer',
					component:resolve => require(['@/pages/assetWallet/receiveTransfer'], resolve),
					meta: {},
				},
				{
					path:'transactionRecord',
					component:resolve => require(['@/pages/assetWallet/transactionRecord'], resolve),
					meta: {},
				},
				
				// 控制台
				{
					path:'consoleIndex',
					component:resolve => require(['@/pages/console'], resolve),
					meta: {},
				},
				{
					path:'transfer',
					component:resolve => require(['@/pages/console/transfer'], resolve),
					meta: {},
				},
				{
					path:'signature',
					component:resolve => require(['@/pages/console/signature'], resolve),
					meta: {},
				},
				{
					path:'issue',
					component:resolve => require(['@/pages/console/issue'], resolve),
					meta: {},
				},
				{
					path:'destroy',
					component:resolve => require(['@/pages/console/destroy'], resolve),
					meta: {},
				},
				
				//资产管理
				{
					path:'assetManagementIndex',
					component:resolve => require(['@/pages/assetManagement'], resolve),
					meta: {},
				},
				{
					path:'createAsset',
					component:resolve => require(['@/pages/assetManagement/createAsset'], resolve),
					meta: {},
				},
				{
					path:'editAsset',
					component:resolve => require(['@/pages/assetManagement/editAsset'], resolve),
					meta: {},
				},
				{
					path:'assetDetail',
					component:resolve => require(['@/pages/assetManagement/assetDetail'], resolve),
					meta: {},
				},

				// 链上存证
				{
					path:'chainDeposit',
					component:resolve => require(['@/pages/chainDeposit'], resolve),
					meta: {},
				},
				{
					path:'uploadDeposit',
					component:resolve => require(['@/pages/chainDeposit/uploadDeposit'], resolve),
					meta: {},
				},
				{
					path:'depositDetail',
					component:resolve => require(['@/pages/chainDeposit/depositDetail'], resolve),
					meta: {},
				},
				
				
				// 地址管理
				{
					path:'addressManagementIndex',
					component:resolve => require(['@/pages/addressManagement'], resolve),
					meta: {},
				},
				// 系统状态
				{
					path:'systemStatusIndex',
					component:resolve => require(['@/pages/systemStatus'], resolve),
					meta: {},
				},
				
				
				{
					path:'',
					redirect:'accountIndex'
				}
				
			]
		},
		
		{
			path:'',
			redirect:'/login'
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



// router.beforeEach((to, from, next) => {
// 	const USERTOKEN=window.localStorage.USERTOKEN;
// 	if (to.matched.some(record => record.meta.requiresAuth)) {
// // 		if (!USERTOKEN) {
// // 			next({
// // 				path: '/login',
// // 				query: { redirect: to.fullPath }
// // 			})
// // 	    } else {
// // 	      	next()
// // 		}
// 		next()
// 	} else {
// 	    next() // 确保一定要调用 next()
// 	}
// })

export default router;