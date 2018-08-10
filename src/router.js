import React from 'react'
import {HashRouter, Switch, Route} from 'react-router-dom'
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
import NoMatch from './pages/nomatch'

export default class IRouter extends React.Component {
    render () {
        return (
            <HashRouter>
                <App>
                    <Route path="/login" component={Login}/>
                    <Route path="/admin"render={() =>
                        <Admin>
                            <Switch>
                                <Route path="/admin/home" component={Home}></Route>
                                <Route path="/admin/ui/buttons" component={Buttons}></Route>
                                <Route path="/admin/ui/modals" component={Modals}></Route>
                                <Route path="/admin/ui/loadings" component={Loadings}></Route>
                                <Route path="/admin/ui/notification" component={Notifications}></Route>
                                <Route path="/admin/ui/messages" component={Messages}></Route>
                                <Route path="/admin/ui/tabs" component={MyTabs}></Route>
                                <Route path="/admin/ui/gallery" component={Gallery}></Route>
                                <Route path="/admin/ui/carousel" component={MyCarousel}></Route>
                                <Route path="/admin/form/login" component={FormLogin}></Route>
                                <Route path="/admin/form/regist" component={FormRegist}></Route>
                                <Route path="/admin/table/basic" component={BasicTable}></Route>
                                <Route path="/admin/table/high" component={HighTable}></Route>
                                <Route path="/admin/city" component={City}></Route>
                                <Route path="/admin/order" component={Order}></Route>
                                <Route path="/admin/user" component={User}></Route>
                                <Route component={NoMatch}></Route>
                            </Switch>
                        </Admin>
                    }></Route>
                    <Route path="/common" render={() =>
                        <Common>
                            <Route path="/common/order/detail/:orderId" component={OrderDetail}></Route>
                        </Common>
                    }/>
                </App>
            </HashRouter>
        )
    }
}