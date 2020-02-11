import React from 'react';
import { get } from './../../../axios'
import { Card, Button, Modal, Form, Input, message, Row, Col, Tree } from 'antd';
import Basetable from '../../../components/baseTable'
const { confirm } = Modal;
const { TreeNode } = Tree;
const { Search } = Input;

export default class UserManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            pageSize:10,
            pageNum:1,
            total:0,
            searchName: '',
            list:[],
            isVisible:false,
            type:'',
            title:'',
            showRoleUser:false,
            showRoleLimit:false,
            selectedRole:{}
        }
    }

    UNSAFE_componentWillMount(){
        this.search();
    }

    // 查找表格数据
    search = () => {
        get('/api/role',{
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

    // 查询角色
    searchRole = value => {
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

    // 操作角色信息
    handleOperator = type => {
        switch (type) {
            case 'add':
                this.setState({
                    isVisible:true,
                    type,
                    title:'新增角色',
                    roleInfo:{}
                })
                break;
            case 'edit':
            case 'detail':
                if(this.state.selectedRowKeys.length !== 1){
                    message.error('请选择一个角色!');
                    return;
                }
                const roleInfo = this.state.list[this.state.selectedRowKeys];
                console.log(roleInfo);
                this.setState({
                    isVisible:true,
                    roleInfo,
                    type,
                    title:type === 'edit' ? '编辑角色信息':'查看角色信息'
                })
                break;
            case 'delete':
                if(this.state.selectedRowKeys.length === 0){
                    message.error('请至少选择一个角色!');
                    return;
                }
                let that = this;
                confirm({
                    title: '友情提示',
                    content: '确定删除您选中的角色吗?',
                    onOk() {
                      return new Promise((resolve, reject) => {
                        // 调用删除接口,发送所选角色ids
                        message.success('删除角色成功!')
                        that.setState({
                            selectedRowKeys:[],
                            roleInfo:''
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

    // 角色信息弹窗点击确定
    handleSubmit = () => {
        if(this.state.type === 'detail'){
            this.setState({
                isVisible:false
            });
            return;
        }
        this.roleForm.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                values.id = this.state.type === 'edit' ? this.state.roleInfo.id : '';
                console.log(values);
                // 此处调用添加，编辑接口，省略
                // 清空表单
                this.roleForm.props.form.resetFields();
                this.state.type === 'add' ? message.success('添加角色成功!') : message.success('编辑角色成功');
                this.setState({
                    isVisible:false,
                    selectedRowKeys:[],
                    roleInfo:''
                },()=>{
                    // 重新请求数据
                    this.search();
                })
            }else{
                message.error('请检查格式!');
            }
        });
    }

    // 权限控制
    handleLimit = data => {
        this.setState({
            showRoleLimit:true,
            selectedRole:data
        })
    }

    // 分配权限表单提交
    roleLimitSubmit = () => {
        const nodes = this.refs.tree.state.checkedNodes;
        let ids = [];
        nodes.forEach(item => {
            ids.push(item.props.node.id)
        });
        // 将ids和selectedRole的id发至后台，此处省略
        message.success('权限分配成功!');
        this.setState({
            showRoleLimit:false
        })
    }

    // 关联用户
    handleUser = data => {
        this.setState({
            showRoleUser:true,
            selectedRole:data
        })
    }

    render() {
        // 定义table的列
        const columns = [{
            title: '角色',
            dataIndex: 'name',
            align: 'center'
        },
        {
            title: '角色ID',
            dataIndex: 'roleId',
            align: 'center',
        },{
            title: '操作',
            align:'center',
            render: record => (
                <div className='cardButton'>
                    <Button type="primary" onClick={() => this.handleLimit(record)}>分配权限</Button>
                    <Button type="primary" onClick={() => this.handleUser(record)}>关联用户</Button>
                </div>
            ),
        }];
        return (
            <div className="userManage tableManage">
                {/* 操作区域 */}
                <Card className="cardButton">
                    <Button icon="plus-circle" type="primary" onClick={() => this.handleOperator('add')}>新增角色</Button>
                    <Button icon="edit" type="primary" onClick={() => this.handleOperator('edit')}>编辑角色</Button>
                    <Button icon="delete" type="primary" onClick={() => this.handleOperator('delete')}>删除角色</Button>
                    <Button icon="border-outer" type="primary" onClick={() => this.handleOperator('detail')}>查看角色</Button>
                    <Search
                        placeholder="查询角色名"
                        enterButton="查询"
                        style={{ width: 200 }}
                        onSearch={value => this.searchRole(value)}
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
                {/* 角色表单区域 */}
                <Modal
                    title={this.state.title}
                    visible={this.state.isVisible}
                    onOk={this.handleSubmit}
                    width={800}
                    onCancel={()=>{
                        // 表单置空
                        this.roleForm.props.form.resetFields();
                        this.setState({
                            isVisible:false
                        })
                    }}
                >
                    <RoleInfo roleInfo={this.state.roleInfo} type={this.state.type} wrappedComponentRef={(form) => this.roleForm = form }/>
                </Modal>
                {/* 角色关联用户区域 */}
                <Modal
                    visible={this.state.showRoleUser}
                    onOk={() => {
                        this.setState({
                            showRoleUser:false
                        })
                    }}
                    width={1000}
                    onCancel={()=>{
                        this.setState({
                            showRoleUser:false
                        })
                    }}
                >
                    <RoleUser role={this.state.selectedRole}/>
                </Modal>
                {/* 角色授权表单 */}
                <Modal
                    visible={this.state.showRoleLimit}
                    onOk={this.roleLimitSubmit}
                    width={600}
                    onCancel={()=>{
                        this.setState({
                            showRoleLimit:false
                        })
                    }}>
                    <RoleLimit ref="tree" role={this.state.selectedRole}/>
                </Modal>
            </div>
        )
    }
}

// 角色信息表单
class RoleInfo extends React.Component {
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
        const roleInfo = this.props.roleInfo || {};
        const type = this.props.type;
        return (
            <div className="roleInfo">
                <Form {...formItemLayout}>
                    <Form.Item label="用户名">
                        {
                            type === 'detail' ? roleInfo.name :
                            getFieldDecorator('name', {
                                rules: [
                                {
                                    max: 10,
                                    message: '最多输入10个字符!',
                                },
                                {
                                    required: true,
                                    message: '角色名不能为空!',
                                },
                                ],
                                initialValue: roleInfo.name || ''
                            })(<Input placeholder="请输入角色名"/>)
                        }
                    </Form.Item>
                    <Form.Item label="角色ID">
                        {
                            type === 'detail' ? roleInfo.roleId :
                            getFieldDecorator('roleId', {
                                rules: [
                                {
                                    required: true,
                                    message: '角色ID不能为空!',
                                },
                                ],
                                initialValue: roleInfo.roleId
                            })(<Input placeholder="请输入角色ID"/>)
                        }
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
RoleInfo = Form.create()(RoleInfo);

// 角色关联用户表单
class RoleUser extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            pageSize:10,
            pageNum:1,
            total:0,
            searchName: '',
            list:[],
            selectedRowKeys1: [],
            pageSize1:10,
            pageNum1:1,
            total1:0,
            searchName1: '',
            list1:[]
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
    onChange1 = (pageNum1,pageSize1) => {
        this.setState({
            pageNum1,
            pageSize1
        },()=>{
            this.search();
        });
    }
    // 选中行发生变化
    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    };
    // 选中行发生变化
    onSelectChange1 = selectedRowKeys1 => {
        this.setState({ selectedRowKeys1 });
    };

    // 添加用户
    addUser = () => {
        console.log(this.state);
        const selectedKeys = this.state.selectedRowKeys;
        const list = this.state.list;
        let arr = [],
            ids = [];
        selectedKeys.forEach(item => {
            arr.push(list[item]);
            ids.push(list[item].id)
        })
        arr = arr.concat(this.state.list1);
        this.setState({
            selectedRowKeys:[],
            list1:arr,
            total1:arr.length
        },()=>{
            message.success('添加成功')
        })
    }

    // 删除用户
    deleteUser = () => {
        const selectedKeys1 = this.state.selectedRowKeys1;
        const list1 = this.state.list1;
        let arr = [],
            ids = [];
        selectedKeys1.forEach(item => {
            ids.push(list1[item].id)
        })
        arr.filter((value,index) => {
            return selectedKeys1.indexOf(index) === -1;
        })
        this.setState({
            selectedRowKeys1:[],
            list1:arr,
            total1:arr.length
        },()=>{
            message.success('删除成功')
        })
    }

    render (){
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
        }];
        return (
            <div className="userManage">
                {/* 操作区域 */}
                <span style={ {lineHeight:'30px',marginRight:'20px'} }>当前关联角色：{this.props.role.name}</span>
                <Search
                    placeholder="查询用户姓名"
                    enterButton="查询"
                    style={{ width: 200 }}
                    onSearch={value => this.searchUser(value)}
                />
                {/* 列表区域 */}
                <Row>
                    <Col span={11} style={{textAlign:'center',lineHeight:'30px',fontWeight:900}}>所有用户</Col>
                    <Col span={11} style={{textAlign:'center',lineHeight:'30px',fontWeight:900}} offset={2}>已关联用户</Col>
                </Row>
                <Row>
                    <Col span={11}>
                        <Basetable
                            columns = {columns}
                            list = {this.state.list}
                            selectedRowKeys = {this.state.selectedRowKeys}
                            total = {this.state.total}
                            updateSelectedRowKeys = {this.onSelectChange}
                            undatePagination = {this.onChange}
                            height = {300}
                        >
                        </Basetable>
                    </Col>
                    <Col span={2}>
                        <div style={{marginTop:131}}>
                            <Button onClick={this.addUser} style={{width:'80%',margin:'0 10% 14px 10%'}} icon="right-circle" type="primary"></Button>
                            <Button onClick={this.deleteUser} style={{width:'80%',margin:'0 10%'}} icon="left-circle" type="primary"></Button>
                        </div>
                    </Col>
                    <Col span={11}>
                        <Basetable
                            columns = {columns}
                            list = {this.state.list1}
                            selectedRowKeys = {this.state.selectedRowKeys1}
                            total = {this.state.total1}
                            updateSelectedRowKeys = {this.onSelectChange1}
                            undatePagination = {this.onChange1}
                            height = {300}
                        >
                        </Basetable>
                    </Col>
                </Row>
            </div>
        )
    }
}

// 角色权限表单
class RoleLimit extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            menus:[],
            tree:'',
            checkedKeys:[],
            checkedNodes:[]
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

    onCheck = (checkedKeys,e) => {
        console.log(e);
        this.setState({
            checkedKeys,
            checkedNodes:e.checkedNodes
        });
    };

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

    render(){
        return (
            <div>
                <p>当前角色：{this.props.role.name}</p>
                <Tree
                    checkable
                    defaultExpandAll
                    defaultExpandParent
                    onCheck={this.onCheck}
                    checkedKeys={this.state.checkedKeys}
                >
                    {this.state.tree}
                </Tree>
            </div>
        )
    }
}