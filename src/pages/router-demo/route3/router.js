import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import About from './about'
import Main from './main'
import Topics from './topics'
import Home from './home'
import Info from './info'
import NoMatch from './nomatch'

export default class IRouter extends React.Component {
    render () {
        return (
            <div>
                <Router>
                    {/* Route必须包一个根节点 */}
                    <Home>
                        <Switch>
                            <Route path="/main" render={() => 
                                <Main>
                                    <Route path="/main/:mainId" component={Info}></Route>
                                </Main>
                            }/>
                            <Route path="/about" component={About} />
                            <Route path="/topics" component={Topics} />
                            <Route component={NoMatch}></Route>
                        </Switch>
                    </Home>
                </Router>
            </div>
        )
    }
}