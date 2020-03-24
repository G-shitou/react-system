import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { addTag, changeCollapsed } from './../../../redux/action'
import { get } from './../../../axios'
import './index.less';
import { Menu, Icon, Layout } from 'antd';
const { SubMenu } = Menu;
const { Sider } = Layout;
class MenuList extends React.Component {
    state = {
        // collapsed: false,
        // currentKey: '',
        menus: []
    }

    UNSAFE_componentWillMount(){
        let menus;
        get('/api/menuList').then(res => {
            menus = res.data.menusList;
            const menuNodes = this.renderMenu(menus);
            this.setState({
                menus,
                menuNodes
            });
            // 获取当前路由
            let currentKey = window.location.hash.replace(/#|\?.*$/g,'');
            if(currentKey !== '/'){
                const tagNode = this.searchMenuNode(this.state.menus,currentKey)[0];
                // 事件派发
                const { dispatch } = this.props;
                const tag = {title:tagNode.title,path:tagNode.path};
                dispatch(addTag(tag));
            }
        }).catch( e => {
            console.log(e)
        })
    }

    // 刷新,前进,后退操作后,查找当前路由对应menuNode
    searchMenuNode = (menus,path,arr=[]) => {
        menus.forEach( item => {
            item.path === path && arr.push(item);
            item.children && item.children.length > 0 && this.searchMenuNode(item.children,path,arr);
        });
        return arr;
    }

    // 点击菜单
    handleClick = ({item,key}) => {
        if(key === this.props.currentKey){
            return false;
        }
        // 事件派发，自动调用reducer，通过reducer保存到store对象中
        const { dispatch } = this.props;
        const tag = {title:item.props.title,path:key};
        dispatch(addTag(tag));
    };

    // 点击折叠按钮
    onCollapse = collapsed => {
        // 事件派发，自动调用reducer，通过reducer保存到store对象中
        const { dispatch } = this.props;
        dispatch(changeCollapsed(collapsed));
    };

    // 渲染菜单
    renderMenu = (data) => {
        return data.map( item => {
            if(item.children && item.children.length > 0){
                return (
                    <SubMenu key={item.path} title={
                        <span> 
                            <Icon type={item.icon}/>
                            <span>{item.title}</span>
                        </span>
                     }
                    >
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return (
                <Menu.Item key={item.path} title={item.title}>
                    <Link to={item.path} target={item.target}>
                        {item.icon && <Icon type={item.icon}></Icon>}
                        <span>{item.title}</span>
                    </Link>
                </Menu.Item>
            )
        })
    }

    // 渲染一级菜单

    render() {
        return (
            <Sider className="menu" collapsible collapsed={this.props.collapsed} onCollapse={this.onCollapse}>
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.props.currentKey]}
                    mode="inline"
                    theme="dark"
                >
                    { this.state.menuNodes}
                </Menu>
            </Sider>
        )
    }
}
const mapStateToProps = state => {
    return {
        collapsed: state.isCollapsed,
        currentKey: state.menuKey
    }
}
export default withRouter(connect(mapStateToProps)(MenuList));