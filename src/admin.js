import React from 'react'
import { Row, Col } from 'antd';
import Header from './components/header'
import Footer from './components/footer'
import NavLeft from './components/nav-left'
import './style/common.less'

export default class Admin extends React.Component {
    render () {
        return (
            <Row className="container">
                <Col span={2} className="nav-left">
                    <NavLeft></NavLeft>
                </Col>
                <Col span={22} className="main">
                    <Header></Header>
                    <Row className="content">
                       {this.props.children}
                    </Row>
                    <Footer></Footer>
                </Col>
            </Row>
        )
    }
}