import React, {Component} from 'react';
import {Card,Form,Icon,Input,Select,Cascader,InputNumber} from 'antd'


const Item=Form.Item
const Option=Select.Option
class SaveUpdate extends Component {
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

    const options = [{
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
          value: 'xihu',
          label: 'West Lake',
        }],
      }],
    }, {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
          value: 'zhonghuamen',
          label: 'Zhong Hua Men',
        }],
      }],
    }];
    //获取传入的数据
    const{form,location}=this.props
    const {getFieldDecorator}=form
    const {state}=location
    const product=state? state.product:false


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
          <Item
            {...formItemLayout}
            label="商品名称："
          >
            <Input placeholder="请输入商品名称"/>
          </Item>
          <Item
            label="所属分类："
            {...formItemLayout}
          >
            <Cascader  options={options} placeholder="请选择分类"/>
          </Item>
          <Item
            label="商品价格："
            {...formItemLayout}>

            <InputNumber  style={{width:150}}
              formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\D+/g, '')}
            />
          </Item>
        </Form>
      </div>


    )
  }
}

export default Form.create()(SaveUpdate) ;