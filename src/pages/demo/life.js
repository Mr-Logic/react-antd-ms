import React from 'react'
import Child from './child'
import {Button} from 'antd'
import './life.less'

export default class Life extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            count: 0
        };
    }
    handleAdd = () => {
        this.setState({
            count: this.state.count + 1
        })
    }
    render () {
        return (
            <div className="life">
                <p>React声明周期介绍</p>
                <Button onClick={this.handleAdd}>点击一下</Button>
                <p>{this.state.count}</p>
                <Child count={this.state.count}></Child>
            </div>
        )
    }
}