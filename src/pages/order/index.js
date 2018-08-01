import React from 'react'
import { Card, Form, Select, Button, Table, DatePicker, Modal, message } from 'antd'
import axios from '../../axios'
import utils from '../../utils/utils.js'

const FormItem = Form.Item
const Option = Select.Option

export default class Order extends React.Component {
    state = {
        orderConfirmVisible: false,
        orderInfo: {},
        selectedRowKeys: [],
        selectedItem: null
    }
    params = {
        page: 1
    }
    componentDidMount () {
        this.requestList()
    }
    requestList = () => {
        let _this = this
        axios.ajax({
            url: '/order/list', 
            data: {
                params: {
                    page: this.params.page
                }
            }
        }).then((res) => {
            let list = res.result.item_list.map((item, index) =>{
                item.key = index
                return item
            })
            this.setState({
                list,
                pagination: utils.pagination(res, (current) => {
                    _this.params.page = current
                    _this.requestList()
                })
            })
        })
    }
    // 打开结束订单弹框
    handleFinishOrder = () => {
        let item = this.state.selectedItem
        if (!item) {
            Modal.info({
                title: '信息',
                content: '请选择一条订单进行结束'
            })
            return
        }
        axios.ajax({
            url: '/order/ebike_info',
            data: {
                params: {
                    orderId: item.id
                }
            }
        }).then((res) => {
            if (res.code == 0) {
                this.setState({
                    orderInfo: res.result,
                    orderConfirmVisible: true
                })
            }
        })
    }
    // 结束订单确认
    handleFinishOrderOk = () => {
        let item = this.state.selectedItem
        axios.ajax({
            url: '/order/finish_order',
            data: {
                params: {
                    orderId: item.id
                }
            }
        }).then((res) => {
            if (res.code == 0) {
                message.success('结束订单成功')
                this.setState({
                    orderConfirmVisible: false
                })
                this.requestList()
            }
        })
    }
    onRowClick = (record, index) => {
        let selectKey = [index]
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        })
        // Modal.info({
        //     title: '信息',
        //     // content: `${this.state.selectedRowKeys}, ${this.state.selectedItem}`
        //     content: `${selectKey}, ${record}`
        // })
        // state不会实时更新，定时器内部的是点击的值，定时器外部的是点击的上一次的值
        // console.log(this.state.selectedRowKeys)
        // setTimeout(() => {
        //     console.log(this.state.selectedRowKeys)
        // }, 1)
    }
    openOrderDetail = () => {
        let item = this.state.selectedItem
        if (!item) {
            Modal.info({
                title: '信息',
                content: '请先选择一条订单'
            })
            return
        }
        window.open(`/#/common/order/detail/${item.id}`, '_blank')
    }
    render () {
        const columns = [
            {
                title: '订单编号',
                dataIndex: 'order_sn'
            },
            {
                title: '车辆编号',
                dataIndex: 'bike_sn'
            },
            {
                title: '用户名',
                dataIndex: 'user_name'
            },
            {
                title: '手机号',
                dataIndex: 'mobile'
            },
            {
                title: '里程',
                dataIndex: 'distance',
                render (distance) {
                    return distance / 1000 + 'Km'
                }
            },
            {
                title: '行驶时长',
                dataIndex: 'total_time'
            },
            {
                title: '状态',
                dataIndex: 'status'
            },
            {
                title: '开始时间',
                dataIndex: 'start_time'
            },
            {
                title: '结束时间',
                dataIndex: 'end_time'
            },
            {
                title: '订单金额',
                dataIndex: 'user_pay'
            }
        ]
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            }
        }
        const selectedRowKeys = this.state.selectedRowKeys
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }
        return (
            <div>
                <Card>
                    <FilterForm />
                </Card>
                <Card style={{marginTop: 2}}>
                    <Button type="primary" onClick={this.openOrderDetail}>订单详情</Button>
                    <Button type="primary" style={{marginLeft: 16}} onClick={this.handleFinishOrder}>结束订单</Button>
                </Card>
                <div className="content-wrap">
                    <Table 
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        rowSelection={rowSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index)
                                }
                            }
                        }}
                    />
                </div>
                <Modal
                    title="结束订单"
                    visible={this.state.orderConfirmVisible}
                    onCancel={() => {
                        this.setState({
                            orderConfirmVisible: false
                        })
                    }}
                    onOk={this.handleFinishOrderOk}
                    width={600}
                >
                    <Form layout="horizontal">
                        <FormItem label="车辆编号" {...formItemLayout}>
                            {this.state.orderInfo.bike_sn}
                        </FormItem> 
                        <FormItem label="剩余电量" {...formItemLayout}>
                            {this.state.orderInfo.battery + '%'}
                        </FormItem>
                        <FormItem label="行程开始时间" {...formItemLayout}>
                            {this.state.orderInfo.start_time}
                        </FormItem>
                        <FormItem label="当前位置" {...formItemLayout}>
                            {this.state.orderInfo.location}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}

class FilterForm extends React.Component {
    render () {
        const { getFieldDecorator } = this.props.form
        return (
            <Form layout="inline">
                <FormItem label="城市">
                    {
                        getFieldDecorator('city_id')(
                            <Select 
                                placeholder="全部"
                                style={{width: 86}}
                            >
                                <Option value="">全部</Option>
                                <Option value="1">北京市</Option>
                                <Option value="2">天津市</Option>
                                <Option value="3">上海市</Option>
                                <Option value="4">深圳市</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="订单时间">
                    {
                        getFieldDecorator('start_time')(
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                        )
                    }
                </FormItem>
                <FormItem>
                    {
                        getFieldDecorator('end_time')(
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                        ) 
                    }
                </FormItem>
                <FormItem label="订单状态">
                    {
                        getFieldDecorator('op_mode')(
                            <Select
                                placeholder="全部"
                                style={{width: 72}}
                            >
                                <Option value="">全部</Option>
                                <Option value="1">进行中</Option>
                                <Option value="2">结束行程</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem>
                    <Button type="primary" style={{margin: '0 20px'}}>查询</Button>
                    <Button>重置</Button>
                </FormItem>
            </Form>
        )
    }
}

FilterForm = Form.create({})(FilterForm)