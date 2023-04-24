import React from "react";
import { Button } from 'antd';
import { CalendarOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

function AdminMenu() {



  return (
    <div  style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <Button  type="link" icon={<CalendarOutlined />}>
          <Link to="/appointment">Appointment</Link>
        </Button>
        <Button type="link" icon={<UserAddOutlined />}>
          <Link to="/patientreg">Patient Registration</Link>
        </Button>
        <Button type="link" icon={<UserOutlined />}>
          <Link to="/patientList">Patient List</Link>
        </Button>
      </div>
    </div>
  );
}

export default AdminMenu;
