import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import { HomeOutlined, LoginOutlined, UserAddOutlined, LogoutOutlined } from '@ant-design/icons';
import { useAuth } from "./../../useAuth";
import DoctorMenu from './DoctorMenu';
import ReceptionMenu from './reception_menu';


const { Header } = Layout;


function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) {
    return (
      <Layout className="navbar">
        <Header>
          <Menu  mode="horizontal" theme="dark">
            <Menu.Item key="login" icon={<LoginOutlined />}>
              <Link to="/">Login</Link>
            </Menu.Item>
            <Menu.Item key="register" icon={<UserAddOutlined />}>
              <Link to="/register">Register</Link>
            </Menu.Item>
            
          </Menu>
        </Header>
      </Layout>
    );
  } else if (user.role === "receptionist")
  {
  return (
    <div className="navbar">
    <Layout >
      <Header>
        <Menu  mode="horizontal" theme="dark">
          <Menu.Item onClick={handleLogout} key="logout" icon={<LogoutOutlined />}>
          Logout
          </Menu.Item>
        </Menu>

      </Header>
    </Layout>
    <ReceptionMenu />
    </div>
  );
} else if (user.role === "doctor") {
     
      return (
        <div className="navbar">
    <Layout >
      <Header>
        <Menu  mode="horizontal" theme="dark">
          <Menu.Item onClick={handleLogout} key="logout" icon={<LogoutOutlined />}>
          Logout
          </Menu.Item>
        </Menu>

      </Header>
    </Layout>
    <DoctorMenu />
    </div>
      );
      }
}

export default Navbar;