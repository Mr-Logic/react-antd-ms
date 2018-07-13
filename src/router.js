import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import App from './App'
import Login from './pages/login'
import Admin from './admin'
import Button from './pages/ui/button'
import NoMatch from './pages/nomatch'
import Home from './pages/home'
import Modals from './pages/ui/modals'
import Loadings from './pages/ui/loadings'
import Notice from './pages/ui/notice'
import Message from './pages/ui/message'
import Tabs from './pages/ui/tabs'
import Gallery from './pages/ui/gallery'
import Carousels from './pages/ui/carousel'

export default class IRouter extends React.Component {
  render () {
    return (
      <Router>
        <App>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/admin" render={() => 
              <Admin>
                <Switch>
                  <Route path="/admin/home" component={Home} />
                  <Route path="/admin/ui/buttons" component={Button} />
                  <Route path="/admin/ui/modals" component={Modals} />
                  <Route path="/admin/ui/loadings" component={Loadings} />
                  <Route path="/admin/ui/notification" component={Notice} />
                  <Route path="/admin/ui/messages" component={Message} />
                  <Route path="/admin/ui/tabs" component={Tabs} />
                  <Route path="/admin/ui/gallery" component={Gallery}></Route>
                  <Route path="/admin/ui/carousel" component={Carousels}></Route>
                  <Route component={NoMatch} />
                </Switch>
              </Admin>
            } />
          </Switch>
        </App>
      </Router>
    );
  }
}