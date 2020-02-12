import React from 'react';
import Line from '../../../components/echarts/line';
import { Collapse, Row, Col } from 'antd';
const { Panel } = Collapse;

export default class Echarts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

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
                                    x:['周一','周二','周三','周四','周五','周六','周日'],
                                    y:[20,40,30,60,50,10,70],
                                    isSmooth:true
                                }} />
                            </Col>
                            <Col span={8}>
                                
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