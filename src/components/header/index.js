import React from 'react'
import { Row, Col, Button } from 'antd'
import './index.less'
import Util from '../../utils/utils'
import Axios from '../../axios'

export default class Header extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            city: '广州',
            userName: '',
            sysTime: '',
            weather: '',
            timer: null
        }
    }
    componentWillMount () {
        this.setState({
            userName: '小明同学'
        })
        let tempTimer = setInterval(() => {
            let sysTime = Util.formatDate(new Date().getTime())
            this.setState({
                sysTime
            })
        }, 1000)
        this.setState({
            timer: tempTimer
        })
        this.getWeatherApiData()
    }
    componentWillUnmount () {
        clearInterval(this.state.timer)
    }
    getWeatherApiData () {
        Axios.jsonp({
            url: 'https://restapi.amap.com/v3/weather/weatherInfo?city=' + encodeURIComponent(this.state.city) + '&key=11a80a160cde890966444f3c51517c51'
        }).then((res) => {
            if (res.status === '1') {
                let data = res.lives[0]
                this.setState({
                    weather: data.weather
                })
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    render () {
        const menuType = this.props.menuType;
        return (
            <div className="header">
                <Row className="header-top">
                    {
                        menuType ? 
                        <Col span="6" className="logo">
                            <img src="/assets/logo-ant.svg" alt=""/>
                            <span>react-antd-ms</span>
                        </Col> : ''
                    }
                    <Col span={menuType ? 18 : 24}>
                        <span>欢迎，{this.state.userName}</span>
                        <Button>退出</Button>
                    </Col>
                </Row>
                {
                    menuType ? '' : 
                    <Row className="breadcrumb">
                        <Col span={4} className="breadcrumb-title">
                            首页
                        </Col>
                        <Col span={20} className="weather">
                            <span className="date">{this.state.sysTime}</span>
                            <span>{this.state.city}:&nbsp;</span>
                            <span className="weather-detail">{this.state.weather}</span>
                        </Col>
                    </Row>
                }
            </div>
        )
    }
}