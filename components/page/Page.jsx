import React from 'react';

import fonts from '../../asset/style/fonts.scss';
import styles from './style/page.scss';

class Page extends React.Component {

    constructor(props) {
        super(props);
        const currentPage = this.props.currentPage;
        const totalPage = this.props.totalPage;
        if(currentPage > totalPage){
            throw new Error('当前页吗不能大于总页码数');
        }
        this.state = {
            currentPage: this.props.currentPage || 1,
            totalPage: this.props.totalPage || 1,
        }
    }

    /**
     * @description         设置页码状态
     * @param currentPage   当前页码
     * @param totalPage     总页码
     */
    setPageData(currentPage, totalPage) {
        currentPage = parseInt(currentPage) || this.state.currentPage;
        totalPage = parseInt(totalPage) || this.state.totalPage;
        this.setState({currentPage, totalPage});
    }

    /**
     * @description     页码跳转
     * @param page      页码
     */
    goToPage(page) {
        if(this.state.currentPage !== page){
            this.props.onChange && this.props.onChange(page);
            this.setState(Object.assign({}, this.state, {currentPage: page}));
        }
    }

    render() {
        let currentPage = this.state.currentPage,
            totalPage = this.state.totalPage,
            isFirstPage = currentPage === 1,
            isLastPage = currentPage === totalPage,
            pagesDom = [];

        for (let pageIndex = 1; pageIndex <= totalPage; pageIndex++) {
            pagesDom.push(
                <li key={pageIndex} className={styles[pageIndex === currentPage ? 'n-page-current' : 'n-active']}
                    data-page-index={pageIndex}
                    onClick={this.goToPage.bind(this, pageIndex)}>{pageIndex}</li>
            )
        }

        return <div className={styles["n-page"]}>
            <ul className={styles["n-page-list"]}>
                {<li className={styles[isFirstPage ? '' : 'n-active']}>
                    <i className={fonts["icon-first-page"]} data-icon></i>
                </li>}
                {<li className={styles[isFirstPage ? '' : 'n-active']}>
                    <i className={fonts["icon-back"]} data-icon></i>
                </li>}

                {pagesDom}

                {<li className={styles[isLastPage ? '' : 'n-active']}>
                    <i className={fonts["icon-forward"]} data-icon></i>
                </li>}
                {<li className={styles[isLastPage ? '' : 'n-active']}>
                    <i className={fonts["icon-last-page"]} data-icon></i>
                </li>}
            </ul>
        </div>;
    }

}

export default Page;