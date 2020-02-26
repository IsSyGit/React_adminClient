/*
入口js文件 最初始的入口文件   所有js文件的总入口文件
 */
//渲染app标签 先引入
import React from "react";
import ReactDom from "react-dom";
import App from "./App";

import storageUtils from "./utils/storageUtils";    //引入localstorage对象 读取user数据
import memory from "./utils/memory";


//一启动页面就读取localstorage中已经保存的数据  即user 保存到内存中
const user = storageUtils.getUser();
memory.user = user;


//将app组件标签渲染到index页面的 root div上
ReactDom.render(<App/>,document.getElementById('root'));

