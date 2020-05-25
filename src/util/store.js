
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

let state = {
	accountAlias:localStorage.accountInfo
					? JSON.parse(localStorage.accountInfo).account_alias
					: '',

};

const mutations = {
	changeAccountAlias(state,account){
		state.accountAlias = account;
	},

};

// 事件触发后的逻辑操作
// 参数为事件函数
const actions = {


};

// 返回改变后的数值
const getters = {


};

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})
