import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  OrderedListOutlined,
  SnippetsOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import Yeni from "./Yeni";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Bos() {
  const navigate = useNavigate();
  const getList = () => {
    navigate("/list");
  };
  const getTask = () => {
    navigate("/");
  };
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Profil",
            },
            {
              key: "2",
              icon: <OrderedListOutlined />,
              label: "Liste",
              onClick: getList,
            },
            {
              key: "3",
              icon: <SnippetsOutlined />,
              label: "Görevlendirme",
              onClick: getTask,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 10,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <h1 style={{fontSize:"2rem"}}>GÖREVLER</h1>
          <Yeni />
        </Content>
      </Layout>
    </Layout>
  );
}
