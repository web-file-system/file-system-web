import React from "react";
import { Breadcrumb } from "antd";
import { getHistory } from "../utils/historyUtil";
import _ from "lodash";

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
        return history.map((element) => {
            const name = _.last(element.split("/"));
            return <Breadcrumb.Item key={element}>{name}</Breadcrumb.Item>;
        });
    };

    render() {
        const items = this.getBreadcrumbItems();
        return <Breadcrumb style={{ margin: "16px 0" }}>{items}</Breadcrumb>;
    }
}
