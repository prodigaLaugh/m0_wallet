
import axios from 'axios'



let baseurl = '' ;
if(process.env.NODE_ENV === 'development'){
  baseurl = DEVURL;
}else{
  baseurl = PRODUCTURL;
}

const myAxios = axios.create({
    // baseURL:'/api' ,
		baseURL:baseurl,
    timeout:60*1000000000,
    // headers: {'token':token},
    validateStatus: function (status) {
        return status < 500;
    }
});




export default{
    install(Vue,option){
        Vue.prototype.$http = myAxios ;
    }
}
