import React from 'react';
import echarts from 'echarts/lib/echarts';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
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
         * option.x         array      分类数据
         * option.y         array      value数据
         */
        const data = this.props.option;
        return {
            title: init.title(data),
            legend:{
                data: data.x,
                orient: 'vertical',
                right:0
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            series: [{
                name: data.name || '统计变量',
                type: 'pie',
                radius: data.isRing ? ['40%','60%'] : '60%',
                center: ['50%', '50%'],
                data: data.y,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };
    }

    onChartClick = (params,chart) => {
        this.props.handleClick(params);
    }

    render() {
        let onEvents = {
            'click': this.onChartClick,
        };
        return (
            <ReactEchartsCore
                echarts={echarts}
                option={this.getOption()}
                notMerge={true}
                lazyUpdate={true}
                onEvents={onEvents}/>
        )
    }
}