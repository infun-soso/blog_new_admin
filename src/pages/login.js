import React, { useState } from 'react';
import { Card, Input, Icon, Button, Spin, message } from 'antd'
import '../static/css/login.css';
import axios from 'axios'
import servicePath from '../config/apiUrl'

function Login(props) {

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const checkLogin = () => {
    setIsLoading(true)
    if (!userName) return message.error('用户名不能为空')
    if (!password) return message.error('密码不能为空')

    let dataProps = {
      userName,
      password
    }

    axios({
      method: 'post',
      url: servicePath.checkLogin,
      data: dataProps,
      withCredentials: true
    }).then(
      res => {
        console.log(res)
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
  return (
    <div className="login-div">
      <Spin tip="loading" spinning={isLoading}>
        <Card title="Infun Blog Admin" bordered={true} style={{width: 400}}>
          <Input
            id="userNanme"
            size="large"
            placeholder="enter your username"
            prefix={<Icon type="user" style={{color: 'rgba(0, 0, 0, .25)'}}/>}
            onChange={(e) => setUserName(e.target.value)}></Input>
          <br/><br/>
          <Input
            id="password"
            size="large"
            placeholder="enter your password"
            prefix={<Icon type="key" style={{color: 'rgba(0, 0, 0, .25)'}}/>}
            onChange={(e) => setPassword(e.target.value)}></Input>
          <br/><br/>
          <Button type="primary" size="large" block onClick={checkLogin}>Login in</Button>
        </Card>
      </Spin>
    </div>
  )
}

export default Login