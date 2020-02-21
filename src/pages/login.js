import React, { useState } from 'react';
import { Card, Input, Icon, Button, Spin, message } from 'antd'
import '../static/css/login.css';
import axios from 'axios'
import servicePath from '../config/apiUrl'

function Login(props) {

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [repassword, setRePassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSignIn, setisSignIn] = useState(true)
 
  const checkSignIn = () => {
    if (!userName) return message.error('用户名不能为空')
    if (!password) return message.error('密码不能为空')
    setIsLoading(true)

    let dataProps = {
      userName,
      password
    }

    axios({
      method: 'post',
      url: servicePath.checkLogin,
      data: dataProps,
    }).then(
      res => {
        setIsLoading(false)
        if (!res.data.code) {
          localStorage.setItem('openId', res.data.openId)
          props.history.push('/index')
        } else {
          message.error('用户名密码错误')
        }
      }
    )
  }

  const checkSignUp = () => {
    if (!userName) return message.error('请输入用户名')
    if (!password) return message.error('请输入用户密码')
    if (password && (repassword !== password)) return message.error('两次输入密码不同')
    setIsLoading(true)

    let dataProps = {
      userName,
      password
    }
    axios({
      method: 'post',
      url: servicePath.signUp,
      data: dataProps,
    }).then(
      res => {
        setIsLoading(false)
        if (!res.data.code) {
          message.success('注册成功，快去登录吧')
        } else {
          message.error(res.data.data)
        }
      }
    )
  }

  const signHandler = () => {
    setisSignIn(!isSignIn)
    setIsLoading(false)
    setUserName('')
    setPassword('')
    setRePassword('')
  }

  const renderSignUp = () => {
    return (
      <div>
        <Input.Password
        id="repassword"
        size="large"
        placeholder="confirm your password"
        prefix={<Icon type="key" style={{color: 'rgba(255, 255, 255, .75)'}}/>}
        value={repassword}
        onChange={(e) => setRePassword(e.target.value)}></Input.Password>
        <br/><br/>
      </div>
    )
  }

  const renderSubmit = () => {
    return (
      <Button type="primary" loading={isLoading} size="large" block onClick={isSignIn ? checkSignIn : checkSignUp}>{isSignIn ? 'Sign in' : 'Sign up'}</Button>
    )
  }

  return (
    <div className="bg">
      <div className="login-div">
        {/* <Spin tip="loading" spinning={isLoading}> */}
          <Card title="Infun Blog Admin" bordered={false} style={{width: 400}}>
            <Input
              id="userNanme"
              size="large"
              placeholder="enter your username"
              prefix={<Icon type="user" style={{color: 'rgba(255, 255, 255, .75)'}}/>}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}></Input>
            <br/><br/>
            <Input.Password
              id="password"
              size="large"
              placeholder="enter your password"
              prefix={<Icon type="key" style={{color: 'rgba(255, 255, 255, .75)'}}/>}
              value={password}
              onChange={(e) => setPassword(e.target.value)}></Input.Password>
            <br/><br/>
            {isSignIn ? null : renderSignUp()}
            {renderSubmit()}
            <Button type="link" size="large" className="sign-up" style={{float: 'right'}} onClick={signHandler}>{isSignIn ? 'Sign up' : 'Sign in'}</Button>
          </Card>
        {/* </Spin> */}
      </div>
    </div>
  )
}

export default Login