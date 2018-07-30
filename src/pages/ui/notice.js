import React from 'react'
import {Card, notification, Button} from 'antd'
import './ui.less'

export default class Notifications extends React.Component {
    openNotification = (type, dir) => {
        if (dir) {
            notification.config({
                placement: dir
            })
        }
        notification[type]({
            message: '发工资了!',
            description: '上个月考勤22天，迟到10天，实发工资250',
        })
    }
    render () {
        return (
            <div>
                <Card title="通知提醒框" className="card-wrap">
                    <Button type="primary" onClick={() => this.openNotification('success', 'topLeft')}>Success</Button>
                    <Button type="primary" onClick={() => this.openNotification('info', 'topRight')}>Info</Button>
                    <Button type="primary" onClick={() => this.openNotification('warning', 'bottomLeft')}>warning</Button>
                    <Button type="primary" onClick={() => this.openNotification('error', 'bottomRight')}>Error</Button>
                </Card>
            </div>
        )
    }
}