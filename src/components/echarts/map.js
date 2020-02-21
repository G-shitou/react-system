import React from 'react';
import echarts from 'echarts/lib/echarts';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import "echarts/lib/chart/map";
import "echarts/lib/chart/scatter";
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import "echarts/map/js/china.js";
import init from './utils/common';

export default class Line extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    UNSAFE_componentWillMount() {
        this.setState({
            option: this.getOption()
        })
    }

    randomData() {
        return Math.round(Math.random() * 1000)
    };

    getOption = () => {
        const data = this.props.option;
        const geoCoordMap = {};
        const mapFeatures = echarts.getMap('china').geoJson.features;
        mapFeatures.forEach(function(v) {
            // 地区名称
            var name = v.properties.name;
            // 地区经纬度
            geoCoordMap[name] = v.properties.cp;
        
        });
        const convertData = function(Data) {
            var res = [];
            for (var i = 0; i < Data.length; i++) {
                var geoCoord = geoCoordMap[Data[i].name];
                if (geoCoord) {
                    res.push({
                        name: Data[i].name,
                        value: geoCoord.concat(Data[i].value),
                    });
                }
            }
            return res;
        };
        const seriesData = [
            { name: '北京', value: 300 },
            { name: '天津', value: this.randomData() },
            { name: '上海', value: this.randomData() },
            { name: '重庆', value: this.randomData() },
            { name: '河北', value: this.randomData() },
            { name: '河南', value: this.randomData() },
            { name: '云南', value: this.randomData() },
            { name: '辽宁', value: this.randomData() },
            { name: '黑龙江', value: this.randomData() },
            { name: '湖南', value: this.randomData() },
            { name: '安徽', value: this.randomData() },
            { name: '山东', value: this.randomData() },
            { name: '新疆', value: this.randomData() },
            { name: '江苏', value: this.randomData() },
            { name: '浙江', value: this.randomData() },
            { name: '江西', value: this.randomData() },
            { name: '湖北', value: this.randomData() },
            { name: '广西', value: this.randomData() },
            { name: '甘肃', value: this.randomData() },
            { name: '山西', value: this.randomData() },
            { name: '内蒙古', value: this.randomData() },
            { name: '陕西', value: this.randomData() },
            { name: '吉林', value: this.randomData() },
            { name: '福建', value: this.randomData() },
            { name: '贵州', value: this.randomData() },
            { name: '广东', value: this.randomData() },
            { name: '青海', value: this.randomData() },
            { name: '西藏', value: this.randomData() },
            { name: '四川', value: this.randomData() },
            { name: '宁夏', value: this.randomData() },
            { name: '海南', value: this.randomData() },
            { name: '台湾', value: this.randomData() },
            { name: '香港', value: this.randomData() },
            { name: '澳门', value: this.randomData() }
        ];

        return {
            title: init.title(data),
            tooltip: {
                trigger: 'item'
            },
            // legend: {
            //     orient: 'vertical',
            //     left: 'right',
            //     data: ['类型一', '类型二', '类型三']
            // },
            visualMap: {
                min: 0,
                max: 2500,
                left: 'right',
                top: 'bottom',
                text: ['高', '低'],       // 文本，默认为数值文本
                calculable: true,
                seriesIndex: [0],
                inRange: {
                    color: ['#00467F', '#A5CC82'] // 蓝绿
                }
            },
            geo: {
                show: true,
                map: 'china',
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false,
                    }
                },
                roam: false,
                itemStyle: {
                    normal: {
                        areaColor: '#031525',
                        borderColor: '#3B5077',
                    },
                    emphasis: {
                        areaColor: '#2B91B7',
                    }
                }
            },
            series: [
                {
                    name: '统计',
                    type: 'map',
                    map: 'china',
                    roam: false,
                    geoIndex: 0,
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data: seriesData
                },
                {
                    name: '统计',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: convertData(seriesData),
                    symbolSize: 6,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#05C3F9'
                        }
                    }
                },
                {
                    name: '统计',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    symbol: 'pin', //气泡
                    symbolSize: 30,
                    label: {
                        normal: {
                            show: true,
                            // formatter: '{b}',
                            formatter: function(params){
                                return params.value[2];
                            },
                            textStyle: {
                                color: '#fff',
                                fontSize: 9,
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#F62157', //标志颜色
                        }
                    },
                    zlevel: 6,
                    data: convertData(seriesData),
                },
            ]
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
                style={{ height: 500 }}
                option={this.state.option}
                onEvents={onEvents} />
        )
    }
}