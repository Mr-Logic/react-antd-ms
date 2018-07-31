import React from 'react'
import { Card, Table, Modal, Button, message } from 'antd'
import axios from '../../axios'
import Utils from '../../utils/utils'

export default class BasicTable extends React.Component {
    state = {
        dataSource2: []
    }

    params = {
        page: 1
    }

    componentDidMount() {
        const dataSource = [
            {
                id: '0',
                userName: 'Jack',
                sex: '1',
                state: '1',
                interest: '1',
                birthday: '2000-01-01',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00'
            },
            {
                id: '1',
                userName: 'Tom',
                sex: '1',
                state: '1',
                interest: '1',
                birthday: '2000-01-01',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00'
            },
            {
                id: '2',
                userName: 'Lily',
                sex: '1',
                state: '1',
                interest: '1',
                birthday: '2000-01-01',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00'
            },
            {
                id: '3',
                userName: 'July',
                sex: '2',
                state: '2',
                interest: '2',
                birthday: '2001-09-09',
                address: '广州市越秀区黄花岗公园',
                time: '10:00'
            },
            {
                id: '4',
                userName: 'Sarah',
                sex: '3',
                state: '3',
                interest: '3',
                birthday: '2000-05-05',
                address: '上海市黄浦区沿河大道',
                time: '00:00'
            }
        ]
        dataSource.map((item, index) => {
            item.key = index
        })
        this.setState({
            dataSource
        })
        this.request()
    }
    request = () => {
        let _this = this
        axios.ajax({
            url: '/table/list',
            data: {
                params: {
                    page: this.params.page
                }
            }
        }).then((res) => {
            if (res.code == 0) {
                res.result.list.map((item, index) => {
                    item.key = index
                })
                this.setState({
                    dataSource2: res.result.list,
                    selectedRowKeys: null,
                    selectedRows: [],
                    pagination: Utils.pagination(res, (current) => {
                        // to-do
                        _this.params.page = current
                        _this.request()
                    })
                })
            }
        })
    }
    onRowClick = (record, index) => {
        let selectKey = [index]
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        })
        Modal.info({
            title: '信息',
            content: `用户名：${record.userName} 用户爱好：${record.interest}`
        })
    }
    handleDelete = () => {
        let rows = this.state.selectedRows
        let ids = []
        rows.map((item) => {
            ids.push(item.id)
        })
        Modal.info({
            title: '删除提示',
            content: `您确定要删除id为以下的信息吗？${ids.join(',')}`,
            onOk: () => {
                message.success('删除成功')
                this.request()
            }
        })
    }
    render() {
        const columns = [
            {
                title: 'id',
                dataIndex: 'id'
            },
            {
                title: '姓名',
                dataIndex: 'userName'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                render(sex) {
                    return sex == 1 ? '男' : '女'
                }
            },
            {
                title: '状态',
                dataIndex: 'state',
                render(state) {
                    const config = {
                        '1': '风华浪子',
                        '2': '咸鱼一条',
                        '3': '北大才子',
                        '4': '企业FE',
                        '5': '创业者'
                    }
                    return config[state]
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                render(interest) {
                    let config = {
                        '1': '游泳',
                        '2': '打篮球',
                        '3': '踢足球',
                        '4': '跑步',
                        '5': '爬山',
                        '6': '阅读',
                        '7': '骑行',
                        '8': '旅游'
                    }
                    return config[interest]
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '地址',
                dataIndex: 'address'
            },
            {
                title: '起床时间',
                dataIndex: 'time'
            }
        ]
        const { selectedRowKeys } = this.state
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }
        const rowCheckSelection = {
            type: 'checkbox',
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys,
                    selectedRows
                })
            }
        }
        return (
            <div>
                <Card title="基础表格">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                    >
                    </Table>
                </Card>
                <Card title="动态数据渲染表格-Mock" style={{ marginTop: 16 }}>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                    >
                    </Table>
                </Card>
                <Card title="Mock-单选" style={{ marginTop: 16 }}>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        rowSelection={rowSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index)
                                }
                            }
                        }}
                    />
                </Card>
                <Card title="Mock-多选" style={{ marginTop: 16 }}>
                    <div style={{ marginBottom: 10 }}>
                        <Button onClick={this.handleDelete}>删除</Button>
                    </div>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        rowSelection={rowCheckSelection}
                    />
                </Card>
                <Card title="Mock-分页" style={{ marginTop: 16 }}>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={this.state.pagination}
                    />
                </Card>
            </div>
        )
    }
}