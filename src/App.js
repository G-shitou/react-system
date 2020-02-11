import React from 'react';
import { ConfigProvider } from 'antd';
// 国际化 中文
import moment from 'moment';
import 'moment/locale/zh-cn';
import zhCN from 'antd/es/locale/zh_CN';
moment.locale('zh-cn');

export default class App extends React.Component {
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <div>
          {this.props.children}
        </div>
      </ConfigProvider>
    )
  }
}
