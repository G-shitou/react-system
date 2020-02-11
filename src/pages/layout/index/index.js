import React from 'react';
import './index.less';
import Header from '../header';
import Content from '../content'
import MenuList from '../menuList'
import { Layout } from 'antd';

export default class Admin extends React.Component {
  render() {
    return (
      <div className="layout">
        <Header></Header>
        <Layout className="content">
          <MenuList></MenuList>
          <Content>
              {this.props.children}
          </Content>
        </Layout>
      </div>
    )
  }
}
