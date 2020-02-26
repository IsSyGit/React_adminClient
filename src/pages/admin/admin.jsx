import React, {Component} from "react";
import ReactDOM from "react-dom";

import {Redirect,Route,Switch} from 'react-router-dom';

import { Layout } from 'antd';  //引入antd的布局组件

import './admin.less';

import memory from "../../utils/memory";
import storageUtils from "../../utils/storageUtils"; //引入工具模块 保存已登录的用户信息

import AdminRightHeader from "../../components/admin-header/admin-right-header";   //引入admin页面左侧导航栏和右侧头部组件
import AdminLeftNav from "../../components/admin-left-nav/admin-left-nav";

/*
引入二级路由组件
 */
import Home from "../home/home";
import Product from "../product/product";
import User from "../user/user";
import Role from "../role/role";
import Category from "../category/category";
import Bar from "../charts/bar";
import Line from "../charts/line";
import Pie from "../charts/pie";


/*
一级路由组件
管理的主页面
 */
class Admin extends Component{

    render(){

        /*
        获取用户登录的数据
         */
        const user = memory.user;
        //如果内存中没有存取user
        if (!user || !user._id){
            //自动跳转到登录页面
            return <Redirect to="/login"/>
        }


        /*
         引入布局组价
         */
        const {  Footer, Sider, Content } = Layout;
        return(
                <Layout className='main'>
                    <Sider>
                        <AdminLeftNav/>
                    </Sider>
                    <Layout className='layout'>
                        <AdminRightHeader>Header</AdminRightHeader>
                        <Content className='content'>
                            <Switch>
                                <Route path='/home' component={Home}/>
                                <Route path='/category' component={Category}/>
                                <Route path='/product' component={Product}/>
                                <Route path='/role' component={Role}/>
                                <Route path='/user' component={User}/>
                                <Route path='/charts/bar' component={Bar}/>
                                <Route path='/charts/line' component={Line}/>
                                <Route path='/charts/pie' component={Pie}/>
                                <Redirect to='/home'/>
                            </Switch>
                        </Content>
                        <Footer className='footer'>推荐使用谷歌浏览器，可以操作更加流畅的页面</Footer>
                    </Layout>
                </Layout>
        )
    }
}

export default Admin
