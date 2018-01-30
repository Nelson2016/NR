import React from 'react';

import RenderToBody from '../renderToBody';

import fonts from '../../asset/style/fonts.scss';
import styles from './style/input.scss';

import dataTypes from './dataTypes';

import functions from '../functions';

class Cascader extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value || '',
            valueIndexArr: [],
            status: 'close',
            coordinate: {
                top: 0,
                left:
                    0
            },
            data: this.props.data || []
        };

        //默认最大文本长度
        const maxLength = parseInt(this.props.maxLength);
        this.maxLength = maxLength > 0 ? maxLength : 200;
    }

    /**
     * @description     设置数据
     * @param data
     */
    setData(data) {
        this.setState(Object.assign({}, this.state, {
            data
        }))
    }

    /**
     * @description 检验输入款内容是否合法
     */
    checkValue() {
        const input = this.input;
        const ignore = this.props.ignore || false;
        const dataType = this.props.dataType || 'text';
        const val = input.value;

        if (!this.props.ignore) {
            if (!val) {
                this.showNotice(dataTypes.nullMessage);
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

    /**
     * @description     打开级联选择
     * @param   action  打开\关闭
     */
    toggle(action) {
        if (action === 'open' && this.state.data.length === 0) {
            return;
        }
        if (!this.input.disabled && !this.input.readOnly) {
            this.setState(Object.assign(this.state, {
                status: action,
                coordinate: functions.fixedTop(this.cascaderCover)
            }));
        }

    }

    /**
     * @description             选择回调函数
     * @param valueIndexArr     新的valueIndexArr
     * @param e
     */
    onClick(valueIndexArr, e) {
        e.stopPropagation();
        const state = this.state;
        let onClickData = state.data, value = '';

        for (let i = 0; i < valueIndexArr.length; i++) {
            value += onClickData[valueIndexArr[i]].title + ' / ';
            onClickData = onClickData[valueIndexArr[i]].sub;
        }

        value = value.substr(0, value.length - 2);

        if (onClickData) {
            this.setState(Object.assign({}, state, {valueIndexArr}));
        } else {
            this.setState(Object.assign({}, state, {
                status: 'close',
                value,
                valueIndexArr
            }));
        }
    }

    /**
     * @description 获取Value Object
     */
    val() {
        let data = this.state.data;
        let valueIndexArr = this.state.valueIndexArr;
        let valueIdArr = [], valueTitleArr = [];

        for (let i = 0; i < valueIndexArr.length; i++) {
            data = data[valueIndexArr[i]];
            valueIdArr.push(data.id);
            valueTitleArr.push(data.title);
        }

        return {
            valueIndexArr,
            valueIdArr,
            valueTitleArr
        };
    }

    render() {

        let state = this.state;
        let coordinate = state.coordinate;
        let valueIndexArr = state.valueIndexArr;
        let data = state.data;
        let items = [];

        let {defaultValue, disabled, placeholder, name, readOnly, onBlur, label, htmlFor} = this.props;
        let value = state.value;

        items.push(<ul key="cascader-0" className={styles["n-cascader-item"]}>
            {
                data.map((item, index) => <li key={"cascader-0-" + index}
                                              className={valueIndexArr[0] !== undefined && index === valueIndexArr[0] ? styles['n-cascader-active'] : ''}
                                              data-id={item.id}
                                              onClick={this.onClick.bind(this, [index])}>
                    <span>{item.title + "-0-" + index}</span>
                    {item.sub && <i className={fonts['icon-forward']} data-icon></i>}
                </li>)
            }
        </ul>);

        let temp = data;
        let valueIndexArrTemp = [];

        items.push(valueIndexArr.map((selectIndex, containerIndex) => {
            containerIndex += 1;
            temp = temp[selectIndex].sub;

            valueIndexArrTemp.push(selectIndex);

            return <ul key={"cascader-" + containerIndex} className={styles["n-cascader-item"]}>
                {
                    temp && temp.map((subItem, subIndex) => {
                        return <li key={"cascader-" + containerIndex + "-" + subIndex}
                                   className={valueIndexArr[containerIndex] !== undefined && subIndex === valueIndexArr[containerIndex] ? styles['n-cascader-active'] : ''}
                                   data-id={subItem.id}
                                   onClick={this.onClick.bind(this, valueIndexArrTemp.concat([subIndex]))}>
                            <span>{subItem.title + containerIndex + "-" + subIndex}</span>
                            {subItem.sub && <i className={fonts['icon-forward']} data-icon></i>}
                        </li>
                    })
                }
            </ul>
        }));

        return <div className={styles['n-input']}>
            {label && <label htmlFor={htmlFor}>{label}</label>}
            <div className={styles["n-input-main"]}>
                <div className={styles['n-input-container']}>
                    <input
                        type="text"
                        ref={e => this.input = e}
                        name={name}
                        readOnly={readOnly}
                        disabled={disabled}
                        placeholder={placeholder}
                        value={value}
                        onBlur={onBlur}
                    />
                    <div className={styles['n-input-cascader-cover-' + state.status]}
                         ref={e => this.cascaderCover = e}
                         onClick={this.toggle.bind(this, 'open')}>
                        <i className={fonts['icon-cascader-arrow']} data-icon></i>
                    </div>
                </div>
                <span ref={e => this.notice = e} className={styles['n-input-notice']}> </span>
            </div>

            <RenderToBody>
                <div className={styles["n-cascader-container" + (state.status === 'open' ? '-active' : '')]}
                     onClick={this.toggle.bind(this, 'close')}>
                    <div className={styles["n-cascader-content"]}
                         style={{
                             top: coordinate.top + 32 + "px",
                             left: coordinate.left + "px"
                         }}>{items}</div>
                </div>
            </RenderToBody>

        </div>;
    }

}

export default Cascader;