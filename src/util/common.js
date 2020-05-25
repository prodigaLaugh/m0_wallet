export default {
  install(Vue, options) {


    Vue.prototype.getLocalAccountInfo = function() { // 获取账户/钱包信息
      return localStorage.accountInfo ? JSON.parse(localStorage.accountInfo) : {}
    }
    Vue.prototype.judgeIsSingleSign = function() { //判断是否单签
      return this.getLocalAccountInfo().account_type == 1
    }

    Vue.prototype.createSignFile = function(data) { //生成签名文件
      const name = localStorage.USERTOKEN + new Date().getTime() + '.hex'
      let element = document.createElement('a')
      element.setAttribute('href', 'data:text/json;charset=utf-8,' + JSON.stringify(data))
      element.setAttribute('download', name)
      element.style.display = 'none'
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    }




  }
}
