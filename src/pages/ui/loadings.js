import React from 'react'
import { Card, Spin, Icon, Alert } from 'antd'
import './ui.less'

export default class Loadings extends React.Component {
    constructor (props) {
       super(props)
       this.state = {

       }
    }
    render () {
        const icon = <Icon type="loading" style={{fontSize: 48}} />
        const loadingIcon = <Icon type="loading" style={{fontSize: 24}} />
        return (
            <div>
                <Card title="Spin用法" className="card-wrap">
                    <Spin size="small" className="spin"></Spin>
                    <Spin className="spin"></Spin>
                    <Spin size="large" className="spin"></Spin>
                    <Spin indicator={icon}></Spin>
                </Card>
                <Card title="内容遮罩">
                    <Spin>
                        <Alert 
                            message="React"
                            description="Welcome here"
                            type="info"
                        />
                    </Spin>
                    <Spin>
                        <Alert 
                            message="React"
                            description="Welcome here"
                            type="message"
                        />
                    </Spin>
                    <Spin spinning={true}>
                        <Alert 
                            message="React"
                            description="Welcome here"
                            type="warning"
                        />
                    </Spin>
                    <Spin spinning={true} tip="加载中......">
                        <Alert 
                            message="React"
                            description="Welcome here"
                            type="info"
                        />
                    </Spin>
                    <Spin indicator={loadingIcon}>
                        <Alert 
                            message="React"
                            description="Welcome here"
                            type="info"
                        />
                    </Spin>
                </Card>
            </div>
        )
    }
}