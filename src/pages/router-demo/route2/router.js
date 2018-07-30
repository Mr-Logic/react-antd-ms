import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import About from './about'
import Main from './main'
import Topics from './topics'
import Home from './home'

export default class IRouter extends React.Component {
    render () {
        return (
            <div>
                <Router>
                    {/* Route必须包一个根节点 */}
                    <Home>
                        <Route path="/main" render={() => 
                            <Main>
                                <Route path="/main/a" component={About}></Route>
                            </Main>
                        }/>
                        <Route path="/about" component={About} />
                        <Route path="/topics" component={Topics} />
                    </Home>
                </Router>
            </div>
        )
    }
}