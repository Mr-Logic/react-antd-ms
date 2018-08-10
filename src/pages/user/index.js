import React from 'react'
import { Card, Button, Modal, Form, Input, Radio, DatePicker, Select } from 'antd'
import axios from '../../axios'
import utils from '../../utils/utils'
import ETable from '../../components/e-table'
import BaseForm from '../../components/base-form'
import '../../style/common.less'
import moment from 'moment'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const TextArea = Input.TextArea
const Option = Select.Option

export default class User extends React.Component {
    state = {
        isVisible: false
    }
    params = {
        page: 1
    }
    formList = [
        {
           type: 'INPUT',
           label: '用户名',
           field: 'user_name',
           placeholder: '请输入用户名',
           width: 120 
        },
        {
            type: 'INPUT',
            label: '用户手机号',
            field: 'user_mobile',
            placeholder: '请输入用户手机号',
            width: 136 
         },
        {
            type: 'DATE',
            label: '入职日期',
            field: 'user_date',
            placeholder: '请选择日期'
        }
    ]
    handleFilter = (params) => {
        this.params = params
        this.requestList()
    }
    requestList = () => {
        axios.requestList(this, '/user/list', this.params)
    }
    componentDidMount () {
        this.requestList()
    }

    // 功能区操作
    handleOperate = (type) => {
        let item = this.state.selectedItem;
        if (type === 'create') {
            this.setState({
                type,
                isVisible: true,
                title: '创建员工'
            })
        } else if (type === 'edit') {
            if (!item) {
                Modal.info({
                    title: '提示',
                    content: '请选择一个用户'
                })
                return
            }
            this.setState({
                type,
                isVisible: true,
                title: '编辑员工',
                userInfo: item
            })
        } else if (type === 'detail') {
            if (!item) {
                Modal.info({
                    title: '提示',
                    content: '请选择一个用户'
                })
                return
            }
            this.setState({
                type,
                isVisible: true,
                title: '员工详情',
                userInfo: item
            })
        } else {
            if (!item) {
                Modal.info({
                    title: '提示',
                    content: '请选择一个用户'
                })
                return
            }
            let _this = this;
            Modal.confirm({
                title: '确认删除',
                content: '是否要删除当前选中的员工？',
                onOk() {
                    axios.ajax({
                        url: '/user/delete',
                        data: {
                            params: {
                                id: item.id
                            }
                        }
                    }).then((res) => {
                        if (res.code == '0') {
                            _this.setState({
                                isVisible: false
                            })
                            _this.requestList()
                        }
                    })
                }
            })
        }
    }

