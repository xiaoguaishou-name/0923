import React, { Component } from "react";
import {
  Button,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
export default class MyUpload extends Component {
  beforeUpload = (file,fileList) =>{
    // console.log(file)
    //最大视频不能超过20M
    const MAX_SIZE = 20*1024*1024
    return new Promise((res,rej)=>{
      if(file.size < MAX_SIZE){
        res()
      }
      return rej()
    })
  }

  handleCustomRequest = () =>{
    console.log(111)
  }
  render() {
    return (
      <Upload beforeUpload={this.beforeUpload} customRequest={this.handleCustomRequest}>
        <Button>
          <UploadOutlined /> 上传视频
        </Button>
      </Upload>
    );
  }
}