import React from "react";
import { Button } from 'antd';
import { CalendarOutlined, UserAddOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

function ReceptionMenu() {
  return (
    <div>
      <Button type="link" icon={<CalendarOutlined />}>
        <Link to="/appointment">Appointment</Link>
      </Button>
      <Button type="link" icon={<UserAddOutlined />}>
        <Link to="/patientreg">Patient Registration</Link>
      </Button>
    </div>
  );
}

export default ReceptionMenu;
