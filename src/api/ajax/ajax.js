/*
能发送异步ajax请求的函数模块
封装的是axios库

1.优化：统一处理请求异常
 在外层创建一个promise对象
 在请求出错时 不调用reject()，而是显示错误提示

 */
import axios from 'axios';
import {message} from 'antd';

export default function ajax(url, data={}, method ='GET') {   //函数的返回值是promise对象
    return  new Promise((resolve, reject) => {
        let promise;
        //1，执行异步ajax请求
        if(method ==='GET'){
            promise = axios.get(url,{  //配置对象
                params:data    //指定请求参数
            })
        } else { //发送post请求
            promise =  axios.post(url,data);
        }
        promise.then(response => {
            //2.成功调用resolve函数
            resolve(response.data);
            // message.info('请求成功！');
        }).catch(error => {
            //3.失败就提示错误信息
            message.error('请求失败了' + error.message);
        });

    });
}
// //请求登录接口
// ajax('/login',{username:'sy',password:'12345'},'POST').then();
// //添加用户
// ajax('/manager/user/add',{username:'sy1234',password: '123456',phone:'123456789'},'POST').then();
