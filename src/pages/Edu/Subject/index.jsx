import React, { Component } from "react";
import { Card, Button, Table, Tooltip, Pagination, Input, message,Modal } from "antd";
import { PlusOutlined, FormOutlined, DeleteOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { getSubjectList, getSecSubjectList,updateSubjectList,delSubjectList} from "./redux";
import {reqUpdateSubject } from '@api/edu/subject'


// const data = [
// 	{
// 		key: 1,
// 		name: "John Brown",
// 		age: 32,
// 		address: "New York No. 1 Lake Park",
// 		description:
// 			"My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
// 	},
// 	{
// 		key: 2,
// 		name: "Jim Green",
// 		age: 42,
// 		address: "London No. 1 Lake Park",
// 		description:
// 			"My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
// 	},
// 	{
// 		key: 3,
// 		name: "jiangfeng",
// 		age: 29,
// 		address: "Jiangsu No. 1 Lake Park",
// 		description:
// 			"Hello,everyBody,My name is jiangfeng,I'm going on a blind date next week",
// 	},
// 	{
// 		key: 4,
// 		name: "Joe Black",
// 		age: 32,
// 		address: "Sidney No. 1 Lake Park",
// 		description:
// 			"My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
// 	},
// ];
@connect((state) => ({ subjectList: state.subjectList }), {
	getSubjectList,
  getSecSubjectList,
  updateSubjectList,
  delSubjectList
})
class Subject extends Component {
  page = 1;
  state = {
    title:'',
    subjectid:''
  }
	// 挂载后请求页面数据
	componentDidMount() {
		this.props.getSubjectList(1, 5);
	}
	// 页码发生变化时触发的回调
	handleChange = (page, pageSize) => {
		this.page = page;
		this.props.getSubjectList(page, pageSize);
	};
	// 一页展示的数据条数发生变化时触发回调
	handleShowSizeChange = (page, pageSize) => {
		this.props.getSubjectList(page, pageSize);
	};
	// 点击展开请求二级课程分类数据
	handleExpand = (expanded, record) => {
		// console.log(record)
		if (expanded) {
			this.props.getSecSubjectList(record._id);
		}
	};
	// 点击去到新增页面
	handleAdd = () => {
		this.props.history.push("/edu/subject/add");
  };
  // 点击更新按钮的触发回调
  handleUpdate = ({_id,title}) => () =>{
    this.setState({
      subjectid:_id,
      title:title
    })
    this.title = title //记录旧的标题名称
  }
  // 更改课程分类标题受控组件的回调
  handleUpdateChange = (e) =>{
    this.setState({
      title:e.target.value
    })
  }
  // 点击确认按钮回调
  handleConfirm = async() =>{
    if(!this.state.title.trim()){
      message.warn('课程名称不能为空')
      return
    }
    if(this.state.title === this.title){
      message.warn('编辑更改的课程名称不能与之前的重复')
      return
    }
    let id = this.state.subjectid
    let title = this.state.title
    // await reqUpdateSubject(id,title)
    // message.success('课程更新成功')
    // this.setState({
    //   subjectid:'',
    //   title:''
    // })
    // this.props.getSubjectList(1,5)
    await this.props.updateSubjectList(id,title)
    message.success('课程更新成功')
    this.setState({
      subjectid:'',
      title:''
    })
  }
  // 点击取消按钮回调
  handleCancle = () =>{
    this.setState({
      subjectid:'',
      title:''
    })
  }
  // 点击删除课程回调
  handleDel = (record) => () =>{
    Modal.confirm({
      title:(
        <>
          你确定要删除<span style={{color:'pink',margin:'0 10px'}}>{record.title}</span>吗？
        </>
      ),
      onOk:async()=>{
        await this.props.delSubjectList(record._id)
        message.success('课程删除成功')
        if(record.parentId === '0'){
          if(this.page > 1 && this.props.subjectList.items.length <= 0 && record.parentId === '0'){
            this.props.getSubjectList(--this.page,5)
            return
          }
          this.props.getSubjectList(this.page,5)
        }
      }
    })
  }
	render() {
    const columns = [
      {
        title: "分类名称",
        key: "name",
        render: (record) => {
          if (this.state.subjectid === record._id) {
            return (
              <Input
                style={{ width: 200 }}
                value={this.state.title}
                onChange={this.handleUpdateChange}
              ></Input>
            );
          }
          return record.title;
        },
      },
      {
        title: "操作",
        dataIndex: "",
        key: "x",
        render: (record) => {
          if (this.state.subjectid === record._id) {
            return (
              <>
                <Button type="primary" style={{ marginRight: 10 }}
                onClick={this.handleConfirm}>
                  确定
                </Button>
                <Button type="danger" onClick={this.handleCancle}>取消</Button>
              </>
            );
          } else {
            return (
              <>
                <Tooltip placement="top" title="更新课程">
                  <Button
                    type="primary"
                    icon={<FormOutlined />}
                    size="large"
                    style={{ marginRight: 20 }}
                    onClick={this.handleUpdate(record)}
                  ></Button>
                </Tooltip>
                <Tooltip placement="top" title="删除课程">
                  <Button
                    type="danger"
                    icon={<DeleteOutlined />}
                    size="large"
                    onClick={this.handleDel(record)}
                  ></Button>
                </Tooltip>
              </>
            );
          }
        },
        width: 200,
      },
    ];
		return (
			<Card>
				<Button type="primary" icon={<PlusOutlined />} onClick={this.handleAdd}>
					新建
				</Button>
				<Table
					style={{ marginTop: 20 }}
					columns={columns}
					expandable={{
						// expandedRowRender: (record) => (
						// 	<p style={{ margin: 0 }}>{record.description}</p>
						// ),
						// rowExpandable: (record) => record.name !== "Not Expandable",
						onExpand: this.handleExpand,
					}}
					dataSource={this.props.subjectList.items}
					rowKey="_id"
					pagination={{
						total: this.props.subjectList.total,
						showSizeChanger: true,
						pageSizeOptions: ["5", "10", "15"],
						showQuickJumper: true,
						defaultPageSize: 5,
						onChange: this.handleChange,
						onShowSizeChange: this.handleShowSizeChange,
						current: this.page,
					}}
				/>
				{/* <Pagination showQuickJumper pageSize={5}/> */}
			</Card>
		);
	}
}

export default Subject;
