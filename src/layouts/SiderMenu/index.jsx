import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Menu} from 'antd'
import {DesktopOutlined,PieChartOutlined,FileOutlined,TeamOutlined,UserOutlined} from '@ant-design/icons'
import icons from '@conf/icons'
import {defaultRoutes} from "@conf/routes"
import {Link,withRouter} from 'react-router-dom'
const {SubMenu}  = Menu
@withRouter
@connect(state=>({permissionList:state.user.permissionList}))
class SiderMenu extends Component {
  RenderMenu = (routes) =>{
    return routes.map(route=>{
      if(route.hidden) return
      const Icon = icons[route.icon]
      if(route.children && route.children.length){
        return <SubMenu key={route.path} icon={<Icon />} title={route.name}>
          {route.children.map(secItem=>{
            if(secItem.hidden) return null
            return (
              <Menu.Item key={route.path + secItem.path}>
                <Link to={route.path + secItem.path}>{secItem.name}</Link>
              </Menu.Item>
            )
          })}
        </SubMenu>
      }else{
        return (
        <Menu.Item key={route.path} icon={<Icon />}>
          {route.path === '/' ?<Link to="/">{route.name}</Link>:route.name}
        </Menu.Item>
        )
      }
    })
  }
  render() {
    const pathname = this.props.location.pathname
    const matchArr = pathname.match(/[/][\w]*/)
    const openKey = matchArr && matchArr[0]
    return (
      <div>
        <Menu theme='dark' defaultSelectedKeys={[pathname]} mode='inline'
        defaultOpenKeys={[openKey]}>
          {this.RenderMenu(defaultRoutes)}
          {this.RenderMenu(this.props.permissionList)}
        </Menu>
      </div>
    )
  }
}

export default SiderMenu