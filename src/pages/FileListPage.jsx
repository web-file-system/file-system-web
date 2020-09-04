import React from "react";
import {
    getFileListData,
    deleteFileOrDir,
    zipFileOrDir,
    unzipFileOrDir,
    copyFileOrDir,
    downloadFile,
    uploadFile,
    newDir,
    renameFileOrDir,
} from "../utils/ajax";
import { Table, Button, message, Space } from "antd";
import {
    ReloadOutlined,
    FolderAddOutlined,
    UploadOutlined,
    RollbackOutlined,
} from "@ant-design/icons";
import UploadModal from "../components/UploadModal";
import NewDirModal from "../components/NewDirModal";
import _ from "lodash";
import { getHistory, saveHistory } from "../utils/historyUtil";

export default class FileListPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: [],
            uploadVisible: false,
            newLoading: false,
            newVisible: false,
            editLoading: false,
            editVisible: false,
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
                                    this.pushHistoryClick(record);
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
                            <Button
                                type="link"
                                onClick={() => {
                                    this.zipFileOrDirClick(record);
                                }}
                            >
                                压缩
                            </Button>
                            <Button
                                type="link"
                                onClick={() => {
                                    this.unzipFileOrDirClick(record);
                                }}
                                disabled={record.isZip === false}
                            >
                                解压
                            </Button>
                            <Button
                                type="link"
                                disabled={record.isFile === false}
                                onClick={() => {
                                    this.downloadFileClick(record);
                                }}
                            >
                                下载
                            </Button>
                            <Button
                                type="link"
                                onClick={() => {
                                    this.copyFileOrDirClick(record);
                                }}
                            >
                                备份
                            </Button>
                            <Button
                                type="link"
                                onClick={() => {
                                    this.showEditModal(record);
                                }}
                            >
                                重命名
                            </Button>
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
        this.history = getHistory();
    }

    componentDidMount() {
        this.getFileListData();
        window.addEventListener("pathChange", this.pathChange);
    }
    componentWillUnmount() {
        window.removeEventListener("pathChange", this.pathChange);
    }

    pathChange = (e) => {
        console.log(e.detail);
        this.history = getHistory();
        this.getFileListData();
    };
    pushHistoryClick = (record) => {
        this.history.push(record.path);
        saveHistory(this.history);
        this.getFileListData(record.path);
    };
    popHistoryClick = () => {
        if (this.history.length > 1) {
            this.history.pop();
            saveHistory(this.history);

            const path = _.last(this.history);
            this.getFileListData(path);
        }
    };

    getFileListData = (path) => {
        if (path === undefined || path === null) {
            path = _.last(this.history);
        }
        getFileListData(path)
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

    deleteFileOrDirClick = (record) => {
        const data = {
            path: record.path,
            type: record.isFile === true ? "file" : "dir",
        };
        deleteFileOrDir(data)
            .then((result) => {
                if (result.code === 1) {
                    this.getFileListData();

                    message.success(result.message);
                } else {
                    message.error(result.message);
                }
            })
            .catch((error) => {
                message.error(error.message);
            });
    };

    zipFileOrDirClick = (record) => {
        zipFileOrDir(record.path)
            .then((result) => {
                if (result.code === 1) {
                    this.getFileListData();

                    message.success(result.message);
                } else {
                    message.error(result.message);
                }
            })
            .catch((error) => {
                message.error(error.message);
            });
    };
    unzipFileOrDirClick = (record) => {
        unzipFileOrDir(record.path)
            .then((result) => {
                if (result.code === 1) {
                    this.getFileListData();

                    message.success(result.message);
                } else {
                    message.error(result.message);
                }
            })
            .catch((error) => {
                message.error(error.message);
            });
    };

    copyFileOrDirClick = (record) => {
        const data = {
            path: record.path,
            type: record.isFile === true ? "file" : "dir",
        };
        copyFileOrDir(data)
            .then((result) => {
                if (result.code === 1) {
                    this.getFileListData();

                    message.success(result.message);
                } else {
                    message.error(result.message);
                }
            })
            .catch((error) => {
                message.error(error.message);
            });
    };

    downloadFileClick = (record) => {
        downloadFile(record);
    };

    reloadClick = () => {
        this.getFileListData();
    };

    showUploadModal = () => {
        this.setState({
            uploadVisible: true,
        });
    };
    uploadCancel = () => {
        this.setState({
            uploadVisible: false,
        });
    };
    uploadSuccess = (data) => {
        // console.log("uploadSuccess", data);
        data.path = _.last(this.history);
        uploadFile(data)
            .then((result) => {
                this.setState({
                    uploadVisible: false,
                });
                this.getFileListData();
            })
            .catch((error) => {
                this.setState({
                    uploadVisible: false,
                });
                message.error(error.message);
            });
    };

    newFolderHandler = () => {
        this.setState({
            newVisible: true,
        });
    };

    newModalOkHandler = (data) => {
        this.setState({
            newLoading: true,
        });
        const data2 = {
            path: _.last(this.history),
            name: data.name,
        };

        newDir(data2)
            .then((response) => {
                this.setState({
                    newLoading: false,
                    newVisible: false,
                });
                this.getFileListData();
            })
            .catch((error) => {
                this.setState({
                    newLoading: false,
                });
                message.error(error.message, 1.5);
            });
    };
    newModalCancelHandel = () => {
        this.setState({
            newVisible: false,
        });
    };
    showEditModal = (data) => {
        this.setState({
            editData: data,
            editVisible: true,
        });
    };
    editModalOkHandler = (data) => {
        this.setState({
            editLoading: true,
        });
        const data2 = {
            path: data.path,
            name: data.name,
            type: data.isFile === true ? "file" : "dir",
        };
        // return;
        renameFileOrDir(data2)
            .then((response) => {
                this.setState({
                    editLoading: false,
                    editVisible: false,
                });
                this.getFileListData();
            })
            .catch((error) => {
                this.setState({
                    editLoading: false,
                });
                message.error(error.message, 1.5);
            });
    };
    editModalCancelHandel = () => {
        this.setState({
            editVisible: false,
        });
    };

    render() {
        const {
            dataSource,
            uploadVisible,
            newVisible,
            editVisible,
        } = this.state;

        return (
            <div>
                <Space style={{ marginBottom: 16 }}>
                    <Button
                        icon={<RollbackOutlined />}
                        onClick={this.popHistoryClick}
                        disabled={this.history.length <= 1}
                    >
                        返回
                    </Button>
                    <Button
                        icon={<ReloadOutlined />}
                        onClick={this.reloadClick}
                    >
                        刷新
                    </Button>
                    <Button
                        icon={<FolderAddOutlined />}
                        onClick={this.newFolderHandler}
                    >
                        新建
                    </Button>
                    <Button
                        icon={<UploadOutlined />}
                        onClick={this.showUploadModal}
                    >
                        上传
                    </Button>
                </Space>
                <UploadModal
                    visible={uploadVisible}
                    cancel={this.uploadCancel}
                    success={this.uploadSuccess}
                />
                <NewDirModal
                    // defaultData={editData}
                    treeData={this.state.data}
                    loading={this.state.newLoading}
                    title="新建"
                    visible={newVisible}
                    onOk={this.newModalOkHandler}
                    onCancel={this.newModalCancelHandel}
                />
                <NewDirModal
                    defaultData={this.state.editData}
                    treeData={this.state.data}
                    loading={this.state.editLoading}
                    title="编辑"
                    visible={editVisible}
                    onOk={this.editModalOkHandler}
                    onCancel={this.editModalCancelHandel}
                />
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
