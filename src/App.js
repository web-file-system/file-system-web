import React from "react";
import "./App.css";
import FileListPage from "./pages/FileListPage";
import { Layout } from "antd";
import BreadcrumbNav from "./components/BreadcrumbNav";
const { Content } = Layout;
function App() {
    return (
        <Layout style={{ height: "100%" }}>
            <Layout>
                <Layout style={{ padding: "0 24px 24px" }}>
                    <div className="site-nav">
                        <BreadcrumbNav />
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
