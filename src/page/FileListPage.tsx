import React from "react";
import styles from "./FileListPage.module.css";
import { Button } from "antd";
import { getFileList } from "../utils/ajax";

export default class FileListPage extends React.Component {
    componentDidMount() {
        this.getListData();
    }
    getListData = () => {
        getFileList("")
            .then((result) => {
                console.log("result:", result);
                if (result.code === 1) {
                }
            })
            .catch((error) => {
                console.log("error:", error);
            });
    };
    render() {
        return (
            <div className={styles.color}>
                FileListPage
                <Button type="primary">Button</Button>
            </div>
        );
    }
}
