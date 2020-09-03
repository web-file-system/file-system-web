import React from "react";
// import styles from "./EditStudentInfoModal.module.css";
import { Upload, Modal } from "antd";
import { InboxOutlined } from "@ant-design/icons";

export default class UploadModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList: [],
        };
    }

    componentDidUpdate(preProps) {
        if (this.props.visible !== preProps.visible) {
            this.setState({
                fileList: [],
            });
        }
    }
    successEvent = () => {
        const { success } = this.props;
        if (success) {
            success();
        }
    };
    cancelEvent = () => {
        const { cancel } = this.props;
        if (cancel) {
            cancel();
        }
    };

    beforeUpload = (file, fileList) => {
        const { success } = this.props;

        //更新文件
        this.setState({
            fileList: [file],
        });
        if (success) {
            success({ file: file });
        }
        return false;
    };

    render() {
        const uplpadProps = {
            name: "file",
            multiple: true,
            beforeUpload: this.beforeUpload,
            fileList: this.fileList,
        };
        const { visible, loading } = this.props;

        return (
            <Modal
                title={"上传文件"}
                visible={visible}
                onOk={this.successEvent}
                onCancel={this.cancelEvent}
                footer={null}
                confirmLoading={loading}
            >
                <Upload.Dragger {...uplpadProps}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">点击或者拖拽上传</p>
                </Upload.Dragger>
            </Modal>
        );
    }
}
