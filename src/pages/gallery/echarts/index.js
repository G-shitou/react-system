import React from 'react';
import Line from '../../../components/echarts/line';
import Bar from '../../../components/echarts/bar';
import AngleBar from '../../../components/echarts/angleBar';
import Pie from '../../../components/echarts/pie';
import Radar from '../../../components/echarts/radar';
import Funnel from '../../../components/echarts/funnel';
import Gauge from '../../../components/echarts/gauge';
import WordCloud from '../../../components/echarts/wordCloud';
import AirMap from '../../../components/echarts/airMap';
import Map from '../../../components/echarts/map';
import { Collapse, Row, Col, notification } from 'antd';
const { Panel } = Collapse;

export default class Echarts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            line:{
                x:['周一','周二','周三','周四','周五','周六','周日'],
                y:[20,40,30,60,50,10,70],
                stackY:[{type:'类型一',value:[10,20,30,40,50,60,70]},
                    {type:'类型二',value:[30,40,60,70,50,10,20]},
                    {type:'类型三',value:[60,20,10,50,30,70,40]}
                ]
            },
            pie:{
                x:['周一','周二','周三','周四','周五','周六','周日'],
                y:[{name:'周一',value:20},{name:'周二',value:40},{name:'周三',value:30},{name:'周四',value:60},
                {name:'周五',value:50},{name:'周六',value:10},{name:'周日',value:70}]
            },
            radar:{
                type:['类型一','类型二','类型三'],
                indicator:[{name:'周一',max:100},{name:'周二',max:100},{name:'周三',max:100},{name:'周四',max:100},
                    {name:'周五',max:100},{name:'周六',max:100},{name:'周日',max:100}],
                data:[{name:'类型一',value:[10,20,30,40,50,60,70]},
                    {name:'类型二',value:[30,40,60,70,50,10,20]},
                    {name:'类型三',value:[60,20,10,50,30,70,40]}
                ],

            },
            gauge:{
                data:[{name:'达标率',value:20}]
            }
        }
    }

    UNSAFE_componentWillMount() {
        this.changeGauge();
    }

    changeGauge = () => {
        setInterval(()=>{
            const value = (Math.random() * 100).toFixed(2) - 0;
            this.setState({
                gauge:{
                    data:[{name:'达标率',value}]
                }
            })
        },1000)
    }

    callback = key => {
        console.log(key);
    }

    // charts item点击事件
    handleClick = item => {
        console.log(item);
        notification.open({
            message: '点击图例信息:',
            description:'name:' + item.name + ';value:' + item.value
        });
    }

    render() {
        return (
            <div className="echarts">
                <Collapse defaultActiveKey={['5']} onChange={this.callback}>
                    <Panel header="折线图" key="1">
                        <Row>
                            <Col span={8}>
                                <Line option={{
                                    title:'基础折线',
                                    x:this.state.line.x,
                                    y:this.state.line.y
                                }} handleClick={this.handleClick}/>
                            </Col>
                            <Col span={8}>
                                <Line option={{
                                    title:'折线区域',
                                    x:this.state.line.x,
                                    y:this.state.line.y,
                                    isArea:true,
                                    isSmooth:true
                                }} handleClick={this.handleClick}/>
                            </Col>
                            <Col span={8}>
                                <Line option={{
                                    title:'平滑折线',
                                    x:this.state.line.x,
                                    y:this.state.line.y,
                                    isSmooth:true
                                }} handleClick={this.handleClick}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <Line option={{
                                    title:'多类型折线',
                                    x:this.state.line.x,
                                    y:this.state.line.stackY,
                                }} handleClick={this.handleClick}/>
                            </Col>
                            <Col span={8}>
                                <Line option={{
                                    title:'多类型平滑区域折线',
                                    x:this.state.line.x,
                                    y:this.state.line.stackY,
                                    isSmooth:true,
                                    isArea:true
                                }} handleClick={this.handleClick}/>
                            </Col>
                        </Row>
                    </Panel>
                    <Panel header="柱形图" key="2">
                        <Row>
                            <Col span={8}>
                                <Bar option={{
                                    title:'柱形图',
                                    x:this.state.line.x,
                                    y:this.state.line.y
                                }} handleClick={this.handleClick}/>
                            </Col>
                            <Col span={16}>
                                <Bar option={{
                                    title:'多类型柱形图',
                                    x:this.state.line.x,
                                    y:this.state.line.stackY,
                                }} handleClick={this.handleClick}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <AngleBar option={{
                                    title:'极坐标柱形图',
                                    x:this.state.line.x,
                                    y:this.state.line.stackY,
                                    isStack:true
                                }} handleClick={this.handleClick}/>
                            </Col>
                            <Col span={16}>
                                <Bar option={{
                                    title:'堆叠柱形图',
                                    x:this.state.line.x,
                                    y:this.state.line.stackY,
                                    isStack:true
                                }} handleClick={this.handleClick}/>
                            </Col>
                        </Row>
                    </Panel>
                    <Panel header="地图" key="3">
                        <Row>
                            <Col span={12}>
                                <AirMap option={{
                                }} handleClick={this.handleClick}/>
                            </Col>
                            <Col span={12}>
                                <Map option={{
                                }} handleClick={this.handleClick}/>
                            </Col>
                        </Row>
                    </Panel>
                    <Panel header="饼图，圆环，词云" key="4">
                        <Row>
                            <Col span={8}>
                                <Pie option={{
                                    title:'饼图',
                                    x:this.state.pie.x,
                                    y:this.state.pie.y
                                }} handleClick={this.handleClick}/>
                            </Col>
                            <Col span={8}>
                                <Pie option={{
                                    title:'圆环',
                                    x:this.state.pie.x,
                                    y:this.state.pie.y,
                                    isRing:true
                                }} handleClick={this.handleClick}/>
                            </Col>
                            <Col span={8}>
                                <WordCloud option={{
                                    title:'词云',
                                    data:this.state.pie.y
                                }} handleClick={this.handleClick}></WordCloud>
                            </Col>
                        </Row>
                    </Panel>
                    <Panel header="雷达图，漏斗图，仪表盘" key="5">
                        <Row>
                            <Col span={8}>
                                <Radar option={{
                                    title:'雷达图',
                                    type:this.state.radar.type,
                                    data:this.state.radar.data,
                                    indicator:this.state.radar.indicator,
                                    isCircle:true
                                }} handleClick={this.handleClick}/>
                            </Col>
                            <Col span={8}>
                                <Funnel option={{
                                    title:'漏斗图',
                                    type:this.state.pie.x,
                                    data:this.state.pie.y
                                }} handleClick={this.handleClick}></Funnel>
                            </Col>
                            <Col span={8}>
                                <Gauge option={{
                                    title:'仪表盘',
                                    data:this.state.gauge.data
                                }} handleClick={this.handleClick}></Gauge>
                            </Col>
                        </Row>
                    </Panel>
                </Collapse>
            </div>
        )
    }
}