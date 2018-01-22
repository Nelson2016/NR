import React from 'react';

import styles from './style/notice.scss';

class Notice extends React.Component {

    render() {

        return <div className={styles["n-notice-" + this.props.type]}>
            <h2>{this.props.title}</h2>
            {
                typeof this.props.description === 'string' ?
                    <p>{this.props.description}</p> :
                    this.props.description.map((item, index) => <p key={index}>{item}</p>)
            }
        </div>
    }

}

export default Notice;