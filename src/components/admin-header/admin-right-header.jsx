import React, {Component} from "react";
import ReactDOM from "react-dom";

import {Select} from "antd";

import {reqWeather,reqCity} from "../../api";

import {formateDate} from "../../utils/dateUtils";
import memory from "../../utils/memory";
import storageUtils from "../../utils/storageUtils";
import "./right-header.less";


class AdminRightHeader extends Component {

    /*
    设计当前组件需要动态变化的数据
     */
    state = {
        currentTime: formateDate(Date.now()),   //当前时间 字符串格式
        dayPictureUrl: '', // 当前天气的图片
        weather: '',  //天气的文本 属性 即  晴天雨天阴天
        city:'' //城市

    };

    getTime = () => {
        //每隔一秒获取当前时间,并更新状态数据currentTime

        setInterval(() => {
            const currentTime = formateDate(Date.now());
            this.setState({currentTime});
        }, 1000);
    };

    getCity = async () =>{
        const { province,city } = await reqCity();
        console.log(city);
        this.setState({city});
        return city
    };


    getWeather = async (city) => {
        //调用接口请求函数异步获取数据
        const {dayPictureUrl, weather} = await reqWeather(city);
        this.setState({dayPictureUrl, weather});
    };

    /*
    在页面第一次渲染之后执行 即 在render()执行之后执行 只执行一次
    一般在此执行异步操作：发送ajax请求 启动定时器
     */
    componentDidMount() {
        //获取当前城市名称
        this.getCity().then(value =>{
            this.getWeather(value);
        } );
        //获取当前时间
        this.getTime();
        //获取当前天气显示
    }


    render() {
        //读取需要动态显示的数据 在render中渲染
        const {currentTime, dayPictureUrl, weather,city} = this.state;
        //读取在内存中保存的用户信息
        const username = memory.user.username;
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎，{username}</span>
                    <a href="javascript:">退出</a>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">首页</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <span className='city'>{city}</span>
                        <img src={dayPictureUrl} alt="weather"/>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminRightHeader
