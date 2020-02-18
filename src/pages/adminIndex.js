import React,{useState} from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Route } from 'react-router-dom';
import AddArticle from './addArticle'
import ArticleList from './articleList'
import '../static/css/adminIndex.css'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


function AdminIndex(props){
  console.log(props, 111)
  const [collapsed,setCollapsed] = useState(false)

  const onCollapse = collapsed => {
    setCollapsed(collapsed)
  };

  const handleClickArticle = (e) => {
    console.log(e)
    if (e.key === '3') {
      props.history.push('/index/add')
    } else {
      props.history.push('/index/list')
    }
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider  collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo"></div>
        <Menu theme="dark" defaultSelectedKeys={['3']} defaultOpenKeys={['sub1']} mode="inline">
          <Menu.Item key="1">
            <Icon type="pie-chart" />
            <span>工作台</span>
          </Menu.Item>
          <SubMenu
            key="sub1"
            onClick={handleClickArticle}
            title={
              <span>
                <Icon type="user" />
                <span>文章管理</span>
              </span>
            }
          >
            <Menu.Item key="3">添加文章</Menu.Item>
            <Menu.Item key="4">文章列表</Menu.Item>

          </SubMenu>

          <Menu.Item key="9">
            <Icon type="file" />
            <span>留言管理</span>
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
          </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>wyfs.top</Footer>
      </Layout>
    </Layout>
  )
}

export default AdminIndex