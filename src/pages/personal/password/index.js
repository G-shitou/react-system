import React from 'react';
import './index.less';
import { Card, Form, Input, Button, message } from 'antd';
class Password extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false
        }
    }

    // 提交函数
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                message.success('修改成功,请重新登录!');
            }else{
                message.error('请按照规则输入!');
            }
        });
    }

    // 输入新密码后,如果确认密码已经输入,检验确认密码
    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirmPassword'], { force: true });
        }
        callback();
    };

    // 校验确认密码,是否和新密码一致
    compareToFirstPassword = (rule, value, callback) => {
        if (value && value !== this.props.form.getFieldValue('newPassword')) {
            callback('两次输入的密码不一致!');
        } else {
            callback();
        }
    }

    // 确认密码失去焦点,如果有值则标记为true
    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

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
                <Card title="修改密码" style={{ width: '100%' }} bordered={false} >
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="旧密码">
                        {getFieldDecorator('oldPassword', {
                            rules: [
                                {
                                    required: true,
                                    message: '旧密码不能为空!',
                                },
                            ]
                        })(<Input.Password placeholder="请输入旧密码"/>)}
                    </Form.Item>
                    <Form.Item label="新密码" hasFeedback>
                        {getFieldDecorator('newPassword', {
                            rules: [
                                {
                                    required: true,
                                    message: '新密码不能为空!',
                                },
                                {
                                    validator: this.validateToNextPassword,
                                },
                            ]
                        })(<Input.Password placeholder="请输入新密码"/>)}
                    </Form.Item>
                    <Form.Item label="确认密码" hasFeedback>
                        {getFieldDecorator('confirmPassword', {
                            rules: [
                                {
                                    required: true,
                                    message: '确认密码不能为空!',
                                },
                                {
                                    validator: this.compareToFirstPassword,
                                },
                            ]
                        })(<Input.Password placeholder="请确认新密码" onBlur={this.handleConfirmBlur}/>)}
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

const password = Form.create()(Password);
export default password;