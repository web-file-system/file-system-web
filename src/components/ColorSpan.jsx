import React from "react";

export default class ColorSpan extends React.Component {
    render() {
        const { children, onClick } = this.props;
        return (
            <span
                style={{ color: "#1890ff", cursor: "pointer" }}
                onClick={onClick}
            >
                {children}
            </span>
        );
    }
}
