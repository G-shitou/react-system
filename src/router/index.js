import React from 'react'
import { HashRouter, Route, Switch, Redirect} from 'react-router-dom'
import App from '../App.js'
import Admin from '../pages/layout/index';
import Home from '../pages/home';
import Information from '../pages/personal/information';
import Password from '../pages/personal/password';
import UserManage from '../pages/systemmanage/usermanage';
import RoleManage from '../pages/systemmanage/rolemanage';
import MenuManage from '../pages/systemmanage/menumanage';
import Echarts from '../pages/gallery/echarts';

export default class Router extends React.Component{
    render(){
        return (
            <HashRouter>
                <App>
                    <Switch>
                        {/* <Route exact path="/login" component={Login}/>
                        <Route exact path="/common" render={() =>
                            <Common>
                                <Route path="/common/order/detail/:orderId" component={OrderDetail} />
                            </Common>
                        }
                        /> */}
                        <Route path="/" render={()=>
                            <Admin>
                                <Switch>
                                    <Route path='/home' component={Home} />
                                    <Route path='/personal/information' component={Information} />
                                    <Route path='/personal/password' component={Password} />
                                    <Route path='/systemmanage/usermanage' component={UserManage}></Route>
                                    <Route path='/systemmanage/rolemanage' component={RoleManage}></Route>
                                    <Route path="/systemmanage/menumanage" component={MenuManage}></Route>
                                    <Route path="/gallery/baseEcharts" component={Echarts}></Route>
                                    <Redirect to="/home" />
                                    {/* <Route component={NoMatch} /> */}
                                </Switch>
                            </Admin>         
                        } />
                    </Switch>
                </App>
            </HashRouter>
        );
    }
}