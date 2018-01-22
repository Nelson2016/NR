import React from 'react';

import styles from './style/title.scss';

class Title extends React.Component {

    render() {
        return <div className={styles['n-title']}>
            <h1 className={styles["n-title-text"]}>{this.props.title}</h1>
            {this.props.more.text && <span className={styles["n-title-more"]}
                                           onClick={this.props.more.onClick.bind(this)}>{this.props.more.text}</span>
            }
        </div>
    }

}

export default Title;