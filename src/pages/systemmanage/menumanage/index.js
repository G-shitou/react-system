import React from 'react';
import { get } from './../../../axios'
import { Row, Col, Card, Form, Input, Button, message, Modal, Tree } from 'antd';
const { confirm } = Modal;
const { TreeNode } = Tree;
export default class Menumanage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menus:[],
            tree:'',
            type:'detail',
            selectedKeys:[],
            checkedKeys:[],
            selectedNode:{},
            isShow:false,
            buttonName:'提交'
        }
    }

    UNSAFE_componentWillMount(){
        this.searchMenus();
    }

    searchMenus = () => {
        get('/api/menuList').then(res => {
            let menus = res.data.menusList;
            const tree = this.renderTree(menus);
            this.setState({
                menus,
                tree
            });
        }).catch( e => {
            console.log(e)
        })
    }

    // 生成树
    renderTree = data => {
        return data.map( item => {
            if(item.children && item.children.length > 0){
                return (
                    <TreeNode title={item.title} key={item.id} node={item}>
                        {this.renderTree(item.children)}
                    </TreeNode>
                )
            }else{
                return (
                    <TreeNode title={item.title} key={item.id} node={item}></TreeNode>
                )
            }
        })
    }

    onCheck = (checkedKeys,e) => {
        this.setState({
            checkedKeys:[e.node.props.eventKey],
            selectedKeys:[e.node.props.eventKey],
            selectedNode:e.node.props.node,
            isShow:false,
            type:'detail'
        });
    };
    
    onSelect = (selectedKeys, info) => {
        this.setState({
            selectedKeys,
            checkedKeys:selectedKeys,
            selectedNode:selectedKeys.length === 0 ? {} : info.node.props.node,
            isShow:false,
            type:'detail'
        });
    };

    // 操作按钮统一处理
    handleOperator = type => {
        switch (type) {
            case 'add':
                this.setState({
                    selectedNode:{
                        pid:this.state.selectedNode.id || ''
                    },
                    isShow:true,
                    type
                })
                break;
            case 'edit':
                if(this.state.selectedKeys.length === 0){
                    message.error('请选择一个要编辑的菜单');
                    return;
                }
                this.setState({
                    isShow:true,
                    type
                });
                break;
            case 'delete':
                if(this.state.selectedKeys.length === 0){
                    message.error('请选择一个要删除的菜单');
                    return;
                }
                if(this.state.selectedNode.children && this.state.selectedNode.children.length > 0){
                    message.error('该菜单包含子菜单,请先删除子菜单!');
                    return;
                }
                let that = this;
                confirm({
                    title: '友情提示',
                    content: '确定删除您选中的菜单吗?',
                    onOk() {
                      return new Promise((resolve, reject) => {
                        // 调用删除接口,发送所选菜单id
                        message.success('删除菜单成功!')
                        that.setState({
                            selectedKeys:[],
                            checkedKeys:[],
                            isShow:false,
                            selectedNode:{}
                        },()=>{
                            // 重新请求数据
                            that.searchMenus();
                            resolve();
                        })
                      }).catch(() => console.log('Oops errors!'));
                    },
                    onCancel() {},
                  });
                break;
            default:
                break;
        }
    }

    // 表单提交
    formSubmit = (data) => {
        // data为menu表单的值,提交后刷新menu,此处省略提交
        message.success('提交成功!');
        this.setState({
            selectedKeys:[],
            checkedKeys:[],
            isShow:false,
            selectedNode:{}
        },() => {
            this.searchMenus();
        })
    }

    render() {
        return (
            <div className="menumanage">
                <Card className="cardButton">
                    <Button icon="plus-circle" type="primary" onClick={() => this.handleOperator('add')}>新增菜单</Button>
                    <Button icon="edit" type="primary" onClick={() => this.handleOperator('edit')}>编辑菜单</Button>
                    <Button icon="delete" type="primary" onClick={() => this.handleOperator('delete')}>删除菜单</Button>
                </Card>
                <Row>
                    <Col span={10} offset={2}>
                        <Tree
                            checkable
                            defaultExpandAll
                            checkStrictly={true}
                            onCheck={this.onCheck}
                            checkedKeys={this.state.checkedKeys}
                            onSelect={this.onSelect}
                            selectedKeys={this.state.selectedKeys}
                        >
                            {this.state.tree}
                        </Tree>
                    </Col>
                    <Col span={12}>
                        <MenuInfo 
                            menuInfo={this.state.selectedNode}
                            isShow={this.state.isShow}
                            buttonName={this.state.buttonName}
                            type = {this.state.type}
                            formSubmit = {this.formSubmit}/>
                    </Col>
                </Row>
            </div>
        )
    }
}

// 菜单信息表单
class MenuInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    // 提交函数
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                // 清空表单
                this.props.form.resetFields();
                this.props.formSubmit(values)
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
              sm: { span: 5 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
        };
        const menuInfo = this.props.menuInfo || {};
        const type = this.props.type;
        return (
            <div className="menuInfo">
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="菜单ID">
                        {
                            getFieldDecorator('id', {
                                initialValue: menuInfo.id
                            })(<Input disabled={true}/>)
                        }
                    </Form.Item>
                    <Form.Item label="菜单PID">
                        {
                            getFieldDecorator('pid', {
                                initialValue: menuInfo.pid
                            })(<Input disabled={true}/>)
                        }
                    </Form.Item>
                    <Form.Item label="菜单名">
                        {
                            getFieldDecorator('title', {
                                rules: [
                                {
                                    max: 10,
                                    message: '最多输入10个字符!',
                                },
                                {
                                    required: true,
                                    message: '菜单名不能为空!',
                                },
                                ],
                                initialValue: menuInfo.title || ''
                            })(<Input placeholder="请输入菜单名" disabled={type==='detail' ? true : false}/>)
                        }
                    </Form.Item>
                    <Form.Item label="图标">
                        {
                            getFieldDecorator('icon', {
                                initialValue: menuInfo.icon
                            })(<Input placeholder="请输入菜单图标" disabled={type==='detail' ? true : false}/>)
                        }
                    </Form.Item>
                    <Form.Item label="路由">
                        {
                            getFieldDecorator('path', {
                                rules: [
                                    {
                                        required: true,
                                        message: '菜单路由不能为空!',
                                    },
                                ],
                                initialValue: menuInfo.path
                            })(<Input placeholder="请输入菜单路由" disabled={type==='detail' ? true : false}/>)
                        }
                    </Form.Item>
                    <Form.Item label="组件">
                        {
                            getFieldDecorator('component', {
                                initialValue: menuInfo.component
                            })(<Input placeholder="请输入菜单对应组件" disabled={type==='detail' ? true : false}/>)
                        }
                    </Form.Item>
                    <Form.Item label="打开页面方式">
                        {
                            getFieldDecorator('target', {
                                initialValue: menuInfo.target
                            })(<Input placeholder="请输入打开也买你方式" disabled={type==='detail' ? true : false}/>)
                        }
                    </Form.Item>
                    {
                        this.props.isShow && <Form.Item wrapperCol={{ span: 4, offset: 11 }}>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                { this.props.buttonName }
                            </Button>
                        </Form.Item>
                    }
                </Form>
            </div>
        )
    }
}
MenuInfo = Form.create()(MenuInfo)