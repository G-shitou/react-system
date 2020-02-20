import React from 'react';
import echarts from 'echarts/lib/echarts';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import 'echarts/lib/chart/gauge';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
// import 'echarts/lib/component/legend';
import init from './utils/common';

export default class Line extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    UNSAFE_componentWillMount() {
        
    }

    getOption = () => {
        /**
         * option 参数说明
         * option.title     string     图形标题
         * option.color     string     标题文字颜色
         * option.data      array      数据
         */
        const data = this.props.option;
        return {
            title: init.title(data),
            tooltip: {
                show: true,
            },
            series: [{
                name: data.name || '统计变量',
                type: 'gauge',
                detail: {
                    formatter: '{value}%',
                    fontSize:14
                },
                data: data.data,
            }]
        };
    }

    render() {
        return (
            <ReactEchartsCore
                echarts={echarts}
                option={this.getOption()}/>
        )
    }
}