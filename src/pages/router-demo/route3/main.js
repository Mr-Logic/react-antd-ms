import React from 'react'
import {Link} from 'react-router-dom'

export default class Main extends React.Component {
    render () {
        return (
            <div>
                This is main page
                <hr/>
                <Link to="/main/test-id-123"> 嵌套路由1</Link>
                <hr/>
                <Link to="/main/test-id-456"> 嵌套路由2</Link>
                <hr/>
                {this.props.children}
            </div>
        )
    }
}