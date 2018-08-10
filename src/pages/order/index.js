import React from 'react'
import { Card, Form, Select, Button, Table, DatePicker, Modal, message } from 'antd'
import axios from '../../axios'
import utils from '../../utils/utils.js'
import BaseForm from '../../components/base-form'
import ETable from '../../components/e-table'

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
    formList = [
        {
            type: 'SELECT',
            label: '城市',
            field: 'city',
            placeholder: '全部',
            initValue: '1',
            width: 80,
            list: [
                { id: '0', name: '全部' },
                { id: '1', name: '北京' },
                { id: '2', name: '天津' },
                { id: '3', name: '上海' }
            ]
        },
        {
            type: '时间查询'
        },
        {
            type: 'SELECT',
            label: '订单状态',
            field: 'order_status',
            placeholder: '全部',
            initValue: '1',
            width: 80,
            list: [
                { id: '0', name: '全部' },
                { id: '1', name: '进行中' },
                { id: '2', name: '结束行程' }
            ]
        }
    ]
    componentDidMount () {
        this.requestList()
    }
    handleFilter = (params) => {
        this.params = params
        this.requestList()
    }
    requestList = () => {
        axios.requestList(this, '/order/list', this.params, true)
        // let _this = this
        // axios.ajax({
        //     url: '/order/list', 
        //     data: {
        //         params: this.params
        //     }
        // }).then((res) => {
        //     let list = res.result.item_list.map((item, index) =>{
        //         item.key = index
        //         return item
        //     })
        //     this.setState({
        //         list,
        //         pagination: utils.pagination(res, (current) => {
        //             _this.params.page = current
        //             _this.requestList()
        //         })
        //     })
        // })
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
                dataIndex: 'order_sn',
                key: 'order_sn'
            },
            {
                title: '车辆编号',
                dataIndex: 'bike_sn',
                key: 'bike_sn'
            },
            {
                title: '用户名',
                dataIndex: 'user_name',
                key: 'user_name'
            },
            {
                title: '手机号',
                dataIndex: 'mobile',
                key: 'mobile'
            },
            {
                title: '里程',
                dataIndex: 'distance',
                key: 'distance',
                render (distance) {
                    return distance / 1000 + 'Km'
                }
            },
            {
                title: '行驶时长',
                dataIndex: 'total_time',
                key: 'total_time'
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status'
            },
            {
                title: '开始时间',
                dataIndex: 'start_time',
                key: 'start_time'
            },
            {
                title: '结束时间',
                dataIndex: 'end_time',
                key: 'end_time'
            },
            {
                title: '订单金额',
                dataIndex: 'user_pay',
                key: 'user_pay'
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
       
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter}/>
                </Card>
                <Card style={{marginTop: 2}}>
                    <Button type="primary" onClick={this.openOrderDetail}>订单详情</Button>
                    <Button type="primary" style={{marginLeft: 16}} onClick={this.handleFinishOrder}>结束订单</Button>
                </Card>
                <div className="content-wrap">
                    <ETable
                        updateSelectedItem={utils.updateSelectedItem.bind(this)}
                        columns={columns}
                        dataSource={this.state.list}
                        selectedRowKeys={this.state.selectedRowKeys}
                        pagination={this.state.pagination}
                        rowSelection="radio"
                        selectedIds={this.state.selectedIds}
                        selectedItem={this.state.selectedItem}
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
