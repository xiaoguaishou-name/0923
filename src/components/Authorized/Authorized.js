import React, { Component } from 'react'
import {getUserInfo,getUserMenu} from './redux'
import {connect} from 'react-redux'
@connect(state=>({user:state.user}),{getUserInfo,getUserMenu})
class Authorized extends Component {
  // 页面挂载就请求数据
  async componentDidMount(){
    await Promise.all([this.props.getUserInfo(),this.props.getUserMenu()])
    console.log(this.props)
  }
  render() {
    return this.props.render(this.props.user)
  }
}

export default Authorized
