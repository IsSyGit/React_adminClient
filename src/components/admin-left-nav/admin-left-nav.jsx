import React, {Component} from "react";
import ReactDOM from "react-dom";
import {Link,withRouter} from "react-router-dom";
import { Menu, Icon, Button } from 'antd';

import logo from '../../assets/images/logo.jpg';
import './left-nav.less';

import menuList  from "../../config/menuConfig";
import SubMenu from "antd/lib/menu/SubMenu";

/*
admin页面左侧导航 admin left nav
 */
class AdminLeftNav extends Component{
    // state = {
    //     collapsed: false,
    // };

    // toggleCollapsed = () => {
    //     this.setState({
    //         collapsed: !this.state.collapsed,
    //     });
    // }
    //



    /*
    根据menuList的数据数组生成对应的标签数组
    使用map 以及 递归调用
    */
    getMenuNodes = menuList => {
        return menuList.map(item => {
            if(!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon}/>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            }else {
                return (
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            }
        })
    };

    /*
      根据menuList的数据数组生成对应的标签数组
      使用reduce() 以及 递归调用
      */
    getMenuNodes_reduce = menuList => {
        //得到当前请求的路由路径
        const path = this.props.location.pathname;
        return menuList.reduce((pre,item) => {
            //在返回前向pre中添加<Menu.Item>
            if(!item.children){
                pre.push((
                    <Menu.Item key={item.key}>
                    <Link to={item.key}>
                        <Icon type={item.icon}/>
                        <span>{item.title}</span>
                    </Link>
                </Menu.Item>
                ));

            }else {
                //确定openkey 因为进入else循环就是说明 数组里面有children属性
                //查找一个与当前请求路径匹配的字Item
                const cItem = item.children.find(citem => citem.key===path);
                //如果存在，说明当前item的子列表需要展开
                if(cItem){
                    this.openKey = item.key;
                }
                //在返回前向pre中添加<SubMenu>
                pre.push((
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                ));

            }

            return pre
        },[])
    };

    /*
    在第一次render()执行之前执行一次
    为第一次render()准备数据(同步的)
     */
    componentWillMount() {
        this.menuNodes = this.getMenuNodes_reduce(menuList);
    }


    render(){
        const { SubMenu } = Menu;

        //得到当前的路由路劲
        const path = this.props.location.pathname;

        //得到需要打开菜单项的key
        const openKey = this.openKey;
        return(

            <div  className="left-nav">
                <Link to='/' className='left-nav-header'>
                    <img src={logo} alt="logo"/>
                    <h1>鸡你太美</h1>
                </Link>
                <Menu
                    mode="inline"
                    theme="dark"
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                >
                    {
                         this.menuNodes
                    }
                </Menu>
            </div>

        )
    }
}

/*
withRouter高阶组件：
包装非路由组件，返回一个新的组件
新的组件会向非路由组件传递三个属性：history/Location/match
即 调用withRouter 向非路由组件中添加路由组件才有的三个属性
 */
export default withRouter(AdminLeftNav)
