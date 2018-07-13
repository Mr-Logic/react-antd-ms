import React from 'react'
import {Card, Button, Modal} from 'antd'
import './ui.less'

export default class Modals extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal1: false,
      showModal2: false,
      showModal3: false,
      showModal4: false
    }
  }
  handleOpen = (modal) => {
    this.setState({
      [modal]: true
    })
  }
  handleCancel = (modal) => {
    this.setState({
      [modal]: false
    })
  }
  handleConfirm = (type) => {
    Modal[type]({
      title: '确认?',
      content: '你确定你已经确定了吗?',
      onOk () {
        console.log('OK')
      },
      onCancel () {
        console.log('concel')
      }
    })
  }
  render () {
    return (
      <div>
        <Card title="基础模态框" className="card">
          <Button type="primary" onClick={() => this.handleOpen('showModal1')}>Open</Button>
          <Button type="primary" onClick={() => this.handleOpen('showModal2')}>自定义页脚</Button>
          <Button type="primary" onClick={() => this.handleOpen('showModal3')}>顶部20px弹框</Button>
          <Button type="primary" onClick={() => this.handleOpen('showModal4')}>水平垂直居中</Button>
        </Card>
        <Card title="信息确认框" className="card">
          <Button type="primary" onClick={() => this.handleConfirm('confirm')}>Confirm</Button>
          <Button type="primary" onClick={() => this.handleConfirm('info')}>Info</Button>
          <Button type="primary" onClick={() => this.handleConfirm('success')}>Success</Button>
          <Button type="primary" onClick={() => this.handleConfirm('warning')}>Warning</Button>
        </Card>
        <Modal
          title="React"
          visible={this.state.showModal1}
          onCancel={() => this.handleCancel('showModal1')}
        >
          <p>welcome!</p>
        </Modal>
        <Modal 
          title="React"
          visible={this.state.showModal2}
          okText="好的"
          cancelText="算了"
          onCancel={() => this.handleCancel('showModal2')}
        >
        <p>Welcome!</p>
        </Modal>
        <Modal 
          title="React"
          visible={this.state.showModal3}
          onCancel={() => this.handleCancel('showModal3')}
          style={{top: 20}}
        >
        <p>Welcome!</p>
        </Modal>
        <Modal 
          title="React"
          wrapClassName="vertical-center-modal"
          visible={this.state.showModal4}
          onCancel={() => this.handleCancel('showModal4')}
        >
        <p>Welcome!</p>
        </Modal>
      </div>
    )
  }
}