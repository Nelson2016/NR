import React from 'react';

import fonts from '../../asset/style/fonts.scss';
import styles from './style/checkbox.scss';

class Checkbox extends React.Component {

    onChange() {
        this.props.onChange && this.props.onChange();
    }

    setChecked(isChecked) {
        this.checkbox.checked = isChecked;
    }

    isChecked() {
        return this.checkbox.checked;
    }

    val() {
        return this.checkbox.value
    }

    render() {

        const {defaultChecked, checkAllFor, name, value} = this.props;


        return <div className={styles["n-checkbox"]}>
            <div className={styles["n-checkbox-container"]}>
                <input ref={e => this.checkbox = e}
                       type="checkbox"
                       defaultChecked={defaultChecked}
                       name={name}
                       value={value}
                       onChange={this.onChange.bind(this)}/>
                <span className={styles['n-checkbox-background']}>
                    <i className={fonts['icon-checkbox']} data-icon></i>
                </span>
            </div>
            {this.props.label && <label>{this.props.label}</label>}
        </div>
    }
}

export default Checkbox;