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
	let url = `/v1/asset/get_assetlist_info`;
	let result = await this.$http.post(url, para )
	return result;
}

export async function  createAsset(para){//创建资产
	let url = `/v1/asset/create_asset`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}

export async function  deleteAsset(id){//删除资产
	let url = `/v1/asset/${id}`;
	let result = await this.$http.delete(url )
	return result;
}
export async function  getAssetInfo(para){//资产详情 formdata
	let url = `/v1/asset/get_asset_info`;
	let result = await this.$http.post(url,  para )
	return result;
}
export async function  editAsset(para){//编辑资产
	let url = `/v1/asset/update_asset`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}



//存证接口
export async function  uploadEvidence(para){//上传存证
	let url = `/v1/evidence/upload_evidence`;
	let result = await this.$http.post(url, para )
	return result;
}
export async function  getEvidenceLists(id){//存证列表
	let url = `/v1/evidence/get_evidencelist/${id}`;
	let result = await this.$http.get(url )
	return result;
}
export async function  getEvidenceDetail(id){//存证详情
	let url = `/v1/evidence/get_evidence/${id}`;
	let result = await this.$http.get(url )
	return result;
}
export async function  evidenceDownload(para){//文件下载
	let url = `/v1/evidence/downlod_evidence`;
	let result = await this.$http.post(url, para,{responseType: 'blob'})
	return result;
}
export async function  evidenceVerifyFile(para){//校验文件
	let url = `/v1/evidence/verify_evidence`;
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
	let url = `/v1/key/list_key`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}
export async function  createPrivateKey(para){//创建
	let url = `/v1/key/create_key`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}
export async function  queryPersonByxPub(para){//根据公钥查询创建人
	let url = `/v1/key/query_key_belong_user`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}



//地址管理
export async function  getAddressLists(para){//列表
	let url = `/v1/address/list_address`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}
export async function  createAddress(para){//创建
	let url = `/v1/address/create_address`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}

//钱包管理
export async function  getAccountLists(para){//列表
	let url = `/v1/account/list_account`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}
export async function  getAccountDetail(para){//钱包详情
	let url = `/v1/account/wallet_detail`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}
export async function  createSingleWallet(para){//创建单签钱包
	let url = `/v1/account/create_single_sign_wallet`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}
export async function  createMultiWallet(para){//创建多签钱包
	let url = `/v1/account/create_multi_sign_wallet`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}
export async function  loadWallet(para){//载入钱包
	let url = `/v1/account/load_account`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}
export async function  deleteWallet(para){//删除钱包
	let url = `/v1/account/delete_wallet`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}




//资产操作接口
export async function  issueMultsign(para){//发行多签
	let url = `/v1/asset_opt/issue_multsign`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}
export async function  issueSinglesign(para){//发行单签
	let url = `/v1/asset_opt/issue_singlesign`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}
export async function  transferMultsign(para){//转账多签
	let url = `/v1//asset_opt/transfer_multisign`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}
export async function  transferSinglesign(para){//转账单签
	let url = `/v1/asset_opt/transfer_singlesign`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}

export async function  queryAssetAmount(para){//查询资产余额
	let url = `/v1/asset/get_assetbalance_address`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}

export async function  signUpload(para){//签名文件上传
	let url = `/v1/asset_opt/tx_mulsign_info`;
	let result = await this.$http.post(url, para )
	return result;
}
export async function  sign(para){//签名
	let url = `/v1/asset_opt/tx_mulsign`;
	let result = await this.$http.post(url, para )
	return result;
}
export async function  retireMultsign(para){//销毁多签
	let url = `/v1/asset_opt/retire_multsign`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}
export async function  retireSinglesign(para){//销毁单签
	let url = `/v1/asset_opt/retire_singlesign`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}
export async function  transferRecord(para){//转账列表
	let url = `/v1/asset_opt/transfer_record`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}
export async function  signRecord(para){//签名列表
	let url = `/v1/asset_opt/sign_record`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}
export async function  issueRecord(para){//发行列表
	let url = `/v1/asset_opt/issue_record`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}
export async function  retireRecord(para){//销毁列表
	let url = `/v1/asset_opt/retire_record`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}


//资产钱包接口
export async function  getAssetWalletLists(para){//列表
	let url = `/v1/asset/get_assetinfo_list`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}
export async function  getAssetRecords(para){//资产钱包的交易记录
	let url = `/v1/asset/get_asset_txlist`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}
export async function  getAssetRecordsByAddress(para){//资产钱包地址下的交易记录
	let url = `/v1/asset/get_address_asset_txlist`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}


//系统状态
export async function  getSystemStatus(para){//获取系统状态
	let url = `/v1/blocks/chain_state`;
	let result = await this.$http.post(url, Object.assign({}, baseParams, para) )
	return result;
}













