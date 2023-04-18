import React from "react";
import { Button } from 'antd';
import { CalendarOutlined, UserAddOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "./../../useAuth";

function ReceptionMenu() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <Button type="link" icon={<CalendarOutlined />}>
          <Link to="/appointment">Appointment</Link>
        </Button>
        <Button type="link" icon={<UserAddOutlined />}>
          <Link to="/patientreg">Patient Registration</Link>
        </Button>
        <Button type="link" icon={<UserOutlined />}>
          <Link to="/patientList">Patient List</Link>
        </Button>
      </div>
      <div>
        <Button type="link" icon={<LogoutOutlined />} onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
}

export default ReceptionMenu;
