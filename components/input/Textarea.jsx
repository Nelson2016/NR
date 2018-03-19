import React from 'react';

import styles from './style/input.scss';

import dataTypes from './dataTypes';

class Textarea extends React.Component {

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
        this.hideNotice();
        this.setCount();
        this.props.onInput && this.props.onInput();
    }

    /**
     * @description 计算当前文本长度
     */
    setCount() {
        let value = this.input.value,
            currentLength = value.length,
            maxLength = this.maxLength;

        currentLength = currentLength > maxLength ? maxLength : currentLength;

        this.count.innerText = currentLength + "/" + maxLength;
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

        if (!this.props.ignore) {
            if (!val) {
                this.showNotice(dataTypes.nullMessage);
                return false;
            } else {
                this.hideNotice();
            }
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

    componentDidMount() {
        this.setCount();
    }

    /**
     * @description     获取/设置value
     * @param   value   设置input值
     */
    val(value) {
        return value === undefined ? this.input.value : this.input.value = value;
    }

    render() {

        let {defaultValue = "", disabled, placeholder, autoFocus, name, readOnly, onKeyUp, onFocus, onBlur, label, htmlFor, maxLength = 200} = this.props;

        return <div className={styles['n-input']}>
            {label && <label htmlFor={htmlFor}>{label}</label>}
            <div className={styles["n-input-main"]}>
                <div className={styles['n-input-container']}>
                    <textarea
                        ref={e => this.input = e}
                        name={name}
                        readOnly={readOnly}
                        disabled={disabled}
                        autoFocus={autoFocus}
                        placeholder={placeholder}
                        maxLength={maxLength}
                        onFocus={onFocus}
                        onKeyUp={onKeyUp}
                        defaultValue={defaultValue}
                        onBlur={onBlur}
                        onInput={this.onInput.bind(this)}
                    />
                    {maxLength && <span className={styles["n-input-count"]} ref={e => this.count = e}></span>}
                </div>
                <span ref={e => this.notice = e} className={styles['n-input-notice']}> </span>
            </div>
        </div>
    }

}

export default Textarea;
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