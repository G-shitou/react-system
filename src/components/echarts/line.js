import React from 'react';
import echarts from 'echarts/lib/echarts';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import init from './utils/common';

export default class Line extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    getOption = () => {
        /**
         * option 参数说明
         * option.title     string     图形标题
         * option.color     string     标题文字颜色
         * option.isSmooth  boolean    是否平滑
         * option.x         array      分类数据
         * option.y         array      value数据
         */
        const data = this.props.option;
        return {
            title: init.title(data),
            xAxis: {
                type: 'category',
                data: data.x
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: data.y,
                type: 'line',
                smooth: data.isSmooth || false
            }]
        };
    }

    render() {
        return (
            <ReactEchartsCore
                echarts={echarts}
                option={this.getOption()}
                notMerge={true}
                lazyUpdate={true}/>
        )
    }
}