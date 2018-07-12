import React from 'react'
import {HashRouter, Route, Switch} from 'react-router-dom'
import App from './App'
import Login from './pages/login'
import Admin from './admin'
import Button from './pages/ui/button'
import NoMatch from './pages/nomatch'

export default class IRouter extends React.Component {
  render () {
    return (
      <HashRouter>
        <App>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/admin" render={() => 
              <Admin>
                <Switch>
                  <Route path="/admin/ui/buttons" component={Button}></Route>
                  <Route component={NoMatch}></Route>
                </Switch>
              </Admin>
            } />
          </Switch>
        </App>
      </HashRouter>
    );
  }
}