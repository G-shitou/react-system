import React from 'react';
import { get } from './../../../axios'
import { Card, Button, Modal, Form, Input, Radio, message } from 'antd';
import Basetable from '../../../components/baseTable'
const { confirm } = Modal;
const { Search } = Input;
// 定义table的列
const columns = [{
    title: '姓名',
    dataIndex: 'name',
    width: 100,
    align: 'center'
},
{
    title: '性别',
    dataIndex: 'sex',
    width: 100,
    align: 'center',
    render:sex => {
        return sex === 0 ? '女' : '男'
    }
},
{
    title: '电话',
    dataIndex: 'tel',
    width: 150,
    align: 'center'
},
{
    title: '邮箱',
    dataIndex: 'email',
    width: 200,
    align: 'center'
},
{
    title: '年龄',
    dataIndex: 'age',
    width: 100,
    align: 'center'
},
{
    title: '备注',
    dataIndex: 'descript'
}];

export default class UserManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            loading: false,
            pageSize:10,
            pageNum:1,
            total:0,
            searchName: '',
            list:[],
            isVisible:false,
            type:'',
            title:''
        }
    }

    UNSAFE_componentWillMount(){
        this.search();
    }

    // 查找表格数据
    search = () => {
        get('/api/user',{
            params:{
                pageSize:this.state.pageSize,
                pageNum:this.state.pageNum,
                searchName:this.state.searchName
            }
        }).then(res => {
            this.setState({
                list:res.data.list,
                total:res.data.total
            })
        }).catch( e => {
            console.log(e);
        })
    }

    // 查询用户
    searchUser = value => {
        this.setState({
            searchName:value,
            selectedRowKeys:[]
        },()=>{
            this.search();
        })
    }

    // 分页变化
    onChange = (pageNum,pageSize) => {
        this.setState({
            pageNum,
            pageSize
        },()=>{
            this.search();
        });
    }

    // 选中行发生变化
    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    };

    // 操作用户信息
    handleOperator = type => {
        switch (type) {
            case 'add':
                this.setState({
                    isVisible:true,
                    type,
                    title:'新增用户',
                    userInfo:{}
                })
                break;
            case 'edit':
            case 'detail':
                if(this.state.selectedRowKeys.length !== 1){
                    message.error('请选择一个用户!');
                    return;
                }
                const userInfo = this.state.list[this.state.selectedRowKeys];
                console.log(userInfo);
                this.setState({
                    isVisible:true,
                    userInfo,
                    type,
                    title:type === 'edit' ? '编辑用户信息':'查看用户信息'
                })
                break;
            case 'delete':
                if(this.state.selectedRowKeys.length === 0){
                    message.error('请至少选择一个用户!');
                    return;
                }
                let that = this;
                confirm({
                    title: '友情提示',
                    content: '确定删除您选中的用户吗?',
                    onOk() {
                      return new Promise((resolve, reject) => {
                        // 调用删除接口,发送所选用户ids
                        message.success('删除用户成功!')
                        that.setState({
                            selectedRowKeys:[],
                            userInfo:''
                        },()=>{
                            // 重新请求数据
                            that.search();
                            resolve();
                        })
                      }).catch(() => console.log('Oops errors!'));
                    },
                    onCancel() {},
                  });
                break;
            default:
        }
    }

    // 用户信息弹窗点击确定
    handleSubmit = () => {
        if(this.state.type === 'detail'){
            this.setState({
                isVisible:false
            });
            return;
        }
        this.userForm.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                values.id = this.state.type === 'edit' ? this.state.userInfo.id : '';
                console.log(values);
                // 此处调用添加，编辑接口，省略
                // 清空表单
                this.userForm.props.form.resetFields();
                this.state.type === 'add' ? message.success('添加用户成功!') : message.success('编辑信息成功');
                this.setState({
                    isVisible:false,
                    selectedRowKeys:[],
                    userInfo:''
                },()=>{
                    // 重新请求数据
                    this.search();
                })
            }else{
                message.error('请检查格式!');
            }
        });
    }

    render() {
        return (
            <div className="userManage tableManage">
                {/* 操作区域 */}
                <Card className="cardButton">
                    <Button icon="plus-circle" type="primary" onClick={() => this.handleOperator('add')}>新增用户</Button>
                    <Button icon="edit" type="primary" onClick={() => this.handleOperator('edit')}>编辑用户</Button>
                    <Button icon="delete" type="primary" onClick={() => this.handleOperator('delete')}>删除用户</Button>
                    <Button icon="border-outer" type="primary" onClick={() => this.handleOperator('detail')}>查看用户</Button>
                    <Search
                        placeholder="查询用户姓名"
                        enterButton="查询"
                        style={{ width: 200 }}
                        onSearch={value => this.searchUser(value)}
                    />
                </Card>
                {/* 列表区域 */}
                <Basetable
                    columns = {columns}
                    list = {this.state.list}
                    selectedRowKeys = {this.state.selectedRowKeys}
                    total = {this.state.total}
                    updateSelectedRowKeys = {this.onSelectChange}
                    undatePagination = {this.onChange}
                >
                </Basetable>
                {/* 用户表单区域 */}
                <Modal
                    title={this.state.title}
                    visible={this.state.isVisible}
                    onOk={this.handleSubmit}
                    width={800}
                    onCancel={()=>{
                        // 表单置空
                        this.userForm.props.form.resetFields();
                        this.setState({
                            isVisible:false
                        })
                    }}
                >
                    <UserInfo userInfo={this.state.userInfo} type={this.state.type} wrappedComponentRef={(form) => this.userForm = form }/>
                </Modal>
            </div>
        )
    }
}

