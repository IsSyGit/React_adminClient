/*
包含应用中所有接口请求函数的模块
每个函数的返回对象都是promise对象

使用分别暴露向外暴露
 */
import jsonp from 'jsonp';
import ajax from "./ajax/ajax";
import {message} from "antd";

const BASE_URL = '';

//登录的请求函数
export const reqLogin = (username,password) =>  ajax(BASE_URL + '/login',{username,password},'POST');

//添加用户的函数
export const reqAddUser = user => ajax(BASE_URL + '/manager/user/add',user,'POST');


/*
jsonp请求的接口请求函数

jsonp只能解决get请求  本质不是ajax请求 是一般的get请求

 */

export const reqWeather = (city) =>{
    return new Promise(((resolve, reject) => {
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
        //发送jsonp请求
        jsonp(url,{},(err,data) => {
            console.log('jsonp()',err,data);
            //判断 成功或者失败
            if(!err && data.status==='success'){
                //取出需要的数据
                const {dayPictureUrl,weather} = data.results[0].weather_data[0];
                resolve({dayPictureUrl,weather});
            }else {
                //请求失败则提示
                message.error("nmsl请求失败");
            }
        })
    }));
};

/*
获取当前城市的信息
 */

export const reqCity = () => {
    return new Promise(((resolve, reject) => {
        const url = 'http://api.map.baidu.com/location/ip?ak=WNDoxcp8oAdl3WNgOXQ91jsXPZZxBBoC';
        //发送jsonp请求
        jsonp(url,{},(err,data) => {
            console.log('reqCity',err,data,);
            //判断请求成功或者请求失败
            if(!err && data.status===0){   //请求成功则调用resolve()返回数据
                const {province,city} = data.content.address_detail;
                resolve({province,city});
            }else{
                message.error('请求失败');
            }

        });
    }));
};

reqCity();




