import React from 'react';
import echarts from 'echarts/lib/echarts';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import 'echarts/lib/chart/radar';
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
        this.initSeries(this.props.option);
    }

    initSeries = data => {
        let series = data.data;
        series.forEach(item => {
            item.areaStyle = {};
            item.symbol = "circle";
            item.symbolSize = 5;
        });
        this.setState({
            series
        })
    }

    getOption = () => {
        /**
         * option 参数说明
         * option.title     string     图形标题
         * option.color     string     标题文字颜色
         * option.type      array      分类数据
         * option.data      array      value数据
         * option.indicator array      各细分数据
         * option.isCircle  boolean    shape是否是圆
         */
        const data = this.props.option;
        return {
            title: init.title(data),
            legend:{
                orient: 'vertical',
                right:0,
                data: data.type,
            },
            tooltip: {
                show: true,
                trigger: "item"
            },
            radar: {
                shape: data.isCircle ? 'circle' : 'polygon',
                radius: "70%",
                startAngle: 90,
                splitNumber: 4,
                indicator: data.indicator
            },
            series: [{
                name: data.name || '统计变量',
                type: 'radar',
                data: this.state.series,
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
                onEvents={onEvents}/>
        )
    }
}