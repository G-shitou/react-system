import React from 'react';
import echarts from 'echarts/lib/echarts';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import init from './utils/common';

export default class Bar extends React.Component {
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
                    type: 'bar',
                    data: item.value,
                    label:{
                        show:true,
                    },
                };
                if(data.isStack){
                    ele.stack = 'all';
                }
                series.push(ele);
            });
        } else {
            // 单个类型
            series.push({
                data: data.y,
                type: 'bar',
                label:{
                    show:true,
                }
            });
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
         * option.x         array      分类数据
         * option.y         array      value数据
         * option.isStack   boolean    是否堆叠
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
                    type: 'shadow'
                }
            },
            xAxis: {
                type: 'category',
                data: data.x
            },
            yAxis: {
                type: 'value'
            },
            series: this.state.series
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