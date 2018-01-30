import "isomorphic-fetch";
import promise from 'es6-promise';

export default {
    /**
     * @description                             返回元素相对浏览器窗口的位置
     * @param node                              元素节点
     * @returns {{top: number, left: number}}   元素相对浏览器窗口的位置
     */
    fixedTop: (node) => {
        if (!node) {
            return;
        }

        if (!node.getClientRects().length) {
            return {top: 0, left: 0};
        }

        const rect = node.getBoundingClientRect();
        const win = node.ownerDocument.defaultView;

        return {
            top: rect.top + win.pageYOffset,
            left: rect.left + win.pageXOffset
        };

    },
    /**
     * @description     插入HTML
     * @param aimDom    目标节点
     * @param htmlStr   HTML字符串
     * @param type      [before|after] 操作类型，插入到目标元素前/后
     */
    insertHTML: (aimDom, htmlStr, type) => {

        if (type !== 'append' && type !== 'before') {
            return false;
        }

        let container = document.createElement("div"),
            fragment = document.createDocumentFragment(),
            nodes = container.childNodes;

        container.innerHTML = htmlStr;

        for (let i = 0, length = nodes.length; i < length; i += 1) {
            fragment.appendChild(nodes[i].cloneNode(true));
        }

        nodes = null;

        if (type === 'append') {
            aimDom.appendChild(fragment);
            let aimChildren = aimDom.children;
            return aimChildren[aimChildren.length - 1];
        } else {
            aimDom.insertBefore(fragment, aimDom.children[0]);
            let aimChildren = aimDom.children;
            return aimChildren[0];
        }
    },
    request: (url, options) => {

        const defaultOptions = {method: 'GET', credentials: 'same-origin', body: {}};

        options = Object.assign({}, defaultOptions, options);

        const requestBody = options.body;


        //GET请求序列化数据到URL
        if (options.method.toUpperCase() === 'GET') {
            let paramString = '';
            if (requestBody.toString() === '[object Object]') {
                for (let i in requestBody) {
                    if (requestBody.hasOwnProperty(i)) {
                        paramString += "&" + i + "=" + requestBody[i];
                    }
                }
                paramString = "?" + paramString.substring(1);
                url += paramString;
                delete options.body;
            }
        } else {
            options.headers = {
                'Content-Type': 'application/json'
            };
            options.body = JSON.stringify(requestBody);
        }


        return fetch(url, options).then((res) => {
            if (res.status === 200) {
                return res.json();
            } else {
                throw new Error('Server Error : ' + res.status);
            }
        })
    },
    upload: (url, options) => {

        const defaultOptions = {method: 'POST', credentials: 'same-origin', body: {}};

        options = Object.assign({}, defaultOptions, options);

        return fetch(url, options).then((res) => {
            if (res.status === 200) {
                return res.json();
            } else {
                throw new Error('Server Error : ' + res.status);
            }
        }).then((res) => {
            const path = res['cosmic.png'];
            return {
                status: path ? 1 : 0,
                data: path,
                message: res.message
            }
        })
    },
}