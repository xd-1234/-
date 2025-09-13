import React from 'react'
import { Layout, Menu } from 'antd'
import { BookOutlined, DashboardOutlined, ScheduleOutlined } from '@ant-design/icons'
import BookPoolManager from './components/BookPoolManager'
import SessionAllocation from './components/SessionAllocation'
import Dashboard from './pages/Dashboard'

const { Header, Sider, Content } = Layout

export default function App() {
  const [key, setKey] = React.useState('dashboard')
  return (
    <Layout style={{minHeight:'100vh'}}>
      <Sider>
        <div style={{color:'#fff', textAlign:'center', padding:'16px', fontWeight:600}}>Smart Cabinet</div>
        <Menu
          theme="dark"
          selectedKeys={[key]}
          onClick={e=>setKey(e.key)}
          items={[
            {key:'dashboard', icon:<DashboardOutlined />, label:'仪表盘'},
            {key:'pool', icon:<BookOutlined />, label:'保障池'},
            {key:'session', icon:<ScheduleOutlined />, label:'场次分配'}
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{background:'#fff'}}>共用书柜管理</Header>
        <Content style={{padding:24}}>
          {key === 'dashboard' && <Dashboard />}
          {key === 'pool' && <BookPoolManager />}
          {key === 'session' && <SessionAllocation />}
        </Content>
      </Layout>
    </Layout>
  )
}