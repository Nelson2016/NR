import React from 'react';

import styles from './style/radio.scss';

class Radio extends React.Component {

    render() {
        return <div className={styles["n-radio"]}>
            <div className={styles["n-radio-container"]}>
                <input type="radio" name={this.props.name} defaultChecked={this.props.defaultChecked} value={this.props.value} />
                <span className={styles["n-radio-background"]}> </span>
            </div>
            <label>{this.props.label}</label>
        </div>
    }

}

export default Radio;