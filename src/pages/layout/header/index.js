import React from 'react';
import './index.less';
import { Link } from 'react-router-dom'
import { Avatar, Menu, Icon } from 'antd';
const { SubMenu } = Menu;
export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: 'admin',
            color: '#f56a00',
        };
    }
    render() {
        return (
            <div className="header">
                <img className="logo" alt="logo" src={process.env.PUBLIC_URL + '/logo.png'}></img>
                <div className="avatar">
                    <Menu mode="horizontal">
                        <SubMenu
                            title={
                                <Avatar size={40} style={{backgroundColor: this.state.color, verticalAlign: 'middle'}}>
                                    {this.state.user}
                                </Avatar>
                            }
                        >
                            <Menu.Item key="setting:1">
                                <Link to='/personal/information'>
                                    <Icon type='user'></Icon>
                                    <span>个人信息</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="setting:2">
                                <Link to='/personal/password'>
                                    <Icon type='key'></Icon>
                                    <span>修改密码</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="setting:3">
                                <Link to='/logout'>
                                    <Icon type='logout'></Icon>
                                    <span>退出</span>
                                </Link>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>
            </div>
        )
    }
}