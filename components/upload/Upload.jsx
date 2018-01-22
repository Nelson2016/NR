import React from 'react';
import Image from '../image';

import fonts from '../../asset/style/fonts.scss';
import styles from './style/upload.scss';

class Upload extends React.Component {

    constructor(props) {
        super(props);

        const max = parseInt(this.props.max);
        const defaultFiles = this.props.defaultFiles || [];

        this.state = {
            max: max > 0 ? max : 1,
            files: defaultFiles
        };
    }

    componentDidMount() {
        this.checkCount();
    }

    componentDidUpdate() {
        this.checkCount();
    }


    /**
     * @description 打开选择器
     */
    openSelector() {
        if (this.fileSize() >= this.props.max) {
            alert("您只能添加三张展示图");
            return;
        }
        this.fileInput.click();
    }

    /**
     * @description         返回当前文件数量
     * @returns {Number}    前文件数量
     */
    fileSize() {
        return this.state.files.length;
    }

    /**
     * @description     检查总数限制，判断是否显示添加按钮
     */
    checkCount() {
        this.addBtn.classList[this.state.files.length >= this.state.max ? 'remove' : 'add'](styles["n-active"]);
    }

    /**
     * @description     删除当前图片dom
     * @param index     当前dom的索引
     */
    delete(index) {
        let newState = this.state;
        let files = newState.files;
        newState.files = files.slice(0, index).concat(files.slice(index + 1, files.length));
        this.setState(newState)
    }

    /**
     * @description     文件变化后的逻辑处理
     */
    onFileChange() {
        let _this = this;
        let filePath = this.getFileUrl(this.fileInput.files[0]);//拿到文件对象
        let files = _this.state.files;
        files.push({local: filePath});
        this.setState({files: files});
    }

    /**
     * @description     获取当前文件路径数组
     * @returns {Array} 当前文件路径数组
     */
    getFiles() {
        return this.state.files;
    }

    /**
     * @description     根据文件对象获取本地路径
     * @param file      文件对象
     * @returns {*}     本地路径
     */
    getFileUrl(file) {
        let url = null;
        if (window.createObjectURL !== undefined) {
            url = window.createObjectURL(file);
        } else if (window.URL !== undefined) {
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL !== undefined) {
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
    }

    render() {

        let items = this.state.files.map((item, index) =>
            <li key={index}>
                <div className={styles["n-upload-thumb"]}>
                    <i className={fonts["icon-close"]} data-icon onClick={this.delete.bind(this, index)}></i>
                    <Image src={item.local} alt={item.local} width="100px" height="100px"/>
                </div>
                <span className={styles["n-upload-path"]}></span>
            </li>);

        return <div className={styles['n-upload']}>
            <ul className={styles["n-upload-list"]}>
                {items}
            </ul>
            <div className={styles["n-upload-add"]} onClick={this.openSelector.bind(this)} ref={e => this.addBtn = e}>
                <input ref={e => this.fileInput = e}
                       type="file"
                       onChange={this.onFileChange.bind(this)}
                       name={this.props.name}
                       accept="image/x-png,image/png,image/jpg,image/jpeg"
                />
                <i className={fonts["icon-add"]} data-icon></i>
            </div>
        </div>;
    }
}

export default Upload;