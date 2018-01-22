import React from 'react';

import fonts from '../../asset/style/fonts.scss';
import styles from './style/input.scss';

import dataTypes from './dataTypes';

class Input extends React.Component {

    constructor(props) {
        super(props);

        //默认最大文本长度
        const maxLength = parseInt(this.props.maxLength);
        this.maxLength = maxLength > 0 ? maxLength : 200;
    }

    /**
     * @description 输入框内容变动
     */
    onInput() {
        this.checkValue();
        this.props.onInput && this.props.onInput();
    }

    /**
     * @description 检验输入款内容是否合法
     */
    checkValue() {
        const input = this.input;
        const ignore = this.props.ignore || false;
        const dataType = this.props.dataType || 'text';
        const val = input.value;
        const dataTypeObj = dataTypes[dataType];
        const maxLength = this.maxLength;

        if (!this.props.ignore) {
            if (!val) {
                this.showNotice(dataTypes.nullMessage);
                return false;
            } else {
                this.hideNotice();
            }
        }

        if (input.value.length > maxLength) {
            this.showNotice(dataTypes.maxLengthMessage + "：" + maxLength);
            return false;
        } else {
            this.hideNotice();
        }

        if (dataType !== 'text') {
            if (!dataTypeObj.regExp.test(val)) {
                this.showNotice(dataTypeObj.message);
                return false;
            } else {
                this.hideNotice();
            }
        }

        return true;
    }

    /**
     * @description 关闭错误提示
     */

    hideNotice() {
        const notice = this.notice;
        notice.classList.remove(styles['n-input-notice-active']);
    }

    /**
     * @description 打开错误提示
     * @param message 错误提示信息
     */
    showNotice(message) {
        const notice = this.notice;
        notice.innerText = message;
        notice.classList.add(styles['n-input-notice-active']);
    }

    render() {

        let {type = 'text', defaultValue, disabled, placeholder, autoFocus, name, readOnly, leftIcon, onKeyUp, value, onFocus, onBlur, label, htmlFor} = this.props;

        let leftIconDom = leftIcon ? [<span className={styles.icon} key='leftIcon'>
                <i className={fonts["icon-" + leftIcon]} data-icon> </i>
            </span>] : [];

        return <div className={styles['n-input']}>
            {label && <label htmlFor={htmlFor}>{label}</label>}
            <div className={styles["n-input-main"]}>
                <div className={styles['n-input-container']}>
                    {leftIconDom}
                    <input
                        ref={e => this.input = e}
                        name={name}
                        type={type}
                        value={value}
                        readOnly={readOnly}
                        disabled={disabled}
                        autoFocus={autoFocus}
                        placeholder={placeholder}
                        defaultValue={defaultValue}
                        onFocus={onFocus}
                        onKeyUp={onKeyUp}
                        onBlur={onBlur}
                        onInput={this.onInput.bind(this)}
                    />
                </div>
                <span ref={e => this.notice = e} className={styles['n-input-notice']}> </span>
            </div>
        </div>
    }

}

export default Input;
//
// class NumberBox extends React.Component {
//
//     render(){
//         return <div className={styles['n-number-box-container']}>
//             <input type="number" />
//             <div ref='loading' className={styles['n-number-box-loading']}>
//                 <i className={fonts['icon-loading']} data-icon> </i>
//             </div>
//         </div>
//     }
//
// }
//