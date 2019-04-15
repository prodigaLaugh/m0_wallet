
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

let state = {
	accountAlias:localStorage.accountInfo
					? JSON.parse(localStorage.accountInfo).account_alias
					: '',
	systemStatus:{},
			
   
};

const mutations = {
	changeAccountAlias(state,account){
		state.accountAlias = account;
	},
	changeSystemStatus(state,content){
		state.systemStatus = content;
	},
    
};

// 事件触发后的逻辑操作
// 参数为事件函数
const actions = {
    changeLogin(context,flag){
    	context.commit('login',flag);
    },
   
};

// 返回改变后的数值
const getters = {
	loginWrapFlag(context){
		return context.loginWrapFlag;
	},
    isLogin(context){
    	return context.isLogin
    },
    userInfo(context){
    	return context.userInfo;
    },
    commonTipsFlag(context){
        return context.commonTipsFlag;
    },
    commonTipsText(context){
        return context.commonTipsText;
    },
    userCitys(context){
        return context.userCitys;
    }
   
};

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})