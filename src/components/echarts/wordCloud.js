import React from 'react';
import echarts from 'echarts/lib/echarts';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import "echarts-wordcloud/dist/echarts-wordcloud";
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import init from './utils/common';

export default class Line extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    UNSAFE_componentWillMount() {
        this.setState({
            option:this.getOption()
        })
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
                type: 'wordCloud',
                textStyle: {
                    normal: {
                        // color:'#61a0a8'
                        color: function() {
                            return 'rgb(' + [
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160)
                            ].join(',') + ')';
                        }
                    },
                    emphasis: {
                        shadowBlur: 10,
                        // shadowColor: '#333'
                    }
                },
                data: data.data,
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
                option={this.state.option}
                onEvents={onEvents}/>
        )
    }
}