/*
进行local数据存储管理的工具模块
 */

import store from 'store';


const USER_KEY = 'user';
export default {
    /*
    保存user
     */
    saveUser(user){
        //localStorage.setItem(USER_KEY,JSON.stringify(user));  //将对象转成JSON格式的字符串
        store.set(USER_KEY,user);
    },

    /*
    读取user
     */
    getUser(){
        //return JSON.parse(localStorage.getItem(USER_KEY) || '{}');
        return store.get(USER_KEY) || {}


        },

    /*
    删除user
     */
    removeUser(user){
        //localStorage.removeItem(USER_KEY);
        store.remove(USER_KEY);
    }
}
