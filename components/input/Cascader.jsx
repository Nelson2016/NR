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
            value: [],//['5a705c04af4ffe3a62b66271', '5a705c24af4ffe3a62b66273'],
            status: 'close',
            coordinate: {
                top: 0,
                left:
                    0
            },
            // data: [{
            //     "id": "5a705c04af4ffe3a62b66271",
            //     "title": "中国",
            //     "sub": [{
            //         "id": "5a705c24af4ffe3a62b66273",
            //         "title": "购物网站",
            //         "sub": [{
            //             "id": "5a7c5a81c3868b1e5a053ad2",
            //             "title": "123",
            //             "sub": false
            //         }, {"id": "5a7c5c4366801d1eb5ec1279", "title": "淘宝", "sub": false}]
            //     }, {
            //         "id": "5a705c2faf4ffe3a62b66274",
            //         "title": "视频网站",
            //         "sub": [{"id": "5a7d55e6bb36c82219afb6b5", "title": "优酷", "sub": false}]
            //     }]
            // }]
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
        this.setState(Object.assign({}, this.state, data))
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
     * @description         选择回调函数
     * @param index         电机项的索引
     * @param id            电机项的id
     * @param hasSub        是否有子选项
     * @param e
     */
    onClick(index, id, hasSub, e) {
        e.stopPropagation();
        const state = this.state;
        let value = state.value;
        value[index] = id;
        value = value.slice(0, index + 1);

        if (hasSub) {
            this.setState(Object.assign({}, state, {value}));
        } else {
            this.setState(Object.assign({}, state, {
                status: 'close',
                value,
            }));
        }
    }

    /**
     * @description 获取Value Object
     */
    val() {
        let value = this.state.value;

        return {
            value,
            valueStr: this.input.value
        };
    }

    render() {

        let state = this.state;
        let coordinate = state.coordinate,
            data = state.data || [],
            items = [],
            value = state.value,
            valueStr = '';

        let {disabled, placeholder, name, readOnly, onBlur, label, htmlFor} = this.props;

        if (value.length > 0) {

            items = value.map((valueItem, valueIndex) => {

                let ulKey = "cascader-" + valueIndex;

                return <ul key={ulKey} className={styles["n-cascader-item"]}>
                    {
                        data && data.map((item, itemIndex) => {
                            let isActive = item.id === valueItem;
                            if (isActive) {
                                data = item.sub;
                                valueStr += item.title + ' / ';
                            }

                            return <li key={ulKey + "-" + itemIndex}
                                       className={isActive ? styles['n-cascader-active'] : ''}
                                       data-id={item.id}
                                       onClick={this.onClick.bind(this, valueIndex, item.id, !!item.sub)}>
                                <span>{item.title}</span>
                                {item.sub && <i className={fonts['icon-forward']} data-icon></i>}
                            </li>
                        })
                    }
                </ul>

            });

            if (!!data) {
                let valueIndex = value.length;

                items.push(<ul key={"cascader-" + valueIndex} className={styles["n-cascader-item"]}>
                    {
                        data.map((item, itemIndex) => {

                            return <li key={"cascader-" + valueIndex + "-" + itemIndex}
                                       data-id={item.id}
                                       onClick={this.onClick.bind(this, valueIndex, item.id, !!item.sub)}>
                                <span>{item.title}</span>
                                {item.sub && <i className={fonts['icon-forward']} data-icon></i>}
                            </li>
                        })
                    }
                </ul>)
            }

        } else if (data.length > 0) {
            items.push(<ul key={"cascader-0"} className={styles["n-cascader-item"]}>
                {
                    data.map((item, itemIndex) => {

                        return <li key={"cascader-0" + "-" + itemIndex}
                                   data-id={item.id}
                                   onClick={this.onClick.bind(this, 0, item.id, !!item.sub)}>
                            <span>{item.title}</span>
                            {item.sub && <i className={fonts['icon-forward']} data-icon></i>}
                        </li>
                    })
                }
            </ul>)
        }

        valueStr = !!data ? '' : valueStr.substring(0, valueStr.length - 2);

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
                        onBlur={onBlur}
                        value={valueStr}
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