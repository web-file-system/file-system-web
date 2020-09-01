import React from "react";
import { Menu } from "antd";
import {
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
} from "@ant-design/icons";
import { getFileListData } from "../utils/ajax";
import server from "../utils/server";

export default class SideMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: [],
        };
    }

    componentDidMount() {
        this.getFileListData();
    }
    getFileListData = () => {
        getFileListData(server.root)
            .then((result) => {
                console.log(result);
                const code = result.code;
                if (code === 1) {
                    this.setState({
                        dataSource: result.data,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    getMenuItem = (data) => {
        return data.map((element, index) => {
            return (
                <Menu.Item icon={<UserOutlined />} key={index}>
                    {element.name}
                </Menu.Item>
            );
        });
    };
    render() {
        const { dataSource } = this.state;
        return (
            <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{ height: "100%", borderRight: 0, overflowY: "scroll" }}
            >
                {this.getMenuItem(dataSource)}
            </Menu>
        );
    }
}
