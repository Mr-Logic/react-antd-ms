import React from 'react'
import {Card, Button, notification, message} from 'antd'
import './ui.less'

export default class Notice extends React.Component {
  openNotification = (type, direction) => {
    if (direction) {
      notification.config({
        placement: direction
      })
    }
    notification[type]({
      message: '发工资了',
      description: '上个月考勤22天，迟到12天，实发工资250，请笑纳'
    })
  }
  openMessage = (type) => {
    message[type]('发工资了', 5)
  }
  render () {
    return (
      <div>
        <Card title="通知提醒框" className="card">
          <Button type="primary" onClick={() => this.openNotification('success')}>Success</Button>
          <Button type="primary" onClick={() => this.openNotification('info')}>Info</Button>
          <Button type="primary" onClick={() => this.openNotification('warning')}>Warning</Button>
          <Button type="primary" onClick={() => this.openNotification('error')}>Error</Button>
        </Card>
        <Card title="通知提醒框" className="card">
          <Button type="primary" onClick={() => this.openNotification('success', 'topLeft')}>Success</Button>
          <Button type="primary" onClick={() => this.openNotification('info', 'topRight')}>Info</Button>
          <Button type="primary" onClick={() => this.openNotification('warning', 'bottomLeft')}>Warning</Button>
          <Button type="primary" onClick={() => this.openNotification('error', 'bottomRight')}>Error</Button>
        </Card>
        <Card title="全局提示" className="card">
          <Button type="primary" onClick={() => this.openMessage('success')}>Success</Button>
          <Button type="primary" onClick={() => this.openMessage('info')}>Info</Button>
          <Button type="primary" onClick={() => this.openMessage('warning')}>Warning</Button>
          <Button type="primary" onClick={() => this.openMessage('error')}>Error</Button>
        </Card>
      </div>
    )
  }
}