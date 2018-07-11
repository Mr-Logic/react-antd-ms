import React from 'react'
import Child from './child'
import {Button} from 'antd'
import './style.less'

export default class Life extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      count: 0
    }
  }
  render () {
    // let style = {
    //   padding: 50
    // }
    return (
      <div className="content">
        <p>React 生命周期介绍</p>
        <Button onClick={this.handleAdd}>加1</Button>
        <Button onClick={this.handleMinus.bind(this)}>减1</Button>
        <p>{this.state.count}</p>
        <Child name={this.state.count}></Child>
      </div>
    )
  }
  handleAdd = () => {
    this.setState ({
      count: this.state.count + 1
    })
  }
  handleMinus () {
    this.setState ({
      count: this.state.count - 1
    })
  }
}