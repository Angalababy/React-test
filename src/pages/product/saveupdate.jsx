import React, {Component} from 'react';
import {Card,Form,Icon,Input,Select,Cascader,InputNumber,Button,message} from 'antd'
import {reqCategories} from '../../api/ajax'
import PicturesWall from '../product/pcitures-wall'

const Item=Form.Item
const Option=Select.Option
class SaveUpdate extends Component {
state={
  options:[]
}
  componentWillMount(){
    this.getCategories('0')
  }

  getCategories=async (parentId)=> {
    const result=await reqCategories(parentId)
    if(result.status===0){
      if(parentId==='0'){
        this.categories=result.data
        this.initOption()
      }else {
        this.subCategories=result.data
      }
    }else {
      message.error('请求失败')
    }
  }

  initOption=async ()=>{
   const{state}= this.props.location
    let options=this.categories.map(item=>({value:item._id,label:item.name}))
    if(state&&state.product.pCategoryId!=='0'){
      const result=await reqCategories(state.product.pCategoryId)
      if(result.status===0){
        options=options.map(item=>{
          if(item.value===state.product.pCategoryId){
            item.children=result.data.map(item=>({value:item._id,label:item.name}))
          }
          return item
        })
      }else {
        message.error('请求失败')
      }
    }

    this.setState({
      options
    })
  }


  render () {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };
    const {options}=this.state
    //获取传入的数据
    const{form,location}=this.props
    const {getFieldDecorator}=form
    const {state}=location
    const product=state? state.product:false

    //初始化分类
    let category=[];
    //判断初始化分类
    if(product && product.pCategoryId==='0'){
      //一级分类
      category.push(product.categoryId)
    }else {
      //二级分类
      category=[product.pCategoryId,product.categoryId]
    }




    return (
      <div>
        <Icon onClick={()=>this.props.history.goBack()} type="arrow-left" style={{fontSize:20}}/>&nbsp;&nbsp;
        <span>{product ? '修改商品':'添加商品'}</span>
        <Form style={{marginTop:10}}>
          <Item {...formItemLayout} label="商品名称：">
            {
              getFieldDecorator(
                'name',
                {
                  initialValue:product?product.name:''
                }
              )(
                <Input placeholder="请输入商品名称"/>
              )
            }
          </Item>
          <Item{...formItemLayout}label="商品名称：">
            {
              getFieldDecorator(
                'desc',
                {
                  initialValue: product ? product.desc : ''
                }
              )(
                <Input placeholder="请输入商品名称"/>
              )
            }

          </Item>
          <Item label="所属分类："{...formItemLayout}>
            {
              getFieldDecorator(
                'category',
                {
                  initialValue:category
                }
              )(
                <Cascader  options={options} placeholder="请选择分类"/>
              )
            }
          </Item>
          <Item label="商品价格："{...formItemLayout}>
            {
              getFieldDecorator(
                'price',
                {
                  initialValue:product ? product.price : ''
                }
              )(
                <InputNumber  style={{width:150}}
                              formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                              parser={value => value.replace(/\D+/g, '')}
                />
              )
            }

          </Item>
          <Item label="商品图片" {...formItemLayout}>
            <PicturesWall productId={product._id} imgs={product.imgs}/>
          </Item>
          <Item label="商品图片" {...formItemLayout}>
            xxx
          </Item>
          <Item>
            <Button type='primary' htmlType="submit" style={{marginLeft:20}}>提交</Button>
          </Item>

        </Form>
      </div>


    )
  }
}

export default Form.create()(SaveUpdate) ;