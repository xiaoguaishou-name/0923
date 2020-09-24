import React, { Component } from "react";
import { Card, Button, Table, Tooltip, Pagination } from "antd";
import { PlusOutlined, FormOutlined, DeleteOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { getSubjectList ,getSecSubjectList} from "./redux";

const columns = [
	{ title: "分类名称", dataIndex: "title", key: "name" },
	{
		title: "操作",
		dataIndex: "",
		key: "x",
		render: () => (
			<>
				<Tooltip placement="top" title="编辑">
					<Button
						type="primary"
						icon={<FormOutlined />}
						size="large"
						style={{ marginRight: 20 }}
					></Button>
				</Tooltip>
				<Tooltip placement="top" title="删除">
					<Button type="danger" icon={<DeleteOutlined />} size="large"></Button>
				</Tooltip>
			</>
		),
		width: 200,
	},
];

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
@connect((state) => ({ subjectList: state.subjectList }), { getSubjectList,getSecSubjectList })
class Subject extends Component {
  page = 1
  // 挂载后请求页面数据
	componentDidMount() {
		this.props.getSubjectList(1, 5);
  }
  // 页码发生变化时触发的回调
  handleChange = (page,pageSize) =>{
    this.page = page
    this.props.getSubjectList(page,pageSize)
  }
  // 一页展示的数据条数发生变化时触发回调
  handleShowSizeChange = (page,pageSize) =>{
    this.props.getSubjectList(page,pageSize)
  }
  // 点击展开请求二级课程分类数据
  handleExpand = (expanded,record) =>{
    // console.log(record)
    if(expanded){
      this.props.getSecSubjectList(record._id)
    }
  }
  // 点击去到新增页面
  handleAdd = () =>{
    this.props.history.push('/edu/subject/add')
  }
	render() {
		return (
			<Card>
				<Button type="primary" icon={<PlusOutlined />}
        onClick={this.handleAdd}>
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
            onExpand:this.handleExpand
					}}
					dataSource={this.props.subjectList.items}
					rowKey="_id"
					pagination={{
            total:this.props.subjectList.total,
            showSizeChanger:true,
            pageSizeOptions:["5","10","15"],
            showQuickJumper:true,
            defaultPageSize:5,
            onChange:this.handleChange,
            onShowSizeChange:this.handleShowSizeChange,
            current:this.page
          }}
				/>
				{/* <Pagination showQuickJumper pageSize={5}/> */}
			</Card>
		);
	}
}

export default Subject;
