import React from "react";
import { Breadcrumb } from "antd";
import { getHistory, saveHistory } from "../utils/historyUtil";
import _ from "lodash";
import ColorSpan from "./ColorSpan";

export default class BreadcrumbNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        window.addEventListener("history", this.updateBreadcrumb);
    }
    componentWillUnmount() {
        window.removeEventListener("history", this.updateBreadcrumb);
    }

    updateBreadcrumb = () => {
        this.setState({});
    };
    getBreadcrumbItems = () => {
        const history = getHistory();
        return history.map((element, index) => {
            const name = _.last(element.split("/"));
            return (
                <Breadcrumb.Item key={element}>
                    {index === history.length - 1 && (
                        <span data-data={element}>{name}</span>
                    )}
                    {index !== history.length - 1 && (
                        <ColorSpan onClick={this.itemClick} data-index={index}>
                            {name}
                        </ColorSpan>
                    )}
                </Breadcrumb.Item>
            );
        });
    };

    itemClick = (e) => {
        const history = getHistory();
        //1.获取newHistory
        const index = e.target.getAttribute("data-index");
        const newHistory = history.slice(0, Number(index) + 1);
        //2.保存newHistory
        saveHistory(newHistory);
        //3.更新
        const event = new Event("pathChange");
        window.dispatchEvent(event);
    };
    render() {
        const items = this.getBreadcrumbItems();
        return <Breadcrumb style={{ margin: "16px 0" }}>{items}</Breadcrumb>;
    }
}
