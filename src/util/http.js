
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

myAxios.interceptors.request.use(
    config => {
        const token =  localStorage.M0TOEKN; //获取存储在本地的token
        if (token) {
            config.headers.Authorization = 'TOKEN=' + token; //携带权限参数
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);


myAxios.interceptors.response.use(

  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
 
	if(res && res.err_code === 3006 ){
		deleteCookie('USERTOKEN')
		deleteCookie('autoLogin')
		location.href='/login'
	}
	return response;

  },
  error => {
    message.error(error.message, 1.5)
    return Promise.reject(error)
  }
)





export default{
    install(Vue,option){
        Vue.prototype.$http = myAxios ;
    }
}
