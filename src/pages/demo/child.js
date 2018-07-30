import React from 'react'

export default class Child extends React.Component {
    // constructor (props) {
    //     super(props);
    //     this.state = {
    //         count: 0
    //     }
    // }
    componentWillMount () {
        console.log('will mount' + this.props.count)
    }
    componentDidMount () {
        console.log('did mount')
    }
    componentWillReceiveProps (newProps) {
        console.log('will receive props' + newProps)
    }
    shouldComponentUpdate () {
        console.log('should update')
        return true
    }
    componentWillUpdate () {
        console.log('will update')
    }
    componentDidUpdate () {
        console.log('did update')
    }
    componentWillUnmount () {
        console.log('will unmount')
    }
    render () {
        return (
            <div>
                <div>这里是子组件</div>
                <p>{this.props.count}</p>
            </div>
        )
    }
}