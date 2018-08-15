import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { switchMenu } from '../../redux/action'
import MenuConfig from '../../config/menu-config'
import { Menu } from 'antd'
import './index.less'
const SubMenu = Menu.SubMenu

class NavLeft extends React.Component {
    state = {
        currentKey: ''
    }
    constructor (props) {
        super(props)
        this.state = {
            menuTreeNode: ''
        }
    }
    componentWillMount () {
        const menuTreeNode = this.renderMenu(MenuConfig)
        let currentKey = window.location.hash.replace(/#|\?.*$/g, '')
        this.setState({
            menuTreeNode,
            currentKey
        })
    }
    handleClick = ({item, key}) => {
        const { dispatch } = this.props;
        dispatch(switchMenu(item.props.title))
        this.setState({
            currentKey: key
        })
    }
    // 菜单渲染
    renderMenu = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    <SubMenu title={item.title} key={item.key}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return <Menu.Item title={item.title} key={item.key}>
                <NavLink to={item.key}>{item.title}</NavLink>
            </Menu.Item>
        })
    }
    render () {
        return (
            <div>
                <div className="logo">
                    <img src="/assets/logo-ant.svg" alt=""/>
                    <h1>Imooc MS</h1>
                </div>
                <Menu 
                    theme="dark"
                    selectedKeys={[this.state.currentKey]}
                    onClick={this.handleClick}
                >
                    {this.state.menuTreeNode}
                </Menu>
            </div>
        )
    }
}

export default connect()(NavLeft)