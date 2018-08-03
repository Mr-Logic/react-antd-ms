import React from 'react'
import { Card } from 'antd'
import axios from '../../axios'
import './detail.less'

export default class OrderDetail extends React.Component {
    state = {
    }
    componentDidMount = () => {
        let orderId = this.props.match.params.orderId
        if (orderId) {
            this.getDetailInfo(orderId)
        }
    }
    getDetailInfo = (orderId) => {
        axios.ajax({
            url: '/order/detail',
            data: {
                params: {
                    orderId: orderId
                }
            }
        }).then((res) => {
            if (res.code == 0) {
                this.setState({
                    orderInfo: res.result
                })
                this.renderMap(res.result)
            }
        })
    }
    renderMap = (res) => {
        // 创建地图实例  
        this.map = new window.BMap.Map("orderDetailMap");
        this.map.enableScrollWheelZoom(true);
        this.map.centerAndZoom('广州', 11)
        this.addMapControl()
        this.rawBikeRoute(res.position_list)
        this.drawServiceArea(res.area)
    }
    addMapControl = () => {
        let map = this.map
        map.addControl(new window.BMap.ScaleControl({
            anchor: window.BMAP_ANCHOR_TOP_LEFT
        }))
        map.addControl(new window.BMap.NavigationControl({
            anchor: window.BMAP_ANCHOR_TOP_LEFT
        }))
    }
    rawBikeRoute = (positionList) => {
        let startPoint = ''
        let endPoint = ''
        if (positionList.length > 0) {
            let firstP = positionList[0]
            let endP = positionList[positionList.length - 1]
            startPoint = new window.BMap.Point(firstP.lon, firstP.lat)
            endPoint = new window.BMap.Point(endP.lon, endP.lat)
            let startIcon = new window.BMap.Icon('/assets/start_point.png', new window.BMap.Size(36, 42), {
                imageSize: new window.BMap.Size(36, 42),
                anchor: new window.BMap.Size(36, 42)
            })
            let endIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 42), {
                imageSize: new window.BMap.Size(36, 42),
                anchor: new window.BMap.Size(36, 42)
            })

            let startMarker = new window.BMap.Marker(startPoint, {
                icon: startIcon
            })
            let endMarker = new window.BMap.Marker(endPoint, {
                icon: endIcon
            })
            
            // 绘制起点和终点
            this.map.addOverlay(startMarker)
            this.map.addOverlay(endMarker)

            // 连接路线图
            let trackPoint = []
            for (let i = 0; i < positionList.length; i++) {
                let point = positionList[i]
                trackPoint.push(new window.BMap.Point(point.lon, point.lat))
            }

            let polyline = new window.BMap.Polyline(trackPoint, {
                strokeColor: '#1869AD',
                strokeWeight: 5,
                strokeOpacity: 1
            })

            this.map.addOverlay(polyline)

            setTimeout(() => {
                this.map.centerAndZoom(endPoint, 11)
            }, 200)
        }
    }
    // 绘制服务区
    drawServiceArea = (area) => {
        let trackPoint = []
            for (let i = 0; i < area.length; i++) {
                let point = area[i]
                trackPoint.push(new window.BMap.Point(point.lon, point.lat))
            }
        let polygon = new window.BMap.Polygon(trackPoint, {
            strokeColor: '#CE0000',
            strokeWeight: 4,
            strokeOpacity: 1,
            fillColor: '#ff8605',
            fillOpacity: 0.4
        })

        this.map.addOverlay(polygon)
    }
    render() {
        const info = this.state.orderInfo || {}
        return (
            <div>
                <Card>
                    <div id="orderDetailMap" className="order-map"></div>
                    <div className="detail-items">
                        <div className="item-title">基础信息</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">用车模式</div>
                                <div className="detail-form-content">{info.mode == 1 ? '服务区' : '停车点'}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">订单编号</div>
                                <div className="detail-form-content">{info.order_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">车辆编号</div>
                                <div className="detail-form-content">{info.bike_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">用户姓名</div>
                                <div className="detail-form-content">{info.user_name}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">手机号码</div>
                                <div className="detail-form-content">{info.mobile}</div>
                            </li>
                        </ul>
                    </div>
                    <div className="detail-items">
                        <div className="item-title">形式轨迹</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">行程起点</div>
                                <div className="detail-form-content">{info.start_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行程终点</div>
                                <div className="detail-form-content">{info.end_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行驶里程</div>
                                <div className="detail-form-content">{info.distance / 1000}公里</div>
                            </li>
                        </ul>
                    </div>
                </Card>
            </div>
        )
    }
}