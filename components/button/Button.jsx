import React from 'react';

import fonts from '../../asset/style/fonts.scss';
import styles from './style/button.scss';

class Button extends React.Component {

    constructor(props) {
        super(props);
    }

    /**
     * @description 按钮点击事件
     */
    onClick() {
        this.props.onClick && this.props.onClick();
    }

    /**
     * @description 设置按钮为不可用状态
     */
    disable() {
        const button = this.button;
        button.setAttribute('disabled', 'disabled');
    }

    /**
     * @description 设置按钮为可用状态
     */
    enable() {
        const button = this.button;
        button.removeAttribute('disabled');
    }

    /**
     * @description 显示按钮所在表单正在提交的状态动画
     */
    startLoading() {
        let buttonLoading = this.buttonLoading;
        buttonLoading.classList.add(styles['n-active']);
        this.disable();
    }

    /**
     * @description 停止显示按钮所在表单正在提交的状态动画
     */
    endLoading() {
        let buttonLoading = this.buttonLoading;
        buttonLoading.classList.remove(styles['n-active']);
        this.enable();
    }

    render() {
        let {type = 'button', disabled, mode = 'normal'} = this.props;

        return <div className={styles['n-buttons']}>
            <button
                ref={e => this.button = e}
                type={type}
                disabled={disabled}
                className={styles['n-button-' + mode]}
                onClick={this.onClick.bind(this)}>{this.props.text}</button>

            <div ref={e => this.buttonLoading = e} className={styles['n-button-loading']}>
                <i className={fonts['icon-loading']} data-icon></i>
            </div>
        </div>;
    }
}

export default Button;