import React from "react";
import { getFileListData } from "../utils/ajax";
import { Table, Button } from "antd";
export default class FileListPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: [],
        };
        this.columns = [
            {
                title: "名称",
                dataIndex: "name",
                key: "name",
            },
            {
                title: "大小",
                dataIndex: "size",
                key: "size",
            },
            {
                title: "创建时间",
                dataIndex: "createTime",
                key: "createTime",
            },
            {
                title: "更新时间",
                dataIndex: "updateTime",
                key: "updateTime",
            },
            {
                title: "操作",
                key: "action",
                render: (text, record) => {
                    console.log(text);
                    console.log(record);
                    return (
                        <React.Fragment>
                            <Button type="link">压缩</Button>
                            <Button type="link">解压</Button>
                            <Button type="link">下载</Button>
                            <Button type="link">备份</Button>
                            <Button type="link">删除</Button>
                        </React.Fragment>
                    );
                },
            },
        ];
    }

    componentDidMount() {
        this.getFileListData();
    }

    getFileListData = () => {
        getFileListData()
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

    render() {
        const { dataSource } = this.state;

        return (
            <div>
                <Table
                    bordered
                    columns={this.columns}
                    dataSource={dataSource}
                    rowKey={(record) => record.name}
                />
            </div>
        );
    }
}
