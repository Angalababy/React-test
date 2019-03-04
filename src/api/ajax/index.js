//定义发送请求函数模块
import ajax from './ajax'
import jsonp from 'jsonp'
//提取公共代码，公共url地址
const prefix=process.env.NODE_ENV=== 'development' ? '' : 'http://localhost:5000'

//请求登陆函数
export const reqLogin=(username,password)=>ajax(prefix+'/login',{username,password},'POST')
//请求添加用户函数
export const reqAddUser=user=>ajax(prefix+'/manage/user/add',user,'POST')

export const resWeather=(city)=>{
  return new Promise((resolve,reject)=>{
    jsonp(
      `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`,
      {},
      (err,data)=>{
        if(!err){
          resolve(data.results[0].weather_data[0])
        }else {
          console.log(err);
          reject('请求失败~')
        }
      }
    )
  })
}
//请求分类列表的函数
export const reqCategories = parentId => ajax(prefix + '/manage/category/list', {parentId});
//请求添加分类函数
export const reqAddCategory = (parentId, categoryName) => ajax(prefix + '/manage/category/add', {parentId, categoryName}, 'POST');
//请求更新分类名称的函数
export const reqUpdateCategoryName = (categoryId, categoryName) => ajax(prefix + '/manage/category/update', {categoryId, categoryName}, 'POST');

//请求商品分页列表
export const reqProductList=(pageNum,pageSize)=>ajax(prefix+'/manage/product/list',{pageNum,pageSize})
//请求搜索产品分页列表
export const searchProduct=(searchType,searchValue,pageNum,pageSize)=>ajax(prefix+'/manage/product/search',{[searchType]:searchValue,pageNum,pageSize})