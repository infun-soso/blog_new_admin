import React,{useState} from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Route } from 'react-router-dom';

import AddArticle from './addArticle'
import ArticleList from './articleList'
import UserList from './userList'
import WorkPlace from './workPlace'

import '../static/css/adminIndex.css'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const routerMap = [
  {
    key: '3',
    route: '/index/add'
  },
  {
    key: '4',
    route: '/index/list'
  },
  {
    key: '1',
    name: '工作台',
    route: '/index/workPlace'
  },
  {
    key: '9',
    route: '/index/users'
  },
]

function AdminIndex(props){
  const [collapsed,setCollapsed] = useState(false)

  const onCollapse = collapsed => {
    setCollapsed(collapsed)
  };

  const handleClickArticle = (e) => {
    console.log(e)
    routerMap.forEach((item) => {
      if (e.key === item.key) props.history.push(item.route)
    })
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider  collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo"></div>
        <Menu onClick={handleClickArticle} theme="dark" defaultSelectedKeys={['3']} defaultOpenKeys={['sub1']} mode="inline" >
          <Menu.Item key="1">
            <Icon type="pie-chart" />
            <span>工作台</span>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="file" />
                <span>文章管理</span>
              </span>
            }
          >
            <Menu.Item key="3">添加文章</Menu.Item>
            <Menu.Item key="4">文章列表</Menu.Item>

          </SubMenu>

          <Menu.Item key="9">
            <Icon type="user" />
            <span>用户列表</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>后台管理</Breadcrumb.Item>
            <Breadcrumb.Item>工作台</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          <div>
            <Route path="/index/add/:id" component={AddArticle} />
            <Route path="/index/add/" exact component={AddArticle} />
            <Route path="/index/list" component={ArticleList} />
            <Route path="/index/users" component={UserList} />
            <Route path="/index/workPlace" component={WorkPlace} />
          </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>wyfs.top</Footer>
      </Layout>
    </Layout>
  )
}

export default AdminIndex