import React from 'react';
import ReactDOM from 'react-dom';
import {hydrate} from 'react-dom';

class RenderToBody extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.renderContainer = document.createElement("div");
        document.body.appendChild(this.renderContainer);
        this._render();
    }

    componentDidUpdate() {
        this._render();
    }

    componentWillUnmount() {
        ReactDOM.unmountComponentAtNode(this.renderContainer);
        document.body.removeChild(this.renderContainer);
    }

    _render() {

        hydrate(this.props.children, this.renderContainer);
    }

    render() {
        return null;
    }

}

export default RenderToBody;