    // 创建员工提交
    handleSubmit = () => {
        let type = this.state.type;
        let data = this.userForm.props.form.getFieldsValue();
        axios.ajax({
            url: type === 'create' ? '/user/add' : '/user/edit',
            data: {
                params: data
            }
        }).then((res) => {
            if (res.code == '0') {
                this.setState({
                    isVisible: false
                })
                this.requestList()
                this.userForm.props.form.resetFields()
                this.state.userInfo = {}
            }
        })
    }
    render () {
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'username'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                key: 'sex',
                render (sex) {
                    return sex === 1 ? '男' : '女'
                }
            },
            {
                title: '状态',
                dataIndex: 'state',
                key: 'state',
                render (state) {
                    return {
                        '1': '咸鱼一条',
                        '2': '风华浪子',
                        '3': '北大才子一枚',
                        '4': '企鹅FE',
                        '5': '创业者'
                    }[state]
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                key: 'interest',
                render (interest) {
                    return {
                        '1': '游泳',
                        '2': '打篮球',
                        '3': '踢足球',
                        '4': '跑步',
                        '5': '爬山',
                        '6': '骑行',
                        '7': '桌球',
                        '8': '麦霸'
                    }[interest]
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                key: 'birthday'
            },
            {
                title: '联系地址',
                dataIndex: 'address',
                key: 'address'
            },
            {
                title: '早起时间',
                dataIndex: 'time',
                key: 'time'
            }
        ]
        let footer = {}
        if (this.state.type === 'detail') {
            footer = {
                footer: null
            }
        }
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter}/>
                </Card>
                <Card style={{marginTop: 2}} className="operate-wrap">
                    <Button type="primary" icon="plus" onClick={() => this.handleOperate('create')}>创建员工</Button>
                    <Button type="primary" icon="edit" onClick={() => this.handleOperate('edit')}>编辑员工</Button>
                    <Button type="primary" onClick={() => this.handleOperate('detail')}>员工详情</Button>
                    <Button type="primary" icon="delete" onClick={() => this.handleOperate('delete')}>删除员工</Button>
                </Card>
                <div className="content-wrap">
                    <ETable
                        updateSelectedItem={utils.updateSelectedItem.bind(this)}
                        columns={columns}
                        dataSource={this.state.list}
                        selectedRowKeys={this.state.selectedRowKeys}
                        pagination={this.state.pagination}
                        rowSelection="radio"
                        selectedItem={this.state.selectedItem}
                    />
                </div>
                <Modal 
                    width={600}
                    title={this.state.title}
                    visible={this.state.isVisible}
                    onOk={this.handleSubmit}
                    onCancel={() => {
                        this.userForm.props.form.resetFields();
                        this.state.userInfo = {}
                        this.setState({
                            isVisible: false
                        })
                    }}
                    {...footer}
                >
                    <UserForm 
                        type={this.state.type} 
                        wrappedComponentRef={(inst) => {this.userForm = inst;}}
                        userInfo={this.state.userInfo}
                    />
                </Modal>
            </div>
        )
    }
}

class UserForm extends React.Component {
    getState = (state) => {
        return {
            '1': '咸鱼一条',
            '2': '风华浪子',
            '3': '北大才子一枚',
            '4': '企鹅FE',
            '5': '创业者'            
        }[state]
    }
    render () {
        let type = this.props.type;
        let userInfo = this.props.userInfo || {};
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 19}
        }
        return (
            <Form layout="horizontal">
                <FormItem
                    label="用户名"
                    {...formItemLayout}
                >
                    {
                        type === 'detail' ? userInfo.username : 
                        getFieldDecorator('user_name', {
                            initialValue: userInfo.username
                        })(
                            <Input type="text" placeholder="请输入用户名" />
                        )
                    }
                </FormItem>
                <FormItem
                    label="性别"
                    {...formItemLayout}
                >
                    {
                        type === 'detail' ? userInfo.sex === 1 ? '男' : '女' :
                        getFieldDecorator('sex', {
                            initialValue: userInfo.sex
                        })(
                            <RadioGroup>
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
                            </RadioGroup>
                        )
                    }
                </FormItem>
                <FormItem
                    label="状态"
                    {...formItemLayout}
                >
                    {
                        type === 'detail' ? this.getState(userInfo.state) :
                        getFieldDecorator('state', {
                            initialValue: userInfo.state
                        })(
                            <Select>
                                <Option value={1}>咸鱼一条</Option>
                                <Option value={2}>风华浪子</Option>
                                <Option value={3}>北大才子</Option>
                                <Option value={4}>企鹅FE</Option>
                                <Option value={5}>创业者</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem
                    label="生日"
                    {...formItemLayout}
                >
                    {
                        type === 'detail' ? userInfo.birthday :
                        getFieldDecorator('birthday', {
                            initialValue: moment(userInfo.birthday)
                        })(
                            <DatePicker />
                        )
                    }
                </FormItem>
                <FormItem
                    label="联系地址"
                    {...formItemLayout}
                >
                    {
                        type === 'detail' ? userInfo.address :
                        getFieldDecorator('address', {
                            initialValue: userInfo.address
                        })(
                            <TextArea rows={3} placeholder="请输入联系地址" />
                        )
                    }
                </FormItem>
            </Form>
        )
    }
}
UserForm = Form.create({})(UserForm)