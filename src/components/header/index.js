import React from 'react'
import {Row, Col, Button} from 'antd'
import './index.less'
import Utils from '../../utils/utils'
import Axios from '../../axios'

export default class Header extends React.Component {
  componentWillMount () {
    this.setState ({
      userName: '小明同学',
      sysTime: '',
      weather: ''
    })
    setInterval (() => {
      let sysTime = Utils.formatDate(new Date().getTime())
      this.setState({
        sysTime
      })
    }, 1000)
    this.getWeatherApiData()
  }
  getWeatherApiData () {
    let city = '广州'
    // let url = 'http://api.map.baidu.com/telematics/v3/weather?location='+ encodeURIComponent(city) + '&output=json&ak=devCtpS7AEYHr6iD8iBnSVmSpp8GT0x7'
    let url = 'https://restapi.amap.com/v3/weather/weatherInfo?key=11a80a160cde890966444f3c51517c51&city=' + encodeURIComponent(city) + '&extensions=base'
    Axios.jsonp({
      url: url
    }).then((res) => {
      if (res.status === '1') {
        let weather = res.lives[0].weather
        this.setState({
          weather
        })
      }
    })
  }
  render () {
    return (
      <div className="header">
        <Row className="header-top">
          <Col span={24}>
            <span>欢迎，{this.state.userName}</span>
            <Button size="small">退出</Button>
          </Col>
        </Row>
        <Row className="breadcrumb">
          <Col span={4} className="breadcremb-title">
            首页
          </Col>
          <Col span={20} className="weather">
            <span className="date">{this.state.sysTime}</span>
            <span className="weather-detail">{this.state.weather}</span>
          </Col>
        </Row>
      </div>
    )
  }
}