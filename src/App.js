import React from "react";
import "./App.css";
import FileListPage from "./pages/FileListPage";
import { Layout, Breadcrumb } from "antd";
import SideMenu from "./components/SideMenu";

const { Content, Sider } = Layout;
function App() {
    return (
        <Layout style={{ height: "100%" }}>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <SideMenu />
                </Sider>
                <Layout style={{ padding: "0 24px 24px" }}>
                    <div className="site-nav">
                        <Breadcrumb style={{ margin: "16px 0" }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>

                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        <FileListPage />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}

export default App;
