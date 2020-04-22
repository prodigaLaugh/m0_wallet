import Vue from 'vue'
import http from '@/util/http.js'
Vue.use(http);

const USERTOKEN = localStorage.USERTOKEN ? localStorage.USERTOKEN : '';

const baseParams = {
	user_name:USERTOKEN,
	token:'',
	username:USERTOKEN,
}

//资产接口
export async function  getAssetLists(para){//资产列表  formdata
	let url = `/v1/asset/list`;
	let result = await this.$http.post(url, para )
	return result;
}
export async function  getMyAssetLists(para){//发行列表  formdata
	let url = `/v1/asset/may_issue_list`;
	let result = await this.$http.post(url, para )
	return result;
}
export async function  getAssetTypes(para){//资产操作里资产类型列表
	let url = `/v1/asset/type_list`;
	let result = await this.$http.post(url, para )
	return result;
}
export async function  getAssetSignTypes(para){//资产操作里 签名的资产类型列表
	let url = `/v1/asset/type_list_sign`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}


export async function  createAsset(para){//创建资产
	let url = `/v1/asset/create`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}

export async function  deleteAsset(id){//删除资产
	let url = `/v1/asset/${id}`;
	let result = await this.$http.delete(url )
	return result;
}
export async function  getAssetInfo(para){//资产详情 formdata
	let url = `/v1/asset/detail`;
	let result = await this.$http.post(url,  para )
	return result;
}
export async function  editAsset(para){//编辑资产
	let url = `/v1/asset/update`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}



//存证接口
export async function  uploadEvidence(para){//上传存证
	let url = `/v1/evidence/upload`;
	let result = await this.$http.post(url, para )
	return result;
}
export async function  getEvidenceLists(id){//存证列表
	let url = `/v1/evidence/get_list/${id}`;
	let result = await this.$http.get(url )
	return result;
}
export async function  getEvidenceDetail(id){//存证详情
	let url = `/v1/evidence/get/${id}`;
	let result = await this.$http.get(url )
	return result;
}
export async function  evidenceDownload(para){//文件下载
	let url = `/v1/evidence/downlod`;
	let result = await this.$http.post(url, para,{responseType: 'blob'})
	return result;
}
export async function  evidenceVerifyFile(para){//校验文件
	let url = `/v1/evidence/verify`;
	let result = await this.$http.post(url, para)
	return result;
}


//生成邀请码接口
export async function  generateInviteCode(para){
	let url = `/v1/user/generate_invite_code`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}

//登录接口
export async function  login(para){
	let url = `/v1/user/log_in`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}


//秘钥管理接口
export async function  getPrivateKeyLists(para){//列表
	let url = `/v1/key/list`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}
export async function  createPrivateKey(para){//创建
	let url = `/v1/key/create`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}
export async function  queryPersonByxPub(para){//根据公钥查询创建人
	let url = `/v1/key/belong_user`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}



//地址管理
export async function  getAddressLists(para){//列表
	let url = `/v1/address/list`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}
export async function  createAddress(para){//创建
	let url = `/v1/address/create`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}

//钱包管理
export async function  getAccountLists(para){//列表
	let url = `/v1/account/list`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}
export async function  getAccountDetail(para){//钱包详情
	let url = `/v1/account/detail`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}
export async function  createSingleWallet(para){//创建单签钱包
	let url = `/v1/account/create_single_sign`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}
export async function  createMultiWallet(para){//创建多签钱包
	let url = `/v1/account/create_multi_sign`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}
export async function  loadWallet(para){//载入钱包
	let url = `/v1/account/load`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}
export async function  deleteWallet(para){//删除钱包
	let url = `/v1/account/delete`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}




//资产操作接口
export async function  issueMultsign(para){//发行多签
	let url = `/v1/mulsign/issue`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}
export async function  issueSinglesign(para){//发行单签
	let url = `/v1/singlesign/issue`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}
export async function  transferMultsign(para){//转账多签
	let url = `/v1/mulsign/transfer`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}
export async function  transferSinglesign(para){//转账单签
	let url = `/v1/singlesign/transfer`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}

export async function  queryAssetAmount(para){//查询资产余额
	let url = `/v1/asset/address_balance`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}

export async function  signUpload(para){//签名文件上传
	let url = `/v1/mulsign/sign_detail`;
	let result = await this.$http.post(url, para )
	return result;
}
export async function  sign(para){//签名
	let url = `/v1/mulsign/sign`;
	let result = await this.$http.post(url, para )
	return result;
}
export async function  retireMultsign(para){//销毁多签
	let url = `/v1/mulsign/retire`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}
export async function  retireSinglesign(para){//销毁单签
	let url = `/v1/singlesign/retire`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}
export async function  transferRecord(para){//转账列表
	let url = `/v1/opt_record/transfer`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}
export async function  signRecord(para){//签名列表
	let url = `/v1/opt_record/sign`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}
export async function  issueRecord(para){//发行列表
	let url = `/v1/opt_record/issue`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}
export async function  retireRecord(para){//销毁列表
	let url = `/v1/opt_record/retire`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}


//资产钱包接口
export async function  getAssetWalletLists(para){//列表
	let url = `/v1/asset/my_asset`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}
export async function  getAssetHistoryWalletLists(para){//列表
	let url = `/v1/asset/my_history_asset`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}
export async function  getAssetRecords(para){//资产钱包的交易记录
	let url = `/v1/asset/tx_list`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}
export async function  getAssetRecordsByAddress(para){//资产钱包地址下的交易记录
	let url = `/v1/asset/address_tx_list`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}


//系统状态
export async function  getSystemStatus(para){//获取系统状态
	let url = `/v1/blocks/chain_state`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}