// 用户信息表单
class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        // form布局结构
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 5 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
        };
        const userInfo = this.props.userInfo || {};
        const type = this.props.type;
        return (
            <div className="userInfo">
                <Form {...formItemLayout}>
                    <Form.Item label="姓名">
                        {
                            type === 'detail' ? userInfo.name :
                            getFieldDecorator('name', {
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
                                initialValue: userInfo.name || ''
                            })(<Input placeholder="请输入用户姓名"/>)
                        }
                    </Form.Item>
                    <Form.Item label="年龄">
                        {
                            type === 'detail' ? userInfo.age :
                            getFieldDecorator('age', {
                                rules: [
                                {
                                    required: true,
                                    message: '用户名不能为空!',
                                },
                                ],
                                initialValue: userInfo.age
                            })(<Input placeholder="请输入用户年龄"/>)
                        }
                    </Form.Item>
                    <Form.Item label="性别">
                        {
                            type === 'detail' ? (userInfo.sex === 0 ? '女' : '男') :
                            getFieldDecorator('sex', {
                                rules: [
                                    {
                                        required: true,
                                        message: '性别不能为空!',
                                    },
                                ],
                                initialValue: userInfo.sex
                            })(<Radio.Group>
                                <Radio value={0}>女</Radio>
                                <Radio value={1}>男</Radio>
                            </Radio.Group>)
                        }
                    </Form.Item>
                    <Form.Item label="手机号">
                        {
                            type === 'detail' ? userInfo.tel :
                            getFieldDecorator('tel', {
                                rules: [
                                    {
                                        required: true,
                                        message: '手机号不能为空!',
                                    },
                                ],
                                initialValue: userInfo.tel
                            })(<Input placeholder="请输入手机号"/>)
                        }
                    </Form.Item>
                    <Form.Item label="电子邮箱">
                        {
                            type === 'detail' ? userInfo.email :
                            getFieldDecorator('email', {
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
                                initialValue: userInfo.email
                            })(<Input placeholder="请输入电子邮箱"/>)
                        }
                    </Form.Item>
                    <Form.Item label="备注">
                        {
                            type === 'detail' ? userInfo.descript :
                            getFieldDecorator('descript', {
                                rules: [
                                    {
                                        max: 30,
                                        message: '最多输入20个字符!',
                                    }
                                ],
                                initialValue: userInfo.descript
                            })(<Input placeholder="可添加备注"/>)
                        }
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
UserInfo = Form.create()(UserInfo)