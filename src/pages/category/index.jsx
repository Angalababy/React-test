import React, {Component} from 'react';
import {
  Card,
  Button,
  Icon,
  Table,
  message,
  Modal
} from 'antd';
import AddCategoryForm from '../../components/add-category-form';
import {reqCategories,reqAddCategory,reqUpdateCategoryName} from '../../api/ajax'
import MyButton from '../../components/my-button';
import UpdateCategoryNameForm from '../../components/uptate-category-name-form'


class Category extends Component {
  state={
    categories:[],//保存所有一级分类数据
    subCategories:[],//保存所有二级分类数据
    isShowAdd:false,
    isShowUpdate:false,
    category:{},//保存当前选中单个分类数据
    parentId:'0'
  }
  //获取分类列表的方法
  getCategories=async (parentId)=>{
    //发送请求
    const result=await reqCategories(parentId)
    console.log(result);
    if(result.status===0){
      //获取列表数据成功
   if(parentId==='0'){
     this.setState({
       categories:result.data
     })
   }else {
     this.setState({
       subCategories: result.data
     })
   }
    }else {
      message.error('获取分类列表失败')
    }
  }
  //添加分类的函数
  addCategory =async () => {
    //获取当前填写的表单数据
    const {parentId, categoryName} = this.form.getFieldsValue()

    // const {parentId, categoryName} = this.form.getFieldsValue();
    //发送请求后，后台添加分类
    const result = await reqAddCategory(parentId, categoryName)
    if (result.status === 0) {
      message.success('添加分类成功')
      //更新数据
      if(result.data.parentId==='0'){
        this.setState({
          categories: [...this.state.categories, result.data],
        })
      }
    } else {
      message.error('添加分类失败')
      //隐藏对话框
    }
    this.setState({
      isShowAdd: false
    })
    //清空用户的输入
    this.form.resetFields()
  }
  //修改分类名称的方法
  updateCategoryName=async()=>{
//获取修改后名称
    const categoryName=this.form.getFieldValue('categoryName')
    //获取修改前的名称
    const {name,_id}=this.state.category
    //判读修改前后是否一致，一致就不修改
    if(categoryName===name){
      message.warn('请修改分类名称')

    }else {
      //发送请求
      const result= await reqUpdateCategoryName(_id,categoryName)
      if(result.status===0){
        message.success('修改分类名称成功')
        //关闭对话框
        this.setState({
          isShowUpdate:false,
          categories:this.state.categories.map(item=>{
            if (item._id===_id){
              item.name=categoryName
            }
            return item
          })
        })
      }else {
        message.error('修改分类名称失败')
        this.setState({
          isShowUpdate:false
        })
      }
    }
  }
componentWillMount(){
  this.columns = [{
    title: '品类名称',
    dataIndex: 'name',
    // render: text => <a href="javascript:;">{text}</a>,
  }, {
    title: '操作',

    width:300,
    render:category=>{
      // console.log(category)
      if(category.parentId==='0'){
        return <div>
          <MyButton name="修改名称" onClick={()=>this.setState({isShowUpdate:true,category})}/>&nbsp;&nbsp;&nbsp;
          <MyButton name="查看其子品类" onClick={()=>{
            //让tabel显示二级分类
            this.setState({parentId:category._id,category})
            //请求二级分类数据
            this.getCategories(category._id)
          }
          }/>
        </div>
      }else{
        return <MyButton name="修改名称" onClick={()=>this.setState({isShowUpdate:true,category})}/>
      }

    }
  } ];
}

  componentDidMount () {
    this.getCategories('0');
  }

render(){

    const {categories, subCategories,isShowAdd,isShowUpdate,category,parentId}=this.state
//判断是否显示一级分类
 const isCategory=parentId === '0'
  const data = isCategory? categories:subCategories
  return (
      <Card
          title={
            isCategory
            ?"一级分类列表"
           :<div><MyButton name="一级分类" onClick={()=>this.setState({parentId:'0'})}/><Icon type="arrow-right" />&nbsp;{category.name}</div>

          }
        extra={<Button type="primary" onClick={()=>this.setState({isShowAdd:true})}><Icon type="plus"/>添加品类</Button>}
      >
        <Table
          columns={this.columns}
          dataSource={data}
          // bordered
          pagination={{
            pageSize: 3,
            showSizeChanger: true,
            pageSizeOptions: ['3', '6', '9', '12'],
            showQuickJumper: true
          }}
          rowKey='_id'
          loading={categories.length===0}
        />,
        <Modal
          title="更新分类"
          visible={isShowUpdate}
          okText="确认"
          cancelText="取消"
          onOk={this.updateCategoryName}
          onCancel={()=>this.setState({isShowUpdate:false})}
          width={300}
        >
          <UpdateCategoryNameForm categoryName={category.name} setForm={form => this.form = form}/>
        </Modal>
        <Modal
          title="添加分类"
          visible={isShowAdd}
          okText="确认"
          cancelText="取消"
          onOk={this.addCategory}
          onCancel={()=>this.setState({isShowAdd:false})}
        >
          <AddCategoryForm categories={categories} setForm={form => this.form = form}/>
        </Modal>
      </Card>

    )
  }
}

export default Category;