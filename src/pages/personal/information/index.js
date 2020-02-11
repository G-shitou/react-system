import React from 'react';
import { get } from './../../../axios'
import './index.less';
import { Card, Form, Input, Tooltip, Icon, DatePicker, Radio, Upload, Button, message } from 'antd';
import moment from 'moment';
// import 'moment/locale/zh-cn';
// moment.locale('zh-cn');

// const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

class InformationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            information:{
                birthday:'1994/04/15'
            }
        }
    }

    UNSAFE_componentWillMount(){
        get('/api/information').then(res => {
            this.setState({
                information: res.data.information
            });
        }).catch( e => {
            console.log(e);
        })
    }

    // 提交函数
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                values.birthday = values['birthday'].format('YYYY/MM/DD');
                this.setState({
                    information: values
                });
                message.success('提交成功!');
            }else{
                message.error('提交失败,请检查格式!');
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        // form布局结构
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 8 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 8 },
            },
        };
        return (
            <div className="information">
                <Card title="我的信息" style={{ width: '100%' }} bordered={false} >
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="用户名">
                        {getFieldDecorator('username', {
                            rules: [
                            {
                                max: 10,
                                message: '最多输入10个字符!',
                            },
                            {
                                required: true,
                                message: '用户名不能为空!',
                            },
                            ],
                            initialValue: this.state.information.username
                        })(<Input placeholder="请输入用户名"/>)}
                    </Form.Item>
                    <Form.Item label="出生年月">
                        {getFieldDecorator('birthday', {
                            rules: [
                            {
                                type: 'object',
                                required: true,
                                message: '出生年月不能为空!',
                            },
                            ],
                            initialValue: moment(this.state.information.birthday, dateFormat)
                        })(<DatePicker format={dateFormat} />)}
                    </Form.Item>
                    <Form.Item label="性别">
                        {getFieldDecorator('sex', {
                            rules: [
                            {
                                required: true,
                                message: '性别不能为空!',
                            },
                            ],
                            initialValue: this.state.information.sex
                        })(<Radio.Group>
                            <Radio value={0}>男</Radio>
                            <Radio value={1}>女</Radio>
                          </Radio.Group>)}
                    </Form.Item>
                    <Form.Item label="手机号">
                        {getFieldDecorator('phone', {
                            rules: [
                            {
                                required: true,
                                message: '手机号不能为空!',
                            },
                            ],
                            initialValue: this.state.information.phone
                        })(<Input placeholder="请输入手机号"/>)}
                    </Form.Item>
                    <Form.Item label="电子邮箱">
                        {getFieldDecorator('email', {
                            rules: [
                            {
                                type: 'email',
                                message: '格式错误!',
                            },
                            {
                                required: true,
                                message: '电子邮箱不能为空!',
                            },
                            ],
                            initialValue: this.state.information.email
                        })(<Input placeholder="请输入电子邮箱"/>)}
                    </Form.Item>
                    <Form.Item label={<span>家庭住址&nbsp;
                        <Tooltip title="请填写常住地址">
                            <Icon type="question-circle-o" style={{color:'#BFBFBF'}} />
                        </Tooltip>
                        </span>} >
                        {getFieldDecorator('address', {
                            rules: [
                            {
                                required: true,
                                message: '家庭住址不能为空!',
                            },
                            ],
                            initialValue: this.state.information.address
                        })(<Input placeholder="请输入家庭住址"/>)}
                    </Form.Item>
                    <Form.Item label="资料上传">
                        <Upload name="avatar"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="post">
                            <Button>
                                <Icon type="upload" /> 点击上传
                            </Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 4, offset: 11 }}>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
                </Card>
            </div>
        )
    }
}
const Information = Form.create()(InformationForm);
export default Information;