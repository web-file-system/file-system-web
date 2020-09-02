import React from "react";
import { getFileListData, deleteFileOrDir } from "../utils/ajax";
import { Table, Button, message } from "antd";
import server from "../utils/server";
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
                render: (text, record) => {
                    if (record.isDir === true) {
                        return (
                            <Button
                                type="link"
                                onClick={() => {
                                    this.dirNameClick(record);
                                }}
                            >
                                {text}
                            </Button>
                        );
                    }
                    return text;
                },
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
                    return (
                        <React.Fragment>
                            <Button type="link">压缩</Button>
                            <Button type="link">解压</Button>
                            <Button type="link">下载</Button>
                            <Button type="link">备份</Button>
                            <Button
                                type="link"
                                onClick={() => {
                                    this.deleteFileOrDirClick(record);
                                }}
                            >
                                删除
                            </Button>
                        </React.Fragment>
                    );
                },
            },
        ];
        this.path = null;
    }

    componentDidMount() {
        this.getFileListData(server.root);
    }

    getFileListData = (path) => {
        getFileListData(path)
            .then((result) => {
                console.log(result);
                const code = result.code;
                if (code === 1) {
                    this.path = path;

                    this.setState({
                        dataSource: result.data,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    dirNameClick = (record) => {
        this.getFileListData(record.path);
    };

    deleteFileOrDirClick = (record) => {
        const data = {
            path: record.path,
            type: record.isFile === true ? "file" : "dir",
        };
        deleteFileOrDir(data)
            .then((result) => {
                if (result.code === 1) {
                    this.getFileListData(this.path);

                    message.success(result.message);
                } else {
                    message.error(result.message);
                }
            })
            .catch((error) => {
                message.error(error.message);
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
                    pagination={{ pageSize: 15 }}
                />
            </div>
        );
    }
}
