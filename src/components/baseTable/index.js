import React from 'react';
import './index.less';
import { Table } from 'antd';
export default class BaseTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    // 点击行选中
    onClickRow = (record) => {
        return {
            onClick: () => {
                let {selectedRowKeys}=this.props;
                let  bool=false;
                selectedRowKeys.find(function(value) {
                    if(value ===record.id) {
                        bool=true;
                    }
                })
                // 已经选中就取消勾选
                if(bool){
                    selectedRowKeys.splice(selectedRowKeys.findIndex(item => item=== record.id), 1)}
                else{
                    // 没有选中就勾选
                    selectedRowKeys.push(record.id)
                }
                this.props.updateSelectedRowKeys(selectedRowKeys);
            }
        };
    }

    // 选中行发生变化
    onSelectChange = selectedRowKeys => {
        this.props.updateSelectedRowKeys(selectedRowKeys);
    };

    // 分页数据发生变化
    onChange = (pageNum,pageSize) => {
        this.props.undatePagination(pageNum,pageSize);
    }

    render() {
        const rowSelection = {
            selectedRowKeys: this.props.selectedRowKeys,
            onChange: this.onSelectChange,
        };
        // 计算table通用情况下高度
        let height = document.documentElement.clientHeight;
        height = height - 345;
        return (
            <div className="baseTable">
                <Table
                    rowKey={record => record.id}
                    scroll={{ y: this.props.height || height}}
                    rowSelection={rowSelection}
                    onRow={this.onClickRow}
                    columns={this.props.columns}
                    dataSource={this.props.list}
                    pagination={{
                        defaultCurrent:1,
                        total:this.props.total,
                        showQuickJumper:true,
                        onChange:this.onChange,
                        showTotal:total => `共 ${total} 条`
                    }}
                />
            </div>
        )
    }
}