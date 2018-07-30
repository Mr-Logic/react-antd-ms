import React from 'react'
import {Card, Modal, Button} from 'antd'
import './ui.less'

export default class Modals extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            modal1: false,
            modal2: false,
            modal3: false,
            modal4: false
        }
    }
    handleClick = (type) => {
        this.setState({
            [type]: true
        })
    }
    handleConfirm = (type) => {
        Modal[type]({
            title: 'Are you sure delete this task?',
            content: 'Some descriptions',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            }
        })
    }
    cancleShowModal = (type) => {
        this.setState({
            [type]: false
        })
    }
    render () {
        return (
            <div>
                <Card title="基础模态框" className="card-wrap">
                    <Button type="primary" onClick={() => this.handleClick('modal1')}>Open</Button>
                    <Button type="primary" onClick={() => this.handleClick('modal2')}>自定义页脚</Button>
                    <Button type="primary" onClick={() => this.handleClick('modal3')}>顶部20px弹框</Button>
                    <Button type="primary" onClick={() => this.handleClick('modal4')}>水平垂直居中</Button>
                </Card>
                <Card title="信息确认框" className="card-wrap">
                    <Button type="primary" onClick={() => this.handleConfirm('confirm')}>Confirm</Button>
                    <Button type="primary" onClick={() => this.handleConfirm('info')}>Info</Button>
                    <Button type="primary" onClick={() => this.handleConfirm('success')}>Success</Button>
                    <Button type="primary" onClick={() => this.handleConfirm('warning')}>warning</Button>
                    <Button type="primary" onClick={() => this.handleConfirm('error')}>Error</Button>
                </Card>
                <Modal
                    title="React"
                    visible={this.state.modal1}
                    onCancel={() => this.cancleShowModal('modal1')}
                    maskClosable={false}
                >
                    <p>welcome here</p>
                </Modal>
                <Modal
                    title="自定义页脚"
                    visible={this.state.modal2}
                    onCancel={() => {this.cancleShowModal('modal2')}}
                    okText="好吧"
                    cancelText="算了吧"
                    maskClosable={false}
                >
                    <p>this is define footer yourself</p>
                </Modal>
                <Modal
                    title="距顶部20px"
                    style={{top:20}}
                    visible={this.state.modal3}
                    onCancel={() => {this.cancleShowModal('modal3')}}
                    okText="好吧"
                    cancelText="算了吧"
                    maskClosable={false}
                >
                    <p>距离顶部20px</p>
                </Modal>
                <Modal
                    title="水平垂直居中"
                    visible={this.state.modal4}
                    onCancel={() => this.cancleShowModal('modal4')}
                    maskClosable={false}
                    wrapClassName="vertical-center-modal"
                >

                </Modal>
            </div>
        )
    }
}