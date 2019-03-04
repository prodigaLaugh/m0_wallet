
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

let state = {
	loginWrapFlag:false,
    isLogin:window.localStorage.isLogin
    			?true
    			:false,
    userInfo:window.localStorage.userInfo
    			?JSON.parse(window.localStorage.userInfo)
                :{},
    commonTipsFlag:false,
    commonTipsText:'',
    userCitys:window.localStorage.USERPROVINCE
                ?JSON.parse(window.localStorage.USERPROVINCE)
                :{},
};

const mutations = {
	changeLoginFlag(state,flag){
		state.loginWrapFlag=flag;
	},
    login(state,flag){
        state.isLogin=flag;
    },
    getUserInfo(state,data){
    	state.userInfo=data;
    }
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