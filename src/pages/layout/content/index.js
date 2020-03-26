import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout, Tag } from 'antd';
import './index.less';
import { deleteTag, changeTag } from './../../../redux/action'
const { Content } = Layout;

class content extends React.Component {
    UNSAFE_componentWillMount(){
        
    }
   
    // 关闭tag
    handleClose = index => {
        // 当前路由是删除的路由,跳转到index-1的路由
        if(this.props.tags[index].path === this.props.location.pathname){
            this.props.history.push(this.props.tags[index-1].path);
        }
        // 事件派发，自动调用reducer，通过reducer保存到store对象中
        const { dispatch } = this.props;
        dispatch(deleteTag(index));
    }

    // 切换tag
    handleChangeTag = (index) => {
        if(index !== this.props.tagIndex){
            // 事件派发，自动调用reducer，通过reducer保存到store对象中
            const { dispatch } = this.props;
            dispatch(changeTag({
                menuKey: this.props.tags[index].path,
                tagIndex: index
            }));
        }
    }

    renderTags = data => {
        return data.map((item,index) => {
            return (
                <Tag key={index} color={ this.props.tagIndex === index ? '#108ee9' : ''}
                    closable={index !== 0} onClose={() => this.handleClose(index)}>
                    <Link to={item.path} onClick={ () => this.handleChangeTag(index) }>{item.title}</Link>
                </Tag>
            )
        })
    }
    render() {
        return (
            <Content className={this.props.collapsed ? 'content max-content' : 'content min-content'}>
                <div className='tags'>
                    { this.renderTags(this.props.tags) }
                </div>
                {/* 主要内容区域 */}
                <div className="mainContent">
                    {this.props.children}
                </div>
                <div className='footer'>欢迎！ 技术栈 : react + react-router4.x + redux4.x + axios + antD + less + echarts + fastmock Mock平台</div> 
            </Content>
        )
    }
}
const mapStateToProps = state => {
    return {
        tags: state.tags,
        collapsed: state.isCollapsed,
        tagIndex: state.tagIndex
    }
}

export default withRouter(connect(mapStateToProps)(content));