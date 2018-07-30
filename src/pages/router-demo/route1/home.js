import React from 'react'
import { HashRouter, Route, Link, Switch } from 'react-router-dom'
import About from './about'
import Main from './main'
import Topics from './topics'

export default class Home extends React.Component {
    render () {
        return (
            <div>
                <HashRouter>
                    <div>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/about">About</Link>
                            </li>
                            <li>
                                <Link to="/topics">Topics</Link>
                            </li>
                        </ul>
                        <hr/>
                        <Switch>
                            <Route exact path="/" component={Main} />
                            <Route path="/about" component={About} />
                            <Route path="/topics" component={Topics} />
                        </Switch>
                    </div>
                </HashRouter>
            </div>
        ) 
    }
}