import React from 'react'
import { Card, Table, Badge, Button, Modal, message } from 'antd'
import axios from '../../axios'

export default class HighTable extends React.Component {
    state = {

    }
    params = {
        page: 1
    }
    componentDidMount () {
        this.request()
    }
    request = () => {
        let _this = this
        axios.ajax({
            url: '/table/high/list',
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
                    dataSource: res.result.list
                })
            }
        })
    }
    handleChange = (pagination, filters, sorter) => {
        this.setState({
            sortOrder: sorter.order
        })
    }
    handleDelete = (item) => {
        Modal.confirm({
            title: '确认',
            content: '您确定要删除此条数据吗',
            onOk: () => {
                message.success('删除成功')
                this.request()
            }
        })
    }
    render () {
        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
                width: 80
            },
            {
                title: '姓名',
                dataIndex: 'userName',
                width: 80,
            },
            {
                title: '性别',
                dataIndex: 'sex',
                render(sex) {
                    return sex == 1 ? '男' : '女'
                },
                width: 80
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
                },
                width: 80
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
                },
                width: 80
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 100
            },
            {
                title: '地址',
                dataIndex: 'address',
                width: 160
            },
            {
                title: '起床时间',
                dataIndex: 'time',
                width: 80
            }
        ]
        const columns2 = [
            {
                title: 'id',
                dataIndex: 'id',
                width: 80,
                fixed: 'left'
            },
            {
                title: '姓名',
                dataIndex: 'userName',
                width: 80,
                fixed: 'left'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                render(sex) {
                    return sex == 1 ? '男' : '女'
                },
                width: 80
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
                },
                width: 80
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
                },
                width: 80
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 100
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 100
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 100
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 100
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 100
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 100
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 100
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 100
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 100
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 100
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 100
            },
            {
                title: '地址',
                dataIndex: 'address',
                width: 160,
                fixed: 'right'
            },
            {
                title: '起床时间',
                dataIndex: 'time',
                width: 80,
                fixed: 'right'
            }
        ]
        const columns3 = [
            {
                title: 'id',
                dataIndex: 'id',
                width: 80
            },
            {
                title: '姓名',
                dataIndex: 'userName',
                width: 80,
            },
            {
                title: '性别',
                dataIndex: 'sex',
                render(sex) {
                    return sex == 1 ? '男' : '女'
                },
                width: 80
            },
            {
                title: '年龄',
                dataIndex: 'age',
                width: 80,
                sorter: (a, b) => {
                    return a.age - b.age
                },
                sortOrder: this.state.sortOrder
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
                },
                width: 80
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
                },
                width: 80
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 100
            },
            {
                title: '地址',
                dataIndex: 'address',
                width: 160
            },
            {
                title: '起床时间',
                dataIndex: 'time',
                width: 80
            }
        ]

        const columns4 = [
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
                title: '年龄',
                dataIndex: 'age',
                width: 80
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
                        '1': <Badge status="success" text="成功"/>,
                        '2': <Badge status="error" text="出错" />,
                        '3': <Badge status="default" text="默认" />,
                        '4': <Badge status="processing" text="进行中" />,
                        '5': <Badge status="warning" text="警告" />
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
            },
            {
                title: '操作',
                render: (text, item) => {
                    return <Button size="small" onClick={() => {this.handleDelete(item)}}>删除</Button>
                }
            }
        ]
        
        return (
            <div>
                <Card title="头部固定">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        scroll={{y: 320}}
                    >
                    </Table>
                </Card>
                <Card title="左侧固定" style={{ marginTop: 16 }}>
                    <Table
                        bordered
                        columns={columns2}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        scroll={{x: 2740, y: 320}}
                    >
                    </Table>
                </Card>
                <Card title="表格排序" style={{ marginTop: 16 }}>
                    <Table
                        bordered
                        columns={columns3}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        onChange={this.handleChange}
                    >

                    </Table>
                </Card>
                <Card title="操作按钮" style={{ marginTop: 16 }}>
                    <Table
                        bordered
                        columns={columns4}
                        dataSource={this.state.dataSource}
                        pagination={false}
                    >
                    </Table>
                </Card>
            </div>
        )
    }
}