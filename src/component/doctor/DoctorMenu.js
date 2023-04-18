import React from "react";
import { Menu, Button } from "antd";
import { CalendarOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAuth } from "./../../useAuth";
import { useNavigate } from "react-router-dom";

function DoctorMenu() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Menu mode="horizontal" selectable={false}>
      <Menu.Item key="activeVisits" icon={<CalendarOutlined />}>
        <Link to="/active_visits">Active Visits</Link>
      </Menu.Item>
      {/* <Menu.Item key="doctorDashboard" icon={<UserOutlined />}>
        <Link to="/doctor_dashboard">Doctor Dashboard</Link>
      </Menu.Item> */}
      <Menu.Item key="logout" icon={<LogoutOutlined />} style={{ float: "right" }}>
        <Button type="text" onClick={handleLogout}>
          Logout
        </Button>
      </Menu.Item>
    </Menu>
  );
}

export default DoctorMenu;
