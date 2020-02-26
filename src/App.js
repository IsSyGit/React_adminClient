/*
组件的入口文件 所有组件的入口文件

 */
import React from "react";
import {Component} from "react";
import {BrowserRouter,Route,Switch} from "react-router-dom"   //引入路由器 路由组件


import Login from "./pages/login/login";   //引入一级路由
import Admin from "./pages/admin/admin";


export default  class App extends Component{


    render() {
        return (
            //最外层是一个路由器 在路由器里面配置路由
            <BrowserRouter>
                <Switch>   {/*只匹配一个组件 即 只显示一个一级路由 login或者是admin 二者不会同时显示*/}
                <Route path='/login' component={Login}></Route>
                <Route path='/' component={Admin}></Route>
                </Switch>

            </BrowserRouter>
        )

    }
}
