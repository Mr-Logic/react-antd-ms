import React from 'react'
import {Link} from 'react-router-dom'

export default class Main extends React.Component {
  render () {
    return (
      <div>
        This is main
        <Link to="/main/a">to /a</Link>
        <hr/>
        <div>
           {this.props.children}
        </div>
      </div>
    )
  }
}