import React from 'react';
import Line from '../../../components/echarts/line';
import Bar from '../../../components/echarts/bar';
import AngleBar from '../../../components/echarts/angleBar';
import Pie from '../../../components/echarts/pie';
import { Collapse, Row, Col } from 'antd';
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
            }
        }
    }

    UNSAFE_componentWillMount() {

    }

    callback = key => {
        console.log(key);
    }

    render() {
        return (
            <div className="echarts">
                <Collapse defaultActiveKey={['1']} onChange={this.callback}>
                    <Panel header="折线图" key="1">
                        <Row>
                            <Col span={8}>
                                <Line option={{
                                    title:'基础折线',
                                    x:this.state.line.x,
                                    y:this.state.line.y
                                }} />
                            </Col>
                            <Col span={8}>
                                <Line option={{
                                    title:'折线区域',
                                    x:this.state.line.x,
                                    y:this.state.line.y,
                                    isArea:true,
                                    isSmooth:true
                                }} />
                            </Col>
                            <Col span={8}>
                                <Line option={{
                                    title:'平滑折线',
                                    x:this.state.line.x,
                                    y:this.state.line.y,
                                    isSmooth:true
                                }} />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <Line option={{
                                    title:'多类型折线',
                                    x:this.state.line.x,
                                    y:this.state.line.stackY,
                                }} />
                            </Col>
                            <Col span={8}>
                                <Line option={{
                                    title:'多类型平滑区域折线',
                                    x:this.state.line.x,
                                    y:this.state.line.stackY,
                                    isSmooth:true,
                                    isArea:true
                                }} />
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
                                }} />
                            </Col>
                            <Col span={16}>
                                <Bar option={{
                                    title:'多类型柱形图',
                                    x:this.state.line.x,
                                    y:this.state.line.stackY,
                                }} />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <AngleBar option={{
                                    title:'极坐标柱形图',
                                    x:this.state.line.x,
                                    y:this.state.line.stackY,
                                    isStack:true
                                }} />
                            </Col>
                            <Col span={16}>
                                <Bar option={{
                                    title:'堆叠柱形图',
                                    x:this.state.line.x,
                                    y:this.state.line.stackY,
                                    isStack:true
                                }} />
                            </Col>
                        </Row>
                    </Panel>
                    <Panel header="饼图" key="3">
                        <Row>
                            <Col span={8}>
                                <Pie option={{
                                    title:'饼图',
                                    x:this.state.pie.x,
                                    y:this.state.pie.y
                                }} />
                            </Col>
                            <Col span={8}>
                                <Pie option={{
                                    title:'圆环',
                                    x:this.state.pie.x,
                                    y:this.state.pie.y,
                                    isRing:true
                                }} />
                            </Col>
                            <Col span={8}>
                                
                            </Col>
                        </Row>
                    </Panel>
                </Collapse>
            </div>
        )
    }
}