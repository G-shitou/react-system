import React from 'react';
import echarts from 'echarts/lib/echarts';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import 'echarts/lib/chart/funnel';
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
         * option.type      array      分类数据
         * option.data      array      value数据
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
            series: [{
                name: data.name || '统计变量',
                type: 'funnel',
                left: 0,
                top: 60,
                bottom: 20,
                width: '100%',
                min: 0,
                max: 100,
                minSize: '0%',
                maxSize: '100%',
                sort: 'descending',
                gap: 2,
                label: {
                    normal: {
                        show: true,
                        position: 'inside'
                    },
                    emphasis: {
                        textStyle: {
                            fontSize: 16
                        }
                    }
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