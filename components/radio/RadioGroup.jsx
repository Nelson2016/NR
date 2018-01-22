import React from 'react';

import Radio from './Radio';

import styles from './style/radio.scss';

class RadioGroup extends React.Component {

    render() {
        const values = this.props.values || [];
        const radios = values.map((item, index) => <span className={styles["n-radio-group-item"]}>
            <Radio label={item.label} name={this.props.name} value={item.value} defaultChecked={item.defaultChecked}/>
        </span>);

        return <div className={styles["n-radio-group"]}>
            <label>{this.props.label}</label>
            {radios}
        </div>
    }

}

export default RadioGroup;