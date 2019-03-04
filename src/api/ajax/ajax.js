
import axios from 'axios'
import {message} from 'antd'

export default function ajax(url,data={},method='GET') {
  let promise=null
  if(method==='GET'){
    promise =axios.get(url,{params:data})
  }else if (method==='POST'){
    promise=axios.post(url,data)
  }
  return new  Promise((resolve,reject)=>{
    promise
      .then(res=>{
        //将请求回来的数据返回
        resolve(res.data);
      })
      .catch(err=>{
        //统一处理请求失败的逻辑
        message.error('请求失败')
      })
  })
}













