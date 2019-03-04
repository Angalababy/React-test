import React, {Component} from 'react';
import {Button,Icon,Modal,Card,Table,Select,Input,message,} from 'antd'
import MyButton from '../../components/my-button'
import {reqProductList,searchProduct} from '../../api/ajax'

const Option=Select.Option
class ProductList extends Component {

  state={
    data:[],
    total:0,
    searchType:'productName',
    searchName:''
  }
  componentWillMount() {
    this.columns = [{
      title: '商品名称',
      dataIndex: 'name',
    }, {
      title: '商品描述',
      dataIndex: 'desc',
    }, {
      title: '价格',
      dataIndex: 'price',
    }, {
      title: '状态',
      render: () => {
        return <div>
          <Button type="primary" onClick={() => {
          }}>下架</Button>&nbsp;&nbsp;
          <span>在售</span>
        </div>
      }
    }, {
      title: '操作',
      render: product => {
        return <div>
          <MyButton name="详情" onClick={() => { }}/>&nbsp;&nbsp;
          <MyButton name="修改" onClick={() => this.props.history.push('/product/saveupdate',{product})}/>
        </div>
      }
    }];
  }
  getProductList=async (pageNum,pageSize)=>{
    const {searchType,searchName}=this.state
    let result
    if(searchName){
      result =await searchProduct(searchType,searchName,pageNum,pageSize)
    }else {
      result=await reqProductList(pageNum,pageSize)
    }

    if(result.status===0){
      this.setState({
        data:result.data.list,
        total:result.data.total
      })
    }else{
      message.error('获取商品列表失败')
    }
  }

 handleChange=(name,value)=>{
    this.setState({
      [name]:value
    })
 }
  componentDidMount(){
    this.getProductList(1,3)
  }
  render () {
    const {data,total}=this.state
    return (
      <Card
        title={
          <div>
            <Select defaultValue="productName" onChange={(value )=>this.handleChange('searchType',value)}>
              <Option value="productName">根据商品名称</Option>
              <Option value="productDesc">根据商品描述</Option>
            </Select>
            <Input placeholder="关键字" style={{width:200,marginLeft:10,marginRight:10}} onChange={(e)=>this.handleChange('searchName',e.target.value)}/>
            <Button type="primary" onClick={()=>this.getProductList(1,3)}>搜索</Button>
          </div>
        }
        extra={<Button type="primary" onClick={()=>this.props.history.push('/product/saveupdate')}><Icon type="plus"/>添加产品</Button>}
      >
        <Table
          columns={this.columns}
          dataSource={data}
          bordered
          pagination={{
            defaultPageSize: 3,
            showSizeChanger: true,
            pageSizeOptions: ['3', '6', '9', '12'],
            showQuickJumper: true,
            total,
            onChange:this.getProductList,
            onShowSizeChange:this.getProductList
          }}
          rowKey='_id'
          loading={false}

        />

      </Card>
    )
  }
}

export default ProductList;