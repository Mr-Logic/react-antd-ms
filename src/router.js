import React from 'react'
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom'
import App from './App'
import Login from './pages/login'
import Home from './pages/home'
import Admin from './admin'
import Buttons from './pages/ui/buttons'
import Modals from './pages/ui/modals'
import Loadings from './pages/ui/loadings'
import Notifications from './pages/ui/notice'
import Messages from './pages/ui/messages'
import MyTabs from './pages/ui/tabs'
import Gallery from './pages/ui/gallery'
import MyCarousel from './pages/ui/carousel'
import FormLogin from './pages/form/login'
import FormRegist from './pages/form/regist'
import BasicTable from './pages/table/basic-table'
import HighTable from './pages/table/high-table'
import City from './pages/city'
import Order from './pages/order'
import User from './pages/user'
import Common from './common'
import OrderDetail from './pages/order/detail';
import PermissionUser from './pages/permission'
import NoMatch from './pages/nomatch'

export default class IRouter extends React.Component {
    render () {
        return (
            <HashRouter>
                <App>
                    <Switch>
                        <Route path="/login" component={Login}/>
                        <Route path="/common" render={() =>
                            <Common>
                                <Route path="/common/order/detail/:orderId" component={OrderDetail}></Route>
                            </Common>
                        }/>
                        <Route path="/"render={() =>
                            <Admin>
                                <Switch>
                                    <Route path="/home" component={Home}></Route>
                                    <Route path="/ui/buttons" component={Buttons}></Route>
                                    <Route path="/ui/modals" component={Modals}></Route>
                                    <Route path="/ui/loadings" component={Loadings}></Route>
                                    <Route path="/ui/notification" component={Notifications}></Route>
                                    <Route path="/ui/messages" component={Messages}></Route>
                                    <Route path="/ui/tabs" component={MyTabs}></Route>
                                    <Route path="/ui/gallery" component={Gallery}></Route>
                                    <Route path="/ui/carousel" component={MyCarousel}></Route>
                                    <Route path="/form/login" component={FormLogin}></Route>
                                    <Route path="/form/regist" component={FormRegist}></Route>
                                    <Route path="/table/basic" component={BasicTable}></Route>
                                    <Route path="/table/high" component={HighTable}></Route>
                                    <Route path="/city" component={City}></Route>
                                    <Route path="/order" component={Order}></Route>
                                    <Route path="/user" component={User}></Route>
                                    <Route path="/permission" component={PermissionUser}></Route>
                                    <Redirect to="/home"></Redirect>
                                    <Route component={NoMatch}></Route>
                                </Switch>
                            </Admin>
                        }></Route>
                   </Switch>
                </App>
            </HashRouter>
        )
    }
}