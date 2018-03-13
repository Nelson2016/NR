import React from 'react';
import {NavLink} from 'react-router-dom';

import styles from './style/breadcrumb.scss';
import fonts from '../../asset/style/fonts.scss';

class Breadcrumb extends React.Component {

    render() {
        const config = this.props.config;
        const path = this.props.path.split('/');
        const keys = Object.keys(config);

        let breadcrumb = path.map((item, index) => {
            if (keys.indexOf(item) >= 0) {
                return <li key={"breadcrumb-" + index}><NavLink to={config[item].path}>{config[item].name}</NavLink>
                </li>
            }
        });

        return <nav className={styles['n-breadcrumb']}>
            <i className={fonts["icon-breadcrumb"]} data-icon></i>
            <ul>{breadcrumb}</ul>
        </nav>
    }

}

export default Breadcrumb;