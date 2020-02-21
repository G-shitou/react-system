import React from 'react';
import echarts from 'echarts/lib/echarts';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import init from './utils/common';

export default class Line extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            legend:[],
            series:[]
        }
    }

    UNSAFE_componentWillMount() {
        this.init(this.props.option);
    }

    init = data => {
        let series = [],
            legend = [];
        // 判断是多个类型还是单个类型
        if(Object.prototype.toString.call(data.y[0]) === '[object Object]'){
            // 多个类型
            data.y.forEach(item => {
                legend.push(item.type);
                let ele = {
                    name: item.type,
                    type: 'line',
                    stack: 'all',
                    data: item.value,
                    label:{
                        show:true,
                    },
                    smooth: data.isSmooth || false,
                };
                if(data.isArea){
                    ele.areaStyle = {};
                }
                series.push(ele);
            });
        } else {
            // 单个类型
            series.push({
                data: data.y,
                type: 'line',
                smooth: data.isSmooth || false,
                label:{
                    show:true,
                }
            });
            if(data.isArea){
                series[0].areaStyle = {};
            }
        }
        this.setState({
            series,
            legend
        })
    }

    getOption = () => {
        /**
         * option 参数说明
         * option.title     string     图形标题
         * option.color     string     标题文字颜色
         * option.isSmooth  boolean    是否平滑
         * option.x         array      分类数据
         * option.y         array      value数据
         * option.isArea    boolean    折线下是否阴影
         */
        const data = this.props.option;
        return {
            title: init.title(data),
            legend:{
                data: this.state.legend,
                top:30
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line'
                }
            },
            xAxis: {
                type: 'category',
                data: data.x,
                boundaryGap: data.isArea || Object.prototype.toString.call(data.y[0]) === '[object Object]' ? false : true,
            },
            yAxis: {
                type: 'value'
            },
            series: this.state.series
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