import React,{Component} from 'react'
import { Upload, Icon, Modal } from 'antd';
import PropTypes from 'prop-types'

export default class PicturesWall extends Component {
  static propTypes={
    productId:PropTypes.string.isRequired,
    imgs:PropTypes.array
  }
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };
  componentWillMount(){

    const fileList =this.props.imgs.map((item,index)=>{
      return{
        uid:-index,
        name:item,
        status:'done',
        url:'http://localhost:5000/upload'+item
      }
    })
      this.setState({fileList})
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => this.setState({ fileList })

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="/manage/img/upload"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          name="image"
          data={{id:this.props.productId}}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
