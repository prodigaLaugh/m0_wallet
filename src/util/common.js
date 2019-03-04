export default{
  install(Vue,options){
    
    
		
		Vue.prototype.linkTo = function (path,obj) {
      this.$router.push({path:path,query:obj});
    }  

    Vue.prototype.getSearchType= function (params, sucessFn, errFn) {
      
      let url = `/chain_browser/searchtype`
      this.$http.post(url,params)
        .then(({data})=>{
          if(data.code === '0'){
            sucessFn(data)
          }else{
            errFn(data);
          }
          
        })
        .catch(({data})=>{
          errFn(data)
        })
    }  

    Vue.prototype.getBlockchainLists= function (sucessFn, errFn) {
      
      let url = `/chain_manager/list`
      this.$http.get(url)
        .then(({data})=>{
          sucessFn(data)
        })
        .catch(({data})=>{
          errFn(data)
        })
    } 

    Vue.prototype.getLinkAdressByType = function(val){
      var json = {
        0:'/blockchainBrowser_adressDetail',
        1:'/blockchainBrowser_assetsDetail',
        2:'/blockchainBrowser_blockchainDetail',
        3:'/blockchainBrowser_transactionDetail',
        4:'/blockchainBrowser_UTXODetail'
      }
      return json[val];
    }

    Vue.prototype.goUrlByType = function(val,query){
      let path = this.getLinkAdressByType(val)
      this.$router.push({path: path, query: query})
    }

    Vue.prototype.getRouteParams = function(queryKey, paramsKey){
      let query = this.$route.query;
      var obj = {}

      queryKey.map((item,i)=>{
        obj[paramsKey[i]] = query[item];
      })
      return obj;
    }
    
    
  }
}