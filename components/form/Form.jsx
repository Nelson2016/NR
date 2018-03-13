import React from 'react';

class Form extends React.Component {

    constructor(props) {
        super(props);

        this.children = [];
    }

    onSubmit(e) {
        e && e.preventDefault();

        let canSubmit = true;
        let children = this.children;

        //遍历子元素是否通过验证
        children.map((item, index) => {
            if (this.props.ctx[item].checkValue && !this.props.ctx[item].checkValue()) {
                canSubmit = false
            }
        });
        //调用表单提交回调函数
        this.props.onSubmit && this.props.onSubmit(canSubmit, this.childrens);
    }

    mapRefs(children) {
        const _this = this;
        let childrenRefs = React.Children.map(children, (item, index) => {
            if (item.props.nRef) {
                return item.props.nRef
            } else if (item.props.children) {
                return _this.mapRefs(item.props.children);
            }
        });
        return childrenRefs;
    }

    render() {

        this.children = this.mapRefs(this.props.children);

        return <form ref={e => this.form = e} className="n-form" onSubmit={this.onSubmit.bind(this)}>
            {this.props.children}
        </form>
    }

}

export default Form;