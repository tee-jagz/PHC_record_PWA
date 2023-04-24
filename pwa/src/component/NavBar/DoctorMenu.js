import React from "react";
import { Menu } from "antd";
import { CalendarOutlined} from "@ant-design/icons";
import { Link } from "react-router-dom";

function DoctorMenu() {

  return (
    <Menu mode="horizontal" selectable={false} >
      <Menu.Item key="activeVisits" icon={<CalendarOutlined />}>
        <Link to="/active_visits">Active Visits</Link>
      </Menu.Item>
    </Menu>
  );
}

export default DoctorMenu;
