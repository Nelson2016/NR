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

    render() {

        this.children = React.Children.map(this.props.children, (item, index) => item.props.nRef);

        return <form ref={e => this.form = e} className="n-form" onSubmit={this.onSubmit.bind(this)}>
            {this.props.children}
        </form>
    }

}

export default Form;