import functions from '../functions';

import fonts from '../../asset/style/fonts.scss';
import styles from './style/toast.scss';

const toastTimer = 2000;

class Toast {

    constructor() {
        this.preFix = ['', 'webkit', 'moz', 'ms', 'o'];
    }


    /**
     * @description         创建一条提示
     * @param message       提示信息
     * @param type          提示类型
     * @returns {Element}   提示条目的实例
     */
    createItem(message, type) {
        let toastId = "n-toast-item-" + new Date().valueOf();
        let iconClassName = fonts["icon-toast-" + type];
        let itemTpl = `<div class=${styles["n-toast-item"]} id=${toastId}><div class=${styles["n-toast-item-container-active"]}><i class=${iconClassName} data-icon data-type=${type}></i><p>${message}</p></div></div>`;

        functions.insertHTML(this.toastContainer, itemTpl, 'append');

        return document.getElementById(toastId);
    }

    /**
     * @description 销毁Toast条目
     */
    destroy(toastItem) {
        let _this = this,
            toastItemContainer = toastItem.children[0],
            preFix = this.preFix,
            toastContainer = this.toastContainer;

        toastItemContainer.classList.remove(styles["n-toast-item-container-active"]);
        toastItemContainer.classList.add(styles["n-toast-item-container-negative"]);

        for (let i = 0; i < preFix.length; i++) {
            toastItemContainer.addEventListener(preFix[i] + (preFix[i] ? 'A' : 'a') + "nimationEnd", function () {
                toastContainer.removeChild(toastItem);
                if (toastContainer.children.length <= 0) {
                    toastContainer.parentNode.removeChild(toastContainer);
                    _this.toastContainer = null;
                }
            })
        }
    }

    /**
     * @description 创建警告类型Toast
     * @param message 提示信息
     */
    warning(message) {
        this.create(message, 'warning')
    }

    /**
     * @description 创建错误类型Toast
     * @param message 提示信息
     */
    error(message) {
        this.create(message, 'error')
    }

    /**
     * @description 创建成功类型Toast
     * @param message 提示信息
     */
    success(message) {
        this.create(message, 'success')
    }

    /**
     * @description 创建Toast
     * @param message 提示信息
     * @param type Toast类型
     */
    create(message, type) {
        let _this = this;
        //创建Toast容器
        if (!this.toastContainer) {
            this.toastContainer = functions.insertHTML(document.body, `<div class=${styles["n-toast"]}></div>`, 'before');
        }

        //创建Toast条目
        const toastItem = this.createItem(message || '', type);

        setTimeout(function () {
            _this.destroy(toastItem);
        }, toastTimer)
    }

}

export default new Toast;