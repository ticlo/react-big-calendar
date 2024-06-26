import React from 'react';
import clsx from 'clsx';
import { navigate } from './utils/constants';
class Toolbar extends React.Component {
    render() {
        let { localizer: { messages }, label, } = this.props;
        return (React.createElement("div", { className: "rbc-toolbar" },
            React.createElement("span", { className: "rbc-btn-group" },
                React.createElement("button", { type: "button", onClick: this.navigate.bind(null, navigate.TODAY) }, messages.today),
                React.createElement("button", { type: "button", onClick: this.navigate.bind(null, navigate.PREVIOUS) }, messages.previous),
                React.createElement("button", { type: "button", onClick: this.navigate.bind(null, navigate.NEXT) }, messages.next)),
            React.createElement("span", { className: "rbc-toolbar-label" }, label),
            React.createElement("span", { className: "rbc-btn-group" }, this.viewNamesGroup(messages))));
    }
    navigate = (action) => {
        this.props.onNavigate(action);
    };
    view = (view) => {
        this.props.onView(view);
    };
    viewNamesGroup(messages) {
        let viewNames = this.props.views;
        const view = this.props.view;
        if (viewNames.length > 1) {
            return viewNames.map((name) => (React.createElement("button", { type: "button", key: name, className: clsx({ 'rbc-active': view === name }), onClick: this.view.bind(null, name) }, messages[name])));
        }
    }
}
export default Toolbar;
