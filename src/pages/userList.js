import React from 'react'
import { List, Row, Col, Button } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios'
import servicePath from '../config/apiUrl'
const ListHeader = <Row className="list-div">
    <Col span={10}>
      <b>用户名</b>
    </Col>
    <Col span={10}>
      <b>创建时间</b>
    </Col>
    {/* <Col span={3}>
      <b>集数</b>
    </Col> */}
    {/* <Col span={3}>
      <b>浏览量</b>
    </Col>*/}
    <Col span={4}>
      <b>操作</b>
    </Col> 
  </Row>
const UserList = () => {
  const getUserList = () => {
    axios({
      method: 'get',
      url: servicePath.getUserList,
      withCredentials: true,
      header:{ 'Access-Control-Allow-Origin':'*' }
    }).then(
      res => {
        setList(res.data.list)
      }
    )
  }
  
  useEffect(() => {
    getUserList()
  }, [])

  const handleDelUser = (id) => {
    console.log(id)
  }

  const [list, setList] = useState([])
  return (
    <div>
      <List
        header={ListHeader}
        bordered
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <Row className="list-div">
              <Col span={10}>
                {item.userName}
              </Col>
              <Col span={10}>
                {item.addTime || '-'}
              </Col>
              <Col span={4}>
                <Button type="primary">修改</Button>&nbsp;

                <Button onClick={() => handleDelUser(item.id)}>删除</Button>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </div>
  )
}

export default UserList