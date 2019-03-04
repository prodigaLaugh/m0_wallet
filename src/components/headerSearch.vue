<template>
  <div  class="commonHeaderWrap">
    <div class="commonHeader">
      <div class="commonHeaderLeftWrap">
        logo
      </div>
      <div class="commonHeaderCenterWrap">
        <select 
            v-model="blockchain_select"
            class="blockchainBrowser_top_select">
            <option 
                v-for="(item,index) in lists"
                :key="index"
                :value="item.Chainid">{{item.Chainid}}</option>
        </select>
        <input 
          placeholder="搜索地址/交易ID/区块高度/资产名/资产ID/UTXO"
          v-model="searchText"
          @keyup.enter="search"
          type="text">
          <span 
            @click="search"
            class="el-icon-search"></span>  
      </div>
      <div class="commonHeaderRightWrap">
        admin
      </div>
    </div>
  </div>
</template>

<script>

export default {
  created(){
    this.getBlockchains();
  },
  data(){
    return {
      searchText:'',
      blockchain_select:'',
      lists:[],
    }
  },
  methods:{
    search(){
        if(!this.searchText){
            this.$message({
                message: '搜索内容不能为空！',
                type: 'warning'
            })
            return false;
        }
        let params = {
            chain_name:this.blockchain_select,
            search:this.searchText.trim()
        }
        this.getSearchType(params,(data)=>{
            let params = {
                chainid:this.blockchain_select,
                searchText:this.searchText
            }
            this.goUrlByType(data.data, params)
        },(data)=>{
            this.$message({
                message: data.msg,
                type: 'warning'
            })
        })
    },
    getBlockchains(){
        this.getBlockchainLists((data)=>{
            this.lists = data.data;
            this.blockchain_select = this.lists[0].Chainid;
        },()=>{

        })
    }
  }
}
</script>

<style lang="scss" scoped>

  .commonHeaderWrap{
    height:60px;
    .commonHeader{
      position:fixed;
      left:0;
      top:0;
      right:0;
      height:60px;
      padding:0 20px;
      display:flex;
      justify-content: space-between;
      align-items:center;
      background:#eee;
      .commonHeaderCenterWrap{
        flex:1;
        margin-left:30px;
        margin-right:50px;
        display:flex;
        align-items: center;
        >select{
          width:200px;
        }
        >input{
          margin-left:20px;
          flex:1;
          border:1px solid #ddd;
          padding-left:10px;
        }
        .el-icon-search{
          position:relative;
          padding:4px 10px;
          right:32px;
          @include pointer;
        }
      }
    }
    
  }
</style>

