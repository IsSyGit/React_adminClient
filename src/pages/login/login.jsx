import React, {Component} from "react";
import ReactDOM from "react-dom";
import {Redirect} from "react-router-dom";

import { Form, Icon, Input, Button, Checkbox } from 'antd';  //引入antd的表单组件

import "./login.less"  //引入样式文件

import {message} from 'antd';

import {reqLogin} from "../../api";  //引入登录接口函数
import memory from "../../utils/memory";   //引入处理登录数据的函数
import storageUtils from "../../utils/storageUtils";   //引入保存登录数据的函数

// import logo from "./images/logo.jpg"; //加载图片模块

/*
登录的路由组件
 一级路由
 */                             //解决跨域的三种方法：1.jsonp(只能处理get请求) 2.后台cors允许跨域 3.代理服务器
class Login extends Component{

    handleSubmit = e => {

        //阻止事件的默认行为  停止市价冒泡
        e.preventDefault();

        //对所有的表单字段进行校验
        this.props.form.validateFields( async (err,values) => {
            //校验成功
            if(!err){
               // console.log('nmsl',values)
                //请求登录
                    const result = await reqLogin(values.username,values.password);
                    // console.log(response.data , '请求成功了');
                    // const  result = response.data;   //{status: 0 ,data: user}   {status:1,msg:'' }
                //判断status的值 0为成功 1为失败
                if(result.status === 0){
                    //提示登录成功
                    message.success("登录成功！");

                    const user = result.data;
                    memory.user = user; //只是保存在内存中

                    storageUtils.saveUser(user); //保存到localstorage中去 即 保存到本地中


                    //跳转到后台管理界面  (不需要回退到登录界面  如果需要就用push())
                    this.props.history.replace('/');
                }else {
                    message.error(result.msg);
                }


            }else {
                //校验失败
                console.log('校验失败sbwy',err);
            }
        });

        // //得到form对象
        // const  form = this.props.form;
        // // 通过form对象获取表单项的输入数据
        // const results = form.getFieldsValue();
        // console.log(results.username);

    };


    //自定义表单验证器 (validator的回调函数)  对密码进行自定义验证
    //callback必须调用
    validatePwd = (rule,value,callback) => {
        console.log('validatePwd()',rule,value);
        if(!value){
            callback("密码不能为空！");
        }else if(value.length < 4){
            callback("密码长度不能小于4位");
        }else if(value.length > 12){
            callback("密码长度不能大于12位");
        }else if(!/^[a-zA-Z0-9]+$/.test(value)){
            callback("密码必须由大小写字母或者数组组成");
        }else {
            callback();    //验证成功直接调用callback()
        }
    }
    ;

    render(){
        //判断用户是否已经登录 如果已经登录 则自动跳转到管理页面
        const user = memory.user;
        if( user && user._id){
            return <Redirect to="/"/>
        }


        //得到一个高阶函数create传递的对象 form对象 里面有许多操作数据的方法
        const form = this.props.form;

        const  {getFieldDecorator} = form; //得到form对象中的一个方法
        return(
            <div className="login">
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {/*{getFieldDecorator('username', {*/}
                            {/*    rules: [*/}
                            {/*        {*/}
                            {/*            required: true,*/}
                            {/*            message: 'Please input your username!'*/}
                            {/*        }],*/}
                            {/*})*/}
                            {/*(*/}
                            {/*    <Input*/}
                            {/*        prefix={<Icon type="user"  />}*/}
                            {/*        placeholder="Username"*/}
                            {/*    />,*/}
                            {/*)}*/}
                            {
                                getFieldDecorator('username',{
                                    //声明式验证：直接使用别人定义好的规则进行验证
                                    rules:[
                                        { required: true,whiteSpace: true, message: 'Please input your username!'},
                                        { min: 4, message: '用户名必须大于4位！'},
                                        { max: 12, message:'用户名不能大于12位！'},
                                        { pattern: /^[a-zA-Z0-9]+$/ , message:'用户名必须是大小写英文和数字组成'}
                                        ]
                                })
                                (<Input
                                prefix={<Icon type="user"  />}
                                placeholder="Username"/>,
                                )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password',{
                                rules:[
                                    {
                                        validator:this.validatePwd
                                    }
                                ]
                            })(
                                <Input
                                    prefix={<Icon type="lock"  />}
                                    type="password"
                                    placeholder="Password"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}


/*
1.高阶函数
 --1.接受的参数是函数类型
 --2.返回值是函数

 常见的高阶函数:
    --接受的参数是函数类型
   1.setTimeout()/setInterval()
   2.Promise:Promise(() => {}) then( value => {},reason => {})
   3.数组遍历相关的方法:forEach()/filter()/map()/reduce()/find()/findIndex()

    --返回值是参数
   1. 函数对象的bind()
   2. Form.create()()/getFieldDecorator()()


  高阶函数与一般函数的区别:
  高阶函数更新动态，更加具有扩展性

2.高阶组件
  本质就是一个函数
  特点：
  接受一个组件 返回一个新的组件 新组件内部渲染接受的组件，新组件会向接受的组件传入特定的属性
  作用:
  扩展组件的功能

 */

/*
包装Form组件 生成一个新的组件 : Form(Login)
新组件会向Form组件传递一个强大的对象属性:form
 */
const WrapLogin  =Form.create()(Login);


export default WrapLogin
