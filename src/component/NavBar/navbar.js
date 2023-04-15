import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { HomeOutlined, LoginOutlined, UserAddOutlined } from '@ant-design/icons';

const { Header } = Layout;

function Navbar() {
  return (
    <Layout>
      <Header style={{ position: 'fixed', top: '0', width: '100%' }}>
        <Menu mode="horizontal" theme="dark">
          <Menu.Item key="home" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="login" icon={<LoginOutlined />}>
            <Link to="/login">Login</Link>
          </Menu.Item>
          <Menu.Item key="register" icon={<UserAddOutlined />}>
            <Link to="/register">Register</Link>
          </Menu.Item>
        </Menu>
      </Header>
    </Layout>
  );
}

export default Navbar;