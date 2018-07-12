import React from 'react'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import Main from './main'
import About from '../route1/about'
import Topic from '../route1/topic'
import Home from './home'
import Info from './info'
import NoMatch from './nomatch'

export default class IRouter extends React.Component {
  render () {
    return (
      <Router>
        <Home>
          <Switch>
            <Route path="/main" render={() =>
              <Main>
                <Route path="/main/:value" component={Info}></Route>
              </Main>
            }></Route>
            <Route path="/about" component={About}></Route>
            <Route path="/topic" component={Topic}></Route>
            <Route component={NoMatch}></Route>
          </Switch>
        </Home>
      </Router>
    )
  }
} 