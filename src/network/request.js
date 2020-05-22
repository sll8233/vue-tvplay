import axios from 'axios'

// 3.
export function request(config) {
    const instance = axios.create({
      // baseURL: 'http://api.jiaodong.net/ytnews',
      // baseURL: 'https://www.baidu.com/',
      baseURL:'/api',
      timeout:5000,

    })


// axios拦截器
    //请求的时候拦截器
    instance.interceptors.request.use((config)=>{
        // console.log(config);
        //1.config中信息有没有不符合服务器的要求
        // 2.每次发送网络请求时，页面中加入请求的图标
        // 3.某些请求，验证token
        // 要返回config(仅仅参数名)
        return config
    },error => {

    })

    //收到时候的拦截器
    instance.interceptors.response.use((response)=>{
      return response.data
    },(err)=>{
      console.log('来到了response拦截failure中');
      console.log(err);
      if (err && err.response) {
        switch (err.response.status) {
          case 400:
            err.message = '请求错误'
            break
          case 401:
            err.message = '未授权的访问'
            break
        }
      }
      return err
    })

    return instance(config)
}


