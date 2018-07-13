import React from 'react'
import {Card, Spin, Icon, Alert} from 'antd'
import './ui.less'

export default class Loadings extends React.Component{
  constructor (props) {
    super(props)
    this.state = {
      loading: true
    }
  }
  render () {
    const icon = <Icon type="plus" style={{fontSize: 32}}/>
    const icon2 = <Icon type="loading" style={{fontSize: 32}}/>
    return (
      <div>
        <Card title="Spin用法" className="card">
          <Spin size="small" />
          <Spin size="default" />
          <Spin size="large" />
          <Spin indicator={icon} spinning={true} />
        </Card>
        <Card title="内容遮罩" className="card">
          <Alert
            message="React"
            description="welcome"
            type="info"
          />
           <Alert
            message="React"
            description="welcome"
            type="warning"
          />
          <Spin>
            <Alert
              message="React"
              description="welcome"
              type="info"
            />
          </Spin>
          <Spin tip="加载中...">
            <Alert
              message="React"
              description="welcome"
              type="info"
            />
          </Spin>
          <Spin indicator={icon2}>
            <Alert
              message="React"
              description="welcome"
              type="info"
            />
          </Spin>
        </Card>
      </div>
    )
  }
}