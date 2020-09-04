import React from "react";
// import styles from "./EditStudentInfoModal.module.css";
import { Input, Form, Modal } from "antd";

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

class NewDirModal extends React.Component {
    // const [form] = Form.useForm(null);
    constructor(props) {
        super(props);
        this.state = {
            type: 0,
        };
        this.formRef = React.createRef();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.defaultData !== prevProps.defaultData) {
            this.setState({
                type: this.props.defaultData.type,
            });
        }
    }

    ok = () => {
        this.formRef.current
            .validateFields()
            .then((values) => {
                const { onOk } = this.props;
                if (onOk) {
                    onOk({ ...this.props.defaultData, ...values });
                }
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
            });
    };
    cancel = () => {
        const { onCancel } = this.props;
        if (onCancel) {
            onCancel();
        }
        onCancel();
    };

    onValuesChange = (changedValues, allValues) => {
        this.setState({
            type: allValues.type,
        });
    };
    render() {
        const { defaultData, title, visible, loading } = this.props;

        return (
            <Modal
                title={title}
                visible={visible}
                onOk={this.ok}
                onCancel={this.cancel}
                okText={"保存"}
                cancelText={"取消"}
                confirmLoading={loading}
                destroyOnClose={true}
                maskClosable={false}
            >
                <Form
                    ref={this.formRef}
                    name="validate_other"
                    {...formItemLayout}
                    onValuesChange={this.onValuesChange}
                    initialValues={
                        defaultData !== null && defaultData !== undefined
                            ? defaultData
                            : {
                                  type: 0,
                                  orderNum: 1,
                                  name: null,
                                  id: null,
                                  classId: null,
                              }
                    }
                >
                    <Form.Item
                        label="名称"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "请输入名称!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

export default NewDirModal;
