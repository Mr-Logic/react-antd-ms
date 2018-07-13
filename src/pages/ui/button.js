import React from 'react'
import {Card, Button, Radio} from 'antd'
import './ui.less'

export default class Buttons extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      label: '关闭',
      size: 'default'
    }
  }
  handleCloseLoading = () => {
    this.setState({
      loading: !this.state.loading,
      label: this.state.label === '关闭' ? '打开' : '关闭'
    });
  }
  handleChange = (e) => {
    this.setState({
      size: e.target.value
    })
  }
  render () {
    return (
      <div>
        <Card title="基础按钮" hoverable className="card">
          <Button type="primary">imooc</Button>
          <Button>imooc</Button>
          <Button type="dashed">imooc</Button>
          <Button type="danger">imooc</Button>
          <Button disabled>imooc</Button>
        </Card>
        <Card title="图形按钮" hoverable className="card">
          <Button icon="plus">创建</Button>
          <Button icon="edit">编辑</Button>
          <Button icon="delete">删除</Button>
          <Button shape="circle" icon="search"></Button>
          <Button type="primary" icon="search">搜索</Button>
          <Button type="primary" icon="download">下载</Button>
        </Card>
        <Card title="Loading按钮" hoverable className="card">
          <Button type="primary" loading={this.state.loading}>确定</Button>
          <Button type="primary" shape="circle" loading={this.state.loading}></Button>
          <Button loading={this.state.loading}>点击加载</Button>
          <Button shape="circle" loading={this.state.loading}></Button>
          <Button type="primary" loading={this.state.loading}>搜索</Button>
          <Button type="primary" onClick={this.handleCloseLoading}>{this.state.label}</Button>
        </Card>
        <Card title="按钮组" className="card">
          <Button.Group>
            <Button type="primary" icon="left">返回</Button>
            <Button type="primary" icon="right">前进</Button>
          </Button.Group>
        </Card>
        <Card title="按钮尺寸" className="card">
          <Radio.Group value={this.state.size} onChange={this.handleChange}>
            <Radio value="small">小</Radio>
            <Radio value="default">中</Radio>
            <Radio value="large">大</Radio>
          </Radio.Group>
          <Button type="primary" size={this.state.size}>imooc</Button>
          <Button type="dashed" size={this.state.size}>imooc</Button>
          <Button type="danger" size={this.state.size}>imooc</Button>
          <Button size={this.state.size}>imooc</Button>
        </Card>
      </div>
    )
  }
}